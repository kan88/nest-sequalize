<?php
try {
  require '../../connect.php';
  $_POST['comments'] = str_replace("\n", "<BR>", $_POST['comments']);

  $data = [
    'comments' => "{$_POST['comments']}",
    'reject' => "{$_POST['reject']}",
    'id' => "{$_POST['id']}",
  ];
  $sql = "UPDATE weekend SET comments=:comments, reject=:reject WHERE id=:id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
