<?php
    //подключаемся к базе данных, получаем все новости и отдаем на стороне сервера
    try {
        $id = $_POST["id"];
        require '../../connect.php';
        $statement = $pdo->prepare("SELECT * FROM images WHERE step='1' AND news=:id");
        $statement->execute([
            'id' => $id,
        ]);
        $images = $statement->fetchAll(PDO::FETCH_ASSOC);
        $statement = $pdo->prepare("SELECT * FROM news WHERE id=:id");
        $statement->execute([
            'id' => $id,
        ]);
        $news = $statement->fetchAll(PDO::FETCH_ASSOC);
        foreach ($images as $image) {
            for ($i = 0; $i < count($news); $i++) {
                if ($image['news'] == $news[$i]['id']) {
                    if (isset($news[$i]['images'])) {
                        array_push($news[$i]['images'], $image);
                    } else {
                        $arr = [];
                        array_push($arr, $image);
                        $news[$i] += ['images' => $arr];
                    }
                    break;
                };
            };
        };
        $json = json_encode($news);
        echo($json);
    }


    catch (PDOException $e) {
        echo "Database error: " . $e->getMessage();
    }
