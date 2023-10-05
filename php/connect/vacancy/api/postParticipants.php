<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';

  $status = isset($_POST['status']) ? $_POST['status'] : null;
  $role = isset($_POST['role']) ? $_POST['role'] : null;
  $reason_reject = isset($_POST['reason_reject']) ? $_POST['reason_reject'] : null;
  $id_request = isset($_POST['id_request']) ? $_POST['id_request'] : null;
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $is_view = isset($_POST['is_view']) ? $_POST['is_view'] : null;
  $is_interview = isset($_POST['is_interview']) ? $_POST['is_interview'] : null;
  $is_approve = isset($_POST['is_approve']) ? $_POST['is_approve'] : null;
  $position = isset($_POST['position']) ? $_POST['position'] : null;
  $avatar_src = isset($_POST['avatar_src']) ? $_POST['avatar_src'] : null;

  for ($i = 0; $i < count($id); $i++) {
    if (empty($id[$i])) {
      $statement = $pdo->prepare('INSERT INTO vacancy_participants (id_request, role, full_name, account_number, is_view,
      is_interview, is_approve, avatar_src, position, status, reason_reject) VALUES
      (:id_request, :role, :full_name, :account_number, :is_view, :is_interview, :is_approve, :avatar_src, :position, :status, :reason_reject)');
      $statement->execute([
        'id_request' => $id_request[$i],
        'role' => $role[$i],
        'full_name' => $full_name[$i],
        'account_number' => $account_number[$i],
        'is_view' => $is_view[$i],
        'is_interview' => $is_interview[$i],
        'is_approve' => $is_approve[$i],
        'position' => $position[$i],
        'avatar_src' => $avatar_src[$i],
        'reason_reject' => $reason_reject[$i],
        'status' => 0,
      ]);
    } else {
      $statement = $pdo->prepare('UPDATE vacancy_participants SET role=:role, is_view=:is_view, is_interview=:is_interview,
      is_approve=:is_approve, id_request=:id_request, full_name=:full_name, account_number=:account_number, position=:position, avatar_src=:avatar_src, reason_reject=:reason_reject, status=:status WHERE id=:id');
      $statement->execute([
        'id_request' => $id_request[$i],
        'role' => $role[$i],
        'full_name' => $full_name[$i],
        'account_number' => $account_number[$i],
        'is_view' => $is_view[$i],
        'is_interview' => $is_interview[$i],
        'is_approve' => $is_approve[$i],
        'position' => $position[$i],
        'avatar_src' => $avatar_src[$i],
        'reason_reject' => $reason_reject[$i],
        'status' => $status[$i],
        'id' => $id[$i]
      ]);
    }
  }
  $id = $id_request[0];
  $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE status=0 AND id_request=$id");
  $statement->execute();
  $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($participants);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
