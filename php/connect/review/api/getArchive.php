<?php

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM review_table WHERE (status=2 or status=3 or status=4)");
  $statement->execute();
  $results = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($results);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
