// Array of all recipes with their details
const recipes = [
  {
    recipeId: 1,
    time: 5,
    name: "Peanut Butter & Jelly",
    ingredients: ["bread", "jelly", "peanut butter"],
    image: "pbj.jpg"
  },
  {
    recipeId: 2,
    time: 120,
    name: "Spaghetti & Meatballs",
    ingredients: ["pasta", "Ground Beef", "Tomato Sauce"],
    image: "sm.jpg"
  },
  {
    recipeId: 3,
    name: "Mac & Cheese",
    time: 30,
    ingredients: ["macaroni", "milk", "cheese"],
    image: "maccheese.jpg"
  },
  {
    recipeId: 4,
    time: 60,
    name: "Rice & Steak",
    ingredients: ["rice", "seasoning", "steak"],
    image: "ricesteak.jpg"
  },
  {
    recipeId: 5,
    time: 60,
    name: "Burger",
    ingredients: ["patty", "buns", "lettuce", "tomatoes", "Mayo"],
    image: "burger.jpg"
  }
];

// Days of the week for meal planning
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Store the current search term
let currentSearch = '';

// Function to display all recipes with search and filter
function displayRecipes() {
  const container = document.getElementById('list');
  const searchText = currentSearch.toLowerCase(); // Use stored search term
  const filterValue = document.getElementById('filter').value; // Get filter dropdown value
  
  container.innerHTML = ''; // Clear the container
  
  // If no search has been performed, show all recipes
  if (searchText === '') {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let showRecipe = true;
      
      if (filterValue === 'quick' && recipe.time >= 25) {
        showRecipe = false;
      }
      
      if (showRecipe) {
        displayRecipeCard(recipe, container);
      }
    }
  } else {
    // A search has been performed, show matching recipes
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let showRecipe = false;
      
      // Check recipe name
      if (recipe.name.toLowerCase().includes(searchText)) {
        showRecipe = true;
      }
      // Check ingredients
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].toLowerCase().includes(searchText)) {
          showRecipe = true;
        }
      }
      
      if (filterValue === 'quick' && recipe.time >= 25) {
        showRecipe = false;
      }
      
      if (showRecipe) {
        displayRecipeCard(recipe, container);
      }
    }
  }
}

// Function to create and display a recipe card
function displayRecipeCard(recipe, container) {
  const favorites = localStorage.getItem('favorites');
  let favArray = [];
  if (favorites) {
    favArray = JSON.parse(favorites);
  }
  
  let isFavorite = false;
  for (let k = 0; k < favArray.length; k++) {
    if (favArray[k] === recipe.recipeId) {
      isFavorite = true;
    }
  }
  
  let ingredientTags = '';
  for (let j = 0; j < recipe.ingredients.length; j++) {
    ingredientTags += '<span class="tag">' + recipe.ingredients[j] + '</span>';
  }
  
  let dayOptions = '<option value="">Add to plan...</option>';
  for (let d = 0; d < days.length; d++) {
    dayOptions += '<option value="' + days[d] + '">' + days[d] + '</option>';
  }
  
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<img src="' + recipe.image + '" alt="' + recipe.name + '">' +
    '<div class="pad">' +
    '<div class="title">' + recipe.name + '</div>' +
    '<div class="muted">' + recipe.time + ' min</div>' +
    '<div class="tags">' + ingredientTags + '</div>' +
    '<div class="row">' +
    '<select class="daySelect" data-recipe-id="' + recipe.recipeId + '">' + dayOptions + '</select>' +
    '<button class="ghost favBtn" data-recipe-id="' + recipe.recipeId + '">' + (isFavorite ? '⭐' : '☆') + '</button>' +
    '</div>' +
    '</div>';
  
  container.appendChild(card);
  
  // Add click event for favorite button
  const favBtn = card.querySelector('.favBtn');
  favBtn.onclick = function() {
    const recipeId = parseInt(this.getAttribute('data-recipe-id'));
    const favorites = localStorage.getItem('favorites');
    let favArray = [];
    if (favorites) {
      favArray = JSON.parse(favorites);
    }
    
    let found = false;
    let foundIndex = -1;
    for (let j = 0; j < favArray.length; j++) {
      if (favArray[j] === recipeId) {
        found = true;
        foundIndex = j;
      }
    }
    
    if (found) {
      favArray.splice(foundIndex, 1);
    } else {
      favArray.push(recipeId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favArray));
    displayRecipes();
    displayFavorites();
  };
  
  // Add change event for day select
  const daySelect = card.querySelector('.daySelect');
  daySelect.onchange = function() {
    const recipeId = parseInt(this.getAttribute('data-recipe-id'));
    const day = this.value;
    if (day !== '') {
      const plan = localStorage.getItem('weeklyPlan');
      let planObj = {};
      if (plan) {
        planObj = JSON.parse(plan);
      }
      planObj[day] = recipeId;
      localStorage.setItem('weeklyPlan', JSON.stringify(planObj));
      this.value = '';
      displayWeeklyPlan();
    }
  };
}

