# Wellbeing Journal 🌟

A full-stack AI-powered journaling application that analyzes the sentiment of your daily entries and provides insights into your mood trends over time.

## Features

- 🔐 **User Authentication**: Secure JWT-based login and registration
- 📝 **Journal Entries**: Create, edit, and delete daily journal entries
- 🤖 **AI Sentiment Analysis**: Automatic sentiment analysis using HuggingFace transformers (positive/neutral/negative)
- 📊 **Mood Trends**: Interactive chart showing your mood over time
- 📈 **Mood Summary**: Dashboard with sentiment statistics and average mood
- 🎨 **Beautiful UI**: Dark mode with glassmorphism design, gradients, and modern aesthetics
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database
- **HuggingFace Transformers**: AI sentiment analysis
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing

### Frontend
- **React**: UI library
- **Vite**: Fast build tool
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Chart library for mood trends
- **Axios**: HTTP client
- **React Router**: Navigation

## Project Structure

```
cursordeneme/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── auth.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   └── entries.py
│   │   └── services/
│   │       ├── __init__.py
│   │       └── sentiment.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EntryCard.jsx
│   │   │   ├── EntryModal.jsx
│   │   │   ├── MoodChart.jsx
│   │   │   └── MoodSummary.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Setup Instructions for Mac

### Prerequisites

- Python 3.8+ (check with `python3 --version`)
- Node.js 18+ and npm (check with `node --version` and `npm --version`)
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

   **Note:** The first time you run this, it will download the HuggingFace model (~500MB), which may take a few minutes.

4. **Run the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   The API will be available at `http://localhost:8000`
   - API docs: `http://localhost:8000/docs`
   - Health check: `http://localhost:8000/health`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Running the Application

1. **Start the backend server** (from `backend/` directory):
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

2. **Start the frontend server** (from `frontend/` directory in a new terminal):
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

4. **Register a new account** or login if you already have one

5. **Start journaling!** Create entries and watch your mood trends unfold.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get access token
- `GET /api/auth/me` - Get current user info

### Journal Entries
- `GET /api/entries` - Get all entries (authenticated)
- `POST /api/entries` - Create a new entry (authenticated)
- `GET /api/entries/{id}` - Get a specific entry (authenticated)
- `PUT /api/entries/{id}` - Update an entry (authenticated)
- `DELETE /api/entries/{id}` - Delete an entry (authenticated)
- `GET /api/entries/stats/summary` - Get mood summary statistics (authenticated)

## Database

The application uses SQLite database (`wellbeing_journal.db`) which is automatically created in the backend directory on first run.

## Troubleshooting

### Backend Issues

- **Port 8000 already in use**: Change the port in the uvicorn command: `uvicorn app.main:app --reload --port 8001`
- **Import errors**: Make sure you're in the virtual environment and all dependencies are installed
- **Model download issues**: The first run downloads the HuggingFace model. Ensure you have internet connection and sufficient disk space.

### Frontend Issues

- **Port 5173 already in use**: Vite will automatically use the next available port
- **CORS errors**: Ensure the backend is running and the CORS middleware is configured correctly
- **Module not found**: Run `npm install` again to ensure all dependencies are installed

### General

- **Can't connect to backend**: Ensure the backend server is running on port 8000
- **Authentication issues**: Clear browser localStorage and try logging in again
- **Slow sentiment analysis**: The first analysis may take time as the model loads. Subsequent analyses are faster.

## Production Notes

⚠️ **Important**: This is a development setup. For production:

1. Change the `SECRET_KEY` in `backend/app/auth.py` to a secure random string
2. Use environment variables for sensitive configuration
3. Use a production-grade database (PostgreSQL, MySQL, etc.)
4. Set up proper CORS origins
5. Use HTTPS
6. Add rate limiting and other security measures
7. Optimize the frontend build: `npm run build`

## License

This project is open source and available for personal use.

## Credits

- Built with FastAPI, React, and TailwindCSS
- Sentiment analysis powered by HuggingFace Transformers
- Icons by Lucide React

Enjoy journaling! 📖✨

