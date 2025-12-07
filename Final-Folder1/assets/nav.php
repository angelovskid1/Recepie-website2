<?php
$isLoggedIn = isset($_SESSION['user_id']);
$isGuest = !$isLoggedIn && (isset($_GET['guest']) || ($_SESSION['guest'] ?? false));
if (isset($_GET['guest'])) {
    $_SESSION['guest'] = true;
}
?>
<nav class="main-nav">
  <div class="nav-left">
    <a href="home.php<?php echo $isGuest ? '?guest=1' : ''; ?>" class="logo">Recipe Finder</a>
  </div>
  <ul class="nav-links">
    <li><a href="home.php<?php echo $isGuest ? '?guest=1' : ''; ?>">Home</a></li>
    <li><a href="home.php<?php echo $isGuest ? '?guest=1#search' : '#search'; ?>">Search</a></li>
    <li><a href="ingredients_cart.php<?php echo $isGuest ? '?guest=1' : ''; ?>">Ingredient Cart</a></li>
    <?php if ($isLoggedIn): ?>
      <li><a href="profile.php">Profile</a></li>
      <li><a href="logout.php">Logout (<?php echo htmlspecialchars($_SESSION['username']); ?>)</a></li>
    <?php else: ?>
      <li><a href="login.php">Login</a></li>
    <?php endif; ?>
  </ul>
</nav>
