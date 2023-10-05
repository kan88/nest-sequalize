<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $name_of_position = !empty($_POST['name_of_position']) ? $_POST['name_of_position'] : null;
  $name_of_vacancy = !empty($_POST['name_of_vacancy']) ? $_POST['name_of_vacancy'] : null;
  $department = !empty($_POST['department']) ? $_POST['department'] : null;
  $company = isset($_POST['company']) ? $_POST['company'] : null;
  $date_open = !empty($_POST['date_open']) ? $_POST['date_open'] : null;
  $date_close = !empty($_POST['date_close']) ? $_POST['date_close'] : null;
  $employees_quantity = isset($_POST['employees_quantity']) ? $_POST['employees_quantity'] : null;
  $sex_value = ($_POST['sex_value'] == null) ?  NULL : intval($_POST['sex_value']);
  $age_min = !empty($_POST['age_min']) ? $_POST['age_min'] : null;
  $age_max = !empty($_POST['age_max']) ? $_POST['age_max'] : null;
  $salary_gross = ($_POST['salary_gross'] == null) ?  NULL : intval($_POST['salary_gross']);
  $salary_min = !empty($_POST['salary_min']) ? $_POST['salary_min'] : null;
  $salary_max = !empty($_POST['salary_max']) ? $_POST['salary_max'] : null;
  $salary_show = isset($_POST['salary_show']) ? $_POST['salary_show'] : null;
  $experience = ($_POST['experience'] == null) ?  NULL : intval($_POST['experience']);
  $employment_type = ($_POST['employment_type'] == null) ?  NULL : intval($_POST['employment_type']);
  $functional = !empty($_POST['functional']) ? $_POST['functional'] : null;
  $wishes = !empty($_POST['wishes']) ? $_POST['wishes'] : null;
  $advantages = !empty($_POST['advantages']) ? $_POST['advantages'] : null;
  $offering = !empty($_POST['offering']) ? $_POST['offering'] : null;
  $status = isset($_POST['status']) ? $_POST['status'] : null;
  $contacts = isset($_POST['contacts']) ? $_POST['contacts'] : null;
  $type = !empty($_POST['type']) ? $_POST['type'] : null;
  $period = !empty($_POST['period']) ? $_POST['period'] : null;
  $region = !empty($_POST['region']) ? $_POST['region'] : null;
  $address = !empty($_POST['address']) ? $_POST['address'] : null;
  $metro = !empty($_POST['metro']) ? $_POST['metro'] : null;
  $role = !empty($_POST['role']) ? $_POST['role'] : null;
  $full_name = !empty($_POST['full_name']) ? $_POST['full_name'] : null;
  $account_number = !empty($_POST['account_number']) ? $_POST['account_number'] : null;
  $is_view = !empty($_POST['is_view']) ? $_POST['is_view'] : null;
  $is_interview = !empty($_POST['is_interview']) ? $_POST['is_interview'] : null;
  $is_approve = !empty($_POST['is_approve']) ? $_POST['is_approve'] : null;
  $education = ($_POST['education'] == null) ?  NULL : intval($_POST['education']);
  $position = !empty($_POST['position']) ? $_POST['position'] : null;
  $avatar_src = !empty($_POST['avatar_src']) ? $_POST['avatar_src'] : null;
  $date = date("Y-m-d");



  //записываем сам запрос
  $statement = $pdo->prepare('INSERT INTO vacancy_request (name_of_position, name_of_vacancy, department, company,
  date_open, date_close, employees_quantity, sex_value, age_min, age_max, salary_gross, salary_min,
  salary_max, salary_show, experience, employment_type, functional, wishes, advantages, offering, status, contacts, education, date) VALUES
  (:name_of_position, :name_of_vacancy, :department, :company,
  :date_open, :date_close, :employees_quantity, :sex_value, :age_min, :age_max, :salary_gross, :salary_min,
  :salary_max, :salary_show, :experience, :employment_type, :functional, :wishes, :advantages, :offering, :status, :contacts, :education, :date)');
  $statement->execute([
    'name_of_position' => $name_of_position,
    'name_of_vacancy' => $name_of_vacancy,
    'department' => $department,
    'company' => $company,
    'date_open' => $date_open,
    'date_close' => $date_close,
    'employees_quantity' => $employees_quantity,
    'sex_value' => $sex_value,
    'age_min' => $age_min,
    'age_max' => $age_max,
    'salary_gross' => $salary_gross,
    'salary_min' => $salary_min,
    'salary_max' => $salary_max,
    'salary_show' => $salary_show,
    'experience' => $experience,
    'employment_type' => $employment_type,
    'functional' => $functional,
    'wishes' => $wishes,
    'advantages' => $advantages,
    'offering' => $offering,
    'status' => $status,
    'contacts' => $contacts,
    'education' => $education,
    'date' => $date,

  ]);
  $id_request = $pdo->lastInsertId();
  if ($type != null) {
    for ($i = 0; $i < count($type); $i++) {
      $statement = $pdo->prepare('INSERT INTO vacancy_schedule (id_request, type, period, status) VALUES
      (:id_request, :type, :period, :status)');
      $statement->execute([
        'id_request' => $id_request,
        'type' => $type[$i],
        'period' => $period[$i],
        'status' => 0,
      ]);
    }
  }
  if ($region != null) {
    for ($i = 0; $i < count($region); $i++) {
      $statement = $pdo->prepare('INSERT INTO vacancy_addresses (id_request, region, address, metro, status) VALUES
      (:id_request, :region, :address, :metro, :status)');
      $statement->execute([
        'id_request' => $id_request,
        'region' => $region[$i],
        'address' => $address[$i],
        'metro' => $metro[$i],
        'status' => 0,
      ]);
    }
  }
  if ($role != null) {
    for ($i = 0; $i < count($role); $i++) {
      $statement = $pdo->prepare('INSERT INTO vacancy_participants (id_request, role, full_name, account_number, is_view,
      is_interview, is_approve, avatar_src, position, status) VALUES
      (:id_request, :role, :full_name, :account_number, :is_view, :is_interview, :is_approve, :avatar_src, :position, :status)');
      $statement->execute([
        'id_request' => $id_request,
        'role' => $role[$i],
        'full_name' => $full_name[$i],
        'account_number' => $account_number[$i],
        'is_view' => $is_view[$i],
        'is_interview' => $is_interview[$i],
        'is_approve' => $is_approve[$i],
        'position' => $position[$i],
        'avatar_src' => $avatar_src[$i],
        'status' => 0,
      ]);
    }
  }
  $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE id=$id_request");
  $statement->execute();
  $requests = $statement->fetchAll(PDO::FETCH_ASSOC);
  for ($i = 0; $i < count($requests); $i++) {
    $id = $requests[$i]["id"];
    $statement = $pdo->prepare("SELECT * FROM vacancy_addresses WHERE id_request=$id");
    $statement->execute();
    $adresses = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['addresses' => $adresses];
    $statement = $pdo->prepare("SELECT * FROM vacancy_schedule WHERE id_request=$id");
    $statement->execute();
    $schedules = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['schedules' => $schedules];
    $statement = $pdo->prepare("SELECT * FROM vacancy_participants WHERE id_request=$id");
    $statement->execute();
    $participants = $statement->fetchAll(PDO::FETCH_ASSOC);
    $requests[$i] += ['participants' => $participants];
  };
  $json = json_encode($requests);
  echo ($json);
} catch (PDOException $e) {
  echo "Database error: " . $e->getMessage();
}
