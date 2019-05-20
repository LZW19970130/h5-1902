<?php
////后端：接收前端的数据，查询该用户是否存在，给前端返回相关信息
	
    //查询之前要连接数据库
    include 'comment.php';

    //加收前端的数据
    $name = isset($_GET['name']) ? $_GET['name'] : '';

    //写查询语句
    $sql = "SELECT * FROM user WHERE name ='$name'";

    //执行SQL语句
    $res = $conn->query($sql);//结果集
  
    //检测
    // var_dump($res); //如果找到了，num_rows值则为1，反之为0；
    if($res->num_rows){
        //找到了，已存在，不给注册
        echo 'no';
    }else{
        echo 'yes';
    }
    ?>
