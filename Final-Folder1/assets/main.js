// assets/js/main.js
// NOTE: Replace API_BASE with a real recipe API endpoint.
const API_BASE = "https://example-recipe-api.com/search";

const searchInput   = document.getElementById("q");
const searchBtn     = document.getElementById("searchBtn");
const clearDataBtn  = document.getElementById("clearData");
const cultureSelect = document.getElementById("cultureFilter");
const dietSelect    = document.getElementById("dietFilter");

const resultsDiv    = document.getElementById("results");
const favsDiv       = document.getElementById("favs");
const weekGridDiv   = document.getElementById("weekGrid");
const savePlanBtn   = document.getElementById("savePlanBtn");

let favorites = [];
let weeklyPlan = {};
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function loadLocal() {
  try {
    const f = JSON.parse(localStorage.getItem("favorites") || "[]");
    const w = JSON.parse(localStorage.getItem("weeklyPlan") || "{}");
    favorites = Array.isArray(f) ? f : [];
    weeklyPlan = typeof w === "object" && w !== null ? w : {};
  } catch {
    favorites = [];
    weeklyPlan = {};
  }
}

function saveLocal() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  localStorage.setItem("weeklyPlan", JSON.stringify(weeklyPlan));
}

function clearLocal() {
  localStorage.removeItem("favorites");
  localStorage.removeItem("weeklyPlan");
  favorites = [];
  weeklyPlan = {};
  renderFavorites();
  renderWeek();
}

function renderResults(recipes) {
  if (!resultsDiv) return;
  resultsDiv.innerHTML = "";
  if (!recipes || recipes.length === 0) {
    resultsDiv.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = recipe.image || "images/burger.jpg";
    img.alt = recipe.title || "Recipe";

    const pad = document.createElement("div");
    pad.className = "pad";

    const title = document.createElement("h3");
    title.textContent = recipe.title || "Untitled recipe";

    const info = document.createElement("p");
    info.className = "muted";
    info.textContent = recipe.readyInMinutes
      ? `${recipe.readyInMinutes} min • ${recipe.servings || 2} servings`
      : "Prep time available in details";

    const row = document.createElement("div");
    row.className = "row";
    const left = document.createElement("div");
    const right = document.createElement("div");

    const cultureTag = document.createElement("span");
    cultureTag.className = "tag";
    cultureTag.textContent = recipe.cuisine || "Any culture";

    const dietTag = document.createElement("span");
    dietTag.className = "tag alt";
    dietTag.textContent = recipe.diet || "Any diet";

    left.appendChild(cultureTag);
    left.appendChild(dietTag);

    const favBtn = document.createElement("button");
    favBtn.className = "ghost";
    favBtn.textContent = "⭐ Favorite";
    favBtn.onclick = () => { addFavorite(recipe); };

    const cartBtn = document.createElement("button");
    cartBtn.className = "primary";
    cartBtn.textContent = "Add ingredients to cart";
    cartBtn.onclick = () => { addIngredientsToCart(recipe); };

    const daySelect = document.createElement("select");
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "Add to day…";
    daySelect.appendChild(defaultOpt);

    days.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      daySelect.appendChild(opt);
    });

    daySelect.onchange = () => {
      if (!daySelect.value) return;
      weeklyPlan[daySelect.value] = recipe;
      saveLocal();
      renderWeek();
      daySelect.value = "";
    };

    right.appendChild(favBtn);
    right.appendChild(cartBtn);
    right.appendChild(daySelect);
    row.appendChild(left);
    row.appendChild(right);

    pad.appendChild(title);
    pad.appendChild(info);
    pad.appendChild(row);

    card.appendChild(img);
    card.appendChild(pad);

    resultsDiv.appendChild(card);
  });
}

