<?php
try {
  require '../../connect.php';
  $data = [
    'date' => "{$_POST['date']}",
    'dates' => "{$_POST['dates']}",
    'id' => "{$_POST['id']}",
    'hotel' => "{$_POST['hotel']}",
    'hot' => "{$_POST['hot']}",
    'house' => "{$_POST['house']}",
    'room' => "{$_POST['room']}",
    'super' => "{$_POST['super']}"

  ];
  $sql = "UPDATE weekend SET date=:date, dates=:dates, hotel=:hotel, hot=:hot, house=:house, room=:room, super=:super WHERE id=:id";
  $stmt = $pdo->prepare($sql);
  $stmt->execute($data);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
