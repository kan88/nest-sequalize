<?php

try {
  require '../../connect.php';
  $id = $_POST['id'];
  $account_number = $_POST['account_number'];
  date_default_timezone_set('UTC');
  $date = date("Y-m-d H:i:s");
  $statement = $pdo->prepare('UPDATE notification_participants SET last_visit=:last_visit WHERE (chats_id=:chats_id AND account_number=:account_number)');
  $statement->execute([
    'chats_id' => $id,
    'last_visit' => $date,
    'account_number' => $account_number
  ]);
  $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE chats_id=$id ORDER BY date_time");
  $statement->execute();
  $messages = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($messages);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
