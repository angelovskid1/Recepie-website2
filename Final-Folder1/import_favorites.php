<?php
require_once 'config.php';
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit('Not logged in');
}
$userId = (int) $_SESSION['user_id'];

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    exit('no data');
}

foreach ($data as $fav) {
    $apiId = $fav['id'] ?? ($fav['recipeId'] ?? '');
    $title = $fav['title'] ?? '';
    $img   = $fav['image'] ?? '';
    if ($apiId === '' || $title === '') continue;

    $stmt = $pdo->prepare("
      INSERT INTO saved_recipes (user_id, recipe_api_id, title, image_url)
      VALUES (:uid, :rid, :title, :img)
      ON DUPLICATE KEY UPDATE title = VALUES(title), image_url = VALUES(image_url)
    ");
    $stmt->execute([
        ':uid'   => $userId,
        ':rid'   => $apiId,
        ':title' => $title,
        ':img'   => $img
    ]);
}

echo 'ok';
