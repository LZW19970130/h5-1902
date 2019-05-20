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

    //初始化数据 
    var type = '';
    var order = '';
    var ipage = 1;//第几页
    var num = 40;//一页里面有40条数据
    var min = '';
    var max = '';

    function init(ip) {//与后台交互，渲染数据
        $.ajax({
            type: 'get',
            url: './php/liebiaoye.php',
            data: 'page=' + ip + '&num=' + num + '&type=' + type + '&order=' + order + '&max=' + max + '&min=' + min,
            success: function (str) {
                //    console.log(str);
                creat(str);//在函数外进行渲染
                // slide();//缓出缓入事件
            }
        })

    }
    init(ipage);
    //渲染数据
    function creat(str) {
        var arr = JSON.parse(str);//将字符串数据转成对象
        console.log(arr);

        var res = arr.data.map(function (item) {
            return ` <li data-id="${item.id}">
                  <div class="p-img">
                  <img src="${item.img}" alt="">
                 </div>
                 <span class="price">￥${item.price}</span>
                 <p class="title">${item.title}</p>
                 <h4 >评价<span class="comment">${item.comments}</span>条</h4>
                 <h5>已有<span class="sell">${item.sell}</span>人购买</h5>
           </li>`

        }).join('');
        $('.list').html(res)//渲染到页面；



        var pages = Math.ceil(arr.total / arr.num);//向上求整，求一共多少个页面按钮
        $('.itishi').html(pages);
        var html = '';//准备一个空数组，存放结果
        for (var i = 0; i < pages; i++) {
            html += '<a href="###">' + (i + 1) + '</a>';
        }
        $('#pages').html(html);//渲染分页节点
        $('#pages a').eq(arr.page - 1).addClass('btnactive');

        $('#pages').on('click', 'a', function () {
            var iipage = $(this).index() + 1;
            init(iipage);

        });

        $('#weiye').click(function () {//点击尾页跳转到最后一页
            init(pages);
        });
        $('#xia').click(function () {//点击下一页事件
            if (arr.page >= pages) {
                arr.page == pages;
            } else {
                init(++arr.page);//++写在前面，表示值先自加1后在引用值：
                //++写在后面，表示先引用值，再让值++；
            }
        });

        $('#shang').click(function () {//点击上一页条转页面
            if (arr.page <= 1) {
                arr.page == 1;
            } else {
                init(--arr.page);//++写在前面，表示值先自加1后在引用值：
                //++写在后面，表示先引用值，再让值++；
            }
        });

        if (arr.page <= 1) {
            $('#shang').css('color', '#cccccc');
            $('#shouye').css('color', '#cccccc');
        } else {
            $('#shang').css('color', '#444444');
            $('#shouye').css('color', '#444444');
        };
        if (arr.page < 5) {
            $('#xia').css('color', '#444444');
            $('#weiye').css('color', '#444444');
        } else {
            $('#xia').css('color', '#cccccc');
            $('#weiye').css('color', '#cccccc');
        }

        $('#shouye').click(function () {//点击首页跳转到第一页
            init(1);
        })

    }
    $('.gulidencelist').on('click', 'a', function () {
        $(this).addClass('active').parent().siblings().children().removeClass('active');
    });
    $('#guidesell').click(function () {//根据销售量排行
        // alert(1230);
        type = 'sell';
        order = 'DESC';
        init(1);
    })

    //点击收藏按收藏量排序
    $('#guidecom').click(function () {
        // alert(1230);
        type = 'comments';
        order = 'DESC';
        init(1);
    })

    //点击价格升序排序
    $('#up').click(function () {
        // alert(1230);
        type = 'price';
        order = 'ASC';
        init(1);
    })

    //点击价格降序排序
    $('#down').click(function () {
        // alert(1230);
        type = 'price';
        order = 'DESC';
        init(1);
    });
    //综合排序
    $('#normal').click(function () {
        // alert(1230);
        type = '';
        order = '';
        init(1);
    });


    $('.price-confirm').click(function () {//寻找价格区间数据
        max = $('.max').val().trim();
        min = $('.min').val().trim();
        if (max && min) {
            init(1);
        }
    })
    $('.price-cancle').click(function () {//清空input的数据
        $('.max').val('');
        $('.min').val('');
    });


    // list.onclick = function(ev){
    //     //点击图片和标题跳转至详情页
    //     if(ev.target.className.toLowerCase() == 'title' ){
    //         var id = ev.target.parentNode.dataset.id;//拿到父节点li的ID
    //        //  console.log(id);
    //         location.href = 'xiqngqinye.html?' + id;  
    //     }else if(ev.target.tagName.toLowerCase() == 'img'){
    //        var id = ev.target.parentNode.parentNode.dataset.id;
    //        // console.log(id);
    //        location.href = 'xiangqinye.html?' + id;  
    //     }
    // }  
    $('.list').on('click', '.p-img', function () {//点击图片跳转至详情页
        var id = $(this).parent().attr('data-id');
        location.href = 'xiangqinye.html?' + id;


    })
    $('.list').on('click', '.title', function () {//点击标题跳转至详情页
        var id = $(this).parent().attr('data-id');
        location.href = 'xiangqinye.html?' + id;

    })

});