# W4D - What's for Dinner? 🍲

This is a website I put together while interviewing with Interview Kickstarter for the role of AI Agent instructor.
I created teaching videos (part 1 and 2) to describe how it all works.
Part 1: https://www.youtube.com/watch?v=4fCmTxjo_MQ
Part 2: https://www.youtube.com/watch?v=5Y9YGccOka4

Outside of having to create a key with anthropic, anyone could install and host this website, and it turns out it is quite useful! Essentially if you are struggling to be creative for dinner, you tell it what you have in the fridge and pantry
and it can suggest meals to construct. it tries to keep you in the house, but sometimes it will suggest if you ran out and got X or Y you could make Z. It is a fun little website that shows the power of developing programs with agents.

## Technology Stack
- **Backend**: Python with Flask (simple and easy to learn web framework)
- **Frontend**: HTML, CSS, JavaScript (unchanged from original)
- **Package Management**: pip with virtual environment

## Setup Instructions

### 1. Activate the Virtual Environment
```bash
source venv/bin/activate
```

### 2. Install Dependencies (if needed)
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
python run.py
```

Or alternatively:
```bash
python app.py
```

### 4. Access the Application
Open your browser and go to: http://127.0.0.1:3000

## How to Stop the Server
Press `Ctrl+C` in the terminal where the server is running.

## Project Structure
```
w4d/
├── app.py              # Main Flask application
├── run.py              # Simple startup script
├── requirements.txt    # Python dependencies
├── ingredients.txt     # List of available ingredients
├── public/            # Static files (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
└── venv/              # Python virtual environment
```

## Flask Framework Benefits
- **Simple**: Minimal setup, easy to understand
- **Flexible**: Can grow with your needs
- **Well-documented**: Extensive documentation and community
- **Pythonic**: Uses familiar Python patterns

## API Endpoints
- `GET /api/ingredients` - Returns list of available ingredients
- `POST /api/create` - Processes selected ingredients and returns result
