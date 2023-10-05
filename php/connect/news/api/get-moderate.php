<?php
//подключаемся к базе данных, получаем новости на модерации

try {
  require '../../connect.php';
  $statement = $pdo->prepare("SELECT * FROM news WHERE status='0' ORDER BY id DESC");
  $statement->execute();
  $news = $statement->fetchAll(PDO::FETCH_ASSOC);
  foreach ($news as $key => $value) {
    $id = $value['id'];
    $statement = $pdo->prepare("SELECT * FROM images WHERE (step='1' AND news LIKE '$id')");
    $statement->execute();
    $images = $statement->fetchAll(PDO::FETCH_ASSOC);
    $news[$key] += ['images' => $images];
  };
  $json = json_encode($news);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
