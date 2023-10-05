<?php

try {
  require '../../connect.php';
  require '../../helpers/pg-array-parse.php';
  $administrator_samaccountname = $_POST['administrator_samaccountname'];
  $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE ((administrator_samaccountname LIKE '$administrator_samaccountname' or administrator_author_samaccountname ILIKE '$administrator_samaccountname') AND (administrator_date_end > CURRENT_DATE or administrator_date_end is null) AND administrator_status=0)");
  $statement->execute();
  $roles = $statement->fetchAll(PDO::FETCH_ASSOC);
  for ($i = 0; $i < count($roles); $i++) {
    $sonos =  pg_array_parse($roles[$i]['administrator_visible_sono']);
    $roles[$i] += ['administrator_sono_list' => $sonos];
  }
  $json = json_encode($roles);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