// Function to handle search
function performSearch() {
  currentSearch = document.getElementById('q').value;
  displayRecipes();
}

// Function to display weekly plan
function displayWeeklyPlan() {
  const tbody = document.querySelector('#planTable tbody');
  tbody.innerHTML = '';
  
  const plan = localStorage.getItem('weeklyPlan');
  let planObj = {};
  if (plan) {
    planObj = JSON.parse(plan);
  }
  
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const row = document.createElement('tr');
    const recipeId = planObj[day];
    let recipe = null;
    
    for (let j = 0; j < recipes.length; j++) {
      if (recipes[j].recipeId === recipeId) {
        recipe = recipes[j];
      }
    }
    
    if (recipe) {
      row.innerHTML = '<th>' + day + '</th>' +
        '<td>' +
        '<div class="row">' +
        '<div><strong>' + recipe.name + '</strong>' +
        '<span class="pill">' + recipe.time + ' min</span></div>' +
        '<button class="ghost removeBtn" data-day="' + day + '">✕</button>' +
        '</div>' +
        '</td>';
    } else {
      row.innerHTML = '<th>' + day + '</th>' +
        '<td><span class="muted">No meal planned</span></td>';
    }
    
    tbody.appendChild(row);
  }
  
  const removeButtons = document.querySelectorAll('.removeBtn');
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].onclick = function() {
      const day = this.getAttribute('data-day');
      const plan = localStorage.getItem('weeklyPlan');
      let planObj = {};
      if (plan) {
        planObj = JSON.parse(plan);
      }
      delete planObj[day];
      localStorage.setItem('weeklyPlan', JSON.stringify(planObj));
      displayWeeklyPlan();
    };
  }
}

// Function to display favorite recipes
function displayFavorites() {
  const container = document.getElementById('favs');
  const favorites = localStorage.getItem('favorites');
  let favArray = [];
  if (favorites) {
    favArray = JSON.parse(favorites);
  }
  
  if (favArray.length === 0) {
    container.innerHTML = '<div class="muted">No favorite recipes yet. Click the star on a recipe to add it!</div>';
    return;
  }
  
  container.innerHTML = '';
  
  for (let i = 0; i < favArray.length; i++) {
    const recipeId = favArray[i];
    let recipe = null;
    for (let j = 0; j < recipes.length; j++) {
      if (recipes[j].recipeId === recipeId) {
        recipe = recipes[j];
      }
    }
    
    if (recipe) {
      const div = document.createElement('div');
      div.style.padding = '8px 0';
      div.style.borderBottom = '1px solid #e5e7eb';
      div.innerHTML = '<div class="row">' +
        '<div><strong>' + recipe.name + '</strong>' +
        '<span class="muted" style="margin-left: 8px;">' + recipe.time + ' min</span></div>' +
        '<button class="ghost unfavBtn" data-recipe-id="' + recipe.recipeId + '">✕</button>' +
        '</div>';
      container.appendChild(div);
    }
  }
  
  const unfavButtons = document.querySelectorAll('.unfavBtn');
  for (let i = 0; i < unfavButtons.length; i++) {
    unfavButtons[i].onclick = function() {
      const recipeId = parseInt(this.getAttribute('data-recipe-id'));
      const favorites = localStorage.getItem('favorites');
      let favArray = [];
      if (favorites) {
        favArray = JSON.parse(favorites);
      }
      for (let j = 0; j < favArray.length; j++) {
        if (favArray[j] === recipeId) {
          favArray.splice(j, 1);
        }
      }
      localStorage.setItem('favorites', JSON.stringify(favArray));
      displayRecipes();
      displayFavorites();
    };
  }
}

// Function to clear all saved data
function clearData() {
  localStorage.removeItem('favorites');
  localStorage.removeItem('weeklyPlan');
  displayRecipes();
  displayWeeklyPlan();
  displayFavorites();
}

// Event listeners — search only when Enter or Search button pressed
document.getElementById('q').onkeydown = function(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
};

document.getElementById('searchBtn').onclick = function() {
  performSearch();
};

document.getElementById('filter').onchange = displayRecipes;
document.getElementById('clearData').onclick = clearData;

// Initial display
displayRecipes();
displayWeeklyPlan();
displayFavorites();