<?php

try {
  require '../../connect.php';
  $administrator_samaccountname = $_POST['administrator_samaccountname'];
  $administrator_service = intval($_POST['administrator_service']);

  $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_samaccountname ILIKE '$administrator_samaccountname' AND (administrator_date_end > CURRENT_DATE or administrator_date_end is null) AND administrator_status=1 AND (administrator_service=$administrator_service OR administrator_service=0)) ");
  $statement->execute();
  $roles = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($roles);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
