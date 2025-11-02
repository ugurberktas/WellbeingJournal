from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from ..database import get_db
from ..models import JournalEntry, User
from ..auth import get_current_user
from ..services.sentiment import analyze_sentiment

router = APIRouter(prefix="/api/entries", tags=["entries"])

class EntryCreate(BaseModel):
    title: str
    content: str

class EntryUpdate(BaseModel):
    title: str
    content: str

class EntryResponse(BaseModel):
    id: int
    title: str
    content: str
    sentiment: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class MoodSummary(BaseModel):
    positive: int
    neutral: int
    negative: int
    total: int
    average_sentiment: str

@router.post("", response_model=EntryResponse, status_code=status.HTTP_201_CREATED)
def create_entry(
    entry: EntryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Analyze sentiment
    sentiment = analyze_sentiment(entry.content)
    
    db_entry = JournalEntry(
        title=entry.title,
        content=entry.content,
        sentiment=sentiment,
        user_id=current_user.id
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@router.get("", response_model=List[EntryResponse])
def get_entries(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entries = db.query(JournalEntry).filter(
        JournalEntry.user_id == current_user.id
    ).order_by(JournalEntry.created_at.desc()).all()
    return entries

@router.get("/{entry_id}", response_model=EntryResponse)
def get_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    return entry

@router.put("/{entry_id}", response_model=EntryResponse)
def update_entry(
    entry_id: int,
    entry_update: EntryUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    
    # Re-analyze sentiment
    sentiment = analyze_sentiment(entry_update.content)
    
    entry.title = entry_update.title
    entry.content = entry_update.content
    entry.sentiment = sentiment
    entry.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_entry(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entry = db.query(JournalEntry).filter(
        JournalEntry.id == entry_id,
        JournalEntry.user_id == current_user.id
    ).first()
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entry not found"
        )
    db.delete(entry)
    db.commit()
    return None

@router.get("/stats/summary", response_model=MoodSummary)
def get_mood_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entries = db.query(JournalEntry).filter(
        JournalEntry.user_id == current_user.id
    ).all()
    
    positive = sum(1 for e in entries if e.sentiment == "positive")
    neutral = sum(1 for e in entries if e.sentiment == "neutral")
    negative = sum(1 for e in entries if e.sentiment == "negative")
    total = len(entries)
    
    # Calculate average sentiment
    if total == 0:
        average_sentiment = "neutral"
    else:
        # Weighted: positive=2, neutral=1, negative=0
        score = (positive * 2 + neutral * 1) / total
        if score >= 1.5:
            average_sentiment = "positive"
        elif score >= 0.5:
            average_sentiment = "neutral"
        else:
            average_sentiment = "negative"
    
    return MoodSummary(
        positive=positive,
        neutral=neutral,
        negative=negative,
        total=total,
        average_sentiment=average_sentiment
    )

