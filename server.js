const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// API endpoint to get ingredients
app.get('/api/ingredients', (req, res) => {
  const ingredients = fs.readFileSync('ingredients.txt', 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .sort();
  res.json(ingredients);
});

// API endpoint to process selected ingredients
app.post('/api/create', (req, res) => {
  const { ingredients } = req.body;
  const sortedIngredients = ingredients.sort().join(' ');
  res.json({ result: sortedIngredients });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`W4D server running at http://127.0.0.1:${PORT}`);
});
