<?php
try {
  require '../../connect.php';
  $statement = $pdo->prepare('INSERT INTO weekend (part, id, dates, hotel, house, room, hot, freedate, numbersecond, date, status) VALUES (:part, :id, :dates, :hotel, :house, :room, :hot, :freedate, :numbersecond, :date, :status)');
  $statement->execute([
    'id' => "{$_POST['id']}",
    'dates' => "{$_POST['dates']}",
    'hotel' => "{$_POST['hotel']}",
    'house' => "{$_POST['house']}",
    'room' => "{$_POST['room']}",
    'hot' => "{$_POST['hot']}",
    'freedate' => "{$_POST['freedate']}",
    'numbersecond' => "{$_POST['numbersecond']}",
    'date' => "{$_POST['date']}",
    'status' => "{$_POST['status']}",
    'part' => "{$_POST['part']}",
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
