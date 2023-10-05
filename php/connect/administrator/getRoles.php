<?php

try {
  require '../../connect.php';
  $administrator_samaccountname = $_POST['administrator_samaccountname'];
  $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_samaccountname ILIKE '$administrator_samaccountname' AND (administrator_date_end > CURRENT_DATE or administrator_date_end is null) AND administrator_status=1) ");
  $statement->execute();
  $roles = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($roles);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
