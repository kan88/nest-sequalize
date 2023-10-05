<?php
try {
  require '../../connect.php';
  $_POST['info'] = str_replace("\n", "<BR>", $_POST['info']);
  $data = [
    'status' => "{$_POST['status']}",
    'id' => "{$_POST['id']}",
    'why' => "{$_POST['why']}",
  ];
  $sql = "UPDATE weekend SET why=:why, status=:status WHERE id=:id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
  $sql = "SELECT login from weekend WHERE id=:id";
  $dataSecondary = [
    'id' => "{$_POST['id']}",
  ];
  $statement = $pdo->prepare($sql);
  $statement->execute($dataSecondary);
  $count = $statement->rowCount();
  $login = $statement->fetchAll(PDO::FETCH_ASSOC);


  if ($count == 1) {
    $number = isset($_POST['numberfirst']) ? "{$_POST['numberfirst']}" : "{$_POST['number']}";
    $reason = $_POST['why'];
    date_default_timezone_set('UTC');
    $date = date("Y-m-d H:i:s");
    if ("{$_POST['status']}" == '3') {
      $statement = $pdo->prepare('INSERT INTO service_alert (account_number, alert_service, alert_theme, alert_body, alert_date, alert_is_view, alert_type) VALUES (:account_number, :alert_service, :alert_theme, :alert_body, :alert_date, :alert_is_view, :alert_type)');
      $statement->execute([
        'account_number' => $login[0]["login"],
        'alert_service' => "Санатории ФНС России",
        'alert_theme' => "Бронирование № $number",
        'alert_body' => "Бронирование отклонено. Комментарии: $reason",
        'alert_date' => $date,
        'alert_is_view' => 0,
        'alert_type' => 0,
      ]);
      $count = $statement->rowCount();
      echo $count;
    }
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
