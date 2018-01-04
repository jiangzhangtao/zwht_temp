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
            minHeight: 810+'px'
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
            url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
            data: {
                admin_id: admin_id,
                token: token,
                offset: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var html = '';
                        var afterTotal = 0;
                        var beforTotal = 0;
                        $('.moneyList .userSetList').attr('data-id', data.data.current);
                        for (var i = 0; i < data.data.show_no; i++) {
                            html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                '<div class="beforeTrade"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                '<div class="afterTrade"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                '<div class="tradeMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                            beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                        }

                        $('.moneyList .afterTradeTotal').html(afterTotal);
                        $('.moneyList .beforeTradeTotal').html(beforTotal);
                        $('.moneyList .tradeMoneyTotal').html(beforTotal - afterTotal);
                        $('.moneyList .userSetList>ul').append(html);


                        //下一页
                        document.getElementsByClassName('right')[0].onclick = function () {

                            $('.moneyList .userSetList>ul>li').remove();
                            var offset = Number($('.moneyList .userSetList').attr('data-id')) + 1;

                            if (offset == data.data.page_no) {
                                alert('这已经是最后一页')
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
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
                                            for (var i = 0; i < data.data.show_no; i++) {
                                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                                    '<div class="beforeTrade"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                                    '<div class="afterTrade"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                                    '<div class="tradeMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                                    '<div>' +
                                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</li>';
                                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                                            }
                                            $('.moneyList .afterTradeTotal').html(afterTotal);
                                            $('.moneyList .beforeTradeTotal').html(beforTotal);
                                            $('.moneyList .tradeMoneyTotal').html(beforTotal - afterTotal);
                                            $('.moneyList .userSetList>ul').append(html);
                                        }
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };
                        //上一页
                        document.getElementsByClassName('left')[0].onclick = function () {
                            $('.moneyList .userSetList>ul>li').remove();


                            var offset = parseFloat($('.moneyList .userSetList').attr('data-id')) - 1;
                            if (offset == 0) {
                                offset = 1;
                                alert('这已经是第一页')
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
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
                                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                                    '<div class="beforeTrade"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                                    '<div class="afterTrade"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                                    '<div class="tradeMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                                    '<div>' +
                                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</li>';
                                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                                            }
                                            $('.moneyList .afterTradeTotal').html(afterTotal);
                                            $('.moneyList .beforeTradeTotal').html(beforTotal);
                                            $('.moneyList .tradeMoneyTotal').html(beforTotal - afterTotal);
                                            $('.moneyList .userSetList>ul').append(html);
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
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
                data: {
                    admin_id: admin_id,
                    token: token,
                    offset: offset,
                    user_id: user_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        //console.log(data);
                        $('.moneyChange .userSetList').attr('data-id', data.data.current);
                        var trade;
                        var tard;
                        var afterTotal = 0;
                        var beforTotal = 0;
                        var html = '';
                        if (data.data.ml_history) {
                            $('.moneyChange .userSetTitle .user_name').html(data.data.ml_history[0].phone);
                            $('.tradingRecordTitle>h3>span').html(data.data.ml_history[0].phone);
                            //单个用户马粮交易记录
                            for (var i = 0; i < data.data.ml_history.length; i++) {
                                switch (data.data.ml_history[i].trade_mode_id) {
                                    case 1:
                                        trade = '微信支付';
                                        break;
                                    case 2:
                                        trade = '支付宝支付';
                                        break;
                                    case 3:
                                        trade = '马粮支付';
                                        break;
                                }
                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                    '<div class="moneyBefore"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                    '<div class="moneyAfter"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                    '<div class="transactionMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                    '<div>' +
                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                            }
                            ;
                            $('.moneyChange .userSetList>ul').append(html);
                            $('.moneyChange .AfterTotal').html(afterTotal);
                            $('.moneyChange .beforeTotal').html(beforTotal);
                            $('.moneyChange .transactionMoneyTotal').html(beforTotal - afterTotal);
                        }
                        //下一页
                        document.getElementsByClassName('user_right')[0].onclick = function () {
                            $('.moneyChange .userSetList>ul>li').remove();
                            var offset = Number($('.moneyChange .userSetList').attr('data-id')) + 1;
                            if (offset == data.data.page_no) {
                                alert('这已经是最后一页');
                                offset = data.data.page_no;
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    offset: offset,
                                    user_id: user_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        if (data.data.ml_history) {
                                            $('.moneyChange .userSetList').attr('data-id', data.data.current);
                                            var afterTotal = 0;
                                            var beforTotal = 0;
                                            var html = '';
                                            for (var i = 0; i < data.data.show_no; i++) {
                                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                                    '<div class="moneyBefore"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                                    '<div class="moneyAfter"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                                    '<div class="transactionMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                                    '<div>' +
                                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</li>';
                                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                                            }
                                            $('.moneyChange .AfterTotal').html(afterTotal);
                                            $('.moneyChange .beforeTotal').html(beforTotal);
                                            $('.moneyChange .transactionMoneyTotal').html(beforTotal - afterTotal);
                                            $('.moneyChange .userSetList>ul').append(html);
                                        }
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };
                        //上一页
                        document.getElementsByClassName('user_left')[0].onclick = function () {
                            $('.moneyChange .userSetList>ul>li').remove();
                            var offset = parseFloat($('.moneyChange .userSetList').attr('data-id')) - 1;
                            if (offset == 0) {
                                offset = 1;
                                alert('这已经是第一页')
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    offset: offset,
                                    user_id: user_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        $('.moneyChange .userSetList').attr('data-id', data.data.current);
                                        if (data.data.ml_history) {
                                            var afterTotal = 0;
                                            var beforTotal = 0;
                                            var html = '';
                                            for (var i = 0; i < data.data.show_no; i++) {
                                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                                    '<div class="moneyBefore"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                                    '<div class="moneyAfter"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                                    '<div class="transactionMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                                    '<div>' +
                                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</li>';
                                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                                            }
                                            $('.moneyChange .AfterTotal').html(afterTotal);
                                            $('.moneyChange .beforeTotal').html(beforTotal);
                                            $('.moneyChange .transactionMoneyTotal').html(beforTotal - afterTotal);
                                            $('.moneyChange .userSetList>ul').append(html);
                                        }
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };
                        if ($(that).parent().parent().attr('data-id') == 1) {
                            tard = '微信支付';
                        } else if ($(that).parent().parent().attr('data-id') == 2) {
                            tard = '支付宝支付';
                        } else {
                            tard = '马粮支付';
                        }
                        $('.userSetInfo .tradingRecordContent>ul>li.time>span').html($(that).parent().siblings('.time').children().text());
                        $('.userSetInfo .tradingRecordContent>ul>li.total>span').html($(that).parent().siblings('.tradeMoney').children().text());
                        $('.userSetInfo .tradingRecordContent>ul>li.befor>span').html($(that).parent().siblings('.beforeTrade').children().text());
                        $('.userSetInfo .tradingRecordContent>ul>li.after>span').html($(that).parent().siblings('.afterTrade').children().text());
                        $('.userSetInfo .tradingRecordContent>ul>li.trade>span').html(tard);
                        $('.userSetInfo .tradingRecordContent>ul>li.Fiter>span').html($(that).parent().siblings('.filterMoney').children().text())


                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


            //查看该用户信息
            $('.buttonUserInfo').click(function () {
                $('.personal').css({ display: 'block' });
                $('.tradingRecord').css({ display: 'none' });
                //查看

                $('.userSetInfo').css({ display: "block" });
                var lis = $(this).parent().parent().parent();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/getSingle',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        user_id: user_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            if (data.data.status == 1) {
                                var status = '锁定';
                                $('.userSetLock').html('恢复')
                            } else {
                                var status = '未锁定'
                            }
                            $('.personal .userSetInfoAvatar img').attr('src', data.data.headimgurl);
                            $('.personal .userPhone').html(data.data.phone);
                            $('.personal .userNice').html(data.data.nick);
                            $('.personal .userGender').html(data.data.gender);
                            $('.personal .userSetInfoState').html(status);
                            $('.personal .userMoney').html(data.data.ml);
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                //查看用户车辆列表
                document.getElementsByClassName('userSetInfoAllBut')[0].onclick = function () {
                    $('.userInfoCarList>ul>li').remove();
                    var array = [];
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminUser/getCarList',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            user_id: user_id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                console.log(data);
                                if (data.data) {
                                    for (var i = 0; i < data.data.length; i++) {
                                        array.push(data.data[i]);

                                        var li = '<li data-id="' + data.data[i].id + '">' +
                                            '<div><img src="' + data.data[i].logo + '" alt=""/></div>' +
                                            '<div class="carInfo">' +
                                            '<div>' +
                                            '<div><span>车牌号：</span><span>' + data.data[i].plat_number + '</span></div>' +
                                            '<div><span>行驶证日期：</span><span>' + data.data[i].driving_license_date.split(' ')[0] + '</span></div>' +
                                            '<div><span>所在城市：</span><span>' + data.data[i].city_name + '</span></div>' +
                                            '<div><span>服务截止日期：</span><span>' + data.data[i].service_end_date.split(' ')[0] + '</span></div>' +
                                            '<div><span>行驶里程：</span><span>' + data.data[i].traveled + '</span></div>' +
                                            '<div>' +
                                            '<a href="##" class="carEdit"><span class="fa fa-eye"></span>查看</a>' +
                                            '</div></div></div></li>';
                                        $('.userInfoCarList>ul').append(li);
                                    }
                                    console.log(array)
                                    $('.userInfoCarList>ul').on('click', '.carEdit', function () {
                                        var car_id = $(this).parent().parent().parent().parent().attr('data-id');
                                        for (var i = 0; i < array.length; i++) {
                                            if (car_id == array[i].id) {
                                                var data = array[i];
                                                $('.carDetail .car_name').html(array[i].car_name);
                                                $('.carDetail .plat_number').html(array[i].plat_number);
                                                $('.carDetail .city_name').html(array[i].city_name);
                                                $('.carDetail .drivingFront img').attr('src', array[i].traveled_img_obverse);
                                                $('.carDetail .drivingReverse img').attr('src', array[i].traveled_img_inverse);
                                                $('.carDetail .insuranceImg img').attr('src', array[i].insurance_img);
                                                $('.carDetail .mileageImg img').attr('src', array[i].maturity_img);
                                                $('.carDetail .logoImg').attr('src', array[i].logo);
                                                $('.carDetail .driving_license_date').html(array[i].driving_license_date);
                                                $('.carDetail .service_end_date').html(array[i].service_end_date);
                                                $('.carDetail .referee').html(array[i].referee);
                                                $('.carDetail .font').html(array[i].font);
                                                $('.carDetail .time').html(array[i].time);
                                                $('.carDetail .rear').html(array[i].rear);
                                                if (array[i].is_default == 1) {
                                                    var a = '是'
                                                } else {
                                                    var a = '否'
                                                }
                                                $('.carDetail .is_default').html(a);
                                            }
                                        }

                                    })

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
            });
        });


        //单个用户马粮变革记录中查看信息
        $('.moneyChange .userSetList>ul').on('click', '.userSetEdit', function () {
            //初始化数据

            $('.CarSetInfo').css({ display: "block" });
            $('.CarSetInfo .tradingRecord').css({ display: 'block' });
            $('.CarSetInfo .CarSetPersonal').css({ display: 'none' });
            var offset = $('.moneyList .userSetList').attr('data-id');
            var user_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminHistory/getMl',
                data: {
                    admin_id: admin_id,
                    token: token,
                    offset: offset,
                    user_id: user_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.moneyChange .userSetList').attr('data-id', data.data.current);
                        var trade;
                        var tard;
                        var afterTotal = 0;
                        var beforTotal = 0;
                        var html = '';
                        if (data.data.ml_history) {
                            $('.moneyChange .userSetTitle .user_name').html(data.data.ml_history[0].phone);
                            $('.tradingRecordTitle>h3>span').html(data.data.ml_history[0].phone);
                            //单个用户马粮交易记录
                            for (var i = 0; i < data.data.ml_history.length; i++) {
                                switch (data.data.ml_history[i].trade_mode_id) {
                                    case 1:
                                        trade = '微信支付';
                                        break;
                                    case 2:
                                        trade = '支付宝支付';
                                        break;
                                    case 3:
                                        trade = '马粮支付';
                                        break;
                                }
                                html += '<li data-id="' + data.data.ml_history[i].user_id + '">' +
                                    '<div data-id="' + data.data.ml_history[i].trade_mode_id + '">' +
                                    '<div class="phone"><span>' + data.data.ml_history[i].phone + '</span></div>' +
                                    '<div class="moneyBefore"><span>' + data.data.ml_history[i].before_ml + '</span></div>' +
                                    '<div class="moneyAfter"><span>' + data.data.ml_history[i].after_ml + '</span></div>' +
                                    '<div class="transactionMoney"><span>' + (data.data.ml_history[i].before_ml - data.data.ml_history[i].after_ml) + '</span></div>' +
                                    '<div class="filterMoney"><span>' + data.data.ml_history[i].remark + '</span></div>' +
                                    '<div class="time"><span>' + data.data.ml_history[i].time + '</span></div>' +
                                    '<div>' +
                                    '<a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                                afterTotal += parseFloat(data.data.ml_history[i].after_ml);
                                beforTotal += parseFloat(data.data.ml_history[i].before_ml)
                            }
                            ;
                            $('.moneyChange .userSetList>ul').append(html);
                            $('.moneyChange .AfterTotal').html(afterTotal);
                            $('.moneyChange .beforeTotal').html(beforTotal);
                            $('.moneyChange .transactionMoneyTotal').html(beforTotal - afterTotal);
                        }
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


            //查看该用户信息
            $('.CarSetInfo .buttonUserInfo').click(function () {
                $('.CarSetInfo .CarSetPersonal').css({ display: 'block' });
                $('.CarSetInfo .tradingRecord').css({ display: 'none' });
                //查看
                $('.userSetInfo').css({ display: 'none' });
                $('.CarSetInfo').css({ display: "block" });
                var lis = $(this).parent().parent().parent();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/getSingle',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        user_id: user_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            if (data.data.status == 1) {
                                var status = '锁定';
                                $('.userSetLock').html('恢复')
                            } else {
                                var status = '未锁定'
                            }
                            $('.CarSetPersonal .CarSetInfoAvatar img').attr('src', data.data.headimgurl);
                            $('.CarSetPersonal .userPhone').html(data.data.phone);
                            $('.CarSetPersonal .userNice').html(data.data.nick);
                            $('.CarSetPersonal .userGender').html(data.data.gender);
                            $('.CarSetPersonal .CarSetInfoState').html(status);
                            $('.CarSetPersonal .userMoney').html(data.data.ml);
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                ////确定修改用户
                //document.getElementsByClassName('userSetInfoConfirmOK')[0].onclick = function () {
                //    var phone = $('.personal .userPhone').val();
                //    var nick = $('.personal .userNice').val();
                //    var gender = $('.personal .userGender').val();
                //    var status = $('.personal .userSetInfoState').attr('data-id');
                //    var ml = $('.personal .userMoney').val();
                //    $.ajax({
                //        type: 'post',
                //        url: 'http://180.76.243.205:8383/_API/_adminUser/edit',
                //        data: {
                //            admin_id: admin_id,
                //            token: token,
                //            phone: phone,
                //            nick: nick,
                //            gender: gender,
                //            ml: ml,
                //            user_id: user_id
                //        },
                //        success: function (data) {
                //            if (data.code == 'E0000') {
                //                alert('修改成功');
                //                if (data.data.gender == 1) {
                //                    var gender = '男'
                //                } else {
                //                    var gender = '女'
                //                }
                //                lis.children().children('.filterPhone').children().html(data.data.phone);
                //                lis.children().children('.userNick').children().html(data.data.nick);
                //                lis.children().children('.userGender').children().html(gender);
                //                lis.children().children('.filterMoney').children().html(data.data.ml);
                //                $('.userSetInfo').css({display: "none"})
                //            } else {
                //                alert(data.message);
                //            }
                //        },
                //        err: function (err) {
                //            console.log(err);
                //        }
                //    });
                //};

                ////锁定用户
                //document.getElementsByClassName('userSetLock')[0].onclick = function () {
                //    if ($(this).attr('data-id') == 1) {
                //        $(this).attr('data-id', 2);
                //        $('.personal .userSetInfoState').attr('data-id', 2);
                //    } else {
                //        $(this).attr('data-id', 1);
                //        $('.personal .userSetInfoState').attr('data-id', 1);
                //    }
                //    var status = $('.personal .userSetInfoState').attr('data-id');
                //    $.ajax({
                //        type: 'post',
                //        url: 'http://180.76.243.205:8383/_API/_adminUser/lock',
                //        data: {
                //            admin_id: admin_id,
                //            token: token,
                //            user_id: user_id,
                //            status: status
                //        },
                //        success: function (data) {
                //            if (data.code == 'E0000') {
                //                alert('修改成功');
                //                if ($(this).attr('data-id') == 1) {
                //                    $('.userSetInfoState').html('锁定');
                //                    var status = '锁定';
                //                    $(this).html('恢复')
                //                } else {
                //                    $('.userSetInfoState').html('未锁定');
                //                    var status = '未锁定';
                //                    $(this).html('锁定');
                //                }
                //                lis.children().children('.userStatus').children().html(status);
                //                $('.userSetInfo').css({display: "none"})
                //            } else {
                //                alert(data.message);
                //            }
                //        },
                //        err: function (err) {
                //            console.log(err);
                //        }
                //    });
                //};

                //查看用户车辆列表
                document.getElementsByClassName('CarSetInfoAllBut')[0].onclick = function () {
                    $('.CarSetInfoCarList>ul>li').remove();
                    var array = [];
                    $('.CarSetList').css({
                        display: 'block'
                    });
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminUser/getCarList',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            user_id: user_id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                console.log(data);
                                if (data.data) {
                                    for (var i = 0; i < data.data.length; i++) {
                                        array.push(data.data[i]);
                                        var li = '<li data-id="' + data.data[i].id + '">' +
                                            '<div><img src="' + data.data[i].logo + '" alt=""/></div>' +
                                            '<div class="carInfo">' +
                                            '<div>' +
                                            '<div><span>车牌号：</span><span>' + data.data[i].plat_number + '</span></div>' +
                                            '<div><span>行驶证日期：</span><span>' + data.data[i].driving_license_date.split(' ')[0] + '</span></div>' +
                                            '<div><span>所在城市：</span><span>' + data.data[i].city_name + '</span></div>' +
                                            '<div><span>服务截止日期：</span><span>' + data.data[i].service_end_date.split(' ')[0] + '</span></div>' +
                                            '<div><span>行驶里程：</span><span>' + data.data[i].traveled + '</span></div>' +
                                            '<div>' +
                                            '<a href="##" class="carEdit"><span class="fa fa-eye"></span>查看</a>' +
                                            '</div></div></div></li>';
                                        $('.CarSetInfoCarList>ul').append(li);
                                    }
                                    $('.CarSetInfoCarList>ul').on('click', '.carEdit', function () {
                                        $('.CarDetail').css({
                                            display: "block"
                                        })
                                        $('.CarSetList').css({
                                            display: 'none'
                                        })
                                        var car_id = $(this).parent().parent().parent().parent().attr('data-id');
                                        for (var i = 0; i < array.length; i++) {
                                            if (car_id == array[i].id) {
                                                var data = array[i];
                                            }
                                        }
                                        $('.CarDetail .car_name').html(data.car_name);
                                        $('.CarDetail .plat_number').html(data.plat_number);
                                        $('.CarDetail .city_name').html(data.city_name);
                                        $('.CarDetail .CarDrivingFront img').attr('src', data.traveled_img_obverse);
                                        $('.CarDetail .CarDrivingReverse img').attr('src', data.traveled_img_inverse);
                                        $('.CarDetail .CarDrivingInsuranceImg img').attr('src', data.insurance_img);
                                        $('.CarDetail .CarDrivingMileageImg img').attr('src', data.maturity_img);
                                        $('.CarDetail .logoImg').attr('src', data.logo);
                                        $('.CarDetail .driving_license_date').html(data.driving_license_date);
                                        $('.CarDetail .service_end_date').html(data.service_end_date);
                                        $('.CarDetail .referee').html(data.referee);
                                        $('.CarDetail .font').html(data.font);
                                        $('.CarDetail .time').html(data.time);
                                        $('.CarDetail .rear').html(data.rear);
                                        if (data.is_default == 1) {
                                            var a = '是'
                                        } else {
                                            var a = '否'
                                        }
                                        $('.CarDetail .is_default').html(a);

                                    })
                                }
                            } else {
                                alert(data.message);
                            }
                        },
                        err: function (err) {
                            console.log(err);
                        }
                    });
                };
            });

        });


        //查看该用户宝驹
        $('.buttonUserCar').click(function () {
            $('.userCarList').css({ display: 'block' });
            $('.tradingRecord').css({ display: 'none' });
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
            $(".userSetList>ul>li").hide().children().children(".filterMoney").filter(":contains('" + proxyData + "')").parent().parent().show();
        });

        /*单个用户备注查询*/
        $('.singleUserMoney>button').click('input', function () {
            var proxyData = $(".singleUserMoney>input").val();
            $(".moneyChange .userSetList>ul>li").hide().children().children(".filterMoney").filter(":contains('" + proxyData + "')").parent().parent().show();
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
        //列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
            data: {
                admin_id: admin_id,
                token: token,
                offset: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        $('.infoUpPage').css({ display: 'none' });
                        $('.infoDownPage').css({ display: 'none' });
                        $('.downPage').css({ display: 'block' });
                        $('.uoPage').css({ display: 'block' });
                        var total = 0;
                        var html = '';
                        for (var i = 0; i < data.data.shoe_history.length; i++) {
                            if (data.data.shoe_history[i].status == 1) {
                                var status = '已安装'
                            } else if (data.data.shoe_history[i].status == 2) {
                                var status = '待服务'
                            } else if (data.data.shoe_history[i].status == 3) {
                                var status = '支付成功'
                            } else if (data.data.shoe_history[i].status == 4) {
                                var status = '支付失败'
                            } else if (data.data.shoe_history[i].status == 5) {
                                var status = '待支付'
                            } else if (data.data.shoe_history[i].status == 6) {
                                var status = '已退货'
                            }
                            html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                '<div>' +
                                '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                '<div><span>' + status + '</span></div>' +
                                '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                '</div>' +
                                '</li>';
                            total += Number(data.data.shoe_history[i].total);
                        }
                        $('.carSetList>ul').html(html);
                        $('.carSetList').attr('data-id', data.data.current);
                        $('.transactionMoneyTotal').html(total.toFixed(2));


                        //全部购买记录下一页
                        document.getElementsByClassName('downPage')[0].onclick = function () {
                            var current = parseFloat($('.carSetList').attr('data-id')) + 1;
                            if (current > data.data.all) {
                                current = data.data.all;
                                alert('已经是最后一页!')
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    offset: current
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        $('.carSetList>ul>li').remove();
                                        var total = 0;
                                        var html = '';
                                        for (var i = 0; i < data.data.shoe_history.length; i++) {
                                            if (data.data.shoe_history[i].status == 1) {
                                                var status = '已安装'
                                            } else if (data.data.shoe_history[i].status == 2) {
                                                var status = '待服务'
                                            } else if (data.data.shoe_history[i].status == 3) {
                                                var status = '支付成功'
                                            } else if (data.data.shoe_history[i].status == 4) {
                                                var status = '支付失败'
                                            } else if (data.data.shoe_history[i].status == 5) {
                                                var status = '待支付'
                                            } else if (data.data.shoe_history[i].status == 6) {
                                                var status = '已退货'
                                            }
                                            html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                '<div>' +
                                                '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                '<div><span>' + status + '</span></div>' +
                                                '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                '</div>' +
                                                '</li>';
                                            total += parseFloat(data.data.shoe_history[i].total);
                                        }
                                        $('.carSetList>ul').html(html);
                                        $('.carSetList').attr('data-id', data.data.current);
                                        $('.transactionMoneyTotal').html(total.toFixed(2));
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };
                        //全部购买记录上一页
                        document.getElementsByClassName('upPage')[0].onclick = function () {
                            var current = parseFloat($('.carSetList').attr('data-id')) - 1;
                            if (current == 0) {
                                current = 1;
                                alert('已经是第一页!')
                            }
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    offset: current
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        $('.carSetList>ul>li').remove();
                                        var total = 0;
                                        var html = '';
                                        for (var i = 0; i < data.data.shoe_history.length; i++) {
                                            if (data.data.shoe_history[i].status == 1) {
                                                var status = '已安装'
                                            } else if (data.data.shoe_history[i].status == 2) {
                                                var status = '待服务'
                                            } else if (data.data.shoe_history[i].status == 3) {
                                                var status = '支付成功'
                                            } else if (data.data.shoe_history[i].status == 4) {
                                                var status = '支付失败'
                                            } else if (data.data.shoe_history[i].status == 5) {
                                                var status = '待支付'
                                            } else if (data.data.shoe_history[i].status == 6) {
                                                var status = '已退货'
                                            }
                                            html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                '<div>' +
                                                '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                '<div><span>' + status + '</span></div>' +
                                                '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                '</div>' +
                                                '</li>';
                                            total += parseFloat(data.data.shoe_history[i].total);
                                        }
                                        $('.carSetList>ul').html(html);
                                        $('.carSetList').attr('data-id', data.data.current);
                                        $('.transactionMoneyTotal').html(total.toFixed(2));
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };
                        //单个用户轮胎购买记录
                        $('.carSetList>ul').on('click', '.carSetEdit', function (e) {
                            e.preventDefault();
                            var user_id = $(this).parent().parent().parent().attr('data-id');
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    offset: 1,
                                    user_id: user_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        $('.carSetList>ul>li').remove(); //移除原有列表数据
                                        $('.BBB').css({ display: "block" });
                                        if (data.data) {
                                            $('.carSetList>ul>li').remove();
                                            var total = 0;
                                            var html = '';
                                            for (var i = 0; i < data.data.shoe_history.length; i++) {
                                                if (data.data.shoe_history[i].status == 1) {
                                                    var status = '已安装'
                                                } else if (data.data.shoe_history[i].status == 2) {
                                                    var status = '待服务'
                                                } else if (data.data.shoe_history[i].status == 3) {
                                                    var status = '支付成功'
                                                } else if (data.data.shoe_history[i].status == 4) {
                                                    var status = '支付失败'
                                                } else if (data.data.shoe_history[i].status == 5) {
                                                    var status = '待支付'
                                                } else if (data.data.shoe_history[i].status == 6) {
                                                    var status = '已退货'
                                                }
                                                html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                    '<div>' +
                                                    '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                    '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                    '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                    '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                    '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                    '<div><span>' + status + '</span></div>' +
                                                    '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                    '</div>' +
                                                    '</li>';
                                                total += parseFloat(data.data.shoe_history[i].total);
                                            }
                                            $('.carSetList>ul').html(html);
                                            $('.carSetList').attr('data-id', data.data.current);
                                            $('.transactionMoneyTotal').html(total.toFixed(2));

                                            //将下一页和上一页的隐藏
                                            $('.downPage').css({ display: 'none' });
                                            $('.upPage').css({ display: 'none' });
                                            $('.infoUpPage').css({ display: 'block' });
                                            $('.infoDownPage').css({ display: 'block' });

                                            //单个购买记录下一页
                                            document.getElementsByClassName('infoDownPage')[0].onclick = function () {
                                                var current = parseFloat($('.carSetList').attr('data-id')) + 1;
                                                if (current > data.data.all) {
                                                    current = data.data.all;
                                                    alert('已经是最后一页!')
                                                }
                                                $.ajax({
                                                    type: 'post',
                                                    url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                                    data: {
                                                        admin_id: admin_id,
                                                        token: token,
                                                        offset: current,
                                                        user_id: user_id
                                                    },
                                                    success: function (data) {
                                                        if (data.code == 'E0000') {
                                                            $('.carSetList>ul>li').remove();
                                                            var total = 0;
                                                            var html = '';
                                                            for (var i = 0; i < data.data.shoe_history.length; i++) {
                                                                if (data.data.shoe_history[i].status == 1) {
                                                                    var status = '已安装'
                                                                } else if (data.data.shoe_history[i].status == 2) {
                                                                    var status = '待服务'
                                                                } else if (data.data.shoe_history[i].status == 3) {
                                                                    var status = '支付成功'
                                                                } else if (data.data.shoe_history[i].status == 4) {
                                                                    var status = '支付失败'
                                                                } else if (data.data.shoe_history[i].status == 5) {
                                                                    var status = '待支付'
                                                                } else if (data.data.shoe_history[i].status == 6) {
                                                                    var status = '已退货'
                                                                }
                                                                html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                                    '<div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                                    '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                                    '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                                    '<div><span>' + status + '</span></div>' +
                                                                    '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                                    '</div>' +
                                                                    '</li>';
                                                                total += parseFloat(data.data.shoe_history[i].total);
                                                            }
                                                            $('.carSetList>ul').html(html);
                                                            $('.carSetList').attr('data-id', data.data.current);
                                                            $('.transactionMoneyTotal').html(total.toFixed(2));
                                                        } else {
                                                            alert(data.message);
                                                        }
                                                    },
                                                    err: function (err) {
                                                        console.log(err);
                                                    }
                                                });
                                            };
                                            //单个购买记录上一页
                                            document.getElementsByClassName('infoUpPage')[0].onclick = function () {
                                                var current = parseFloat($('.carSetList').attr('data-id')) - 1;
                                                if (current == 0) {
                                                    current = 1;
                                                    alert('已经是第一页!')
                                                }
                                                $.ajax({
                                                    type: 'post',
                                                    url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                                    data: {
                                                        admin_id: admin_id,
                                                        token: token,
                                                        offset: current,
                                                        user_id: user_id
                                                    },
                                                    success: function (data) {
                                                        if (data.code == 'E0000') {
                                                            $('.carSetList>ul>li').remove();
                                                            var total = 0;
                                                            var html = '';
                                                            for (var i = 0; i < data.data.shoe_history.length; i++) {
                                                                if (data.data.shoe_history[i].status == 1) {
                                                                    var status = '已安装'
                                                                } else if (data.data.shoe_history[i].status == 2) {
                                                                    var status = '待服务'
                                                                } else if (data.data.shoe_history[i].status == 3) {
                                                                    var status = '支付成功'
                                                                } else if (data.data.shoe_history[i].status == 4) {
                                                                    var status = '支付失败'
                                                                } else if (data.data.shoe_history[i].status == 5) {
                                                                    var status = '待支付'
                                                                } else if (data.data.shoe_history[i].status == 6) {
                                                                    var status = '已退货'
                                                                }
                                                                html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                                    '<div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                                    '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                                    '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                                    '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                                    '<div><span>' + status + '</span></div>' +
                                                                    '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                                    '</div>' +
                                                                    '</li>';
                                                                total += parseFloat(data.data.shoe_history[i].total);
                                                            }
                                                            $('.carSetList>ul').html(html);
                                                            $('.carSetList').attr('data-id', data.data.current);
                                                            $('.transactionMoneyTotal').html(total.toFixed(2));
                                                        } else {
                                                            alert(data.message);
                                                        }
                                                    },
                                                    err: function (err) {
                                                        console.log(err);
                                                    }
                                                });
                                            };
                                            //返回列表
                                            document.getElementsByClassName('carSetBack')[0].onclick = function () {
                                                //将上一页和下一页的class修改掉
                                                $('.infoUpPage').css({ display: 'none' });
                                                $('.infoDownPage').css({ display: 'none' });
                                                $('.downPage').css({ display: 'block' });
                                                $('.upPage').css({ display: 'block' });
                                                $('.BBB').css({ display: "none" });
                                                $.ajax({
                                                    type: 'post',
                                                    url: 'http://180.76.243.205:8383/_API/_adminHistory/getShoe',
                                                    data: {
                                                        admin_id: admin_id,
                                                        token: token,
                                                        offset: 1
                                                    },
                                                    success: function (data) {
                                                        if (data.code == 'E0000') {
                                                            $('.carSetList>ul>li').remove(); //移除原有列表数据
                                                            $('.carSetBack').css({ display: "block" });
                                                            if (data.data) {
                                                                var total = 0;
                                                                var html = '';
                                                                for (var i = 0; i < data.data.shoe_history.length; i++) {
                                                                    if (data.data.shoe_history[i].status == 1) {
                                                                        var status = '已安装'
                                                                    } else if (data.data.shoe_history[i].status == 2) {
                                                                        var status = '待服务'
                                                                    } else if (data.data.shoe_history[i].status == 3) {
                                                                        var status = '支付成功'
                                                                    } else if (data.data.shoe_history[i].status == 4) {
                                                                        var status = '支付失败'
                                                                    } else if (data.data.shoe_history[i].status == 5) {
                                                                        var status = '待支付'
                                                                    } else if (data.data.shoe_history[i].status == 6) {
                                                                        var status = '已退货'
                                                                    }
                                                                    html += '<li data-id="' + data.data.shoe_history[i].user_id + '">' +
                                                                        '<div>' +
                                                                        '<div><span>' + data.data.shoe_history[i].brand + '</span></div>' +
                                                                        '<div><span>' + data.data.shoe_history[i].type + '</span></div>' +
                                                                        '<div><span>' + data.data.shoe_history[i].size + '</span></div>' +
                                                                        '<div class="CarSetListMoney"><span>' + data.data.shoe_history[i].total + '</span></div>' +
                                                                        '<div class="filterPlate"><span>' + data.data.shoe_history[i].phone + '</span></div>' +
                                                                        '<div><span>' + status + '</span></div>' +
                                                                        '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                                                        '</div>' +
                                                                        '</li>';
                                                                    total += parseFloat(data.data.shoe_history[i].total);
                                                                }
                                                                $('.carSetList>ul').html(html);
                                                                $('.carSetList').attr('data-id', data.data.current);
                                                                $('.transactionMoneyTotal').html(total.toFixed(2));
                                                            } else {
                                                                alert(data.message);
                                                            }
                                                        }
                                                    }
                                                    ,
                                                    err: function (err) {
                                                        console.log(err);
                                                    }
                                                });
                                            }

                                        }

                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        });
                    }





                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
        //查看


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

        $('.tyreOrderButtonBack').click(function () {
            $('.tyreOrderInfo').css({ display: "none" });
        });


    }

    /*          历史订单           */
    function orderHistory() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminHistory/getComplate',
            data: {
                admin_id: admin_id,
                token: token,
                offset: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {

                    var total = 0;
                    var html = '';
                    for (var i = 0; i < data.data.orders.length; i++) {
                        if (data.data.orders[i].status == 1) {
                            var status = '已完成'
                        } else if (data.data.orders[i].status == 2) {
                            var status = '待服务'
                        } else if (data.data.orders[i].status == 3) {
                            var status = '支付成功'
                        } else if (data.data.orders[i].status == 4) {
                            var status = '支付失败'
                        } else if (data.data.orders[i].status == 5) {
                            var status = '待支付'
                        } else if (data.data.orders[i].status == 6) {
                            var status = '待车主确认服务'
                        }
                        else if (data.data.orders[i].status == 7) {
                            var status = '已退货'
                        }
                        html += '<li data-id="' + data.data.orders[i].id + '">' +
                            '<div>' +
                            '<div class="filterPlate"><span>' + data.data.orders[i].no + '</span></div>' +
                            '<div><span>' + data.data.orders[i].phone + '</span></div>' +
                            '<div><span>' + data.data.orders[i].total + '</span></div>' +
                            '<div class="orderHistoryService"><span>' + data.data.orders[i].plat_number + '</span></div>' +
                            '<div><span>' + status + '</span></div>' +
                            '<div> <a href="##" class="orderHistoryEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                            '</div>' +
                            '</li>';
                        total += Number(data.data.orders[i].total);
                    }
                    $('.orderHistoryList>ul').html(html);
                    $('.orderHistoryList').attr('data-id', data.data.current);
                    $('.orderHistoryMoneyTotal').html(total.toFixed(2));
                    $('.orderHistoryTotalNumber').html(data.data.all);

                    //历史记录下一页
                    document.getElementsByClassName('historyDownPage')[0].onclick = function () {
                        var current = parseFloat($('.orderHistoryList').attr('data-id')) + 1;
                        if (current > data.data.page_no) {
                            current = data.data.page_no;
                            alert('已经是最后一页!')
                        }
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminHistory/getComplate',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                offset: current
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    $('.orderHistoryList>ul>li').remove();
                                    var total = 0;
                                    var html = '';
                                    for (var i = 0; i < data.data.orders.length; i++) {
                                        if (data.data.orders[i].status == 1) {
                                            var status = '已完成'
                                        } else if (data.data.orders[i].status == 2) {
                                            var status = '待服务'
                                        } else if (data.data.orders[i].status == 3) {
                                            var status = '支付成功'
                                        } else if (data.data.orders[i].status == 4) {
                                            var status = '支付失败'
                                        } else if (data.data.orders[i].status == 5) {
                                            var status = '待支付'
                                        } else if (data.data.orders[i].status == 6) {
                                            var status = '待车主确认服务'
                                        } else if (data.data.orders[i].status == 7) {
                                            var status = '退货'
                                        }
                                        html += '<li data-id="' + data.data.orders[i].id + '">' +
                                            '<div>' +
                                            '<div class="filterPlate"><span>' + data.data.orders[i].no + '</span></div>' +
                                            '<div><span>' + data.data.orders[i].phone + '</span></div>' +
                                            '<div><span>' + data.data.orders[i].total + '</span></div>' +
                                            '<div class="orderHistoryService"><span>' + data.data.orders[i].plat_number + '</span></div>' +
                                            '<div><span>' + status + '</span></div>' +
                                            '<div> <a href="##" class="orderHistoryEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                            '</div>' +
                                            '</li>';
                                        total += parseFloat(data.data.orders[i].total);
                                    }
                                    $('.orderHistoryList>ul').html(html);
                                    $('.orderHistoryList').attr('data-id', data.data.current);
                                    $('.orderHistoryMoneyTotal').html(total.toFixed(2));
                                    $('.orderHistoryTotalNumber').html(data.data.all);
                                } else {
                                    alert(data.message);
                                }
                            },
                            err: function (err) {
                                console.log(err);
                            }
                        });
                    };
                    //全部购买记录上一页
                    document.getElementsByClassName('historyUpPage')[0].onclick = function () {
                        var current = parseFloat($('.orderHistoryList').attr('data-id')) - 1;
                        if (current == 0) {
                            current = 1;
                            alert('已经是第一页!')
                        }
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminHistory/getComplate',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                offset: current
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    $('.orderHistoryList>ul>li').remove();
                                    var total = 0;
                                    var html = '';
                                    for (var i = 0; i < data.data.orders.length; i++) {
                                        if (data.data.orders[i].status == 1) {
                                            var status = '已完成'
                                        } else if (data.data.orders[i].status == 2) {
                                            var status = '待服务'
                                        } else if (data.data.orders[i].status == 3) {
                                            var status = '支付成功'
                                        } else if (data.data.orders[i].status == 4) {
                                            var status = '支付失败'
                                        } else if (data.data.orders[i].status == 5) {
                                            var status = '待支付'
                                        } else if (data.data.orders[i].status == 6) {
                                            var status = '待车主确认服务'
                                        } else if (data.data.orders[i].status == 7) {
                                            var status = '已退货'
                                        }
                                        html += '<li data-id="' + data.data.orders[i].id + '">' +
                                            '<div>' +
                                            '<div class="filterPlate"><span>' + data.data.orders[i].no + '</span></div>' +
                                            '<div><span>' + data.data.orders[i].phone + '</span></div>' +
                                            '<div><span>' + data.data.orders[i].total + '</span></div>' +
                                            '<div class="orderHistoryService"><span>' + data.data.orders[i].plat_number + '</span></div>' +
                                            '<div><span>' + status + '</span></div>' +
                                            '<div> <a href="##" class="orderHistoryEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                            '</div>' +
                                            '</li>';
                                        total += parseFloat(data.data.orders[i].total);
                                    }
                                    $('.orderHistoryList>ul').html(html);
                                    $('.orderHistoryList').attr('data-id', data.data.current);
                                    $('.orderHistoryMoneyTotal').html(total.toFixed(2));
                                    $('.orderHistoryTotalNumber').html(data.data.all);
                                } else {
                                    alert(data.message);
                                }
                            },
                            err: function (err) {
                                console.log(err);
                            }
                        });
                    };



                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //查看单一
        $('.orderHistoryList>ul').on('click', '.orderHistoryEdit', function (e) {
            e.preventDefault();
            $('.orderInfo').css({ display: 'block' });
            var order_id = $(this).parent().parent().parent().attr('data-id');
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminOrder/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    order_id: order_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.no').html(data.data.order.no);
                        $('.phone').html(data.data.order.phone);
                        $('.name').html(data.data.order.name);
                        $('.plat_number').html(data.data.order.plat_number);
                        $('.year').html(data.data.order.time.split(' ')[0]);
                        $('.mouth').html(data.data.order.time.split(' ')[1]);
                        $('.totalPrice').html(data.data.order.total);
                        $('.descriptionde').html(data.data.order.description);

                        //状态码
                        if (data.data.order.status == 1) {
                            var status = '已完成'
                        } else if (data.data.order.status == 2) {
                            var status = '待服务'
                        } else if (data.data.order.status == 3) {
                            var status = '支付成功'
                        } else if (data.data.order.status == 4) {
                            var status = '支付失败'
                        } else if (data.data.order.status == 5) {
                            var status = '待支付'
                        } else if (data.data.order.status == 6) {
                            var status = '待车主确认服务'
                        } else if (data.data.order.status == 7) {
                            var status = '已退货'
                        }
                        $('.redFont span').html(status)

                        //details 详细服务
                        var html = "";
                        for (var i = 0; i < data.data.details.length; i++) {
                            html += '<div><ul>' +
                                '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                                '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                                '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                                '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                                '</ul></div>';
                        }
                        $('.orderDetailContent>div').html(html)

                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
        });
        $('.orderButtonBack>button').click(function () {
            $('.orderInfo').css({ display: 'none' })
        })
    }

    /*          店铺完成订单       */
    function storeOrder() {

        //列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminHistory/getOrder',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data.store) {
                        var html = '';
                        var storeOrderMoneyTotal = 0;
                        var storeOrderbyNo = 0;
                        var storeOrderazNO = 0;
                        var storeOrdermrNo = 0;
                        var storeOrdergzNO = 0;
                        var storeOrderzhNO = 0;
                        for (var i = 0; i < data.data.store.length; i++) {

                            html += '<li data-id="' + data.data.store[i].store_id + '">' +
                                '<div>' +
                                '<div><span>' + data.data.store[i].name + '</span></div>' +
                                '<div><span>' + data.data.store[i].shoeNO + '</span></div>' +
                                '<div><span>' + data.data.store[i].byNo + '</span></div>' +
                                '<div class="CarSetListMoney"><span>' + data.data.store[i].mrNo + '</span></div>' +
                                '<div class="filterPlate"><span>' + data.data.store[i].azNo + '</span></div>' +
                                '<div><span>' + data.data.store[i].gzNo + '</span></div>' +
                                '<div><span>' + data.data.store[i].zhNo + '</span></div>' +
                                '<div> <a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                                '</div>' +
                                '</li>';
                            storeOrderMoneyTotal += Number(data.data.store[i].shoeNO);
                            storeOrderbyNo += Number(data.data.store[i].byNo);
                            storeOrdermrNo += Number(data.data.store[i].mrNo);
                            storeOrderazNO += Number(data.data.store[i].azNo);
                            storeOrdergzNO += Number(data.data.store[i].gzNo);
                            storeOrderzhNO += Number(data.data.store[i].zhNo);
                        }
                        $('.storeOrderList>ul').html(html)

                        $('.storeOrderMoneyTotal').html(storeOrderMoneyTotal);
                        $('.storeOrderbyNo').html(storeOrderbyNo);
                        $('.storeOrdermrNo').html(storeOrdermrNo);
                        $('.storeOrderazNO').html(storeOrderazNO);
                        $('.storeOrdergzNO').html(storeOrdergzNO);
                        $('.storeOrderzhNO').html(storeOrderzhNO);

                        //单个店铺完成记录
                        $('.storeOrderList>ul').on('click', '.carSetEdit', function (e) {
                            e.preventDefault();
                            var user_id = $(this).parent().parent().parent().attr('data-id');
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminHistory/getSingleStore',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    store_id: user_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        $('.storeOrderChange').css({ display: "block" });
                                        $('.storeOrderListing').css({ display: "none" });
                                        var total = 0;
                                        if (data.data.store.order) {
                                            var html = '';
                                            var dete = data.data.store.order;
                                            for (var i = 0; i < dete.length; i++) {
                                                html += '<li data-id="' + dete[i].id + '">' +
                                                    '<div>' +
                                                    '<div class="filterPlate"><span>' + dete[i].no + '</span></div>' +
                                                    '<div class="moneyBefore"><span >' + dete[i].phone + '</span></div>' +
                                                    '<div class="moneyAfter"><span>' + dete[i].total + '</span></div>' +
                                                    '<div class="transactionMoney"><span>' + dete[i].plat_number + '</span></div>' +
                                                    '<div class="filterMoney"><span>已完成</span></div>' +
                                                    '<div>' +
                                                    '<a href="##" class="storeOrderChangeEdit"><span class="fa fa-eye"></span>查看</a>' +
                                                    '</div></div></li>';
                                                total += parseFloat(dete[i].total)
                                            }
                                            $('.storeOrderChangeList>ul').html(html)
                                            $('.storeOrderChangeTotal .total').html(total.toFixed(2))
                                        }


                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                        });


                    }
                    //获取单一数据
                    $('.storeOrderChangeList>ul').on('click', '.storeOrderChangeEdit', function () {
                        var order_id = $(this).parent().parent().parent().attr('data-id');
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminOrder/getSingle',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                order_id: order_id
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    console.log(data);
                                    $('.storeOrderInfo .no').html(data.data.order.no);
                                    $('.storeOrderInfo .phone').html(data.data.order.phone);
                                    $('.storeOrderInfo .name').html(data.data.order.name);
                                    $('.storeOrderInfo .plat_name').html(data.data.order.plat_number);
                                    $('.storeOrderInfo .year').html(data.data.order.time.split(' ')[0]);
                                    $('.storeOrderInfo .mouth').html(data.data.order.time.split(' ')[1]);
                                    $('.storeOrderInfo .total').html(data.data.order.total);
                                    $('.storeOrderInfo .description').html(data.data.order.description);

                                    if (data.data.details) {
                                        var html = '';
                                        for (var i = 0; i < data.data.details.length; i++) {
                                            html += '<div><ul>' +
                                                '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                                                '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                                                '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                                                '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                                                '</ul></div>';
                                        }
                                        $('.storeOrderDetailContent>div').html(html)
                                    }


                                } else {
                                    alert(data.message);
                                }
                            },
                            err: function (err) {
                                console.log(err);
                            }
                        });
                    })




                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //查看各个店铺的订单信息
        $('.storeOrderList>ul').on('click', ".storeOrderEdit", function (e) {
            e.preventDefault();
            $('.storeOrderListing').css({ display: "none" });
            $('.storeOrderChange').css({ display: "block" });
        });
        //关闭各个店铺的订单信息
        $('.storeOrderChangeComeBack').click(function () {
            $('.storeOrderListing').css({ display: "block" });
            $('.storeOrderChange').css({ display: "none" });
        });

        //打开详细订单信息
        $('.storeOrderChangeList>ul').on('click', '.storeOrderChangeEdit', function (e) {
            e.preventDefault();
            $('.storeOrderInfo').css({ display: "block" })
        });
        //关闭详细的订单信息
        $('.storeOrderButtonBack').click(function () {
            $('.storeOrderInfo').css({ display: "none" })
        })
        //筛选
        $(window).ready(function () {
            $(".storeOrderChangeList>ul>li").show()
        });
        /*订单号的筛选*/
        $('.storeOrderChangeScreen>.query>button').click('input', function () {
            var proxyData = $(".storeOrderChangeScreen>.query>input").val();
            $(".storeOrderChangeList>ul>li").hide().children().children(".filterPlate").filter(":contains('" + proxyData + "')").parent().parent().show();
            //查看
        });
    }

    carSet();
    userSet();
    orderHistory();
    storeOrder()


})();


























