<?php
try {
  require '../../connect.php';
  $status = empty($_POST['status']) ? null : intval($_POST['status']);
  $id = intval($_POST['id']);

  $statement = $pdo->prepare('UPDATE review_table SET status=:status, review_admin=:review_admin WHERE review_id=:review_id');
  $statement->execute([
    'review_id' => $id,
    'status' => $status,
    'review_admin' => "{$_POST['review_admin']}",
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
