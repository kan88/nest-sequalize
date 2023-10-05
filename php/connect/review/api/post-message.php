<?php
try {
  require '../../connect.php';
  $comment = isset($_POST['comment']) && !empty($_POST['comment']) ? $_POST['comment'] : null;
  $notification = isset($_POST['notification']) && !empty($_POST['notification']) ? $_POST['notification'] : null;
  $author = isset($_POST['author']) && !empty($_POST['author']) ? $_POST['author'] : null;
  $date = date("Y-m-d H:i:s");
  $id = intval($_POST['id']);

  $statement = $pdo->prepare('INSERT INTO review_comments (review_id, review_date, review_comment, review_author, review_notification) VALUES (:review_id, :review_date, :review_comment, :review_author, :review_notification)');
  $statement->execute([
    'review_id' => $id,
    'review_date' => $date,
    'review_comment' => $comment,
    'review_author' => $author,
    'review_notification' => $notification,
  ]);
  $results = $statement->fetchAll(PDO::FETCH_ASSOC);
  $json = json_encode($results);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
