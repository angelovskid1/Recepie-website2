<?php
require_once 'config.php';

$isLoggedIn = isset($_SESSION['user_id']);
$isGuest = !$isLoggedIn && (isset($_GET['guest']) || ($_SESSION['guest'] ?? false));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Recipe Finder & Meal Planner</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <script defer src="assets/js/main.js"></script>
</head>
<body>
<?php include 'partials/nav.php'; ?>

<header class="hero">
  <div class="hero-content">
    <h1>Recipe Finder &amp; Meal Planner</h1>
    <p>Search, filter by culture/diet, save favorites, and build an ingredient cart.</p>
    <?php if ($isGuest): ?>
      <p class="guest-banner">You’re browsing as a guest. Log in to sync favorites and your ingredient cart across devices.</p>
    <?php endif; ?>
    <div class="row" id="search">
      <input id="q" type="text"
             placeholder="Search by name or ingredient (e.g., 'chicken', 'garlic')" />
      <select id="cultureFilter">
        <option value="">Any culture</option>
        <option value="italian">Italian</option>
        <option value="mexican">Mexican</option>
        <option value="asian">Asian</option>
        <option value="american">American</option>
      </select>
      <select id="dietFilter">
        <option value="">Any diet</option>
        <option value="vegan">Vegan</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="gluten free">Gluten Free</option>
      </select>
      <button id="searchBtn" class="primary">Search</button>
      <button id="clearData" class="clear" title="Clear saved plan &amp; favorites">
        Clear Saved Data
      </button>
    </div>
  </div>
</header>

<main>
  <section class="section">
    <h2>🔍 Results</h2>
    <div id="results" class="grid"></div>
  </section>

  <section class="section">
    <div class="row">
      <h2>📅 Weekly Meal Plan</h2>
      <button id="savePlanBtn" class="primary">Save Weekly Plan</button>
    </div>
    <div id="weekGrid" class="week-grid">
    </div>
    <div class="hint">
      Tip: On each recipe card, pick a day to add it to the plan.
    </div>
  </section>

  <section class="section">
    <h2>⭐ Favorite Recipes</h2>
    <div id="favs" class="pad"></div>
  </section>

  <section class="section">
    <h2>🧺 Ingredient Cart</h2>
    <p>View and manage your ingredient list on a dedicated page.</p>
    <a href="ingredients_cart.php<?php echo $isGuest ? '?guest=1' : ''; ?>" class="primary">
      Go to Ingredient Cart
    </a>
  </section>
</main>

<script>
  window.APP_STATE = {
    isLoggedIn: <?php echo $isLoggedIn ? 'true' : 'false'; ?>,
    isGuest: <?php echo $isGuest ? 'true' : 'false'; ?>,
    importOnLoad: <?php echo $isLoggedIn ? 'true' : 'false'; ?>
  };
</script>

</body>
</html>
