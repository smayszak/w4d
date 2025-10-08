#!/usr/bin/env python3
"""
Simple startup script for the W4D Flask application
"""
from app import app

if __name__ == '__main__':
    print("🍲 Starting W4D - What's for Dinner? 🍳")
    print("Server will be available at: http://127.0.0.1:3000")
    print("Press Ctrl+C to stop the server")
    app.run(host='127.0.0.1', port=3000, debug=True)
