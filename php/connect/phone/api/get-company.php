<?php
    //ищем по компании

    try {
        require '../../connect.php';
        $sono = $_POST['sono'];
            $statement = $pdo->prepare("SELECT * FROM users WHERE sono LIKE '$sono%'");
            $statement->execute();
            $users = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($users);
            echo($json);

        }
    catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
    }
