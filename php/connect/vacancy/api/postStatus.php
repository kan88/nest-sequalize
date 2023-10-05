<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $is_approve = isset($_POST['is_approve']) ? $_POST['is_approve'] : null;
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  $reason_reject = isset($_POST['reason_reject']) ? $_POST['reason_reject'] : null;

  $statement = $pdo->prepare('UPDATE vacancy_participants SET reason_reject=:reason_reject, is_approve=:is_approve WHERE id=:id');
  $statement->execute([
    'id' => $id,
    'is_approve' => $is_approve,
    'reason_reject' => $reason_reject,
  ]);
  $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE id=$id");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
