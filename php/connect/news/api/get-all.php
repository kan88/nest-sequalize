<?php
//подключаемся к базе данных, получаем все новости и отдаем на стороне сервера

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM news WHERE status='1' ORDER BY id DESC LIMIT 6");
  $statement->execute();
  $news = $statement->fetchAll(PDO::FETCH_ASSOC);
  foreach ($news as $key => $value) {
    $id = $value['id'];
    $statement = $pdo->prepare("SELECT * FROM images WHERE (step='1' AND news LIKE '$id')");
    $statement->execute();
    $images = $statement->fetchAll(PDO::FETCH_ASSOC);
    $news[$key] += ['images' => $images];
  };
  $data = [];
  $data += ['news' => $news];
  $statement = $pdo->prepare("SELECT count(*) FROM news WHERE status='1'");
  $statement->execute();
  $count = $statement->fetchAll(PDO::FETCH_ASSOC);
  $pages = ceil($count[0]['count'] / 6);
  $data += ['pages' => $pages];

  $json = json_encode($data);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
