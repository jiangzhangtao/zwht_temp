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

        var admin_id=$('.userId').val();
        var password=$('.password').val();
        $.ajax({
            type:'post',
            url:'http://180.76.243.205:8383/_API/_admin/login',
            data:{
                account:admin_id,
                password:strmd5(password)
            },
            success:function(data){
                if(data.code=='E0000'){
                    sessionStorage['admin_id']=data.data.admin_id;
                    sessionStorage['token']=data.data.token;
                    alert('登陆成功');
                    window.location.href='account.html';
                }else{
                    alert(data.message)
                }
            },
            error:function(err){
                console.log(err)
            }

        })
    });

})();