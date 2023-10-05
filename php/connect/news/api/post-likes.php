<?php
try {
  require '../../connect.php';
  $login = $_POST['news_login'];


  $id = $_POST['news_id'];
  $statement = $pdo->prepare("SELECT * FROM likes WHERE (news_user ILIKE '$login' AND news_id ILIKE '$id')");
  $statement->execute();
  $row = $statement->rowCount();
  if ($row == 0) {
    $statement = $pdo->prepare('INSERT INTO likes (news_id, news_user, news_like) VALUES (:news_id, :news_user, :news_like)');
    $statement->execute([
      'news_id' => "{$_POST['news_id']}",
      'news_user' => $login,
      'news_like' => "{$_POST['news_like']}"
    ]);
    $statement2 = $pdo->prepare('UPDATE news SET likes=likes+1 WHERE id=:id');
    $statement2->execute([
      'id' => "{$_POST['news_id']}",
    ]);
  } else {
    $statement = $pdo->prepare('UPDATE likes SET news_like=:news_like WHERE (news_id=:news_id AND news_user=:news_user)');
    $statement->execute([
      'news_id' => "{$_POST['news_id']}",
      'news_user' => $login,
      'news_like' => "{$_POST['news_like']}"
    ]);
    if ($_POST['news_like'] == '0') {
      $statement2 = $pdo->prepare('UPDATE news SET likes=likes-1 WHERE id=:id');
      $statement2->execute([
        'id' => "{$_POST['news_id']}",
      ]);
    } else {
      $statement2 = $pdo->prepare('UPDATE news SET likes=likes+1 WHERE id=:id');
      $statement2->execute([
        'id' => "{$_POST['news_id']}",
      ]);
    }
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
