<?php
try {
  require '../../connect.php';
  // $path = '\\\\n7701-crl002F\\gr099\\intranet';
  // $user = "n7701_svc_app_ktr@dpc";
  // $pass = "Webyfcnhjqrb351";
  // system("net use " . $path . " " . $pass . " /user:" . $user . " /persistent:yes>nul 2>&1");
  $body = htmlspecialchars($_POST['description'], ENT_QUOTES);

  if ($_POST['status'] == '3') {
    $statement = $pdo->prepare('UPDATE news SET date=:date, status=:status, comment=:comment WHERE id=:id');
    $statement->execute([
      'id' => "{$_POST['id']}",
      'date' => "{$_POST['date']}",
      'status' => "{$_POST['status']}",
      'comment' => "{$_POST['comment']}",
    ]);
  }

  if ($_POST['status'] == '0' || $_POST['status'] == '1') {
    $statement = $pdo->prepare('UPDATE news SET date=:date, description=:description, status=:status, title=:title WHERE id=:id');
    $statement->execute([
      'id' => "{$_POST['id']}",
      'description' => "$body",
      'date' => "{$_POST['date']}",
      'status' => "{$_POST['status']}",
      'title' => "{$_POST['title']}",
    ]);
  }
  //перезаписываем новую автарку
  if ($_FILES['avatar']['name']) {
    $file = $_FILES['avatar'];
    $current_path = $_FILES['avatar']['tmp_name'];
    $filename = $_FILES['avatar']['name'];
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = time();
    $fullname = $name . '.' . $extension;
    $new_path = "/home/gr/images/{$_POST['id']}/avatar/" . $fullname;
    $url = '/images' . "/{$_POST['id']}" . '/avatar' . '/' . $fullname;
    // $new_path = dirname($_SERVER['DOCUMENT_ROOT']) . '/project/uploads' . "/{$_POST['id']}" . '/avatar' . '/' . $fullname;
    // $url = '/uploads' . "/{$_POST['id']}" . '/avatar' . '/' . $fullname;
    move_uploaded_file($current_path, $new_path);
    $statement = $pdo->prepare('UPDATE news SET avatar=:avatar WHERE id=:id');
    $statement->execute([
      'id' => "{$_POST['id']}",
      'avatar' => "$url",
    ]);
  }

  //меняем статусы фотографий на 0 если админ удалил фотографии
  if (isset($_POST['del'])) {
    $arr = $_POST['del'];
    for ($i = 0; $i < count($arr); $i++) {
      $statement = $pdo->prepare('UPDATE images SET step=:step WHERE id=:id');
      $condition = '0';
      $statement->execute([
        'id' => "$arr[$i]",
        'step' => "$condition",
      ]);
    };
  }



  //сохраняем фотографии админа если они есть
  $files = array();
  foreach ($_FILES['admin'] as $k => $l) {
    foreach ($l as $i => $v) {
      $files[$i][$k] = $v;
    }
  }
  $_FILES['admin'] = $files;
  $arr = $_FILES['admin'];
  if ($arr[0]['name']) {
    //здесь надо перепроверить валидность, предыдущее значение закомментировано
    // $new_path = "\\\\n7701-crl002F\\gr099\\intranet\\images\\{$_POST['id']}\\pdf" . '\\' . $fullname;

    $path = "/home/gr/images/{$_POST['id']}/admin";
    if (!file_exists($path)) {
      mkdir($path, 0777);
    }
    for ($i = 0; $i < count($arr); $i++) {
      $file = $arr[$i];
      $current_path = $file['tmp_name'];
      $filename = $file['name'];
      $extension = pathinfo($filename, PATHINFO_EXTENSION);
      $name = time() + $i + 1;
      $fullname = $name . '.' . $extension;
      $new_path = "/home/gr/images/{$_POST['id']}/admin/" . $fullname;
      $url = '/images' . "/{$_POST['id']}" . '/admin' . '/' . $fullname;

      // $new_path = dirname($_SERVER['DOCUMENT_ROOT']) . '/project/uploads' . "/{$_POST['id']}" . '/admin' . '/' . $fullname;
      move_uploaded_file($current_path, $new_path);
      // $url = '/uploads' . "/{$_POST['id']}" . '/admin' . '/' . $fullname;
      $condition = '1';
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
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
