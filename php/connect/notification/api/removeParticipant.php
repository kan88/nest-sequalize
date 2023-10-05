<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $id = $_POST['id'];
  $chatsId = $_POST['chats_id'];
  $status = 1;
  $statement = $pdo->prepare('UPDATE notification_participants SET status=:status WHERE id=:id');
  $statement->execute([
    'id' => $id,
    'status' => $status,
  ]);
  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (chats_id=$chatsId and status is null)");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
