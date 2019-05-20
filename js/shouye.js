$(function() {
    if(getCookie('name')){
        var name = getCookie('name');//登陆成功显示登录用户名
      $('.changename').html(name + ',欢迎你！');
      $('.change').mouseover(function(){
          $('#hidden').css('display','block');
      })
      $('.change').mouseout(function(){
        $('#hidden').css('display','none');
    })
    $('.quit').click(function(){
        removeCookie('name');//点击退出的时候，删除COOKIE后跳到登录页
        location.href='denglu.html';
    })
    }else{
        $('.changename').html('你好，请登录');
    }
    
      
    // 轮播图
    //1.将所有图片放在左侧
    var iw = $('.lunbotulist li').eq(0).outerWidth();//拿一个图的长度，outerWidth:标准盒模型的长度写法
    $('.lunbotulist li').css('left',iw);
    $('.lunbotulist li').eq(0).css('left',0);//将第一张放在框内

    //2 开启定时器自动轮播，据图挪走，新图移进
    var timer = null;
    var now = 0;//可视区图片的下标
    timer = setInterval(next,3000);//每隔3s切换一张图片

    function next(){//图片下一张写法
        //旧图挪走
        $('.lunbotulist li').eq(now).animate({'left': -iw},600,'swing');
        now++;
        if(now >= $('.lunbotulist li').size()){
            now = 0;
        }
        //新图移进
        $('.lunbotulist li').eq(now).css('left',iw);//新图在右侧准备就位等待移入
        $('.lunbotulist li').eq(now).animate({'left' : 0},600,'swing');
        light()
    }
    
    function prev(){//图片切换至上一张
        //旧图往右移走
        $('.lunbotulist li').eq(now).animate({'left':iw},600,'swing');
        now--;
        if(now <= -1){
            now = $('.lunbotulist li').size() -1;
        }
        //新图
        $('.lunbotulist li').eq(now).css('left',-iw);//新图在左侧准备
        $('.lunbotulist li').eq(now).animate({'left':0},600,'swing');
        light()

    }
     
    //当鼠标进入轮播图时，停止定时器
   $('.lunbotulist').hover(function(){//移入的时候
       clearInterval(timer);
   },function(){//移除的时候，恢复定时器
        timer = setInterval(next,3000);//每隔3s切换一张图片
   });
   
   var oldtime = new Date();
    //点击左按钮切换图片
    $('#left').click(function(){
        if(new Date() - oldtime >= 600){//当两次点击时间间隔大于0.6s时才有反应
            prev();
        }
        oldtime = new Date();
    });
    //点击右按钮切换图片
    $('#right').click(function(){
        if(new Date() - oldtime >= 600) {//当两次点击时间间隔大于0.6s时才有反应
            next();
        }
        oldtime = new Date();
    });

     //生成焦点
     var lighthtml = '';
     $('.lunbotulist li').each(function(i,item){//i代表每一个li的下标
        lighthtml += '<span>'  + '</span>';
     });
     $('#light').html(lighthtml);
     $('#light').children().eq(0).addClass('active');//设置第一个样式默认

     //焦点跟随
     function light(){
         //让当前的焦点高亮且让其它焦点的样式消失 sliblings:选中其它所有的兄弟
         $('#light').children().eq(now).addClass('active').siblings().removeClass('active');
     }
    
     //点击焦点切换对应的图片,使用事件委托事件
     $('#light').on('click','span',function(){
        var index = $(this).index();//等于当前点击的span的下标

        if(index > now){//从右图切入图片
            $('.lunbotulist li').eq(now).animate({'left' : -iw},600,'swing');
            $('.lunbotulist li').eq(index).css('left',iw);
            $('.lunbotulist li').eq(index).animate({'left' : 0},600,'swing');
        }
        if(index < now){//从左侧切入图片
            $('.lunbotulist li').eq(now).animate({'left': iw},600,'swing' );
            $('.lunbotulist li').eq(index).css('left',-iw);
            $('.lunbotulist li').eq(index).animate({'left': 0},600,'swing' );
        }
        //不管哪个方向切入，执行完之后 now要等于index
        now = index;
        light();//焦点跟随
     });
    //  var oldtime = new Date();
    //      if(new Date() - oldtime >= 800) {
    //          next();
    //      }
    //      oldtime = new Date();
    // 
/*------------------------------------------------------*/ 
var swiperiw = $('.swiper-slide').eq(0).outerWidth();//拿一个图的长度，outerWidth:标准盒模型的长度写法
$('.swiper-slide').css('left',swiperiw);
$('.swiper-slide').eq(0).css('left',0);//将第一张放在框内

//2 开启定时器自动轮播，据图挪走，新图移进
var itimer = null;
var swinow = 0;//可视区图片的下标
itimer = setInterval(swinext,3000);//每隔3s切换一张图片

function swinext(){//图片下一张写法
    //旧图挪走
    $('.swiper-slide').eq(swinow).animate({'left': -swiperiw},400,'swing');
    swinow++;
    if(swinow >= $('.swiper-slide').size()){
        swinow = 0;
    }
    //新图移进
    $('.swiper-slide').eq(swinow).css('left',swiperiw);//新图在右侧准备就位等待移入
    $('.swiper-slide').eq(swinow).animate({'left' : 0},400,'swing');
    swilight()
}

function swiprev(){//图片切换至上一张
    //旧图往右移走
    $('.swiper-slide').eq(swinow).animate({'left':swiperiw},400,'swing');
    swinow--;
    if(swinow <= -1){
        swinow = $('.swiper-slide').size() -1;
    }
    //新图
    $('.swiper-slide').eq(swinow).css('left',-swiperiw);//新图在左侧准备
    $('.swiper-slide').eq(swinow).animate({'left':0},400,'swing');
    swilight()

}
 
//当鼠标进入轮播图时，停止定时器
$('.second_bottom').hover(function(){//移入的时候
   clearInterval(itimer);
},function(){//移除的时候，恢复定时器
    itimer = setInterval(swinext,3000);//每隔3s切换一张图片
});

var oldtime = new Date();
//点击左按钮切换图片
$('.swiper-button-prev').click(function(){
    if(new Date() - oldtime >= 600){//当两次点击时间间隔大于0.8s时才有反应
        swiprev();
    }
    oldtime = new Date();
});
//点击右按钮切换图片
$('.swiper-button-next').click(function(){
    if(new Date() - oldtime >= 600) {//当两次点击时间间隔大于0.8s时才有反应
        swinext();
    }
    oldtime = new Date();
});

 //生成焦点
 var swilighthtml = '';
 $('.swiper-slide').each(function(i,item){//i代表每一个li的下标
    swilighthtml += '<span>'  + '</span>';
 });
 $('.swiper-pagination').html(swilighthtml);
 $('.swiper-pagination').children().eq(0).addClass('swiactive');//设置第一个样式默认

 //焦点跟随
 function swilight(){
     //让当前的焦点高亮且让其它焦点的样式消失 sliblings:选中其它所有的兄弟
     $('.swiper-pagination').children().eq(swinow).addClass('swiactive').siblings().removeClass('swiactive');
 }

 //点击焦点切换对应的图片,使用事件委托事件
 $('.swiper-pagination').on('click','span',function(){
    var swiindex = $(this).index();//等于当前点击的span的下标
    if(swiindex > swinow){//从右图切入图片
        $('.swiper-slide').eq(swinow).animate({'left' : -swiperiw},400,'swing');
        $('.swiper-slide').eq(swiindex).css('left',swiperiw);
        $('.swiper-slide').eq(swiindex).animate({'left' : 0},400,'swing');
    }
    if(swiindex < swinow){//从左侧切入图片
        $('.swiper-slide').eq(swinow).animate({'left': swiperiw},400,'swing' );
        $('.swiper-slide').eq(swiindex).css('left',-swiperiw);
        $('.swiper-slide').eq(swiindex).animate({'left': 0},400,'swing' );
    }
    //不管哪个方向切入，执行完之后 now要等于index
    swinow = swiindex;
    swilight();//焦点跟随
 });

/*-----------------请求数据-------------------*/
   var order = '1';   
   var res = '';  

      function init(change){//请求后台数据
        $.ajax({
            type : 'get',
            url : './php/lunbotu.php',
            data : 'iorder=' + change,
            success : function(str){
                 res = JSON.parse(str)
                 luncreat(res);
                
            }
        })
      }
      init(order);

      $('.selectone').click(function(){
        var order = '1';
        init(order);
      });
      $('.selecttwo').click(function(){
        var order = '2';
        init(order);
      });
      $('.selectthree').click(function(){
        var order = '3';
        init(order);
      });
      function luncreat(res){
        // console.log(res.slice(0,5))

        
        
        // 轮播图第一页
         var htmlone = res.slice(0,5).map(function(item){
        //     var imgs = item.img.split(',')
        // //    console.log(imgs)

        //    var hm = '';


        //     for(var i =0;i<imgs.length;i++){
        //         hm  += ` <img src="${imgs[i]}" alt="">`
        //         console.log(hm);
                
        //     }

   
             return ` <span class="swiper-img" >
             <div class="goods-item" >
                 <span class="goods_item_price_jd">¥${item.price}</span>
                 <span class="goods_item_price_m">¥68</span>
             </div>
             <img src="${item.img}" alt="">
             <h2>${item.title}</h2>
             <h3>好评率98%</h3>
             <h4 class="goods-item-string"></h4>
             <p class="goods_item_btn">立即抢购</p>
         </span>`
         }).join('');
        $('.goods-itemone').html(htmlone);

         //轮播图第二页
         var htmltwo = res.slice(6,11).map(function(item){
             return ` <span class="swiper-img" >
             <div class="goods-item" >
                 <span class="goods_item_price_jd">¥${item.price}</span>
                 <span class="goods_item_price_m">¥68</span>
             </div>
             <img src="${item.img}" alt="">
             <h2>${item.title}</h2>
             <h3>好评率98%</h3>
             <h4 class="goods-item-string"></h4>
             <p class="goods_item_btn">立即抢购</p>
         </span>`
         }).join('');
        $('.goods-itemtwo').html(htmltwo);

        // 轮播图第三页
        var htmlthree = res.slice(10,15).map(function(item){
            
            return ` <span class="swiper-img" >
            <div class="goods-item" >
                <span class="goods_item_price_jd">¥${item.price}</span>
                <span class="goods_item_price_m">¥68</span>
            </div>
            <img src="${item.img}" alt="">
            <h2>${item.title}</h2>
            <h3>好评率98%</h3>
            <h4 class="goods-item-string"></h4>
            <p class="goods_item_btn">立即抢购</p>
        </span>`
        }).join('');
       $('.goods-itemthree').html(htmlthree);
      }
    /*-----------选项按钮状态跟的点击一起变化--------*/   
      for(var i = 0 ; i < $('.select_btn').size()-1; i++){
        $('.select_btn').click(function(){
              for(var k = 0 ; k < $('.select_btn').size()-1; k++){
                 $('.select_btn').removeClass('coloractive');
              }
            $(this).addClass('coloractive');
        })
  
      }

      
});