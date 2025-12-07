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

foreach ($data as $ing) {
    $name = $ing['name'] ?? '';
    if ($name === '') continue;

    $stmt = $pdo->prepare("
      INSERT INTO ingredient_cart (user_id, ingredient_name)
      VALUES (:uid, :name)
    ");
    $stmt->execute([
        ':uid'  => $userId,
        ':name' => $name
    ]);
}

echo 'ok';
