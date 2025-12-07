<?php
require_once 'config.php';
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
$userId = (int) $_SESSION['user_id'];

$favCount = $pdo->query("SELECT COUNT(*) AS c FROM saved_recipes WHERE user_id = $userId")
                ->fetch()['c'] ?? 0;
$cartCount = $pdo->query("SELECT COUNT(*) AS c FROM ingredient_cart WHERE user_id = $userId")
                 ->fetch()['c'] ?? 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Profile</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<?php include 'partials/nav.php'; ?>
<main class="section">
  <h1>Profile</h1>
  <p><strong>Username:</strong> <?php echo htmlspecialchars($_SESSION['username']); ?></p>
  <p><strong>Saved recipes:</strong> <?php echo (int)$favCount; ?></p>
  <p><strong>Ingredients in cart:</strong> <?php echo (int)$cartCount; ?></p>
</main>
</body>
</html>
