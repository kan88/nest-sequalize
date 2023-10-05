<?php
try {
  require '../../connect.php';
  $role = isset($_POST['role']) ? $_POST['role'] : null;
  $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $is_view = isset($_POST['is_view']) ? $_POST['is_view'] : null;
  $id_request = isset($_POST['id_request']) ? $_POST['id_request'] : null;
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  $reason_reject = isset($_POST['reason_reject']) ? $_POST['reason_reject'] : null;
  $is_interview = isset($_POST['is_interview']) ? $_POST['is_interview'] : null;
  $is_approve = isset($_POST['is_approve']) ? $_POST['is_approve'] : null;
  $position = isset($_POST['position']) ? $_POST['position'] : null;
  $avatar_src = isset($_POST['avatar_src']) ? $_POST['avatar_src'] : null;

  if ($role != null) {
    for ($i = 0; $i < count($role); $i++) {
      if ($i == 0) {
        $statement = $pdo->prepare('UPDATE vacancy_participants SET role=:role, is_view=:is_view, is_interview=:is_interview,
        is_approve=:is_approve WHERE id=:id');
        $statement->execute([
          'id' => $id,
          'role' => $role[$i],
          'is_view' => $is_view[$i],
          'is_interview' => $is_interview[$i],
          'is_approve' => $is_approve[$i],
        ]);
      } else {
        $statement = $pdo->prepare('INSERT INTO vacancy_participants (id_request, role, full_name, account_number, is_view,
        is_interview, is_approve, avatar_src, position) VALUES
        (:id_request, :role, :full_name, :account_number, :is_view, :is_interview, :is_approve, :avatar_src, :position)');
        $statement->execute([
          'id_request' => $id_request,
          'role' => $role[$i],
          'full_name' => $full_name[$i - 1],
          'account_number' => $account_number[$i - 1],
          'is_view' => $is_view[$i],
          'is_interview' => $is_interview[$i],
          'is_approve' => $is_approve[$i],
          'position' => $position[$i - 1],
          'avatar_src' => $avatar_src[$i - 1],
        ]);
      }
    }
  }
  $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE id=$id_request");
  $statement->execute();
  $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
  for ($i = 0; $i < count($requests); $i++) {
    $id = $requests[$i]["id"];
    $statement = $pdo->prepare("SELECT * FROM vacancy_addresses WHERE id_request=$id");
    $statement->execute();
    $adresses = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['addresses' => $adresses];
    $statement = $pdo->prepare("SELECT * FROM vacancy_schedule WHERE id_request=$id");
    $statement->execute();
    $schedules = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['schedules' => $schedules];
    $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE id_request=$id");
    $statement->execute();
    $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['participants' => $participants];
  };
  $json = json_encode($requests);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
