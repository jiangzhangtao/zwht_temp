(function(){
    var loginFormWidth=$('.loginForm').innerWidth();
    var loginFormHeight=$('.loginForm').innerHeight();
    var windowWidth=$(window).innerWidth();
    var windowHeight=$(window).innerHeight();
    $(document.body).css({
        "overflow": "hidden"
    });
    $('.loginForm').css({
        marginTop:-(loginFormHeight/2),
        marginLeft:-(loginFormWidth/2)
    });
    //非空验证
    $('.password').blur(function(){
        var password=$('.password').val();
        if(password==''){
            $('.errorInfo>span').html('密码不能为空！请重新输入').css({
                opacity:1
            })
        }else{
            $('.errorInfo>span').css({
                opacity:0})
        }
        /*从后台获取密码在此验证*/

    });
    $('.userId').blur(function(){
        var userId=$('.userId').val();
        if(userId==''){
            $('.userIdError>span').html('账号不能为空！请重新输入').css({
                opacity:1
            })
        }else{
            $('.userIdError>span').css({
                opacity:0})
        }
    });

    $('button').click(function(){

    });

})();