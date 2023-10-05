<?php
try {
  require '../../connect.php';
  $quality = intval("{$_POST['quality']}");
  for ($i = 0; $i < $quality; $i++) {
    $statement = $pdo->prepare('INSERT INTO weekend (id, hotel, house, room, hot, dates, date, status, super) VALUES (:id, :hotel, :house, :room, :hot, :dates, :date, :status, :super)');
    $statement->execute([
      'id' => intval("{$_POST['id']}") + $i,
      'hotel' => "{$_POST['hotel']}",
      'house' => "{$_POST['house']}",
      'room' => "{$_POST['room']}",
      'hot' => "{$_POST['hot']}",
      'super' => "{$_POST['super']}",
      'dates' => "{$_POST['dates']}",
      'date' => "{$_POST['date']}",
      'status' => "{$_POST['status']}",
    ]);
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
