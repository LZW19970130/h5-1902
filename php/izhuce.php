<?php
//设置编码
header('content-type:text/html;charset=utf-8');
//接收前端的数据，插入到数据库，如果搞定就将状态发送给前端
//先连接数数据库
include 'comment.php';

//接受数据
$name = isset($_POST['name']) ? $_POST['name'] : '';
$psw = isset($_POST['psw']) ? $_POST['psw'] :'';

//写sql插入语句
$sql = "INSERT INTO user(name,psw) VALUES('$name','$psw')";

//执行语句
$res = $conn->query($sql);//insert  update delete语句都是返回布尔值成功正确则true,错误则false

// var_dump($res);//测试
if($res){
    //表示插入成功
    echo 'yes';
}else{
    //插入失败
   echo 'no' ;
}


?>