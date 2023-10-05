<?php
$user = "postgres";
$pass = "K71#Psahoo8t";
$pdo = new PDO("pgsql:host=10.251.33.26;port=5432; dbname=Intranet", "$user", "$pass");
// $pdo->setAttribute(PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true);
// $pdo->setAttribute(PDO::SQLSRV_ATTR_FETCHES_DATETIME_TYPE, true);

// $pdo->setAttribute(PDO::PARAM_INT, false);
