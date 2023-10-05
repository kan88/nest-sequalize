<?php
try {
  require '../../connect.php';
  $statement = $pdo->prepare('INSERT INTO weekend (numbersecond, part, id, dates, hotel, house, room, hot, date, status, super) VALUES (:numbersecond, :part, :id, :dates, :hotel, :house, :room, :hot, :date, :status, :super)');
  $statement->execute([
    'id' => "{$_POST['id']}",
    'dates' => "{$_POST['dates']}",
    'hotel' => "{$_POST['hotel']}",
    'house' => "{$_POST['house']}",
    'room' => "{$_POST['room']}",
    'hot' => "{$_POST['hot']}",
    'part' => "{$_POST['part']}",
    'numbersecond' => "{$_POST['numbersecond']}",
    'date' => "{$_POST['date']}",
    'status' => "{$_POST['status']}",
    'super' => "{$_POST['super']}",
  ]);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
