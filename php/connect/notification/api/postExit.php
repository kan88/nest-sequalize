<?php
try {
  require '../../connect.php';
  $id = intval($_POST['id']);
  $status = 1;
  $account_number = $_POST['account_number'];
  $statement = $pdo->prepare("UPDATE notification_participants SET status=1 WHERE (chats_id=$id AND account_number LIKE '%$account_number%'  AND status is null) LIMIT 1");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
