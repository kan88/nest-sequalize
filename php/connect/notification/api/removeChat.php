<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $chatsId = $_POST['chats_id'];
  $status = 1;
  $statement = $pdo->prepare('UPDATE notification_chats SET status=:status WHERE id=:id');
  $statement->execute([
    'id' => $chatsId,
    'status' => $status,
  ]);

  $statement = $pdo->prepare('UPDATE notification_participants SET status=:status WHERE chats_id=:chats_id');
  $statement->execute([
    'chats_id' => $chatsId,
    'status' => $status,
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
