<?php
//подключаемся к базе данных, получаем все новости и отдаем на стороне сервера

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE (status=1 AND date_close > CURRENT_DATE)");
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

  $data = [];
  $data += ['requests' => $requests];
  $statement = $pdo->prepare("SELECT count(*) FROM vacancy_requests WHERE id_request=$id");
  $statement->execute();
  $count = $statement->fetchAll(PDO::FETCH_ASSOC);
  $pages = ceil(count($requests) / 6);
  $data += ['pages' => $pages];

  $json = json_encode($data);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
