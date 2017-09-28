(function () {

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        $(".menu").css({
            height: bodyHeight - logoHeight-1,
            minHeight: bodyHeight - logoHeight-1
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
                height: detailsHeight + navigationHeight-1,
                minHeight: windowHeight - logoHeight-1
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
    };
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
        var windowHeight = $(document.body).innerHeight();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight
        });
    });

    /*         用户设置       */
    function userSet(){
        //锁定
        $('.userSetLock').click(function(){
            if($(this).attr('data-id')==1){
                $(this).attr('data-id',2);
                $('.userSetInfoState').html('锁定');
                $(this).html('恢复')
            }else{
                $(this).attr('data-id',1);
                $('.userSetInfoState').html('未锁定');
                $(this).html('锁定')
            }
        });
        //确定关闭
        $('.userSetInfoConfirmOK').click(function(){
            $('.userSetInfo').css({display:"none"})
        });
        //查看
        $('.userSetList>ul').on('click','.userSetEdit',function(){
            $('.userSetInfo').css({display:"block"})
        });
        //筛选
        $(window).ready(function () {
            $(".userSetList>ul>li").show()
        });
        /*手机号的筛选*/
        $('.userIphone>button').click('input', function () {
            var proxyData = $(".userIphone>input").val();
            $(".userSetList>ul>li").hide().children().children(".filterPhone").filter(":contains('" + proxyData + "')").parent().parent().show();
        });
        /*马粮的筛选*/
        $('.userMoney>button').click('input', function () {
            var proxyData = $(".userMoney>input").val();
            $(".userSetList>ul>li").hide().children().children(".filterMoney").filter(":contains('" + proxyData + "')").parent().parent().show();
        });
        //
        $('.userSetInfoAllBut>button').click(function(){
            $(this).parent().parent().parent().css({display:"none"});
            $('.userCarList').css({display:"block"})
        });
        //返回上一步
        $('.userSetInfoComeback').click(function(){
            $('.personal').css({display:'block'});
            $('.userCarList').css({display:"none"})
        });
        //查看用户资料
        $('.carDetailBtnLookInfo').click(function(){
            $('.personal').css({display:'block'});
            $('.carDetail').css({display:"none"});
            $('.userCarList').css({display:"none"});
        });
        $('.carDetailBtnComeback').click(function(){
            $('.personal').css({display:"none"});
            $('.userCarList').css({display:'block'});
            $('.carDetail').css({display:"none"});
        });
        //查看车辆详细信息
        $('.userInfoCarList>ul').on('click','.carEdit',function(e){
            e.preventDefault();
            $('.personal').css({display:"none"});
            $('.userCarList').css({display:'none'});
            $('.carDetail').css({display:"block"});
        })
    }

    /*         车辆设置       */
    function carSet(){
        //筛选
        $(window).ready(function () {
            $(".carSetList>ul>li").show()
        });
        /*手机号的筛选*/
        $('.carSetPlate>button').click('input', function () {
            var proxyData = $(".carSetPlate>input").val();
            $(".carSetList>ul>li").hide().children().children(".filterPlate").filter(":contains('" + proxyData + "')").parent().parent().show();
            //查看
        });
        $('.carSetList>ul').on('click','.carSetEdit',function(e){
            e.preventDefault();
            $('.CarSetInfo').css({display:"block"});
            $('.CarSetPersonal').css({display:"none"});
            $('.CarSetList').css({display:'none'});
            $('.CarDetail').css({display:"block"});
        });
        $('.CarDetailBtnLookInfo').click(function(){
            $('.CarSetPersonal').css({display:"block"});
            $('.CarSetList').css({display:'none'});
            $('.CarDetail').css({display:"none"});
        });
        $('.CarSetInfoAllBut>button').click(function(){
            $('.CarSetPersonal').css({display:"none"});
            $('.CarSetList').css({display:'block'});
            $('.CarDetail').css({display:"none"});
        });
        //suoding
        $('.CarSetLock').click(function(){
            if($(this).attr('data-id')==1){
                $(this).attr('data-id',2);
                $('.CarSetInfoState').html('锁定');
                $(this).html('恢复')
            }else{
                $(this).attr('data-id',1);
                $('.CarSetInfoState').html('未锁定');
                $(this).html('锁定')
            }
        });
        //确定关闭
        $('.CarSetInfoConfirmOK').click(function(){
            $('.CarSetInfo').css({display:"none"})
        });
        //
        $('.CarSetInfoComeback').click(function(){
            $('.CarSetPersonal').css({display:"block"});
            $('.CarSetList').css({display:'none'});
            $('.CarDetail').css({display:"none"});
        });
        $('.CarSetInfoCarList>ul').on('click','.CarEdit',function(e){
            e.preventDefault();
            $('.CarSetPersonal').css({display:"none"});
            $('.CarSetList').css({display:'none'});
            $('.CarDetail').css({display:"block"});
        });
        $('.CarDetailBtnComeback').click(function(){
            $('.CarSetInfo').css({display:"none"})
        })
    }
    userSet();
    carSet();
})();


























