<?php
try {
  require '../../connect.php';
  $notification_theme = isset($_POST['notification_theme']) ? $_POST['notification_theme'] : null;
  $participants = isset($_POST['participants']) ? $_POST['participants'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $status = isset($_POST['status']) ? $_POST['status'] : null;
  $notification_author = isset($_POST['notification_author']) ? $_POST['notification_author'] : null;
  $notification_fullname = isset($_POST['notification_fullname']) ? $_POST['notification_fullname'] : null;
  date_default_timezone_set('UTC');
  $date = date("Y-m-d H:i:s");


  $statement = $pdo->prepare('INSERT INTO notification_chats (notification_theme, notification_author, notification_fullname, last_message) VALUES
  (:notification_theme, :notification_author, :notification_fullname, :last_message)');
  $statement->execute([
    'notification_theme' => $notification_theme,
    'notification_author' => $notification_author,
    'notification_fullname' => $notification_fullname,
    'last_message' => $date
  ]);
  $chats_id = $pdo->lastInsertId();


  $statement = $pdo->prepare('INSERT INTO notification_participants (chats_id, account_number, full_name) VALUES
  (:chats_id, :account_number, :full_name)');
  $statement->execute([
    'chats_id' => $chats_id,
    'account_number' => $notification_author,
    'full_name' => $notification_fullname,
  ]);


  if ($account_number != null) {
    for ($i = 0; $i < count($account_number); $i++) {
      if (!empty($account_number[$i])) {
        $statement = $pdo->prepare("SELECT count(*) FROM notification_participants WHERE (chats_id=$chats_id AND account_number ILIKE '$account_number[$i]')");
        $statement->execute();
        $count = $statement->fetchAll(PDO::FETCH_ASSOC);
        $participantCount = $count[0]['count'];
        if ($participantCount == 0) {
          $statement = $pdo->prepare('INSERT INTO notification_participants (chats_id, account_number, full_name) VALUES
          (:chats_id, :account_number, :full_name)');
          $statement->execute([
            'chats_id' => $chats_id,
            'account_number' => $account_number[$i],
            'full_name' => $participants[$i],
          ]);
        }
      }
    }
  }


  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE account_number LIKE '%$notification_author%'");
  $statement->execute();
  $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
  $mychats = [];
  for ($i = 0; $i < count($rows); $i++) {
    $id = $rows[$i]["chats_id"];

    $statement = $pdo->prepare("SELECT * FROM notification_chats WHERE id=$id");
    $statement->execute();
    $chat = $statement->fetchAll(PDO::FETCH_ASSOC);

    $statement = $pdo->prepare("SELECT * FROM notification_messages WHERE chats_id=$id");
    $statement->execute();
    $messages = $statement->fetchAll(PDO::FETCH_ASSOC);

    $chat += ['messages' => $messages];

    $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE chats_id=$id");
    $statement->execute();
    $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
    $chat += ['participants' => $participants];

    $mychats += [$id => $chat];
  };
  $json = json_encode($mychats);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
