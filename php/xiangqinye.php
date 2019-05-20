<?php
//连接数据库
include 'comment.php';

// echo '创建成功';//检测
    
//接受前端传来的数据
$id = isset($_GET['id']) ? $_GET['id'] : '';
// echo($id);

// //编写SQL查询语句
$sql = "SELECT * FROM liebiao WHERE id = '$id'";

// //执行语句
$res = $conn->query($sql);//结果集


//提取数据
$content = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($content,JSON_UNESCAPED_UNICODE);

?>