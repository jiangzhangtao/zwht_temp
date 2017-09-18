(function () {
    var documentWidth = $(window).width();
    var menuWidth=$('.menu').innerWidth();
    var contentHeight=$('.content').innerHeight();
    var detailsHeight=$('.details').innerHeight();
    var navigationHeight = $(".navigation").innerHeight();
    var windowHeight=$(document.body).innerHeight();
    var logoHeight=$('.header').innerHeight();
    $(".menu").css({
        height: detailsHeight+navigationHeight,
        minHeight:windowHeight-logoHeight
    });
    $('.navigation').css({
        width:documentWidth-menuWidth-20
    });
    $('.details').css({
        width:documentWidth-menuWidth-20
    });
    $(window).resize(function () {
        var navigationHeight = $(".navigation").innerHeight();
        var documentWidth = $(window).width();
        var menuWidth=$('.menu').innerWidth();
        var detailsHeight=$('.details').innerHeight();
        var windowHeight=$(document.body).innerHeight();
        var logoHeight=$('.header').innerHeight();
        console.log(windowHeight)
        $(".menu").css({
            height: detailsHeight+navigationHeight,
            minHeight:windowHeight-logoHeight
        });
        $('.details').css({
            width:documentWidth-menuWidth-20
        });
        $('.navigation').css({
            width:documentWidth-menuWidth-20
        })
    });
    /*选项卡切换*/
    $(".navigation>div>ul>li>a").click(function () {
        $(".navigation>div>ul>li>a").eq($(this).parent().index()).parent().addClass('active').siblings().removeClass("active");
        $(".details>div").eq($(this).parent().index()).addClass('present').siblings().removeClass('present');
    });

    /*原密码验证*/
    $('.oldPassword').blur(function(){
        var oldPassword=$('.oldPassword').val();
        if(oldPassword==""){
            $(".correct").html("×").css({
                color:"#ee2626"
            });
            $(".oldPasswordError").html("密码不能为空，请重新输入！").css({
                color:"#ee2626",
                opacity:1
            })
        }
    });
    /*新密码验证֤*/
    $('.newPassword').blur(function(){
        var newPassword=$('.newPassword').val();
        if(newPassword==""){
            $(".newPasswordCorrect").html("×").css({
                color:"#ee2626"
            });
            $(".newPasswordError").html("新密码不能为空，请重新输入").css({
                color:"#ee2626",
                opacity:1
            })
        }
    });
    /*确认密码验证*/
    $('.againPassword').blur(function(){
        var againPassword=$('.againPassword').val();
        if(againPassword==''){
            $(".error").html("×").css({
                color:"#ee2626"
            });
            $(".againPasswordError").html("两次密码输入不一致，请重新输入！").css({
                color:"#ee2626",
                opacity:1
            })
        }
    });




    /***********************银行卡管理***************************/
    var flag=true;
    $('.setting').click(function(){
        if(flag){
            flag=!flag;
            $("div.bankSetting>div>ul>li>p>input").attr("disabled",false);
            $("div.bankSetting>div>ul>li>p>select").attr("disabled",false)
        }else{
            flag=!flag;
            $("div.bankSetting>div>ul>li>p>input").attr("disabled",true);
            $("div.bankSetting>div>ul>li>p>select").attr("disabled",true)
        }
    })

    /****************************微信公众号****************/

    $('.weChatPN').click(function(){
      if($(this).attr('data-id')==1){
          $(this).attr('data-id',2);
          $(this).siblings().html(12312312312312);
          $(this).html("点我查看密码");
      }else{
          $(this).attr('data-id',1);
          $(this).siblings().html("******************");
          $(this).html("点我查看密码");
      }
    });
    $('.financing').click(function(){
        if($(this).attr('data-id')==1){
            $(this).attr('data-id',2);
            $(this).siblings().html(12312312312312);
            $(this).html("点我查看密码");
        }else{
            $(this).attr('data-id',1);
            $(this).siblings().html("******************");
            $(this).html("点我查看密码");
        }
    });

    /*********************服务器***********************/

    /**/
})();