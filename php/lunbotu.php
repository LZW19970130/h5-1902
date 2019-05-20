<?php
//连接数据库
include 'comment.php';

//接受前端传过来的数据
$order= isset($_GET['iorder']) ? $_GET['iorder'] : '';

//写SQL语句
if($order == 1) {
    //插入之后查找购物车数据库里的所有数据
    $sql1 = "SELECT * FROM liebiao LIMIT 0,15";

    //执行语句
    $res1 = $conn->query($sql1);//结果集

    //提取结果集里的数据
    $content1 = $res1->fetch_all(MYSQLI_ASSOC);

    //传给前端
    echo json_encode($content1,JSON_UNESCAPED_UNICODE);
}
if($order == 2) {
    //插入之后查找购物车数据库里的所有数据
    $sql2 = "SELECT * FROM liebiao LIMIT 16,15";

    //执行语句
    $res2 = $conn->query($sql2);//结果集

    //提取结果集里的数据
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    //传给前端
    echo json_encode($content2,JSON_UNESCAPED_UNICODE);
}
if($order == 3) {
    //插入之后查找购物车数据库里的所有数据
    $sql3 = "SELECT * FROM liebiao LIMIT 31,15";

    //执行语句
    $res3 = $conn->query($sql3);//结果集

    //提取结果集里的数据
    $content3 = $res3->fetch_all(MYSQLI_ASSOC);

    //传给前端
    echo json_encode($content3,JSON_UNESCAPED_UNICODE);
}



?>