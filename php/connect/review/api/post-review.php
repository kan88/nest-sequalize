<?php
try {
  require '../../connect.php';
  $date = date("Y-m-d H:i:s");

  $statement = $pdo->prepare('INSERT INTO review_table (full_name, review_title, review_body, account_number, date) VALUES (:full_name, :review_title, :review_body, :account_number, :date)');
  $statement->execute([
    'full_name' => "{$_POST['full_name']}",
    'review_title' => "{$_POST['review_title']}",
    'review_body' => "{$_POST['review_body']}",
    'account_number' => "{$_POST['account_number']}",
    'date' => $date,
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
