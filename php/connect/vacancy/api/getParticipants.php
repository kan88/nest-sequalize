<?php

try {
  require '../../connect.php';
  $id = $_POST["id_request"];
  $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE status=0 AND id_request=$id");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
