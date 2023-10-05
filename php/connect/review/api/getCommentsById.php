<?php

try {
  require '../../connect.php';
  $idRequest = $_POST['id'];
  $statement = $pdo->prepare("SELECT * FROM review_comments WHERE review_id=$idRequest");
  $statement->execute();
  $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($requests);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
