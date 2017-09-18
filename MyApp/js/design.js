(function () {
    var documentWidth = $(window).width();
    var menuWidth = $('.menu').innerWidth();
    var detailsHeight = $('.details').innerHeight();
    var navigationHeight = $(".navigation").innerHeight();
    var logoHeight = $('.header').innerHeight();
    var bodyHeight=$(window).height();
    $(".menu").css({
        height: detailsHeight + navigationHeight,
        minHeight: bodyHeight-logoHeight
    });
    $('.navigation').css({
        width: documentWidth - menuWidth - 20
    });
    $('.details').css({
        width: documentWidth - menuWidth - 20
    });
    $(window).resize(function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var windowHeight = $(window).height();
        var logoHeight = $('.header').innerHeight();
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight-logoHeight
        });
        $('.details').css({
            width: documentWidth - menuWidth - 20
        });
        $('.navigation').css({
            width: documentWidth - menuWidth - 20
        })
    });
    /*选项卡切换*/
    $(".navigation>div>ul>li>a").click(function () {
        $(".navigation>div>ul>li>a").eq($(this).parent().index()).parent().addClass('active').siblings().removeClass("active");
        $(".details>div").eq($(this).parent().index()).addClass('present').siblings().removeClass('present');
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        var windowHeight = $(document.body).innerHeight();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight
        });
    });


    /********城市等级增量**********/

    $('.list>ul').on('click', ".compile", function (e) {
        e.preventDefault();
        if ($(this).attr("data-id") == 2) { //如果是1就代表input就是关的状态
            $(this).attr("data-id", 1);
            $(this).parent().siblings().children("input").attr("disabled", true);
            $(this).parent().siblings().children("input").removeClass("border_setting");
            $(this).parent().parent().siblings().children().children("input").removeClass('border_setting');
            $(this).parent().parent().siblings().children().children("a").attr('data-id', 1);
            ////让其他的li的disabled属性关闭
            $(this).parent().parent().siblings().children().children("input").attr("disabled", true);
            $(this).children("i").html("编辑");
            $(this).children("b").removeClass("fa-check-circle").addClass("fa-edit")
        } else {
            $(this).attr("data-id", 2);
            $(this).parent().siblings().children("input").attr("disabled", false);
            $(this).parent().parent().siblings().children().children("input").attr("disabled", true);
            $(this).parent().siblings().children("input").addClass("border_setting");
            $(this).parent().parent().siblings().children().children("input").removeClass('border_setting');
            $(this).parent().parent().siblings().children().children("a").attr('data-id', 1);
            $(this).children("i").html("确认");
            $(this).children("b").removeClass("fa-edit").addClass("fa-check-circle");
            $(this).parent().parent().siblings().children().children("a").children("i").html("编辑");
            $(this).parent().parent().siblings().children().children("a").children("b").addClass("fa-edit").removeClass("fa-check-circle");
        }
    });


    /*********************路况增量***********************/

    //描述信息
    $('.trafficList>ul').on('mouseover',".describe>span>button",function(e){
        e.preventDefault();
        $(this).parent().siblings().css({
            display:"block"
        })
    });
    $('.trafficList>ul').on('mouseout',".describe>span>button",function(e){
        e.preventDefault();
        $(this).parent().siblings().css({
            display:"none"
        })
    });

    //添加路况
    $('.add').click(function(){
        $('.addHtml').css({
            display:"block"
        });
        var addDivWidth=$('.addHtml>div>div').innerWidth();
        var addDivHeight=$('.addHtml>div>div').innerHeight();
        $(".addHtml>div>div").css({
            marginTop:-(addDivHeight/2),
            marginLeft:-(addDivWidth/2)
        })
    });
        //图片
    $('.files>input').change(function(){
        var file= this.files[0];
        console.log(file);
        if(file==null){
            $(this).parent().siblings('img').attr('src', "img/design/img1.jpg");
            return;
        }
        var render=new FileReader();
        render.readAsDataURL(file);
        render.onloadend=function(e){
            $(".files>input").parent().siblings('img').attr('src', e.target.result);
        }
    });
        //取消添加
    $('.undoAdd').click(function(){
       $('.addHtml').css({
           display:"none"
       });
        $('.redact').css({
           display:"none"
       })
    });


        //确定添加
    $(".addHtml .addBtnOk").click(function(){
        $('.addHtml').css({
            display:"none"
        });

        var addName=$(".addHtml .trafficName").val();
        var addImg='';
        var addText=$('.addHtml .addText').val();
        var addLevelOne=$('.addHtml .levelOne').val();
        var addLevelTwo=$(".addHtml .levelTwo").val();
        var addLevelThree=$(".addHtml .levelThree").val();

        //拼接字符串
        var str='';
        str+="<li>"+
                "<div><span>"+addName+"</span></div>"+
                "<div><span><img src='"+addImg+"'/></span></div>"+
                "<div class='describe'><span><button>查看描述</button></span>"+
                     '<div class="describeInfo">'+addText+'</div>'+
                '</div>'+
                '<div><span>'+addLevelOne+'</span></div>'+
                '<div><span>'+addLevelTwo+'</span></div>'+
                '<div><span>'+addLevelThree+'</span></div>'+
                '<div>'+
                    '<span>'+
                        '<a href="##" class="edit">'+
                            '<b class="fa fa-edit"></b>'+
                            '<i>编辑</i>'+
                        '</a>'+
                    "</span>"+
                '</div>'+
            '</li>';
        $(".add").before(str);
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight
        });
    });
    //编辑路况
  $('.trafficList>ul').on("click",".edit",function(e){
      e.preventDefault();
      $('.redact').css({
          display:"block"
      });
      var addDivWidth=$('.redact>div>div').innerWidth();
      var addDivHeight=$('.redact>div>div').innerHeight();
      $(".redact>div>div").css({
          marginTop:-(addDivHeight/2),
          marginLeft:-(addDivWidth/2)
      })
    });
        //确定编辑



    /*                     畅销等级议价                */
    $('.marketList>ul').on("click",".markerCompile",function(e){
        e.preventDefault();
        if($(this).attr("data-id")==1){
            $(this).attr("data-id",2);
            $(this).parent().siblings().children("select").attr("disabled",false);
            $(this).parent().siblings().children("input").attr("disabled",false);
            //另外的select和input全都关闭
            $(this).parent().parent().siblings().children().children("select").attr("disabled",true);
            $(this).parent().parent().siblings().children().children("input").attr("disabled",true);
            //其他兄弟元素的data-id=1；
            $(this).parent().parent().siblings().children().children('.markerCompile').attr("data-id",1);
            //按钮改为确认按钮
            $(this).children("i").html("确认");
            $(this).children("b").removeClass("fa-edit").addClass("fa-check-circle");
            $(this).parent().parent().siblings().children().children("a").children("i").html("编辑");
            $(this).parent().parent().siblings().children().children("a").children("b").addClass("fa-edit").removeClass("fa-check-circle");
            //添加边框
            $(this).parent().siblings().children("input").addClass('border_setting');
            $(this).parent().parent().siblings().children().children("input").removeClass('border_setting');
            $(this).parent().siblings().children("select").css({
                background:"#fff"
            });
            $(this).parent().parent().siblings().children().children("select").css({
                background:"transparent"
            })
        }
        else{
            $(this).attr("data-id",1);
            $(this).parent().siblings().children("select").attr("disabled",true);
            $(this).parent().siblings().children("input").attr("disabled",true);
            $(this).children("i").html("编辑");
            $(this).children("b").removeClass("fa-check-circle").addClass("fa-edit");
            $(this).parent().siblings().children("input").removeClass('border_setting');
            $(this).parent().siblings().children("select").css({
                background:"transparent"
            });
        }

    })


})();