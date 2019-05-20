<?php
//后端，接受前端数据，查看数据库是否有该数据
//连接数据库
include 'comment.php';
//接受参数
$page = isset($_GET['page']) ? $_GET['page'] : '';
$num = isset($_GET['num']) ? $_GET['num'] : '';
$type = isset($_GET['type']) ? $_GET['type'] : '';
$order = isset($_GET['order']) ? $_GET['order'] : '';
$min = isset($_GET['min']) ? $_GET['min'] : '';
$max = isset($_GET['max']) ? $_GET['max'] : '';


//写查询语句 
	/*
	 	SELECT * FROM datalist LIMIT 0,10;
	 	
	 	page   num   所求区间    求的量：起始下标index
	 	1      20     0-19        0 
	 	2      20     20-39       20
	 	3      20     40-59       40
	 	
	 	公式：index = (page-1) * num
    */
$index = ($page - 1) * $num;//所求区间的起始下标

//是否排序判断
if($type){//如果$type有值，说明需要进行排序
	$sql = "SELECT * FROM liebiao ORDER BY $type $order LIMIT $index,$num";
}else if($min&&$max){
    $sql = "SELECT * FROM liebiao WHERE price BETWEEN $min AND $max LIMIT $index , $num";
}else{//如果没有值，就正常排序
	$sql = "SELECT * FROM liebiao LIMIT $index , $num";//每次拿40条数据
}



//执行语句
$res = $conn->query($sql);//结果集
// var_dump($res);

//需求：拿到结果集里的数据
$content = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($content);

// var_dump ($content);

//查询所有的数据，为了得到一共多少条数据，以做排序按钮
$sql2 = 'SELECT * FROM liebiao';

//执行sql2语句
$res2 = $conn->query($sql2);

//传输多个数据给前端，做成关联数组
$datalist = array(
    'data'=>$content,//需要的40条数据
    'total'=>$res2->num_rows,//总数据条数
    'page'=>$page,//当前页面
    'num'=>$num//条数
);
echo json_encode($datalist,JSON_UNESCAPED_UNICODE);




?>