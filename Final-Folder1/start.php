<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <style>
    body {
      margin:0;background:#f3f4ff;
      display:flex;align-items:center;justify-content:center;
      min-height:100vh;
      font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }
    .start-card {
      background:#fff;border-radius:22px;
      padding:2rem 2.5rem;max-width:420px;width:100%;
      text-align:center;box-shadow:0 18px 45px rgba(15,23,42,.16);
    }
    .start-buttons {display:flex;flex-direction:column;gap:.75rem;margin-top:1.5rem;}
    .btn {border-radius:999px;border:none;padding:.7rem 1.2rem;cursor:pointer;font-weight:600;}
    .btn.primary {background:#4f46e5;color:#fff;}
    .btn.secondary {background:#e5e7eb;color:#111827;}
    .btn.primary:hover {filter:brightness(1.05);}
    .btn.secondary:hover {filter:brightness(0.97);}
  </style>
</head>
<body>
  <div class="start-card">
    <h1>Recipe Finder &amp; Meal Planner</h1>
    <p>Search recipes, plan your week, and build an ingredient cart. Save everything if you log in.</p>
    <div class="start-buttons">
      <a href="login.php" class="btn primary" style="text-decoration:none;display:block;">Log in / Register</a>
      <a href="home.php?guest=1" class="btn secondary" style="text-decoration:none;display:block;">Continue as guest</a>
    </div>
  </div>
</body>
</html>
