<?php
require '/Web/linux/connect/connect.php';
$statement = $pdo->prepare('SELECT count(*) FROM employees');
$statement->execute();
$count = $statement->fetchAll(PDO::FETCH_ASSOC);
$quantity = ceil($count[0]['count'] / 1000);
print_r($quantity);
for ($i = 1; $i <= $quantity; $i++) {
  $finish = $i * 1000;
  $start = $finish - 999;


  $statement = $pdo->prepare("UPDATE employees SET department = (SELECT department FROM users WHERE (users.cn=employees.employee AND users.sono=employees.sono) LIMIT 1) WHERE (id >= $start AND id <= $finish)");
  $statement->execute();
}



echo ('update 1');
