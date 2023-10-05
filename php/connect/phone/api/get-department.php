<?php
    //ищем по департаментам

    try {
        require '../../connect.php';
        $sono = $_POST['sono'];
        $department = $_POST['department'];
            $statement = $pdo->prepare("SELECT * FROM users WHERE (sono LIKE '$sono') AND (department LIKE '%$department%')");
            $statement->execute();
            $users = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($users);
            echo($json);

        }
    catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
    }
