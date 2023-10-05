<?php
//поиск по руководителю

try {
  require '../../connect.php';
  $cn = $_POST['cn'];
  $statement = $pdo->prepare("SELECT * FROM users WHERE (cn LIKE '%$cn%')");
  $statement->execute();
  $users = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($users);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
