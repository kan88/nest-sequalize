<?php

try {
  require '../../connect.php';
  $idRequest = $_POST['id_request'];
  $statement = $pdo->prepare("SELECT * FROM vacancy_chat WHERE id_request=$idRequest");
  $statement->execute();
  $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($requests);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