function renderFavorites() {
  if (!favsDiv) return;
  favsDiv.innerHTML = "";
  if (!favorites.length) {
    favsDiv.innerHTML = "<p>You have no favorites yet.</p>";
    return;
  }

  favorites.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.className = "fav-item";
    div.textContent = recipe.title || "Favorite recipe";

    const removeBtn = document.createElement("button");
    removeBtn.className = "ghost";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      favorites.splice(index, 1);
      saveLocal();
      renderFavorites();
    };

    div.appendChild(removeBtn);
    favsDiv.appendChild(div);
  });
}

function renderWeek() {
  if (!weekGridDiv) return;
  weekGridDiv.innerHTML = "";
  days.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "week-cell";

    const title = document.createElement("h4");
    title.textContent = day;

    cell.appendChild(title);

    const recipe = weeklyPlan[day];
    if (recipe) {
      const p = document.createElement("p");
      p.textContent = recipe.title || "Recipe";
      cell.appendChild(p);

      const clearBtn = document.createElement("button");
      clearBtn.className = "ghost";
      clearBtn.textContent = "Clear";
      clearBtn.onclick = () => {
        delete weeklyPlan[day];
        saveLocal();
        renderWeek();
      };
      cell.appendChild(clearBtn);
    } else {
      const p = document.createElement("p");
      p.className = "muted";
      p.textContent = "No recipe chosen yet.";
      cell.appendChild(p);
    }

    weekGridDiv.appendChild(cell);
  });
}

function addFavorite(recipe) {
  const id = recipe.id || recipe.recipeId;
  if (id && favorites.some(r => (r.id || r.recipeId) === id)) return;
  favorites.push({
    id: id,
    title: recipe.title,
    image: recipe.image
  });
  saveLocal();
  renderFavorites();

  if (window.APP_STATE && window.APP_STATE.isLoggedIn) {
    fetch("import_favorites.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify([favorites[favorites.length - 1]])
    });
  }
}

function addIngredientsToCart(recipe) {
  const ingredients = recipe.extendedIngredients || recipe.ingredients || [];
  const payload = ingredients.map(i =>
    typeof i === "string" ? { name: i } : { name: i.name || "" }
  ).filter(i => i.name);

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("ingredient_cart") || "[]");
  } catch {
    cart = [];
  }
  cart = cart.concat(payload);
  localStorage.setItem("ingredient_cart", JSON.stringify(cart));

  if (window.APP_STATE && window.APP_STATE.isLoggedIn) {
    fetch("import_cart.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
  }

  alert("Ingredients added to cart!");
}

async function handleSearch() {
  if (!resultsDiv) return;
  const q = (searchInput && searchInput.value.trim()) || "";
  const culture = (cultureSelect && cultureSelect.value) || "";
  const diet = (dietSelect && dietSelect.value) || "";

  if (!q) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const params = new URLSearchParams();
  params.set("query", q);
  if (culture) params.set("cuisine", culture);
  if (diet) params.set("diet", diet);

  resultsDiv.innerHTML = "<p>Loading recipes...</p>";

  try {
    const res = await fetch(`${API_BASE}?${params.toString()}`);
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    const recipes = json.results || json.meals || [];
    renderResults(recipes);
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>There was a problem loading recipes.</p>";
  }
}

function importLocalToServer() {
  if (!window.APP_STATE || !window.APP_STATE.isLoggedIn) return;

  if (favorites.length) {
    fetch("import_favorites.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(favorites)
    });
  }

  try {
    const rawCart = JSON.parse(localStorage.getItem("ingredient_cart") || "[]");
    if (rawCart.length) {
      fetch("import_cart.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(rawCart)
      });
    }
  } catch {}
}

if (searchBtn) {
  searchBtn.addEventListener("click", handleSearch);
}
if (searchInput) {
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
  });
}
if (clearDataBtn) {
  clearDataBtn.addEventListener("click", () => {
    if (confirm("Clear saved favorites and weekly plan?")) {
      clearLocal();
    }
  });
}
if (savePlanBtn) {
  savePlanBtn.addEventListener("click", () => {
    saveLocal();
    alert("Weekly plan saved!");
  });
}

loadLocal();
renderFavorites();
renderWeek();
importLocalToServer();
