<?php
//后端，接受前端数据，查看数据库是否有该数据
//连接数据库
include 'comment.php';
//接受参数
$name = isset($_POST['name']) ? $_POST['name'] : '';
$psw = isset($_POST['psw']) ? $_POST['psw'] : '';


//写SQL查询语句
$sql = "SELECT * FROM user WHERE name='$name' AND psw='$psw'";

//写执行语句
$res = $conn->query($sql);

// var_dump($res);//测试

if($res->num_rows){
    //找到了，允许登录
    echo 'yes';
}else{
    //没找到，不准登录
    echo 'no';
}
?>