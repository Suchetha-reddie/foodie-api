// Script.js

const apiKey = 'f0a9160f10f3405e99329e98d9cf3bba';  // Replace with your API key from the food recipe API
const recipeList = document.getElementById('recipe-list');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Function to fetch recipes from API
async function fetchRecipes(query) {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeList.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    }
}

// Function to display recipes
function displayRecipes(recipes) {
    recipeList.innerHTML = '';
    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found for your search.</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.title}</h5>
                        <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" class="btn btn-primary" target="_blank">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
        recipeList.insertAdjacentHTML('beforeend', recipeCard);
    });
}

// Event listener for search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// Fetch default recipes on page load
fetchRecipes('pasta');
