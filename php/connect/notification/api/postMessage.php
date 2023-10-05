<?php
try {
  require '../../connect.php';
  $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : null;
  $type = isset($_POST['type']) ? $_POST['type'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $chats_id = isset($_POST['chats_id']) ? $_POST['chats_id'] : null;
  $body = empty($_POST['body']) ? 'Вложение' : $_POST['body'];
  date_default_timezone_set('UTC');
  $date = date("Y-m-d H:i:s");
  $link = null;
  $ext = null;

  $path = '\\home\\gr099';
  $user = "n7701_svc_app_ktr@dpc";
  $pass = "Webyfcnhjqrb351";
  system("net use " . $path . " " . $pass . " /user:" . $user . " /persistent:yes>nul 2>&1");
  if ($_FILES['link']['name']) {
    $file = $_FILES['link'];
    $current_path = $_FILES['link']['tmp_name'];
    $filename = $_FILES['link']['name'];
    $extension = pathinfo($filename, PATHINFO_EXTENSION);
    $name = time();
    $fullname = $name . '.' . $extension;
    $path = "/home/gr/notification/{$chats_id}";
    if (!file_exists($path)) {
      mkdir($path, 0700);
    }
    $new_path = "/home/gr/notification/{$chats_id}/" . $fullname;
    $link = '/notification' . "/{$chats_id}" . '/' . $fullname;
    $ext = $extension;

    move_uploaded_file($current_path, $new_path);
  }
  //записываем сам запрос
  $statement = $pdo->prepare('INSERT INTO notification_messages (chats_id, account_number, full_name, body, date_time, link, ext, type) VALUES
  (:chats_id, :account_number, :full_name, :body, :date_time, :link, :ext, :type)');
  $statement->execute([
    'chats_id' => $chats_id,
    'account_number' => $account_number,
    'full_name' => $full_name,
    'body' => $body,
    'date_time' => $date,
    'link' => $link,
    'ext' => $ext,
    'type' => $type,
  ]);
  $statement = $pdo->prepare('UPDATE notification_chats SET last_message=:last_message WHERE id=:id');
  $statement->execute([
    'id' => $chats_id,
    'last_message' => $date,
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
