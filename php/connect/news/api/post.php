<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  // $haystack = $_SERVER['HTTP_COOKIE'];
  // $needle = '5C';
  // $index = strripos($haystack, $needle);
  // $n = $index + 2;
  // $sono = substr($haystack, $n, 5);
  $login = $_POST['userlogin'];

  require '../../connect.php';
  // $path = '\\home\\gr099';
  // $user = "n7701_svc_app_ktr@dpc";
  // $pass = "Webyfcnhjqrb351";
  // system("net use " . $path . " " . $pass . " /user:" . $user . " /persistent:yes>nul 2>&1");

  //загрузка аватарки
  $statement = $pdo->prepare('INSERT INTO news (id, sono, date, title, description, avatar, status, userlogin, views, likes) VALUES (:id, :sono, :date, :title, :description, :avatar, :status, :userlogin, :views, :likes)');
  if (isset($_FILES['avatar'])) {
    $file = $_FILES['avatar'];
    $current_path = $_FILES['avatar']['tmp_name'];
    $filename = $_FILES['avatar']['name'];
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = time();
    $fullname = $name . '.' . $extension;
    mkdir("/home/gr/images/{$_POST['id']}", 0777);
    mkdir("/home/gr/images/{$_POST['id']}/avatar", 0777);
    $new_path = "/home/gr/images/{$_POST['id']}/avatar/" . $fullname;
    $url = '/images' . "/{$_POST['id']}" . '/avatar' . '/' . $fullname;
    move_uploaded_file($current_path, $new_path);
  }
  $body = htmlspecialchars($_POST['description'], ENT_QUOTES);
  $statement->execute([
    'id' => "{$_POST['id']}",
    'sono' => "{$_POST['sono']}",
    'date' => "{$_POST['date']}",
    'title' => "{$_POST['title']}",
    'userlogin' => "{$_POST['userlogin']}",
    'views' => "{$_POST['views']}",
    'likes' => "{$_POST['likes']}",
    'description' => "$body",
    'avatar' => "$url",
    'status' => "{$_POST['status']}",
  ]);
  $files = array();
  foreach ($_FILES['images'] as $k => $l) {
    foreach ($l as $i => $v) {
      $files[$i][$k] = $v;
    }
  }
  $_FILES['images'] = $files;
  $arr = $_FILES['images'];
  if ($arr[0]['name']) {
    mkdir("/home/gr/images/{$_POST['id']}/images", 0777);
    for ($i = 0; $i < count($arr); $i++) {
      $file = $arr[$i];
      $current_path = $file['tmp_name'];
      $filename = $file['name'];
      $extension = pathinfo($filename, PATHINFO_EXTENSION);
      $name = time() + $i + 1;
      $fullname = $name . '.' . $extension;
      $new_path = "/home/gr/images/{$_POST['id']}/images/" . $fullname;
      move_uploaded_file($current_path, $new_path);
      $url = '/images' . "/{$_POST['id']}" . '/images' . '/' . $fullname;
      $condition = '1';
      echo ('ok');

      $data = [
        'news' => "{$_POST['id']}",
        'photo' => "$name",
        'photos' => "$url",
        'step' => "$condition",
      ];
      $sql = "INSERT INTO images (news, photos, step, photo) VALUES (:news, :photos, :step, :photo)";
      $stmt = $pdo->prepare($sql);
      $stmt->execute($data);
    };
  };

  //загрузка PDF если есть
  if ($_FILES['pdf']['name'] !== '') {
    $file = $_FILES['pdf'];
    $current_path = $_FILES['pdf']['tmp_name'];
    $filename = $_FILES['pdf']['name'];
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = time();
    $fullname = $name . '.' . $extension;
    mkdir("/home/gr/images/{$_POST['id']}/pdf", 0777);

    $new_path = "/home/gr/images/{$_POST['id']}/pdf/" . $fullname;
    $url = '/images' . "/{$_POST['id']}" . '/pdf' . '/' . $fullname;
    move_uploaded_file($current_path, $new_path);
    $data = [
      'pdf' => "$url",
      'id' => "{$_POST['id']}",
    ];
    $sql = "UPDATE news SET pdf=:pdf WHERE id=:id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($data);
  };

  //загрузка видео если есть
  if ($_FILES['video']['name'] !== '') {
    echo $_FILES['video']['name'];
    $file = $_FILES['video'];
    $current_path = $_FILES['video']['tmp_name'];
    $filename = $_FILES['video']['name'];
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = time();
    $fullname = $name . '.' . $extension;
    mkdir("/home/gr/images/{$_POST['id']}/video", 0777);

    $new_path = "/home/gr/images/{$_POST['id']}/video/" . $fullname;
    $url = '/images' . "/{$_POST['id']}" . '/video' . '/' . $fullname;
    move_uploaded_file($current_path, $new_path);
    $data = [
      'video' => "$url",
      'id' => "{$_POST['id']}",
    ];
    $sql = "UPDATE news SET video=:video WHERE id=:id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($data);
  };
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
