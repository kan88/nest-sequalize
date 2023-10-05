<?php

try {
  require '../../connect.php';
  $idRequest = $_POST['id'];
  $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE id=$idRequest");
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
