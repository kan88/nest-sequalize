
<?php
//подключаемся к базе данных, получаем лайки конкретного пользователя

try {
  require '../../connect.php';
  $login = $_POST['id'];

  $statement = $pdo->prepare("SELECT * FROM likes WHERE (news_user=:news_user AND news_like='1')");
  $statement->execute([
    'news_user' => $login,
  ]);
  $status = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($status);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
?>
