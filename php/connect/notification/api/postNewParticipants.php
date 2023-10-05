<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $participants = isset($_POST['participants']) ? $_POST['participants'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $status = isset($_POST['status']) ? $_POST['status'] : null;
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  date_default_timezone_set('UTC');
  $date = date("Y-m-d H:i:s", strtotime("-1 year"));

  for ($i = 0; $i < count($account_number); $i++) {
    if (!empty($account_number[$i])) {
      $statement = $pdo->prepare("SELECT count(*) FROM notification_participants WHERE (chats_id=$id AND account_number ILIKE '$account_number[$i]')");
      $statement->execute();
      $count = $statement->fetchAll(PDO::FETCH_ASSOC);
      $participantCount = $count[0]['count'];
      if ($participantCount == 0) {
        $statement = $pdo->prepare('INSERT INTO notification_participants (chats_id, account_number, full_name, last_visit) VALUES
        (:chats_id, :account_number, :full_name, :last_visit)');
        $statement->execute([
          'chats_id' => $id,
          'account_number' => $account_number[$i],
          'full_name' => $participants[$i],
          'last_visit' => $date
        ]);
      }
    }
  }

  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (chats_id=$id AND status is null)");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
