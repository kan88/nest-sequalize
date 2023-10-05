<?php
//поиск
try {
  require '../../connect.php';
  $auth = $_SERVER['AD_USER'];
  $statement = $pdo->prepare("SELECT * FROM users WHERE samaccountname LIKE '$auth'");
  $statement->execute();
  $users = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($users);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
