let allIngredients = [];
let selectedIngredients = [];
let currentSelection = -1;

// Load ingredients on page load
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/ingredients');
    allIngredients = await response.json();
});

const input = document.getElementById('ingredientInput');
const dropdown = document.getElementById('dropdown');

input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.dropdown-item');
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentSelection = Math.min(currentSelection + 1, items.length - 1);
        updateSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentSelection = Math.max(currentSelection - 1, -1);
        updateSelection(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentSelection >= 0 && items[currentSelection]) {
            items[currentSelection].click();
        } else if (input.value.trim()) {
            const customIngredient = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);
            if (!selectedIngredients.includes(customIngredient)) {
                selectIngredient(customIngredient);
            }
        }
    }
});

function updateSelection(items) {
    items.forEach((item, index) => {
        if (index === currentSelection) {
            item.style.background = '#4a90e2';
            item.style.color = 'white';
        } else {
            item.style.background = '';
            item.style.color = '';
        }
    });
}

input.addEventListener('input', (e) => {
    currentSelection = -1; // Reset selection when typing
    const value = e.target.value.toLowerCase();
    if (value.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    const filtered = allIngredients.filter(ingredient => 
        ingredient.toLowerCase().includes(value) && 
        !selectedIngredients.includes(ingredient)
    );

    let dropdownHTML = filtered.map(ingredient => 
        `<div class="dropdown-item" onclick="selectIngredient('${ingredient}')">${ingredient}</div>`
    ).join('');

    // Add option to add custom ingredient if it doesn't exist
    const exactMatch = allIngredients.find(ingredient => 
        ingredient.toLowerCase() === value
    );
    
    if (!exactMatch && value.trim().length > 0) {
        const customIngredient = value.charAt(0).toUpperCase() + value.slice(1);
        dropdownHTML += `<div class="dropdown-item" onclick="selectIngredient('${customIngredient}')">+ Add "${customIngredient}"</div>`;
    }

    if (dropdownHTML === '') {
        dropdown.style.display = 'none';
        return;
    }

    dropdown.innerHTML = dropdownHTML;
    dropdown.style.display = 'block';
});

function selectIngredient(ingredient) {
    selectedIngredients.push(ingredient);
    input.value = '';
    dropdown.style.display = 'none';
    updateSelectedIngredients();
}

function updateSelectedIngredients() {
    const container = document.getElementById('selectedIngredients');
    container.innerHTML = selectedIngredients.map(ingredient => 
        `<span class="ingredient-bubble">
            ${ingredient}
            <span class="remove-btn" onclick="removeIngredient('${ingredient}')">×</span>
        </span>`
    ).join('');
}

function removeIngredient(ingredient) {
    selectedIngredients = selectedIngredients.filter(item => item !== ingredient);
    updateSelectedIngredients();
}

async function createRecipe() {
    if (selectedIngredients.length === 0) return;
    
    const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: selectedIngredients })
    });
    
    const data = await response.json();
    document.getElementById('result').textContent = data.result;
}

function clearAll() {
    selectedIngredients = [];
    updateSelectedIngredients();
    document.getElementById('result').textContent = '';
    input.value = '';
    dropdown.style.display = 'none';
}

// Hide dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.ingredient-selector')) {
        dropdown.style.display = 'none';
    }
});
