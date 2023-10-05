<?php

try {
  require '../../connect.php';
  $account_number = $_POST['account_number'];
  $statement = $pdo->prepare('UPDATE service_alert SET alert_is_view=:alert_is_view WHERE account_number=:account_number');
  $statement->execute([
    'account_number' => $account_number,
    'alert_is_view' => 1,
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
