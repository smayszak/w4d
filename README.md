# W4D - What's for Dinner? 🍲

A simple web application to help you decide what to cook based on available ingredients.

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
