<?php

try {
  require '../../connect.php';
  $administrator_status = intval($_POST['administrator_status']);
  $administrator_id = intval($_POST['administrator_id']);
  $administrator_cn = $_POST['administrator_cn'];
  $status;

  if (isset($_POST['administrator_reject'])) {
    $status = $administrator_cn . '. Отклонено по причине: ' . $_POST['administrator_reject'];
    $statement = $pdo->prepare("UPDATE administrator_roles SET administrator_status=$administrator_status, administrator_reject='$status' WHERE administrator_id=$administrator_id");
    $statement->execute();
  } else {
    $status = $administrator_cn . '. Согласовано';

    $statement = $pdo->prepare("UPDATE administrator_roles SET administrator_status=$administrator_status, administrator_reject='$status' WHERE administrator_id=$administrator_id");
    $statement->execute();
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
