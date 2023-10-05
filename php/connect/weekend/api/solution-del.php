<?php
    //подключаемся к базе данных и записываем данные подтверждении брони или отклонении администратором
try {
    require '../../connect.php';
    $data = [
        'status' => "{$_POST['status']}",
        'id' => "{$_POST['id']}",
    ];
    $sql = "UPDATE weekend SET status=:status WHERE id=:id";
    $stmt= $pdo->prepare($sql);
    $stmt->execute($data);
}   
    
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
