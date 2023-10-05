<?php
    //логика по тестированию
try {
    require '../../connect.php';
    $id = $_POST['id'];
    $auth = $_SERVER['USER'];
    $statement = $pdo->prepare("INSERT INTO voit001 (id, auth, q1, q2, q3, q4, q5, q6, q7, q8, q9 , q10 , q11, q12 , q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23) VALUES (:id, :auth, :q1, :q2, :q3, :q4, :q5, :q6, :q7, :q8, :q9 , :q10 , :q11, :q12 , :q13, :q14, :q15, :q16, :q17, :q18, :q19, :q20, :q21, :q22, :q23)");
    $statement->execute([
        'id' => $id,
        'auth' => $auth,
        'q1' => "{$_POST['1']}",
        'q2' => "{$_POST['2']}",
        'q3' => "{$_POST['3']}",
        'q4' => "{$_POST['4']}",
        'q5' => "{$_POST['5']}",
        'q6' => "{$_POST['6']}",
        'q7' => "{$_POST['7']}",
        'q8' => "{$_POST['8']}",
        'q9' => "{$_POST['9']}",
        'q10' => "{$_POST['10']}",
        'q11' => "{$_POST['11']}",
        'q12' => "{$_POST['12']}",
        'q13' => "{$_POST['13']}",
        'q14' => "{$_POST['14']}",
        'q15' => "{$_POST['15']}",
        'q16' => "{$_POST['16']}",
        'q17' => "{$_POST['17']}",
        'q18' => "{$_POST['18']}",
        'q19' => "{$_POST['19']}",
        'q20' => "{$_POST['20']}",
        'q21' => "{$_POST['21']}",
        'q22' => "{$_POST['22']}",
        'q23' => "{$_POST['23']}",
    ]);

    if (isset($_POST['gender'])) {
        $statement = $pdo->prepare("UPDATE voit001 SET gender=:gender WHERE id=:id");
        $statement->execute([
            'id' => $id,
            'gender' => "{$_POST['gender']}",
        ]);
    };

    if (isset($_POST['age'])) {
        $statement = $pdo->prepare("UPDATE voit001 SET age=:age WHERE id=:id");
        $statement->execute([
            'id' => $id,
            'age' => "{$_POST['age']}",
        ]);
    };

    if (isset($_POST['work'])) {
        $statement = $pdo->prepare("UPDATE voit001 SET work=:work WHERE id=:id");
        $statement->execute([
            'id' => $id,
            'work' => "{$_POST['work']}",
        ]);
    };

    }
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
