<?php
//连接数据库
include 'comment.php';

//接受前端前端传过来的数据
$id = isset($_GET['id']) ? $_GET['id'] : '3';
$num = isset($_GET['num']) ? $_GET['num'] : '';
$md = isset($_GET['md']) ? $_GET['md'] : '3';


if($md == 1) {
    //插入之后查找购物车数据库里的所有数据
    $sql3 = "SELECT * FROM gouwuche";

    //执行语句
    $res3 = $conn->query($sql3);//结果集

    //提取结果集里的数据
    $content3 = $res3->fetch_all(MYSQLI_ASSOC);

    //传给前端
    echo json_encode($content3,JSON_UNESCAPED_UNICODE);
}
if($md == 2) {
   //SQL查询语句
    $sql = "SELECT * FROM liebiao WHERE id = '$id'";

    //执行语句
    $res = $conn->query($sql);//结果集

    //拿到结果集里的内容
    $content = $res->fetch_all(MYSQLI_ASSOC);

  

    $title = $content[0]['title'];
    $price = $content[0]['price'];
    $img = $content[0]['img'];


    // echo $title, $price, $img;
    // echo $img;

    $sql2 = "INSERT INTO gouwuche(id,title,price,img,num) VALUES('$id','$title','$price','$img','$num')";

    // //执行语句
    $res2 = $conn->query($sql2);//结果集

    if($res2){
        echo yes;
    }else{
        echo no;
    }
}
if($md == 3){  
   // 删除语句
    $sql = "DELETE FROM gouwuche WHERE id = '$id'";
    //执行语句
    $res = $conn->query($sql);//结果集

}
if($md == 4){
     // 删除语句
    $sql = "DELETE FROM gouwuche";
     //执行语句
     $res = $conn->query($sql);//结果集

}


?>