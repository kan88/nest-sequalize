<?php
$patternRu = '/[а-я]/';
$patternPrivilege = '/[[:alnum:]]{1,}-[[:alnum:]]{1,2}-/';
$patternRuWithSpace = '/[^а-я ]+/msiu';
$patternDisabled = 'Disabled';

do {
  $sr = ldap_search(
    $ds,
    $dn,
    $filter,
    $attributes,
    0,
    0,
    0,
    LDAP_DEREF_NEVER,
    [['oid' => LDAP_CONTROL_PAGEDRESULTS, 'value' => ['size' => 150000, 'cookie' => $cookie]]]
  );
  ldap_parse_result($ds, $sr, $errcode, $matcheddn, $errmsg, $referrals, $controls);
  // To keep the example short errors are not tested
  $entries = ldap_get_entries($ds, $sr);
  echo $entries["count"] . " entries returned\n";
  for ($i = 0; $i < $entries["count"]; $i++) {
    $login = $entries[$i];
    if ((1 == preg_match($patternPrivilege, $login['samaccountname'][0])) && (1 == preg_match($patternRu, $login['cn'][0]))) {

      if (TRUE == isset($login['cn'][0])) {
        $cn = $login['cn'][0];
      } else {
        $cn = '-';
      };
      if (TRUE == isset($login['title'][0])) {
        $title = $login['title'][0];
        $rang = '0';
        if (FALSE !== stripos($title, 'Генеральный') || FALSE !== stripos($title, 'Руководитель')) {
          $rang = '9';
        }
        if (FALSE !== stripos($title, 'Заместитель генерального')) {
          $rang = '8';
        }
        if (FALSE !== stripos($title, 'Советник')) {
          $rang = '7';
        }
        if ((FALSE !== stripos($title, 'Директор')) && (FALSE == stripos($title, 'Генеральный'))) {
          $rang = '6';
        }
        if (FALSE !== stripos($title, 'Заместитель директора')) {
          $rang = '5';
        }
        if (FALSE !== stripos($title, 'Начальник управления')) {
          $rang = '4';
        }
        if ((FALSE !== stripos($title, 'Начальник отдела')) || (FALSE !== stripos($title, 'Начальник отделения'))) {
          $rang = '3';
        }
        if (FALSE !== stripos($title, 'Заместитель начальника управления')) {
          $rang = '2';
        }
        if ((FALSE !== stripos($title, 'Заместитель начальника отдела')) || (FALSE !== stripos($title, 'Заместитель начальника отделения'))) {
          $rang = '1';
        }
      } else {
        $title = '0';
        $rang = '0';
      };
      if (TRUE == isset($login['telephonenumber'][0])) {
        $telephonenumber = $login['telephonenumber'][0];
      } else {
        $telephonenumber = '-';
      };
      if (TRUE == isset($login['whenchanged'][0])) {
        $whenchanged = $login['whenchanged'][0];
      } else {
        $whenchanged = '-';
      };
      if (TRUE == isset($login['department'][0])) {
        $department = $login['department'][0];
      } else {
        $department = '-';
      };
      if (TRUE == isset($login['company'][0])) {
        $company = $login['company'][0];
      } else {
        $company = '-';
      };
      if (TRUE == isset($login['givenname'][0])) {
        $givenname = $login['givenname'][0];
      } else {
        $givenname = '-';
      };
      if (TRUE == isset($login['sn'][0])) {
        $sn = $login['sn'][0];
      } else {
        $sn = '-';
      };
      if (TRUE == isset($login['samaccountname'][0])) {
        $samaccountname = $login['samaccountname'][0];
        $objectsid = preg_replace("/[^0-9]/", '0', $login['samaccountname'][0]);
        $length = strlen($samaccountname);
        if ($length <= 11) {
          $sono = substr($samaccountname, 0, 4);
        } else {
          $sono = substr($samaccountname, 0, 5);
        }
        //создание уникального айди из названия учетной записи
      } else {
        $samaccountname = '-';
        $objectsid = '-';
        $sono = '-';
      };
      if (TRUE == isset($login['mail'][0])) {
        $mail = $login['mail'][0];
      } else {
        $mail = '-';
      };
      if (TRUE == isset($login['manager'][0])) {
        $manager = $login['manager'][0];
      } else {
        $manager = '-';
      };
      if (TRUE == isset($login['jpegphoto'][0])) {
        $photo = $login['jpegphoto'][0];
        file_put_contents('/home/gr/photos/' . $samaccountname . '.jpg', $photo);
        $jpegphoto = '/photos' . '/' . $samaccountname . '.jpg';
      } else {
        $jpegphoto = NULL;
      };

      $statement = $pdo->prepare('INSERT INTO users (cn, sn, givenname, title, telephonenumber, whenchanged, department, company, samaccountname, mail, manager, objectsid, jpegphoto, sono, rang, departments)
                                            VALUES (:cn, :sn, :givenname, :title, :telephonenumber, :whenchanged, :department, :company, :samaccountname, :mail, :manager, :objectsid, :jpegphoto, :sono, :rang, :departments)');
      $statement->execute([
        'cn' => $cn,
        'sn' => $sn,
        'givenname' => $givenname,
        'title' => $title,
        'telephonenumber' => $telephonenumber,
        'whenchanged' => $whenchanged,
        'department' => $department,
        'company' => $company,
        'samaccountname' => $samaccountname,
        'mail' => $mail,
        'manager' => preg_replace($patternRuWithSpace, '', $manager),
        'objectsid' => $objectsid,
        'jpegphoto' => $jpegphoto,
        'sono' => $sono,
        'rang' => $rang,
        'departments' => 'Departments:',

      ]);
      //определеяем есть ли в подчинении и потом отделяем больше 1. Сюда попадает и оборудование
      if (TRUE == isset($login['directreports'][0])) {
        if ($login['directreports']["count"] > 0) {
          //поиск подчиненных по паттерну где в состав входит любая русская буква,
          // отсекает всех серверы без русских букв в названии
          for ($j = 0; $j < $login['directreports']["count"]; $j++) {

            if ((1 == preg_match($patternRu, $login['directreports'][$j])) && (FALSE == strripos($login['directreports'][$j], $patternDisabled))) {
              //записываем в базу в подчинении
              $employee = $login['directreports'][$j];
              $department = preg_replace($patternRuWithSpace, '', $employee);
              $statement = $pdo->prepare('INSERT INTO employees (cn, objectsid, employee, sono) VALUES (:cn, :objectsid, :employee, :sono)');
              $statement->execute([
                'cn' => $cn,
                'objectsid' => $samaccountname,
                'employee' => $department,
                'sono' => $sono
              ]);
            }
          }
        }
      }
    }
  }
  if (isset($controls[LDAP_CONTROL_PAGEDRESULTS]['value']['cookie'])) {
    // You need to pass the cookie from the last call to the next one
    $cookie = $controls[LDAP_CONTROL_PAGEDRESULTS]['value']['cookie'];
  } else {
    $cookie = '';
  }
  // Empty cookie means last page
} while (!empty($cookie));
