<?php

try {
  require '../../connect.php';
  $administrator_role = $_POST['administrator_role'];
  $administrator_status = 0;
  $administrator_date_request = date("Y-m-d");
  $administrator_comments = $_POST['administrator_comments'];
  $administrator_service = intval($_POST['administrator_service']);
  $administrator_company = $_POST['administrator_company'];
  $administrator_samaccountname = $_POST['administrator_samaccountname'];
  $administrator_department = $_POST['administrator_department'];
  $administrator_title = $_POST['administrator_title'];
  $administrator_telephone_number = $_POST['administrator_telephone_number'];
  $administrator_mobile_number = $_POST['administrator_mobile_number'];
  $administrator_cn = $_POST['administrator_cn'];
  $administrator_mail = $_POST['administrator_mail'];
  $administrator_author_samaccountname = $_POST['administrator_author_samaccountname'];
  $administrator_author_cn = $_POST['administrator_author_cn'];

  $administrator_author_title = $_POST['administrator_author_title'];
  $administrator_author_department = $_POST['administrator_author_department'];
  $administrator_author_company = $_POST['administrator_author_company'];
  $administrator_author_telephone_number = $_POST['administrator_author_telephone_number'];
  $administrator_author_mail = $_POST['administrator_author_mail'];
  $administrator_author_sono = $_POST['administrator_author_sono'];
  $administrator_sono = $_POST['administrator_sono'];
  $administrator_mail = $_POST['administrator_mail'];
  $administrator_visible_sono = $_POST['administrator_visible_sono'];
  $date = date("Y-m-d H:i:s");

  $all_sono = [];
  for ($i = 0; $i < count($administrator_visible_sono); $i++) {
    array_push($all_sono, $administrator_visible_sono[$i]);
  }

  function to_pg_array($set)
  {
    settype($set, 'array'); // can be called with a scalar or array
    $result = array();
    foreach ($set as $t) {
      if (is_array($t)) {
        $result[] = to_pg_array($t);
      } else {
        $t = str_replace('"', '\\"', $t); // escape double quote
        if (!is_numeric($t)) // quote only non-numeric values
          $t = '"' . $t . '"';
        $result[] = $t;
      }
    }
    return '{' . implode(",", $result) . '}'; // format
  }

  if (isset($_POST['administrator_forever'])) {
    $administrator_date_start = null;
    $administrator_date_end = null;
  } else {
    $administrator_date_start = $_POST['administrator_date_start'];
    $administrator_date_end = $_POST['administrator_date_end'];
  }
  $statement = $pdo->prepare("SELECT * FROM administrator_roles WHERE (administrator_service=$administrator_service AND administrator_samaccountname LIKE '$administrator_samaccountname' AND administrator_status=0)");
  $statement->execute();
  $count = $statement->rowCount();
  if ($count < 1) {
    $statement = $pdo->prepare('INSERT INTO administrator_roles (administrator_role, administrator_status, administrator_date_request, administrator_date_start, administrator_date_end,
    administrator_comments, administrator_service, administrator_company, administrator_samaccountname, administrator_department, administrator_title, administrator_telephone_number,
    administrator_mobile_number, administrator_cn, administrator_author_samaccountname, administrator_author_cn, administrator_author_title, administrator_author_department, administrator_author_company,
    administrator_author_telephone_number, administrator_author_mail, administrator_author_sono, administrator_sono, administrator_mail, administrator_visible_sono) VALUES
    (:administrator_role, :administrator_status, :administrator_date_request, :administrator_date_start, :administrator_date_end,
    :administrator_comments, :administrator_service, :administrator_company, :administrator_samaccountname, :administrator_department, :administrator_title, :administrator_telephone_number,
    :administrator_mobile_number, :administrator_cn, :administrator_author_samaccountname, :administrator_author_cn, :administrator_author_title, :administrator_author_department, :administrator_author_company,
    :administrator_author_telephone_number, :administrator_author_mail, :administrator_author_sono, :administrator_sono, :administrator_mail, :administrator_visible_sono)');
    $statement->execute([
      'administrator_role' => $administrator_role,
      'administrator_status' => $administrator_status,
      'administrator_date_request' => $administrator_date_request,
      'administrator_date_start' => $administrator_date_start,
      'administrator_date_end' => $administrator_date_end,
      'administrator_comments' => $administrator_comments,
      'administrator_service' => $administrator_service,
      'administrator_company' => $administrator_company,
      'administrator_samaccountname' => $administrator_samaccountname,
      'administrator_department' => $administrator_department,
      'administrator_title' => $administrator_title,
      'administrator_telephone_number' => $administrator_telephone_number,
      'administrator_mobile_number' => $administrator_mobile_number,
      'administrator_cn' => $administrator_cn,
      'administrator_author_samaccountname' => $administrator_author_samaccountname,
      'administrator_author_cn' => $administrator_author_cn,
      'administrator_author_title' => $administrator_author_title,
      'administrator_author_department' => $administrator_author_department,
      'administrator_author_company' => $administrator_author_company,
      'administrator_author_telephone_number' => $administrator_author_telephone_number,
      'administrator_author_mail' => $administrator_author_mail,
      'administrator_author_sono' => $administrator_author_sono,
      'administrator_sono' => $administrator_sono,
      'administrator_mail' => $administrator_mail,
      'administrator_visible_sono' => to_pg_array($all_sono)

    ]);
    $id_request = $pdo->lastInsertId();
    $count = $statement->rowCount();
    if ($count == 1) {
      $statement = $pdo->prepare('INSERT INTO service_alert (account_number, alert_service, alert_theme, alert_body, alert_date, alert_is_view, alert_type) VALUES (:account_number, :alert_service, :alert_theme, :alert_body, :alert_date, :alert_is_view, :alert_type)');
      $statement->execute([
        'account_number' => $administrator_samaccountname,
        'alert_service' => "Сервис Администратор",
        'alert_theme' => "Заявка  №$id_request",
        'alert_body' => "Запрос на рассмотрении. Заявитель: $administrator_author_cn. Доступ: $administrator_cn.",
        'alert_date' => $date,
        'alert_is_view' => 0,
        'alert_type' => 0,
      ]);
    }
    echo json_encode('Данные успешно отправлены');
  } else {
    echo json_encode('Уже есть в базе');
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
