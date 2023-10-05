<?php

try {
  require '../../connect.php';
  $search = $_POST['search'];

  $statement = $pdo->prepare("SELECT DISTINCT title FROM users WHERE title LIKE '$search%'");
  $statement->execute();
  $data = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($data);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
