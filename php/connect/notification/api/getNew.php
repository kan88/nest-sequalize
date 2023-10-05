<?php

try {
  require '../../connect.php';
  $notification_author = $_POST['account_number'];
  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (account_number LIKE '$notification_author' AND status is null)");
  $statement->execute();
  $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
  $mychats = [];
  for ($i = 0; $i < count($rows); $i++) {
    $id = $rows[$i]["chats_id"];
    $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE (account_number NOT LIKE '$notification_author' AND chats_id=$id AND date_time > (SELECT last_visit FROM notification_participants WHERE (chats_id=$id AND status is NULL AND account_number LIKE '$notification_author') LIMIT 1))");
    $statement->execute();
    $quality = $statement->fetchAll(PDO::FETCH_ASSOC);
    $mychats += $quality;
  };
  $json = json_encode($mychats);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
