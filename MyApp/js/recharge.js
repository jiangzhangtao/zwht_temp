(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];
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
            minHeight: 810 + 'px'
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
        $("#" + this_id + "").css({ "display": "block" });
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
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
            data: {
                admin_id: admin_id,
                token: token,
                offset: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var html = '';

                        $('.moneyList .userSetList').attr('data-id', data.data.current);
                        for (var i = 0; i < data.data.recharge_orders.length; i++) {
                            if (data.data.recharge_orders[i].trade_mode_id == "1") {
                                var trade = "微信支付"
                            } else {
                                var trade = "支付宝支付"
                            }
                            html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                '<div data-id="">' +
                                '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                        }
                        $('.moneyList .userSetList>ul').html(html);


                        //下一页
                        document.getElementsByClassName('right')[0].onclick = function () {
                            var offset = Number($('.moneyList .userSetList').attr('data-id')) + 1;
                            if (offset > data.data.page_no) {
                                alert('这已经是最后一页')
                            } else {
                                $('.moneyList .userSetList>ul>li').remove();
                                $.ajax({
                                    type: 'post',
                                    url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
                                    data: {
                                        admin_id: admin_id,
                                        token: token,
                                        offset: offset
                                    },
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            if (data.data) {
                                                $('.moneyList .userSetList').attr('data-id', data.data.current);
                                                var afterTotal = 0;
                                                var beforTotal = 0;
                                                var html = '';
                                                for (var i = 0; i < data.data.recharge_orders.length; i++) {
                                                    html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                                        '<div data-id="">' +
                                                        '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                                        '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                                        '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                                        '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                                        '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                                        '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                                        '<div>' +
                                                        '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</li>';
                                                }

                                                $('.moneyList .userSetList>ul').html(html);
                                            }
                                        } else {
                                            alert(data.message);
                                        }
                                    },
                                    err: function (err) {
                                        console.log(err);
                                    }
                                });
                            }

                        };
                        //上一页
                        document.getElementsByClassName('left')[0].onclick = function () {
                            var offset = parseFloat($('.moneyList .userSetList').attr('data-id')) - 1;
                            if (offset == 0) {
                                offset = 1;
                                alert('这已经是第一页')
                            } else {
                                $('.moneyList .userSetList>ul>li').remove();
                                $.ajax({
                                    type: 'post',
                                    url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
                                    data: {
                                        admin_id: admin_id,
                                        token: token,
                                        offset: offset
                                    },
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            $('.moneyList .userSetList').attr('data-id', data.data.current);
                                            if (data.data) {
                                                var afterTotal = 0;
                                                var beforTotal = 0;
                                                var html = '';
                                                for (var i = 0; i < data.data.show_no; i++) {
                                                    html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                                        '<div data-id="">' +
                                                        '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                                        '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                                        '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                                        '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                                        '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                                        '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                                        '<div>' +
                                                        '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</li>';
                                                }

                                                $('.moneyList .userSetList>ul').html(html);
                                            }
                                        } else {
                                            alert(data.message);
                                        }
                                    },
                                    err: function (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        }


                    }
                } else if (data.code == 'E0001') {
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });


        //确定关闭
        $('.userSetInfoConfirmOK').click(function () {
            $('.userSetInfo').css({ display: "none" });
            $('.personal').css({ display: 'none' });
        });
        //确定关闭
        $('.CarSetInfoConfirmOK').click(function () {
            $('.CarSetInfo').css({ display: "none" });
            $('.CarSetPersonal').css({ display: 'none' });
        });
        //查看
        $('.moneyList .userSetList>ul').on('click', '.userSetEdit', function () {
            //初始化数据
            $('.moneyChange .userSetList>ul>li').remove();
            $('.moneyChange .AfterTotal').html(0);
            $('.moneyChange .beforeTotal').html(0);
            $('.moneyChange .transactionMoneyTotal').html(0);

            $('.userSetInfo').css({ display: "block" });
            $('.userSetInfo .tradingRecord').css({ display: 'block' });
            $('.userSetInfo .personal').css({ display: 'none' });
            var offset = $('.moneyList .userSetList').attr('data-id');
            var user_id = $(this).parent().parent().parent().attr('data-id');
            var _this = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
                data: {
                    admin_id: admin_id,
                    token: token,
                    offset: offset,
                    user_id: user_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.moneyChange .userSetList').attr('data-id', data.data.current);
                        var trade;
                        var tard;
                        var that=this;
                        var html = '';
                        if (data.data.recharge_orders) {
                            $('.moneyChange .userSetTitle .user_name').html(data.data.recharge_orders[0].userInfo.nick);
                            $('.tradingRecordTitle>h3>span').html(data.data.recharge_orders[0].userInfo.nick);
                            //单个用户马粮交易记录
                            for (var i = 0; i < data.data.recharge_orders.length; i++) {
                                if (data.data.recharge_orders[i].trade_mode_id == "1") {
                                    var trade = "微信支付"
                                } else {
                                    var trade = "支付宝支付"
                                }
                                html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                    '<div data-id="">' +
                                    '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                    '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                    '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                    '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                    '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                    '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                    '<div>' +
                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                            }
                            $('.moneyChange .userSetList>ul').html(html);
                            //单个用户马粮变革记录中查看信息
                            $('.moneyChange .userSetList>ul').on('click', '.userSetEdit', function () {
                                //初始化数据

                                $('.CarSetInfo').css({ display: "block" });
                                $('.CarSetInfo .tradingRecord').css({ display: 'block' });
                                $('.CarSetInfo .CarSetPersonal').css({ display: 'none' });
                                var offset = $('.moneyList .userSetList').attr('data-id');
                                var user_id = $(this).parent().parent().parent().attr('data-id');
                                var that = this;
                                var tard = "";
                             
                                var index = $(that).parent().parent().parent().index();
                                var thisData = data.data.recharge_orders[index];
                                if (thisData.trade_mode_id == 1) {
                                    tard = '微信支付';
                                } else if (thisData.trade_mode_id == 2) {
                                    tard = '支付宝支付';
                                }
                                $('.CarSetInfo .tradingRecordContent>ul>li.no>span').html(thisData.no);
                                $('.CarSetInfo .tradingRecordContent>ul>li.time>span').html(thisData.time);
                                $('.CarSetInfo .tradingRecordContent>ul>li.description>span').html(thisData.description);
                                $('.CarSetInfo .tradingRecordContent>ul>li.total>span').html(thisData.userInfo.recharge);
                                $('.CarSetInfo .tradingRecordContent>ul>li.refund>span').html(thisData.refund);
                                $('.CarSetInfo .tradingRecordContent>ul>li.after>span').html(thisData.ml);
                                $('.CarSetInfo .tradingRecordContent>ul>li.trade>span').html(tard);
                                $('.CarSetInfo .tradingRecordContent>ul>li.nick>span').html(thisData.userInfo.nick);
                                $('.CarSetInfo .tradingRecordContent>ul>li.phone>span').html(thisData.userInfo.phone);
                                $('.CarSetInfo .tradingRecordContent>ul>li.Fiter>span').html('马粮充值')




                            });
                        }



                        //下一页
                        document.getElementsByClassName('user_right')[0].onclick = function () {
                            var offset = Number($('.moneyChange .userSetList').attr('data-id')) + 1;
                            if (offset > data.data.page_no) {
                                alert('这已经是最后一页');
                            } else {
                                $('.moneyChange .userSetList>ul>li').remove();
                                $.ajax({
                                    type: 'post',
                                    url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
                                    data: {
                                        admin_id: admin_id,
                                        token: token,
                                        offset: offset,
                                        user_id: user_id
                                    },
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            if (data.data.recharge_orders) {
                                                $('.moneyChange .userSetList').attr('data-id', data.data.current);
                                                var html = '';
                                                for (var i = 0; i < data.data.recharge_orders.length; i++) {
                                                    if (data.data.recharge_orders[i].trade_mode_id == "1") {
                                                        var trade = "微信支付"
                                                    } else {
                                                        var trade = "支付宝支付"
                                                    }
                                                    html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                                        '<div data-id="">' +
                                                        '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                                        '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                                        '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                                        '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                                        '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                                        '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                                        '<div>' +
                                                        '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</li>';
                                                }
                                                $('.moneyChange .userSetList>ul').html(html);
                                            }
                                        } else {
                                            alert(data.message);
                                        }
                                    },
                                    err: function (err) {
                                        console.log(err);
                                    }
                                });
                            }

                        };
                        //上一页
                        document.getElementsByClassName('user_left')[0].onclick = function () {

                            var offset = parseFloat($('.moneyChange .userSetList').attr('data-id')) - 1;
                            if (offset <= 0) {
                                offset = 1;
                                alert('这已经是第一页')
                            } else {
                                $('.moneyChange .userSetList>ul>li').remove();
                                $.ajax({
                                    type: 'post',
                                    url: 'http://180.76.243.205:8383/_API/_adminRechargeOrder/getList',
                                    data: {
                                        admin_id: admin_id,
                                        token: token,
                                        offset: offset,
                                        user_id: user_id
                                    },
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            $('.moneyChange .userSetList').attr('data-id', data.data.current);
                                            if (data.data.recharge_orders) {
                                                var afterTotal = 0;
                                                var beforTotal = 0;
                                                var html = '';
                                                for (var i = 0; i < data.data.recharge_orders.length; i++) {
                                                    if (data.data.recharge_orders[i].trade_mode_id == "1") {
                                                        var trade = "微信支付"
                                                    } else {
                                                        var trade = "支付宝支付"
                                                    }
                                                    html += '<li data-id="' + data.data.recharge_orders[i].userInfo.id + '">' +
                                                        '<div data-id="">' +
                                                        '<div class="phone"><span>' + data.data.recharge_orders[i].no + '</span></div>' +
                                                        '<div class="beforeTrade"><span>' + data.data.recharge_orders[i].userInfo.phone + '</span></div>' +
                                                        '<div class="afterTrade"><span>' + data.data.recharge_orders[i].recharge + '</span></div>' +
                                                        '<div class="tradeMoney"><span>' + trade + '</span></div>' +
                                                        '<div class="filterMoney"><span>' + data.data.recharge_orders[i].userInfo.ml + '</span></div>' +
                                                        '<div class="time"><span>' + data.data.recharge_orders[i].time + '</span></div>' +
                                                        '<div>' +
                                                        '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                        '</div>' +
                                                        '</div>' +
                                                        '</li>';
                                                }
                                                $('.moneyChange .userSetList>ul').html(html);
                                            }
                                        } else {
                                            alert(data.message);
                                        }
                                    },
                                    err: function (err) {
                                        console.log(err);
                                    }
                                });
                            }

                        };
                      
                        var Index = $(_this).parent().parent().parent().index();
                        var thisData = data.data.recharge_orders[Index];
                      
                        if (thisData.trade_mode_id == 1) {
                            tard = '微信支付';
                        } else if (thisData.trade_mode_id == 2) {
                            tard = '支付宝支付';
                        }
                      
                        $('.userSetInfo .tradingRecordContent>ul>li.no>span').html(thisData.no);
                        $('.userSetInfo .tradingRecordContent>ul>li.time>span').html(thisData.time);
                        $('.userSetInfo .tradingRecordContent>ul>li.description>span').html(thisData.description);
                        $('.userSetInfo .tradingRecordContent>ul>li.total>span').html(thisData.userInfo.recharge);
                        $('.userSetInfo .tradingRecordContent>ul>li.refund>span').html(thisData.refund);
                        $('.userSetInfo .tradingRecordContent>ul>li.after>span').html(thisData.ml);
                        $('.userSetInfo .tradingRecordContent>ul>li.trade>span').html(tard);
                        $('.userSetInfo .tradingRecordContent>ul>li.nick>span').html(thisData.userInfo.nick);
                        $('.userSetInfo .tradingRecordContent>ul>li.phone>span').html(thisData.userInfo.phone);
                        $('.userSetInfo .tradingRecordContent>ul>li.Fiter>span').html('马粮充值')
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


        });







        //查看该用户马粮变动记录
        $('.buttonUserMoney').click(function () {
            $('.moneyList').css({ display: 'none' });
            $('.userSetInfo').css({ display: 'none' });
            $('.moneyChange').css({ display: 'block' });
        });
        //返回上一步
        $('.CarSetInfoComeback').click(function () {
            $('.CarSetList').css({ display: 'none' });
        });
        // 返回
        $('.moneyChangeComeBack').click(function () {
            $('.moneyList').css({ display: 'block' });
            $('.moneyChange').css({ display: 'none' });
        });
        //单个详细信息的返回

        $('.CarSetInfo .buttonComeBack').click(function () {
            $('.CarSetInfo').css({ display: "none" })
        })

        $('.buttonComeBack>div>button').click(function () {
            $('.userSetInfo').css({ display: "none" });
        });
        //筛选
        $(window).ready(function () {
            $(".userSetList>ul>li").show()
        });

        /*总体查询*/
        $('.userMoney>button').click('input', function () {
            var proxyData = $(".userMoney>input").val();
            $(".userSetList>ul>li").hide().children().children(".phone").filter(":contains('" + proxyData + "')").parent().parent().show();
        });

        /*单个用户备注查询*/
        $('.singleUserMoney>button').click('input', function () {
            var proxyData = $(".singleUserMoney>input").val();
            $(".moneyChange .userSetList>ul>li").hide().children().children(".phone").filter(":contains('" + proxyData + "')").parent().parent().show();
        });
        //
        $('.userSetInfoAllBut>button').click(function () {
            $(this).parent().parent().parent().css({ display: "none" });
            $('.userCarList').css({ display: "block" })
        });
        //返回上一步
        $('.userSetInfoComeback').click(function () {
            $('.personal').css({ display: 'block' });
            $('.userCarList').css({ display: "none" })
        });
        //查看用户资料
        $('.carDetailBtnLookInfo').click(function () {
            $('.personal').css({ display: 'block' });
            $('.carDetail').css({ display: "none" });
            $('.userCarList').css({ display: "none" });
        });
        //查看用户资料
        $('.CarDetailBtnLookInfo').click(function () {
            $('.CarSetPersonal').css({ display: 'block' });
            $('.CarDetail').css({ display: "none" });
            $('.CarSetList').css({ display: "none" });
        });
        $('.carDetailBtnComeback').click(function () {
            $('.personal').css({ display: "none" });
            $('.userCarList').css({ display: 'block' });
            $('.carDetail').css({ display: "none" });
        });
        $('.CarDetailBtnComeback').click(function () {
            $('.CarSetPersonal').css({ display: "none" });
            $('.CarSetList').css({ display: 'block' });
            $('.CarDetail').css({ display: "none" });
        });
        //查看车辆详细信息
        $('.userInfoCarList>ul').on('click', '.carEdit', function (e) {
            e.preventDefault();
            $('.personal').css({ display: "none" });
            $('.userCarList').css({ display: 'none' });
            $('.carDetail').css({ display: "block" });
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
            carSetTotal = (Number(carSetTotal) + Number($(item).text())).toFixed(2);
        });
        $('.carSetTotal .transactionMoneyTotal').html(carSetTotal);

        //所有用户的总计金额
        var beforeTradeTotal = 0;
        var afterTradeTotal = 0;
        var tradeMoneyTotal = 0;
        $.each($(".userSetList .beforeTrade>span"), function (index, item) {
            beforeTradeTotal = (Number(beforeTradeTotal) + Number($(item).text())).toFixed(2);
        });
        $.each($(".userSetList .afterTrade>span"), function (index, item) {
            afterTradeTotal = (Number(afterTradeTotal) + Number($(item).text())).toFixed(2);
        });
        tradeMoneyTotal = (beforeTradeTotal - afterTradeTotal).toFixed(2);
        $('.userSetTotal .beforeTradeTotal').html(beforeTradeTotal);
        $('.userSetTotal .afterTradeTotal').html(afterTradeTotal);
        $('.userSetTotal .tradeMoneyTotal').html(tradeMoneyTotal);


    }


    //退出
    $('.exit').click(function () {
        window.location.replace('index.html');
    })

    userSet();



})();


























