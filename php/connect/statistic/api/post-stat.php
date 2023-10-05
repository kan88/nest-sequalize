
<?php
try {
  require '../../connect.php';

  // Указываем кодировку, в которой будет получена информация из базы
  // @mysqli_query ($pdo, 'set character_set_results = "utf8"');

  // Получаем IP-адрес посетителя и сохраняем текущую дату
  $visitor_ip = $_SERVER['REMOTE_ADDR'];
  $url = $_SERVER['HTTP_REFERER'];
  $user = $_SERVER['AD_USER'];
  $date = date("Y-m-d");
  $time = date("H:i:s");
  // die (var_dump($_SERVER));
  // Узнаем, были ли посещения за сегодня
  $statement = $pdo->prepare("SELECT visit_id FROM visits WHERE date=:date");
  $statement->execute([
    'date' => $date,
  ]);
  $count = $statement->rowCount();
  // $res = mysqli_query($pdo, "SELECT `visit_id` FROM `visits` WHERE `date`='$date'") or die ("Проблема при подключении к БД");

  // Если сегодня еще не было посещений
  if ($count == 0) {
    // Очищаем таблицу ips
    // mysqli_query($db, "DELETE FROM `ips`");

    // Заносим в базу IP-адрес текущего посетителя
    // mysqli_query($pdo, "INSERT INTO `ips` SET `ip_address`='$visitor_ip', `ip_user`='$user', `ip_date`='$date', `ip_time`='$time', `ip_url`='$url'");
    // $statement = $pdo->prepare("INSERT INTO `ips` SET `ip_address`='$visitor_ip', `ip_user`='$user', `ip_date`='$date', `ip_time`='$time', `ip_url`='$url'");
    // $statement->execute();
    $statement = $pdo->prepare("INSERT INTO ips (ip_address, ip_user, ip_date, ip_time, ip_url) VALUES (:ip_address, :ip_user, :ip_date, :ip_time, :ip_url)");
    $statement->execute([
      'ip_address' => $visitor_ip,
      'ip_user' => $user,
      'ip_date' => $date,
      'ip_time' => $time,
      'ip_url' => $url,
    ]);
    // Заносим в базу дату посещения и устанавливаем кол-во просмотров и уник. посещений в значение 1
    $statement = $pdo->prepare("INSERT INTO visits (views, hosts, date) VALUES (:views, :hosts, :date)");
    $statement->execute([
      'views' => 1,
      'hosts' => 1,
      'date' => $date,
    ]);
    // $res_count = mysqli_query($pdo, "INSERT INTO `visits` SET `date`='$date', `hosts`=1,`views`=1");
  }

  // Если посещения сегодня уже были
  else {
    // Проверяем, есть ли уже в базе IP-адрес, с которого происходит обращение

    $statement = $pdo->prepare("SELECT * FROM ips WHERE (ip_address=:ip_address AND ip_date=:ip_date)");
    $statement->execute([
      'ip_address' => $visitor_ip,
      'ip_date' => $date,
    ]);
    $count = $statement->rowCount();

    // $current_ip = mysqli_query($pdo, "SELECT `ip_id` FROM `ips` WHERE (`ip_address`='$visitor_ip' AND `ip_date`='$date')");
    // Если такой IP-адрес уже сегодня был (т.е. это не уникальный посетитель)
    if ($count !== 0) {
      $statement = $pdo->prepare("UPDATE visits SET views=views+1 WHERE date=:date");
      $statement->execute([
        'date' => $date,
      ]);

      // mysqli_query($pdo, "UPDATE `visits` SET `views`=`views`+1 WHERE `date`='$date'");
      // Заносим в базу IP-адрес этого посетителя
      $statement = $pdo->prepare("INSERT INTO ips (ip_address, ip_user, ip_date, ip_time, ip_url) VALUES (:ip_address, :ip_user, :ip_date, :ip_time, :ip_url)");
      $statement->execute([
        'ip_address' => $visitor_ip,
        'ip_user' => $user,
        'ip_date' => $date,
        'ip_time' => $time,
        'ip_url' => $url,
      ]);

      //  mysqli_query($pdo, "INSERT INTO `ips` SET `ip_address`='$visitor_ip', `ip_user`='$user', `ip_date`='$date', `ip_time`='$time', `ip_url`='$url'");
    }

    // Если сегодня такого IP-адреса еще не было (т.е. это уникальный посетитель)
    else {
      // Заносим в базу IP-адрес этого посетителя
      // mysqli_query($pdo, "INSERT INTO `ips` SET `ip_address`='$visitor_ip', `ip_user`='$user', `ip_date`='$date', `ip_time`='$time', `ip_url`='$url'");
      $statement = $pdo->prepare("INSERT INTO ips (ip_address, ip_user, ip_date, ip_time, ip_url) VALUES (:ip_address, :ip_user, :ip_date, :ip_time, :ip_url)");
      $statement->execute([
        'ip_address' => $visitor_ip,
        'ip_user' => $user,
        'ip_date' => $date,
        'ip_time' => $time,
        'ip_url' => $url,
      ]);

      // Добавляем в базу +1 уникального посетителя (хост) и +1 просмотр (хит)
      // mysqli_query($pdo, "UPDATE `visits` SET `hosts`=`hosts`+1,`views`=`views`+1 WHERE `date`='$date'");

      $statement = $pdo->prepare("UPDATE visits SET hosts=hosts+1 WHERE date=:date");
      $statement->execute([
        'date' => $date,
      ]);
    }
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
