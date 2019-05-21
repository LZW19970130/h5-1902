$(function () {

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



    function init() {
        $.ajax({
            type: 'get',//用GET的方式获取数据
            url: 'php/gouwuche.php?md=1',
            success: function (str) {
                res = JSON.parse(str);//将字符串转化成对象
                console.log(res);
                creat(res);
            }
        })
    }
    init();

    function creat(res) {//渲染
        var html = res.map(function (item) {
            return `<li id="${item.id}" class="goods">
           <input type="checkbox" class="checkbox">
           <div id="good-img"><img src="${item.img}" alt=""></div>
           <p class="title">
                  <span>
                      <img src="images/markit.png" alt="" class="markit">
                  </span>
                  <span id="good-title">${item.title}</span>
              </p>
            <span id="single-price">￥${item.price}</span>  
            <div class="btn-control" >
              <a href="javascript:void(0);" class="btn-reduse">-</a>
              <input autocomplete="off" type="text" class="itext" value="${item.num}"  minnum="1">
              <a href="javascript:void(0);" class="btn-add" >+</a>
          </div>
          <span class="youhuo">有货</span>
          <span class="good-sum">￥${item.price}</span>
          <a href="###" class="delete">删除</a>
       </li>`
        }).join('');
        $('.goods-list').html(html);
    }

    //数量变化，加减数量，手动修改数量
    $('.goods-list').on('click', '.btn-add', function () {//数量加
        // alert(123);
        var num = $(this).prev().val();
        num++;
        $(this).prev().val(num);
        if (num > 1) {
            $(this).prev().prev().css('color', '#666666');
        }
        total($(this));//刷新小计
    });

    $('.goods-list').on('click', '.btn-reduse', function () {//数量加
        // alert(123);
        var num = $(this).next().val();
        num--;
        if (num <= 1) {//设置下限
            num = 1;
            $(this).css('color', 'white');
        }
        $(this).next().val(num);
        total($(this));//刷新小计
    });


    //手动输入的时候，改变数量
    $('.goods-list').on('input', '.itext', function () {
        var num = $(this).val();
        if (num <= 1) {
            num = 1;
        }
        $(this).val(num);
        total($(this));//刷新小计
    });

    //小计的计算
    function total(now) {
        //找到数量
        var num = $(now).parent().find('.itext').val();
        //找到单价
        var price = $(now).parent().prev().html().slice(1);
        //小计=单价*数量
        var xiaoji = (num * price);
        $(now).parent().next().next().html('￥' + xiaoji)
        all()
    }

    //删除单行
    $('.goods-list').on('click', '.delete', function () {
        var res = confirm('您确定要删除吗');
        if (res) {
            $(this).parent().remove();
            function newinit(id) {
                $.ajax({
                    type: 'get',
                    url: './php/gouwuche.php',
                    data: 'id=' + id + '&md=3',
                    success: function (str) {
                    }
                })
            }
            newinit($(this).parent().attr('id'));
        }

    })

    //全选框控制复选框
    $('.all-goods').click(function() {
        var istrue = $('.all-goods').prop('checked');
		$('.goods-list .checkbox').prop('checked',istrue);
		all();
    });
    
    //设置单选框事件
    $('.goods-list').on('click','.checkbox',function(){
        all();
    })

    //计算总数量和总价格
    var arr = [];
    function all(){
        arr = [];//存放被勾选的复选框的下标
        $('.goods-list .checkbox').each(function(i,item){
            if($(item).prop('checked')){
                arr.push(i);//被勾选了，将下标存起来
                $('.goods-list .checkbox')[i].parent().css('background','pink');
            }
        })

        //总数量
        var num = 0;
        //总价格
        var price = 0;

        arr.forEach(function(item){
            num += $('.itext').eq(item).val() * 1;
            price += $('.good-sum').eq(item).text().slice(1) * 1;
        });
        
        //渲染
        $('#amount-sum').html(num);
        $('#all-price').html(price);

    }

    
	//点击单选框反过来控制全选按钮
	$('.goods-list').on('click','.checkbox',function() {
		var len = $('.checkbox:checked').size();
        var total = $('.checkbox').size();
		if(len == total) {
			//全都勾选了
			$('.all-goods').prop('checked',true);
		}else{
			$('.all-goods').prop('checked',false);
		}
		all();//刷新总数量和总价格
	});


    //清空购物车
    $('.delete-all-goods').click(function () {
        var res = confirm('您确定要清空购物车吗');
        if (res) {
            function inewinit() {
                $.ajax({
                    type: 'get',
                    url: './php/gouwuche.php',
                    data: '&md=4',
                    success: function (str) {
                    }
                })
            }
            inewinit()
         
            for(var i =  $('.goods-list .goods').size()-1; i >= 0; i--) {//从数组的尾部开始删除
				$('.goods-list .goods').eq(i).remove();
			}
			all();//刷新总数量和总价格
        }

    })











})