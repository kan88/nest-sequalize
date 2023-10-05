<?php
    //подключаемся к базе данных и записываем данные при размещении путевки статус 0 размещен, 1 согласован, 3 отклонен
try {
    require '../../connect.php';

        $statement = $pdo->prepare('UPDATE news SET views=:views WHERE id=:id');
        $statement->execute([
            'id' => "{$_POST['id']}",
            'views' => "{$_POST['views']}",

        ]);
}  
catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>

