(function () {

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();
        var contentHeight = $('.content').height();
        console.log(menuHeight + logoHeight);
        $(".menu").css({
            height: bodyHeight - logoHeight - 1,
            minHeight: detailsHeight + 50
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
                height: detailsHeight + navigationHeight - 1,
                minHeight: windowHeight - logoHeight - 1
            });
            $('.details').css({
                width: documentWidth - menuWidth - 20
            });
            $('.navigation').css({
                width: documentWidth - menuWidth - 20
            })
        });
    })();

    var tempArr = [];//储存option
    function temp(id1, id2) {
        //现将数据存入数组
        $('#' + id1 + ' option').each(function (index, ele) {
            tempArr[index] = $(this).text();
        });
        $(document).bind("click", function (e) {
            var e = e || window.event;
            var elem = e.target || e.srcElement;
            while (elem) {
                if (elem.id && (elem.id == '' + id1 + '' || elem.id == '' + id2 + '')) {
                    return;
                }
                elem = elem.parentNode;
            }
            $("#" + id1 + "").css('display', 'none')
        })
    }

    //更换文字
    function changeF() {
        var this_id = $(this).attr("id");
        $(this).prev('input').val($(this).find("option:selected").text());
        $("#" + this_id + "").css('display', 'none')
    }

    function focus() {
        var this_id = $(this).next().attr("id");
        $("#" + this_id + "").css({"display": "block"});
    }

    function inputChagen() {
        var this_id = $(this).next().attr("id");
        var select = $("#" + this_id + "");
        select.html('');
        for (var i = 0; i < tempArr.length; i++) {
            //如果找到已txt的内容开头的。添加option
            if (tempArr[i].substring(0, $(this).val().length).indexOf($(this).val()) == 0) {
                var option = $("<option></option>").text(tempArr[i]);
                select.append(option);
            }
        }
    }


    /*选项卡切换*/

    $(".navigation>div>ul>li>a").click(function () {
        $(".navigation>div>ul>li>a").eq($(this).parent().index()).parent().addClass('active').siblings().removeClass("active");
        $(".details>div").eq($(this).parent().index()).addClass('present').siblings().removeClass('present');
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var windowHeight = $(document.body).innerHeight();

        console.log(menuHeight + logoHeight);
        $(".menu").css({
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight - logoHeight - 1
        });
    });

    /*               价格增量                */
    function referrer() {
     $('.priceList>ul').on('click','.filterOrder a',function(e){
         e.preventDefault();
         $('.userSetInfo').css({
             display:"block"
         });
         //点击确定关闭
         $('.userSetInfoConfirmOK').click(function(){
             $('.userSetInfo').css({
                 display:"none"
             });
         });
         //点击查看用户车辆
         $('.userSetInfoAllBut').click(function(){
             $('.personal').css({
                 display:"none"
             });
             $('.userCarList').css({
                 display:"block"
             })
         });
         //返回上一步
         $('.userSetInfoComeback').click(function(){
             $('.userCarList').css({
                 display:"none"
             });
             $('.personal').css({
                 display:"block"
             })
         })
     });

        //查看每辆车的信息
        $('.userInfoCarList>ul').on('click','.carEdit',function(e){
            e.preventDefault();
            $('.userCarList').css({
                display:"none"
            });
            $('.carDetail').css({
                display:"block"
            });
        });

        //返回用户资料首页
        $('.carDetailBtnLookInfo').click(function(){
            $('.carDetail').css({
                display:"none"
            });
            $('.personal').css({
                display:"block"
            });
        });
        //返回宝驹列表
        $('.carDetailBtnComeback').click(function(){
            $('.carDetail').css({
                display:"none"
            });
            $('.userCarList').css({
                display:"block"
            });
        })

    }

    referrer();
})();