$(function(){    


    var data = decodeURI(location.search);//?id  提取传输过来的数据
    var str = data.slice(1);//提取？号后面的数据，（去除问号）
    // console.log((str));
    
    
    function init(i){//拿ID从数据库里请求数据
        $.ajax({
            type : 'get',
            url : './php/xiangqinye.php',
            data :'id=' + i,
            success: function(res){
               ires = JSON.parse(res);
               console.log(ires);
               creat(ires);
            }
        })
        
   }
   init(str);
    function creat(ires){
        // 渲染图片部分
        var html =  `<img src = '${ires[0].img}' alt="">`;
        $('.images-cover').html(html);
        var html1 =  `<img src = '${ires[0].img}' alt="">`;
        $('#img-one').html(html1);
        $('#img-one').click()
        var html2 =  `<img src = '${ires[0].img1}' alt="">`;
        $('#img-two').html(html2);
        var html3 =  `<img src = '${ires[0].img2}' alt="">`;
        $('#img-three').html(html3);
        var html4 =  `<img src = '${ires[0].img3}' alt="">`;
        $('#img-four').html(html4);
        var html5 =  `<img src = '${ires[0].img4}' alt="">`;
        $('#img-five').html(html5);
        
        $('.price').html(ires[0].price)//价格

        $('.title-name').html(ires[0].title);//名字

        $('.count').html(ires[0].comments);//评论数
        
    }
    var buy_num = $('#buy-num').val();
     
    $('.btn-reduce').click(function(){//减少购买数量
        if(buy_num <= 1){
           $('#buy-num').val('1')
        }else if(buy_num > 1){
            buy_num = --buy_num;
            $('#buy-num').val(buy_num);
        }
         
    })
    $('.btn-add').click(function(){//增加购买数量
            buy_num = ++buy_num;
            $('#buy-num').val(buy_num);
    })
 
   
   $('.btn-join').click(function(){//点击购物车的时候将商品ID和数量传给后端
        $.ajax({
            type : 'get',
            url : 'php/gouwuche.php',
            data : 'id=' + str + '&num=' +  $('#buy-num').val()+'&md=2',
            success: function(res){
                 console.log(res);
                if(res = 'yes'){
                    $('.success').css('display','inline')
                }
          }
        })
    })
    

    if (getCookie('name')) {
        var name = getCookie('name');//登陆成功显示登录用户名
        $('.changename').html(name + ',欢迎你！');
        $('.change').mouseover(function () {
            $('#hidden').css('display', 'block');
        })
        $('.change').mouseout(function () {
            $('#hidden').css('display', 'none');
        })
        $('.quit').click(function () {
            removeCookie('name');//点击退出的时候，删除COOKIE后跳到登录页
            location.href = 'denglu.html';
        })
    } else {
        $('.changename').html('你好，请登录');
    }



  

})