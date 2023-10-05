<?php

try {
  require '../../connect.php';

  $statement = $pdo->prepare("SELECT * FROM ips");
  $statement->execute();
  $visits = $statement->fetchAll(PDO::FETCH_ASSOC);
  $statement = $pdo->prepare("SELECT * FROM visits ORDER BY visit_id");
  $statement->execute();
  $days = $statement->fetchAll(PDO::FETCH_ASSOC);
  foreach ($visits as $visit) {
    for ($i = 0; $i < count($days); $i++) {
      if ($visit['ip_date'] == $days[$i]['date']) {
        if (isset($days[$i]['visits'])) {
          array_push($days[$i]['visits'], $visit);
        } else {
          $arr = [];
          array_push($arr, $visit);
          $days[$i] += ['visits' => $arr];
        }
        break;
      };
    };
  };
  $json = json_encode($days);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
