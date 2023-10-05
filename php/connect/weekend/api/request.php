<?php
//подключаемся к базе данных и записываем данные пользователя который отправил бронирование
try {
  require '../../connect.php';
  $_POST['comments'] = str_replace("\n", "<BR>", $_POST['comments']);
  $sono = $_POST['sono'];
  $login = $_POST['login'];
  date_default_timezone_set('UTC');
  $date = date("Y-m-d H:i:s");


  $statement = $pdo->prepare("SELECT * FROM weekend WHERE (status=:status AND reject=:reject AND login=:login)");
  $statement->execute([
    'login' => $login,
    'status' => "2",
    'reject' => "1"
  ]);
  $count = $statement->rowCount();
  if ($count == 0) {
    $reject = 0;
  } else {
    $reject = 1;
  }

  if (isset($_POST['newdate'])) {
    $data = [
      'name' => "{$_POST['name']}",
      'date' => "{$_POST['date']}",
      'mail' => "{$_POST['mail']}",
      'tel' => "{$_POST['tel']}",
      'work' => "{$_POST['work']}",
      'status' => "{$_POST['status']}",
      'id' => "{$_POST['id']}",
      'part' => "{$_POST['part']}",
      'newdate' => "{$_POST['newdate']}",
      'freedate' => "{$_POST['freedate']}",
      'info' => "{$_POST['info']}",
      'comments' => "{$_POST['comments']}",
      'sono' => "{$sono}",
      'reject' => "{$reject}",
      'login' => "{$login}"

    ];
    $sql = "UPDATE weekend SET name=:name, date=:date, work=:work, mail=:mail, tel=:tel, part=:part, freedate=:freedate, newdate=:newdate, info=:info, status=:status, comments=:comments, sono=:sono, reject=:reject, login=:login WHERE (id=:id AND status='0')";
  } else {
    $data = [
      'name' => "{$_POST['name']}",
      'date' => "{$_POST['date']}",
      'mail' => "{$_POST['mail']}",
      'work' => "{$_POST['work']}",
      'tel' => "{$_POST['tel']}",
      'status' => "{$_POST['status']}",
      'id' => "{$_POST['id']}",
      'part' => "{$_POST['part']}",
      'info' => "{$_POST['info']}",
      'comments' => "{$_POST['comments']}",
      'sono' => "{$sono}",
      'reject' => "{$reject}",
      'login' => "{$login}"

    ];
    $sql = "UPDATE weekend SET name=:name, date=:date, work=:work, mail=:mail, tel=:tel, part=:part, info=:info, status=:status, comments=:comments, sono=:sono, reject=:reject, login=:login WHERE (id=:id AND status='0')";
  }
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
  $count = $stmt->rowCount();
  if ($count == 1) {
    echo json_encode('Бронирование успешно завершено');
    $var = $_POST['comments'] ? "Дополнительная информация: <br> {$_POST['comments']}." : "";

    if (isset($_POST['newdate'])) {

      $pre = substr($_POST['number'], 0, 4);
      $post = substr($_POST['number'], 4);
      $newNumber = "{$pre}01-{$post}";
      $statement = $pdo->prepare('INSERT INTO service_alert (account_number, alert_service, alert_theme, alert_body, alert_date, alert_is_view, alert_type) VALUES (:account_number, :alert_service, :alert_theme, :alert_body, :alert_date, :alert_is_view, :alert_type)');
      $statement->execute([
        'account_number' => $login,
        'alert_service' => "Санатории ФНС России",
        'alert_theme' => "Новое бронирование № $newNumber ",
        'alert_body' => "Бронирование половины путевки № $newNumber отправлено на рассмотрение <br> ФИО: {$_POST['name']} <br> Дата заезда и выезда: {$_POST['newdate']} <br> Пансионат: {$_POST['hotel']}. <br>Почта: {$_POST['mail']} <br> Телефон: {$_POST['tel']} <br>  Информация о размещении: <br> {$_POST['info']} <br>  $var <br>Почта для связи: fblpu@service-nalog.ru",
        'alert_date' => $date,
        'alert_is_view' => 0,
        'alert_type' => 0,
      ]);
    } else {
      $number = $_POST['number'];
      $statement = $pdo->prepare('INSERT INTO service_alert (account_number, alert_service, alert_theme, alert_body, alert_date, alert_is_view, alert_type) VALUES (:account_number, :alert_service, :alert_theme, :alert_body, :alert_date, :alert_is_view, :alert_type)');
      $statement->execute([
        'account_number' => $login,
        'alert_service' => "Санатории ФНС России",
        'alert_theme' => "Новое бронирование № $number ",
        'alert_body' => "Бронирование № $number отправлено на рассмотрение <br> ФИО: {$_POST['name']} <br> Дата заезда и выезда: {$_POST['dates']} <br> Пансионат: {$_POST['hotel']}. <br>Почта: {$_POST['mail']} <br> Телефон: {$_POST['tel']} <br>  Информация о размещении: <br> {$_POST['info']} <br>  $var <br>Почта для связи: fblpu@service-nalog.ru",
        'alert_date' => $date,
        'alert_is_view' => 0,
        'alert_type' => 0,
      ]);
    }
  } else {
    echo json_encode('К сожалению Вас кто-то опередил');
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
