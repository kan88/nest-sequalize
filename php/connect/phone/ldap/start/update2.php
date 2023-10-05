<?php
require '/Web/linux/connect/connect.php';

$statement = $pdo->prepare('DELETE FROM employees WHERE department IS NULL');
$statement->execute();

echo ('update 2');
