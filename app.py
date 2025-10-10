from flask import Flask, jsonify, request, send_from_directory
import os

app = Flask(__name__)

# Serve static files from public directory
@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('public', filename)

# API endpoint to get ingredients
@app.route('/api/ingredients', methods=['GET'])
def get_ingredients():
    try:
        with open('ingredients.txt', 'r', encoding='utf-8') as file:
            ingredients = [line.strip() for line in file if line.strip()]
            ingredients.sort()
        return jsonify(ingredients)
    except FileNotFoundError:
        return jsonify([])

# API endpoint to process selected ingredients
@app.route('/api/create', methods=['POST'])
def create_recipe():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    sorted_ingredients = ' '.join(sorted(ingredients))
    from chefagent import run_agent
    agent_response = run_agent(sorted_ingredients)
    return jsonify({'result': agent_response})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
