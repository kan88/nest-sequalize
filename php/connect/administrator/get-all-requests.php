<?php

try {
  require '../../connect.php';
  require '../../helpers/pg-array-parse.php';
  $administrator_sono = $_POST['administrator_sono'];
  $administrator_samaccountname = $_POST['administrator_samaccountname'];

  //fo the first check superadmin, next, if superadmin show all requests
  $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_samaccountname ILIKE '$administrator_samaccountname' AND administrator_status=1 AND (administrator_date_end > CURRENT_DATE or administrator_date_end is null) AND administrator_role=4 AND administrator_service=0) ");
  $statement->execute();
  $roles = $statement->fetchAll(PDO::FETCH_ASSOC);
  $count = $statement->rowCount();
  if ($count > 0) {
    //with and without filter in unput search and checkboxes
    if (isset($_POST['filter'])) {
      $array_filter = [];
      foreach ($_POST['filter'] as $value) {
        array_push($array_filter, intval($value));
      }
      $search = !empty($_POST['search']) ? $_POST['search'] : '';
      $arrayFilter = implode(',', $array_filter);

      $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_cn ILIKE '%$search%' AND administrator_status in ($arrayFilter))");
      $statement->execute();
      $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($requests);
      echo $json;
    } else {
      $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE administrator_status=0");
      $statement->execute();
      $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($requests);
      echo $json;
    }
  } else {
    //check for other roles if not superadmin
    $statement = $pdo->prepare("SELECT DISTINCT administrator_service, administrator_visible_sono FROM administrator_roles WHERE (administrator_samaccountname ILIKE '$administrator_samaccountname' AND administrator_status=1 AND (administrator_date_end > CURRENT_DATE or administrator_date_end is null) AND administrator_role=4) ");
    $statement->execute();
    $roles = $statement->fetchAll(PDO::FETCH_ASSOC);
    $count = $statement->rowCount();

    $requests_id = [];
    $response = [];
    if (isset($_POST['filter'])) {
      $array_filter = [];
      foreach ($_POST['filter'] as $value) {
        array_push($array_filter, intval($value));
      }
      $search = !empty($_POST['search']) ? $_POST['search'] : '';
      $arrayFilter = implode(',', $array_filter);
      for ($i = 0; $i < $count; $i++) {
        $service = intval($roles[$i]['administrator_service']);
        $sono_list = pg_array_parse($roles[$i]['administrator_visible_sono']);
        foreach ($sono_list as $sono_item) {
          $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_service=$service AND administrator_cn ILIKE '%$search%' AND administrator_status in ($arrayFilter) AND administrator_sono ILIKE '$sono_item')");
          $statement->execute();
          $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
          $countRequests = $statement->rowCount();
          if ($countRequests) {
            for ($k = 0; $k < $countRequests; $k++) {
              $isInArray = array_search($requests[$k]['administrator_id'], array_column($response, 'administrator_id'));
              if (is_bool($isInArray)) {
                array_push($requests_id, $requests[$k]['administrator_id']);
                $requests[$k] += ['administrator_sono_list' => pg_array_parse($requests[$k]['administrator_visible_sono'])];
                array_push($response, $requests[$k]);
              }
            }
          }
        }
      }
    } else {
      for ($i = 0; $i < $count; $i++) {
        $service = intval($roles[$i]['administrator_service']);
        $sono_list = pg_array_parse($roles[$i]['administrator_visible_sono']);
        foreach ($sono_list as $sono_item) {
          $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_service=$service AND administrator_status=0 AND administrator_sono ILIKE '$sono_item')");
          $statement->execute();
          $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
          $countRequests = $statement->rowCount();
          if ($countRequests) {
            for ($k = 0; $k < $countRequests; $k++) {
              $isInArray = array_search($requests[$k]['administrator_id'], $requests_id);
              if (is_bool($isInArray)) {
                array_push($requests_id, $requests[$k]['administrator_id']);
                $requests[$k] += ['administrator_sono_list' => pg_array_parse($requests[$k]['administrator_visible_sono'])];
                array_push($response, $requests[$k]);
              }
            }
          }
        }
      }
    }
    $json = json_encode($response);
    echo $json;
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
