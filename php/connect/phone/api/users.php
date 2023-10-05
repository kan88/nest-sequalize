<?php
//поиск
try {
  require '../../connect.php';
  $patternSono = '/-[a-z]{0,1}[0-9]{4,4}-/';
  $patternYZ = '/[0-9]{4,4}-[0-9]{2}/';
  $patternPhone = '/[0-9]{4,4}/';
  $patternRu = '/[а-я]{2}/';
  ini_set('memory_limit', '-1');
  $search = $_POST['search'];
  //инпут пустой или не пустой. Пустой должен быть при событии change
  if ('' == $search) {
    $sono = $_POST['sono'];
    $statement = $pdo->prepare("SELECT * FROM users WHERE samaccountname ILIKE '$sono%'");
    $statement->execute();
    $users = $statement->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($users);
    echo ($json);
  } else {
    //сюда попадаем если сабмит, определяем есть ли в названии цифры если да ищем по соно если нет ищем по имени
    if (1 == preg_match($patternSono, $search)) {
      //если выбрано определенное соно фильтруем в определенном соно
      $sono = $_POST['sono'];
      $searchWithoutPrefix = substr($search, 1);
      $statement = $pdo->prepare("SELECT * FROM users WHERE samaccountname ILIKE '$searchWithoutPrefix%'");
      $statement->execute();
      $users = $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($users);
      echo ($json);
    }
    if (1 == preg_match($patternYZ, $search)) {
      //если выбрано учетная запись
      $sono = $_POST['sono'];
      $statement = $pdo->prepare("SELECT * FROM users WHERE samaccountname ILIKE '$search%'");
      $statement->execute();
      $users = $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($users);
      echo ($json);
    }

    if ((1 == preg_match($patternPhone, $search)) && (FALSE == preg_match($patternSono, $search)) && (FALSE == preg_match($patternYZ, $search))) {
      //если выбрано добавочный
      $sono = $_POST['sono'];
      $statement = $pdo->prepare("SELECT * FROM users WHERE telephonenumber ILIKE '%$search%'");
      $statement->execute();
      $users = $statement->fetchAll(PDO::FETCH_ASSOC);
      $json = json_encode($users);
      echo ($json);
    }

    if (1 == preg_match($patternRu, $search)) {
      //ищем по имени или везде или где-то в определенном месте
      if ('Все СОНО' == $_POST['sono']) {
        $statement = $pdo->prepare("SELECT * FROM users WHERE (cn ILIKE '$search %' OR department ILIKE '$search%') LIMIT 1000");
        $statement->execute();
        $count = $statement->rowCount();
        if ($count !== 0) {
          $users = $statement->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($users);
          echo ($json);
        } else {
          $statement = $pdo->prepare("SELECT * FROM users WHERE (cn ILIKE '%$search%' OR department ILIKE '%$search%') LIMIT 1000");
          $statement->execute();
          $users = $statement->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($users);
          echo ($json);
        }
      } else {

        $sono = $_POST['sono'];
        $statement = $pdo->prepare("SELECT * FROM users WHERE ((cn ILIKE '$search %' OR department ILIKE '$search%') AND (samaccountname ILIKE '$sono%')) LIMIT 1000");
        $statement->execute();
        $count = $statement->rowCount();
        if ($count !== 0) {
          $users = $statement->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($users);
          echo ($json);
        } else {
          $statement = $pdo->prepare("SELECT * FROM users WHERE ((cn ILIKE '%$search%' OR department ILIKE '%$search%') AND (samaccountname ILIKE '$sono%')) LIMIT 1000");
          $statement->execute();
          $users = $statement->fetchAll(PDO::FETCH_ASSOC);
          $json = json_encode($users);
          echo ($json);
        }
      }
    }
    //сюда добавить лоигку если ничего не найдено
    if ((FALSE == preg_match($patternRu, $search)) && (FALSE == preg_match($patternYZ, $search)) && (FALSE == preg_match($patternSono, $search)) && (FALSE == preg_match($patternPhone, $search))) {
      $arr = [];
      $json = json_encode($arr);
      echo ($json);
    }
  }
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
