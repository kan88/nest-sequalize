<?php

try {
  require '../../connect.php';
  $account_number = $_POST['account_number'];
  $statement = $pdo->prepare("SELECT * FROM service_alert WHERE (account_number LIKE '$account_number' OR alert_type=1) ORDER BY alert_date DESC");
  $statement->execute();
  $alerts = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($alerts);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
