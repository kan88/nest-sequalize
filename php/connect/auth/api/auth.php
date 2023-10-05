<?php
try {
  $ds = ldap_connect("ldap://n5001-dc07.regions.tax.nalog.ru");
  $user = $_POST['user'];
  $pass = $_POST['password'];
  if ($ds) {
    $r = ldap_bind($ds, $user, $pass);
    if ($r == 1) {
      setcookie("auth", $user, time() + 36000, '/');
      header("Refresh:0; url=/");
    } else {
      header("Refresh:0");
    }
  }
  ldap_close($ds);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
