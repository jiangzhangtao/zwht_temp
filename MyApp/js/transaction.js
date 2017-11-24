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
            height: bodyHeight - logoHeight - 1,
            minHeight: bodyHeight - logoHeight - 1
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

    /*         马粮变动记录       */
    function userSet() {
        //锁定
        $('.userSetLock').click(function () {
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $('.userSetInfoState').html('锁定');
                $(this).html('恢复')
            } else {
                $(this).attr('data-id', 1);
                $('.userSetInfoState').html('未锁定');
                $(this).html('锁定')
            }
        });
        //确定关闭
        $('.userSetInfoConfirmOK').click(function () {
            $('.userSetInfo').css({display: "none"});
            $('.personal').css({display: 'none'});
        });
        //查看
        $('.userSetList>ul').on('click', '.userSetEdit', function () {
            $('.userSetInfo').css({display: "block"});
            $('.tradingRecord').css({display: 'block'});
        });


        //查看该用户信息
        $('.buttonUserInfo').click(function () {
            $('.personal').css({display: 'block'});
            $('.tradingRecord').css({display: 'none'});
        });
        //查看该用户宝驹
        $('.buttonUserCar').click(function () {
            $('.userCarList').css({display: 'block'});
            $('.tradingRecord').css({display: 'none'});
        });


        //查看该用户马粮变动记录
        $('.buttonUserMoney').click(function () {
            $('.moneyList').css({display: 'none'});
            $('.userSetInfo').css({display: 'none'});
            $('.moneyChange').css({display: 'block'});
        });
        // 返回
        $('.moneyChangeComeBack').click(function () {
            $('.moneyList').css({display: 'block'});
            $('.moneyChange').css({display: 'none'});
        });


        $('.buttonComeBack>div>button').click(function () {
            $('.userSetInfo').css({display: "none"});
        });
        //筛选
        $(window).ready(function () {
            $(".userSetList>ul>li").show()
        });

        /*总体查询*/
        $('.userMoney>button').click('input', function () {
            var proxyData = $(".userMoney>input").val();
            $(".userSetList>ul>li").hide().children().children(".filterMoney").filter(":contains('" + proxyData + "')").parent().parent().show();
        });

        /*单个用户备注查询*/
        $('.singleUserMoney>button').click('input', function () {
            var proxyData = $(".singleUserMoney>input").val();
            $(".moneyChange .userSetList>ul>li").hide().children().children(".filterMoney").filter(":contains('" + proxyData + "')").parent().parent().show();
        });
        //
        $('.userSetInfoAllBut>button').click(function () {
            $(this).parent().parent().parent().css({display: "none"});
            $('.userCarList').css({display: "block"})
        });
        //返回上一步
        $('.userSetInfoComeback').click(function () {
            $('.personal').css({display: 'block'});
            $('.userCarList').css({display: "none"})
        });
        //查看用户资料
        $('.carDetailBtnLookInfo').click(function () {
            $('.personal').css({display: 'block'});
            $('.carDetail').css({display: "none"});
            $('.userCarList').css({display: "none"});
        });
        $('.carDetailBtnComeback').click(function () {
            $('.personal').css({display: "none"});
            $('.userCarList').css({display: 'block'});
            $('.carDetail').css({display: "none"});
        });
        //查看车辆详细信息
        $('.userInfoCarList>ul').on('click', '.carEdit', function (e) {
            e.preventDefault();
            $('.personal').css({display: "none"});
            $('.userCarList').css({display: 'none'});
            $('.carDetail').css({display: "block"});
        });


        //总和
        var beforeTotal = 0;
        var afterTotal = 0;
        $.each($(".userSetList .moneyBefore>span"), function (index, item) {
            beforeTotal = (parseFloat(beforeTotal) + parseFloat($(item).text())).toFixed(2);
        });
        $.each($(".userSetList .moneyAfter>span"), function (index, item) {
            afterTotal = (parseFloat(afterTotal) + parseFloat($(item).text())).toFixed(2);
        });
        var transactionMoneyTotal = (beforeTotal - afterTotal).toFixed(2);
        $('.moneyChange .beforeTotal').html(beforeTotal);
        $('.moneyChange .AfterTotal').html(afterTotal);
        $('.moneyChange .transactionMoneyTotal').html(transactionMoneyTotal);

        //轮胎购买记录的总和
        var carSetTotal = 0;
        $.each($(".carSetList .CarSetListMoney>span"), function (index, item) {
            carSetTotal = (parseFloat(carSetTotal) + parseFloat($(item).text())).toFixed(2);
        });
        $('.carSetTotal .transactionMoneyTotal').html(carSetTotal);

        //所有用户的总计金额
        var beforeTradeTotal = 0;
        var afterTradeTotal = 0;
        var tradeMoneyTotal = 0;
        $.each($(".userSetList .beforeTrade>span"), function (index, item) {
            beforeTradeTotal = (parseFloat(beforeTradeTotal) + parseFloat($(item).text())).toFixed(2);
        });
        $.each($(".userSetList .afterTrade>span"), function (index, item) {
            afterTradeTotal = (parseFloat(afterTradeTotal) + parseFloat($(item).text())).toFixed(2);
        });
        tradeMoneyTotal = (beforeTradeTotal - afterTradeTotal).toFixed(2);
        $('.userSetTotal .beforeTradeTotal').html(beforeTradeTotal);
        $('.userSetTotal .afterTradeTotal').html(afterTradeTotal);
        $('.userSetTotal .tradeMoneyTotal').html(tradeMoneyTotal);


    }

    /*         轮胎购买记录       */
    function carSet() {
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
        $('.carSetList>ul').on('click', '.carSetEdit', function (e) {
            e.preventDefault();
            $('.tyreOrderInfo').css({display: "block"});
        });
        $('.tyreOrderButtonBack').click(function () {
            $('.tyreOrderInfo').css({display: "none"});
        });


    }

    /*          历史订单           */
    function orderHistory() {
        $('.orderHistoryList>ul').on('click', '.orderHistoryEdit', function (e) {
            e.preventDefault();
            $('.orderInfo').css({display: 'block'})
        });
        $('.orderButtonBack>button').click(function () {
            $('.orderInfo').css({display: 'none'})
        })
    }

    /*          店铺完成订单       */
    function storeOrder(){
        //查看各个店铺的订单信息
        $('.storeOrderList>ul').on('click',".storeOrderEdit",function(e){
            e.preventDefault();
            $('.storeOrderListing').css({display:"none"});
            $('.storeOrderChange').css({display:"block"});
        });
        //关闭各个店铺的订单信息
        $('.storeOrderChangeComeBack').click(function(){
            $('.storeOrderListing').css({display:"block"});
            $('.storeOrderChange').css({display:"none"});
        });

        //打开详细订单信息
        $('.storeOrderChangeList>ul').on('click','.storeOrderChangeEdit',function(e){
            e.preventDefault();
            $('.storeOrderInfo').css({display:"block"})
        });
        //关闭详细的订单信息
        $('.storeOrderButtonBack').click(function(){
            $('.storeOrderInfo').css({display:"none"})
        })
    }
    carSet();
    userSet();
    orderHistory();
    storeOrder()


})();


























