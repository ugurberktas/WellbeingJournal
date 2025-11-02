from transformers import pipeline
import os

# Initialize sentiment analyzer
sentiment_analyzer = None

def get_sentiment_analyzer():
    global sentiment_analyzer
    if sentiment_analyzer is None:
        # Using a lightweight model that works well for sentiment analysis
        sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="cardiffnlp/twitter-roberta-base-sentiment-latest",
            device=-1  # Use CPU
        )
    return sentiment_analyzer

def analyze_sentiment(text: str) -> str:
    """
    Analyze sentiment of text and return: positive, neutral, or negative
    """
    try:
        analyzer = get_sentiment_analyzer()
        result = analyzer(text)
        
        # The model returns LABEL_0 (negative), LABEL_1 (neutral), LABEL_2 (positive)
        label = result[0]['label']
        
        if 'LABEL_2' in label or 'POSITIVE' in label:
            return "positive"
        elif 'LABEL_1' in label or 'NEUTRAL' in label:
            return "neutral"
        else:
            return "negative"
    except Exception as e:
        print(f"Sentiment analysis error: {e}")
        # Fallback: simple heuristic
        text_lower = text.lower()
        positive_words = ["happy", "joy", "great", "good", "love", "wonderful", "amazing", "excited", "grateful"]
        negative_words = ["sad", "bad", "angry", "frustrated", "depressed", "worried", "anxious", "stress"]
        
        pos_count = sum(1 for word in positive_words if word in text_lower)
        neg_count = sum(1 for word in negative_words if word in text_lower)
        
        if pos_count > neg_count:
            return "positive"
        elif neg_count > pos_count:
            return "negative"
        else:
            return "neutral"

