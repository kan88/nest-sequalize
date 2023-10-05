<?php

try {
  require '../../connect.php';
  $notification_author = $_POST['id'];
  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (account_number LIKE '%$notification_author%' AND status is null) ORDER BY id DESC");
  $statement->execute();
  $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
  $mychats = [];
  for ($i = 0; $i < count($rows); $i++) {
    $id = $rows[$i]["chats_id"];

    $statement = $pdo->prepare("SELECT * FROM notification_chats WHERE (id=$id AND status is null)");
    $statement->execute();
    $chat = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE chats_id=$id ORDER BY date_time DESC LIMIT 1");
    $statement->execute();
    $messages = $statement->fetchAll(PDO::FETCH_ASSOC);

    $chat += ['messages' => $messages];

    $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (chats_id=$id AND status is NULL)");
    $statement->execute();
    $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
    $chat += ['participants' => $participants];

    $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE (account_number NOT LIKE '%$notification_author%' AND chats_id=$id AND date_time > (SELECT last_visit FROM notification_participants WHERE (chats_id=$id AND status is NULL AND account_number LIKE '%$notification_author%') LIMIT 1))");
    $statement->execute();
    $quality = $statement->fetchAll(PDO::FETCH_ASSOC);
    $chat += ['quality' => $quality];

    array_push($mychats, $chat);
    // $mychats += [$id => $chat];
  };
  $json = json_encode($mychats);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
