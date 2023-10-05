<?php
//подключаемся к базе данных, получаем все новости и отдаем на стороне сервера

try {
  require '../../connect.php';
  $account_number = $_POST['account_number'];
  $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE (status=0 AND account_number ILIKE '$account_number')");
  $statement->execute();
  $participantsList = $statement->fetchAll(PDO::FETCH_ASSOC);
  $myRequests = [];
  for ($i = 0; $i < count($participantsList); $i++) {
    $id = $participantsList[$i]["id_request"];
    $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE ((status=4 or (status=1 AND date_close < CURRENT_DATE)) AND id=$id )");
    $statement->execute();
    $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
    $amount = $statement->rowCount();
    if ($amount == 1) {
      $statement = $pdo->prepare("SELECT * FROM vacancy_addresses WHERE id_request=$id");
      $statement->execute();
      $adresses = $statement->fetchAll(PDO::FETCH_ASSOC);
      $requests[0] += ['addresses' => $adresses];
      $statement = $pdo->prepare("SELECT * FROM vacancy_schedule WHERE id_request=$id");
      $statement->execute();
      $schedules = $statement->fetchAll(PDO::FETCH_ASSOC);
      $requests[0] += ['schedules' => $schedules];
      $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE id_request=$id");
      $statement->execute();
      $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
      $requests[0] += ['participants' => $participants];
      array_push($myRequests, $requests[0]);
    }
  };
  $data = [];
  $data += ['requests' => $myRequests];
  $statement = $pdo->prepare("SELECT count(*) FROM vacancy_requests WHERE id_request=$id");
  $statement->execute();
  $count = $statement->fetchAll(PDO::FETCH_ASSOC);
  $pages = ceil(count($participantsList) / 6);
  $data += ['pages' => $pages];

  $json = json_encode($data);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
