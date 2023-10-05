<?php
//подключаемся к базе данных и записываем данные при размещении путевки
try {
  require '../../connect.php';
  $name_of_position = isset($_POST['name_of_position']) ? $_POST['name_of_position'] : null;
  $name_of_vacancy = isset($_POST['name_of_vacancy']) ? $_POST['name_of_vacancy'] : null;
  $department = isset($_POST['department']) ? $_POST['department'] : null;
  $company = isset($_POST['company']) ? $_POST['company'] : null;
  $date_open = isset($_POST['date_open']) ? $_POST['date_open'] : null;
  $date_close = isset($_POST['date_close']) ? $_POST['date_close'] : null;
  $employees_quantity = isset($_POST['employees_quantity']) ? $_POST['employees_quantity'] : null;
  $sex_value = isset($_POST['sex_value']) ? intval($_POST['sex_value']) : null;
  $age_min = !empty($_POST['age_min']) ? $_POST['age_min'] : null;
  $age_max = !empty($_POST['age_max']) ? $_POST['age_max'] : null;
  $salary_gross = !empty($_POST['salary_gross']) ? $_POST['salary_gross'] : null;
  $salary_min = !empty($_POST['salary_min']) ? $_POST['salary_min'] : null;
  $salary_max = !empty($_POST['salary_max']) ? $_POST['salary_max'] : null;
  $salary_show = isset($_POST['salary_show']) ? $_POST['salary_show'] : null;
  $experience = isset($_POST['experience']) ? $_POST['experience'] : null;
  $employment_type = isset($_POST['employment_type']) ? $_POST['employment_type'] : null;
  $functional = isset($_POST['functional']) ? $_POST['functional'] : null;
  $wishes = isset($_POST['wishes']) ? $_POST['wishes'] : null;
  $advantages = isset($_POST['advantages']) ? $_POST['advantages'] : null;
  $offering = isset($_POST['offering']) ? $_POST['offering'] : null;
  $status = isset($_POST['status']) ? $_POST['status'] : null;
  $contacts = isset($_POST['contacts']) ? $_POST['contacts'] : null;
  $type = isset($_POST['type']) ? $_POST['type'] : null;
  $period = isset($_POST['period']) ? $_POST['period'] : null;
  $region = isset($_POST['region']) ? $_POST['region'] : null;
  $address = isset($_POST['address']) ? $_POST['address'] : null;
  $metro = isset($_POST['metro']) ? $_POST['metro'] : null;
  $role = isset($_POST['role']) ? $_POST['role'] : null;
  $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : null;
  $account_number = isset($_POST['account_number']) ? $_POST['account_number'] : null;
  $is_view = isset($_POST['is_view']) ? $_POST['is_view'] : null;
  $is_interview = isset($_POST['is_interview']) ? $_POST['is_interview'] : null;
  $is_approve = isset($_POST['is_approve']) ? $_POST['is_approve'] : null;
  $education = !empty($_POST['education']) ? $_POST['education'] : null;
  $position = isset($_POST['position']) ? $_POST['position'] : null;
  $avatar_src = isset($_POST['avatar_src']) ? $_POST['avatar_src'] : null;
  $id = isset($_POST['id']) ? $_POST['id'] : null;
  $id_participant = isset($_POST['id_participant']) ? $_POST['id_participant'] : null;
  $id_schedule = isset($_POST['id_schedule']) ? $_POST['id_schedule'] : null;
  $id_address = isset($_POST['id_address']) ? $_POST['id_address'] : null;
  $status_participant = isset($_POST['status_participant']) ? $_POST['status_participant'] : null;
  $status_schedule = isset($_POST['status_schedule']) ? $_POST['status_schedule'] : null;
  $status_address = isset($_POST['status_address']) ? $_POST['status_address'] : null;
  $date = date("Y-m-d");



  //записываем сам запрос
  $statement = $pdo->prepare('UPDATE vacancy_request SET (name_of_position, name_of_vacancy, department, company,
  date_open, date_close, employees_quantity, sex_value, age_min, age_max, salary_gross, salary_min,
  salary_max, salary_show, experience, employment_type, functional, wishes, advantages, offering, status, contacts, education, date) =
  (:name_of_position, :name_of_vacancy, :department, :company,
  :date_open, :date_close, :employees_quantity, :sex_value, :age_min, :age_max, :salary_gross, :salary_min,
  :salary_max, :salary_show, :experience, :employment_type, :functional, :wishes, :advantages, :offering, :status, :contacts, :education, :date) WHERE id=:id');
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
    'status' => intval($status),
    'contacts' => $contacts,
    'education' => $education,
    'date' => $date,
    'id' => $id,
  ]);

  if ($type != null) {
    for ($i = 0; $i < count($type); $i++) {
      if (empty($id_schedule[$i])) {
        $statement = $pdo->prepare('INSERT INTO vacancy_schedule (id_request, type, period, status) VALUES
      (:id_request, :type, :period, :status)');
        $statement->execute([
          'id_request' => $id,
          'type' => $type[$i],
          'period' => $period[$i],
          'status' => 0
        ]);
      } else {
        $statement = $pdo->prepare('UPDATE vacancy_schedule SET (id_request, type, period, status) =
        (:id_request, :type, :period, :status)  WHERE id=:id');
        $statement->execute([
          'id_request' => $id,
          'type' => $type[$i],
          'period' => $period[$i],
          'id' => intval($id_schedule[$i]),
          'status' => intval($status_schedule[$i])
        ]);
      }
    }
  }

  if ($region != null) {
    for ($i = 0; $i < count($region); $i++) {
      if (empty($id_address[$i])) {
        $statement = $pdo->prepare('INSERT INTO vacancy_addresses (id_request, region, address, metro, status) VALUES
      (:id_request, :region, :address, :metro, :status)');
        $statement->execute([
          'id_request' => $id,
          'region' => $region[$i],
          'address' => $address[$i],
          'metro' => $metro[$i],
          'status' => 0
        ]);
      } else {
        $statement = $pdo->prepare('UPDATE vacancy_addresses SET (id_request, region, address, metro, status) =
      (:id_request, :region, :address, :metro, :status) WHERE id=:id');
        $statement->execute([
          'id_request' => $id,
          'region' => $region[$i],
          'address' => $address[$i],
          'metro' => $metro[$i],
          'id' => intval($id_address[$i]),
          'status' => intval($status_address[$i])

        ]);
      }
    }
  }
  if ($role != null) {
    for ($i = 0; $i < count($role); $i++) {
      if (empty($id_participant[$i])) {
        $statement = $pdo->prepare('INSERT INTO vacancy_participants (id_request, role, full_name, account_number, is_view,
        is_interview, is_approve, avatar_src, position, status) VALUES
        (:id_request, :role, :full_name, :account_number, :is_view, :is_interview, :is_approve, :avatar_src, :position, :status)');
        $statement->execute([
          'id_request' => $id,
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
      } else {
        $statement = $pdo->prepare('UPDATE vacancy_participants SET (id_request, role, full_name, account_number, is_view,
        is_interview, is_approve, avatar_src, position, status) =
        (:id_request, :role, :full_name, :account_number, :is_view, :is_interview, :is_approve, :avatar_src, :position, :status) WHERE id=:id');
        $statement->execute([
          'id_request' => $id,
          'role' => $role[$i],
          'full_name' => $full_name[$i],
          'account_number' => $account_number[$i],
          'is_view' => $is_view[$i],
          'is_interview' => $is_interview[$i],
          'is_approve' => $is_approve[$i],
          'position' => $position[$i],
          'avatar_src' => $avatar_src[$i],
          'status' => 0,
          'id' => intval($id_participant[$i]),
          'status' => intval($status_participant[$i])
        ]);
      }
    }
  }
  $statement = $pdo->prepare("SELECT * FROM vacancy_request WHERE id=$id");
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
