<?php

try {
  require '../../connect.php';
  $id = $_POST['id'];
  $statement = $pdo->prepare("SELECT * FROM notification_participants WHERE (chats_id=$id AND status is null)");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
