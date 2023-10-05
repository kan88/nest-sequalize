<?php

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM notification_chats");
  $statement->execute();
  $chats = $statement->fetchAll(PDO::FETCH_ASSOC);
  for ($i = 0; $i < count($chats); $i++) {
    $id = $chats[$i]["id"];
    $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE chats_id=$id");
    $statement->execute();
    $messages = $statement->fetchAll(PDO::FETCH_ASSOC);
    $chats[$i] += ['messages' => $messages];
    $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE chats_id=$id");
    $statement->execute();
    $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
    $chats[$i] += ['participants' => $participants];
  };
  $json = json_encode($chats);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
