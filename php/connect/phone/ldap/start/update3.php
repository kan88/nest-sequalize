<?php
require '/Web/linux/connect/connect.php';


$statement = $pdo->prepare("SELECT DISTINCT objectsid, department FROM employees ORDER BY objectsid");
$statement->execute();
$employees = $statement->fetchAll(PDO::FETCH_ASSOC);
print_r(count($employees));
foreach ($employees as $employee) {
  $objectsid = $employee['objectsid'];
  $department = $employee['department'];

  $statement = $pdo->prepare("UPDATE users SET departments =(departments || '*' || '$department') WHERE users.samaccountname LIKE '%$objectsid%'");
  $statement->execute();
};

echo ('update 3');
