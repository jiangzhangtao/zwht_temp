(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();
        var contentHeight = $('.content').height();
        console.log(menuHeight + logoHeight)
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


    var daifahuo = [];
    var daishohuo = [];
    var daifuwu = [];
    var ok = [];
    var undo=[];
    $.ajax({
        type: 'post',
        url: 'http://180.76.243.205:8383/_API/_adminOrder/getList',
        data: {
            admin_id: admin_id,
            token: token
        },
        success: function (data) {
            if (data.code == 'E0000') {
                for (var i = 0; i < data.data.length; i++) {
                    var a = data.data[i];
                    switch (data.data[i].status) {
                        case '1':
                            ok.push(a);
                            break;
                        case '2':
                            daishohuo.push(a);
                            break;
                        case '3':
                            daifuwu.push(a);
                            break;
                        case '4':
                            undo.push(a);
                            break;
                        case '5':
                            daifahuo.push(a);
                            break;
                        case '6':
                            daifuwu.push(a);
                            break;
                        case '7':
                            ok.push(a);
                            break;
                    }
                }
                zuofei();
                finish();
                service();
                receiving();
                shipments();
            } else {
                alert(data.message);
            }
        },
        err: function (err) {
            console.log(err);
        }
    });


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


    /*                     待发货                    */
    function shipments() {

        //列表

        if (daifahuo) {
            var html = '';
            for (var i = 0; i < daifahuo.length; i++) {
                if (daifahuo[i].subtype_id == 1) {
                    var subType = '原厂更换'
                } else if (daifahuo[i].subtype_id == 2) {
                    var subType = '免费再换'
                } else if (daifahuo[i].subtype_id == 3) {
                    var subType = '免费补胎'
                }
                else if (daifahuo[i].subtype_id == 0) {
                    var subType = '&nbsp;'
                }
                html += '<li data-id="' + daifahuo[i].id + '">';
                html += '<div>';
                html += '<div class="filterOrder"><span>' + daifahuo[i].no + '</span></div>';
                html += '<div class="phone"><span>' + daifahuo[i].phone + '</span></div>';
                html += '<div><span>' + daifahuo[i].total + '</span></div>';
                html += '<div><span>' + subType + '</span></div>';
                html += '<div><span>待发货</span></div>';
                html += '<div><a href="##" class="shipmentsEdit"><span class="fa fa-edit"></span>编辑</a></div>';
                html += '</div>';
                html += '</li>';
            }
            ;
            $('.shipmentsList>ul').html(html);
        }
        //查看详情
        $('.shipmentsList>ul').on('click', '.shipmentsEdit', function (e) {
            e.preventDefault();
            $('.orderInfo').css({display: "block"});
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
                        var status = null;
                        switch (data.data.order.status) {
                            case '1':
                                status = '交易完成';
                                break;
                            case '2':
                                status = '待收货';
                                break;
                            case '3':
                                status = '待商家确认服务';
                                break;
                            case '4':
                                status = '完成';
                                break;
                            case '5':
                                status = '待发货';
                                break;
                            case '6':
                                status = '待车主确认服务';
                                break;
                        }
                        console.log(data);
                        //基本信息
                        $('.orderInfo .no').html(data.data.order.no);
                        $('.orderInfo .phone').html(data.data.order.phone);
                        $('.orderInfo .name').html(data.data.order.name);
                        $('.orderInfo .year').html(data.data.order.time.split(' ')[0]);
                        $('.orderInfo .plat_number').html(data.data.order.plat_number);
                        $('.orderInfo .mouth').html(data.data.order.time.split(' ')[1]);
                        //订单状态
                        $('.orderInfo .total').html(data.data.order.total);
                        $('.orderInfo .description').html(data.data.order.description);
                        $('.orderInfo .status').html(status);

                        //订单明细
                        var html = "";
                        for (var i = 0; i < data.data.details.length; i++) {
                            html += '<div>' +
                            '<ul>' +
                            '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                            '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                            '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                            '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                            '</ul></div>';
                        }
                        $('.orderDetailContent>div').html(html);

                        //获取仓库地址
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminStorage/getList',
                            data: {
                                admin_id: admin_id,
                                token: token
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    console.log(data);
                                    var option;
                                    for (var i = 0; i < data.data.length; i++) {
                                        option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</optioon>'
                                    }
                                    $('.font').html(option);
                                    $('.rear').html(option);
                                } else {
                                    alert(data.message);
                                }
                            },
                            err: function (err) {
                                console.log(err);
                            }
                        });

                        //确认发货
                        document.getElementsByClassName('orderButtonOk')[0].onclick = function () {
                            var font_storage_id = $('.font').val();
                            var rear_storage_id = $('.rear').val();
                            var that = this;
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminOrder/sendShoe',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    order_id: order_id,
                                    font_storage_id: font_storage_id,
                                    rear_storage_id: rear_storage_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('已发货!');
                                        $('.orderInfo').css({
                                            display: "none"
                                        });
                                        $(that).parent().parent().parent().remove();
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
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
        });


        //筛选
        $(window).ready(function () {
            $(".shipmentsList>ul>li").show()
        });
        $('.shipmentsContent>.query>div>div>button').click(function () {
            var inputVal = $('.shipmentsContent>.query>div>div>input').val();
            $(".shipmentsList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });

        //返回列表
        $('.orderButtonBack').click(function () {
            $('.orderInfo').css({display: "none"})
        });

    }

    /*                      待收货                       */
    function receiving() {

        var html = ''
        for (var i = 0; i < daishohuo.length; i++) {
            if (daishohuo[i].subtype_id == 1) {
                var subType = '原厂更换'
            } else if (daishohuo[i].subtype_id == 2) {
                var subType = '免费再换'
            } else if (daishohuo[i].subtype_id == 3) {
                var subType = '免费补胎'
            }
            else if (daishohuo[i].subtype_id == 0) {
                var subType = '&nbsp;'
            }
            html += '<li data-id="' + daishohuo[i].id + '">';
            html += '<div>';
            html += '<div class="filterOrder"><span>' + daishohuo[i].no + '</span></div>';
            html += '<div class="phone"><span>' + daishohuo[i].phone + '</span></div>';
            html += '<div><span>' + daishohuo[i].total + '</span></div>';
            html += '<div><span>' + subType + '</span></div>';
            html += '<div><span>待收货</span></div>';
            html += '<div><a href="##" class="receivingEdit"><span class="fa fa-edit"></span>编辑</a></div>';
            html += '</div>';
            html += '</li>';
        }
        ;
        $('.receivingList>ul').html(html);
        //筛选
        $(window).ready(function () {
            $(".receivingList>ul>li").show()
        });
        $('.receivingContent>.query>div>div>button').click(function () {
            var inputVal = $('.receivingContent>.query>div>div>input').val();
            $(".receivingList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //返回列表
        $('.receivingButtonBack').click(function () {
            $('.receivingInfo').css({display: "none"})
        });
        //查看详情
        $('.receivingList>ul').on('click', '.receivingEdit', function (e) {
            e.preventDefault();
            $('.receivingInfo').css({display: "block"});
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
                        var status = null;
                        switch (data.data.order.status) {
                            case '1':
                                status = '交易完成';
                                break;
                            case '2':
                                status = '待收货';
                                break;
                            case '3':
                                status = '待商家确认服务';
                                break;
                            case '4':
                                status = '完成';
                                break;
                            case '5':
                                status = '待发货';
                                break;
                            case '6':
                                status = '待车主确认服务';
                                break;
                        }
                        console.log(data);
                        //基本信息
                        $('.receivingInfo .no').html(data.data.order.no);
                        $('.receivingInfo .phone').html(data.data.order.phone);
                        $('.receivingInfo .name').html(data.data.order.name);
                        $('.receivingInfo .year').html(data.data.order.time.split(' ')[0]);
                        $('.receivingInfo .plat_number').html(data.data.order.plat_number);
                        $('.receivingInfo .mouth').html(data.data.order.time.split(' ')[1]);
                        //订单状态
                        $('.receivingInfo .total').html(data.data.order.total);
                        $('.receivingInfo .description').html(data.data.order.description);
                        $('.receivingInfo .status').html(status);

                        //订单明细
                        var html = "";
                        for (var i = 0; i < data.data.details.length; i++) {
                            html += '<div>' +
                            '<ul>' +
                            '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                            '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                            '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                            '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                            '</ul></div>';
                        }
                        $('.receivingDetailContent>div').html(html);


                        //确认收货
                        document.getElementsByClassName('receivingButtonOk')[0].onclick = function () {
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminOrder/confirm',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    order_id: order_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('已发货!')
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
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
        })


    }

    /*                      待服务                        */
    function service() {


        var html = ''
        for (var i = 0; i < daifuwu.length; i++) {
            if (daifuwu[i].subtype_id == 1) {
                var subType = '原厂更换'
            } else if (daifuwu[i].subtype_id == 2) {
                var subType = '免费再换'
            } else if (daifuwu[i].subtype_id == 3) {
                var subType = '免费补胎'
            }
            else if (daifuwu[i].subtype_id == 0) {
                var subType = '&nbsp;'
            }
            html += '<li data-id="' + daifuwu[i].id + '">';
            html += '<div>';
            html += '<div class="filterOrder"><span>' + daifuwu[i].no + '</span></div>';
            html += '<div class="phone"><span>' + daifuwu[i].phone + '</span></div>';
            html += '<div><span>' + daifuwu[i].total + '</span></div>';
            html += '<div><span>' + subType + '</span></div>';
            html += '<div><span>待服务</span></div>';
            html += '<div><a href="##" class="serviceEdit"><span class="fa fa-edit"></span>编辑</a></div>';
            html += '</div>';
            html += '</li>';
        }
        ;
        $('.serviceList>ul').html(html);
        //筛选
        $(window).ready(function () {
            $(".serviceList>ul>li").show()
        });
        $('.serviceContent>.query>div>div>button').click(function () {
            var inputVal = $('.serviceContent>.query>div>div>input').val();
            $(".serviceList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //返回列表
        $('.serviceButtonBack').click(function () {
            $('.serviceInfo').css({display: "none"})
        });
        //查看详情
        $('.serviceList>ul').on('click', '.serviceEdit', function (e) {
            e.preventDefault();
            $('.serviceInfo').css({display: "block"});
            var that = this;
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
                        var status = null;
                        switch (data.data.order.status) {
                            case '1':
                                status = '交易完成';
                                break;
                            case '2':
                                status = '待收货';
                                break;
                            case '3':
                                status = '待商家确认服务';
                                break;
                            case '4':
                                status = '完成';
                                break;
                            case '5':
                                status = '待发货';
                                break;
                            case '6':
                                status = '待车主确认服务';
                                break;
                        }
                        console.log(data);
                        //基本信息
                        $('.serviceInfo .no').html(data.data.order.no);
                        $('.serviceInfo .phone').html(data.data.order.phone);
                        $('.serviceInfo .name').html(data.data.order.name);
                        $('.serviceInfo .year').html(data.data.order.time.split(' ')[0]);
                        $('.serviceInfo .plat_number').html(data.data.order.plat_number);
                        $('.serviceInfo .mouth').html(data.data.order.time.split(' ')[1]);
                        //订单状态
                        $('.serviceInfo .total').html(data.data.order.total);
                        $('.serviceInfo .description').html(data.data.order.description);
                        $('.serviceInfo .status').html(status);

                        //订单明细
                        if (data.data.details) {
                            var html = "";
                            for (var i = 0; i < data.data.details.length; i++) {
                                html += '<div>' +
                                '<ul>' +
                                '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                                '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                                '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                                '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                                '</ul></div>';
                            }
                            $('.serviceDetailContent>div').html(html);
                        }

                        //查看图片详情
                        document.getElementsByClassName('serviceButtonOrderImg')[0].onclick = function () {
                            //图片详情
                            if (data.data.orderImg) {
                                var img = '';
                                for (var i = 0; i < data.data.orderImg.length; i++) {
                                    if (data.data.orderImg[i].type == 4) {
                                        $('.serviceOrderImg .carImg img').attr('src', data.data.orderImg[i].img_url)
                                    } else if (data.data.orderImg[i].type == 3) {
                                        $('.VINImg img').attr('src', data.data.orderImg[i].img_url)
                                    } else if (data.data.orderImg[i].type == 2) {
                                        $('.licenceImg img').attr('src', data.data.orderImg[i].img_url)
                                    } else {
                                        img += '<img src="' + data.data.orderImg[i].img_url + '" alt=""/>';
                                    }
                                }
                                $('.orderServiceImg').html(img);

                                $('.serviceOrderInfo').css({display: "none"});
                                $('.serviceOrderImg').css({display: "block"});
                            } else {
                                alert('此订单暂无图片')
                            }

                        };

                        //确认服务
                        document.getElementsByClassName('ServiceAffirmButton')[0].onclick = function () {

                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminOrder/confirm',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    order_id: order_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('订单已取消!');
                                        $(that).parent().parent().parent().remove();
                                        $('.serviceInfo').css({display: "none"});
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                        };

                        //确认服务
                        document.getElementsByClassName('serviceButtonOk')[0].onclick = function () {

                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminOrder/confirm',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    order_id: order_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('开始服务!');
                                        $(that).parent().parent().parent().remove();
                                        $('.serviceInfo').css({display: "none"});
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
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


        });


        //返回查看详情
        $('.serviceOrderImg .ServiceAffirmComeBack').click(function () {
            $('.serviceOrderInfo').css({display: "block"});
            $('.serviceOrderImg').css({display: "none"});
        })
    }

    /*                      已完成                        */
    function finish() {
        var html = '';
        for (var i = 0; i < ok.length; i++) {
            if (ok[i].subtype_id == 1) {
                var subType = '原厂更换'
            } else if (ok[i].subtype_id == 2) {
                var subType = '免费再换'
            } else if (ok[i].subtype_id == 3) {
                var subType = '免费补胎'
            }
            else if (ok[i].subtype_id == 0) {
                var subType = '&nbsp;'
            }
            html += '<li data-id="' + ok[i].id + '">';
            html += '<div>';
            html += '<div class="filterOrder"><span>' + ok[i].no + '</span></div>';
            html += '<div class="phone"><span>' + ok[i].phone + '</span></div>';
            html += '<div><span>' + ok[i].total + '</span></div>';
            html += '<div><span>' + subType + '</span></div>';
            html += '<div><span>完成</span></div>';
            html += '<div><a href="##" class="finishEdit"><span class="fa fa-edit"></span>编辑</a></div>';
            html += '</div>';
            html += '</li>';
        }
        ;
        $('.finishList>ul').html(html);
        //筛选
        $(window).ready(function () {
            $(".finishList>ul>li").show()
        });
        $('.finishContent>.query>div>div>button').click(function () {
            var inputVal = $('.finishContent>.query>div>div>input').val();
            $(".finishList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //查看详情
        $('.finishList>ul').on('click', '.finishEdit', function (e) {
            e.preventDefault();
            $('.finishInfo').css({display: "block"});
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
                        var status = null;
                        switch (data.data.order.status) {
                            case '1':
                                status = '交易完成';
                                break;
                            case '2':
                                status = '待收货';
                                break;
                            case '3':
                                status = '待商家确认服务';
                                break;
                            case '4':
                                status = '完成';
                                break;
                            case '5':
                                status = '待发货';
                                break;
                            case '6':
                                status = '待车主确认服务';
                                break;
                        }
                        console.log(data);
                        //基本信息
                        $('.finishInfo .no').html(data.data.order.no);
                        $('.finishInfo .phone').html(data.data.order.phone);
                        $('.finishInfo .name').html(data.data.order.name);
                        $('.finishInfo .year').html(data.data.order.time.split(' ')[0]);
                        $('.finishInfo .plat_number').html(data.data.order.plat_number);
                        $('.finishInfo .mouth').html(data.data.order.time.split(' ')[1]);
                        //订单状态
                        $('.finishInfo .total').html(data.data.order.total);
                        $('.finishInfo .description').html(data.data.order.description);
                        $('.finishInfo .status').html(status);

                        //订单明细
                        if (data.data.details) {
                            var html = "";
                            for (var i = 0; i < data.data.details.length; i++) {
                                html += '<div>' +
                                '<ul>' +
                                '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                                '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                                '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                                '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                                '</ul></div>';
                            }
                            $('.finishDetailContent>div').html(html);
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
        //返回列表
        $('.finishButtonBack').click(function () {
            $(".finishInfo").css({display: "none"})
        })
    }

    /*                      作废                       */
    function zuofei() {
        var html = '';
        for (var i = 0; i < undo.length; i++) {
            if (undo[i].subtype_id == 1) {
                var subType = '原厂更换'
            } else if (undo[i].subtype_id == 2) {
                var subType = '免费再换'
            } else if (undo[i].subtype_id == 3) {
                var subType = '免费补胎'
            }
            else if (undo[i].subtype_id == 0) {
                var subType = '&nbsp;'
            }
            html += '<li data-id="' + undo[i].id + '">';
            html += '<div>';
            html += '<div class="filterOrder"><span>' + undo[i].no + '</span></div>';
            html += '<div class="phone"><span>' + undo[i].phone + '</span></div>';
            html += '<div><span>' + undo[i].total + '</span></div>';
            html += '<div><span>' + subType + '</span></div>';
            html += '<div><span>已取消</span></div>';
            html += '<div><a href="##" class="undoEdit"><span class="fa fa-edit"></span>编辑</a></div>';
            html += '</div>';
            html += '</li>';
        }
        ;
        $('.undoList>ul').html(html);
        //筛选
        $(window).ready(function () {
            $(".undoList>ul>li").show()
        });
        $('.undoContent>.query>div>div>button').click(function () {
            var inputVal = $('.undoContent>.query>div>div>input').val();
            $(".undoList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //查看详情
        $('.undoList>ul').on('click', '.undoEdit', function (e) {
            e.preventDefault();
            $('.undoInfo').css({display: "block"});
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
                        var status = null;
                        //基本信息
                        $('.undoInfo .no').html(data.data.order.no);
                        $('.undoInfo .phone').html(data.data.order.phone);
                        $('.undoInfo .name').html(data.data.order.name);
                        $('.undoInfo .year').html(data.data.order.time.split(' ')[0]);
                        $('.undoInfo .plat_number').html(data.data.order.plat_number);
                        $('.undoInfo .mouth').html(data.data.order.time.split(' ')[1]);
                        //订单状态
                        $('.undoInfo .total').html(data.data.order.total);
                        $('.undoInfo .description').html(data.data.order.description);
                        $('.undoInfo .status').html('已取消');

                        //订单明细
                        if (data.data.details) {
                            var html = "";
                            for (var i = 0; i < data.data.details.length; i++) {
                                html += '<div>' +
                                '<ul>' +
                                '<li><span>服务名称：</span><p>' + data.data.details[i].service_name + '</p></li>' +
                                '<li><span>产品名称：</span><p>' + data.data.details[i].stock_name + '</p></li>' +
                                '<li><span>产品图片：</span><p><img src="' + data.data.details[i].img + '" alt=""/></p></li>' +
                                '<li><span>产品数量：</span><p>' + data.data.details[i].stock_no + '</p></li>' +
                                '</ul></div>';
                            }
                            $('.undoDetailContent>div').html(html);
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
        //返回列表
        $('.undoButtonBack').click(function () {
            $(".undoInfo").css({display: "none"})
        })
    }

    /*                       待服务轮胎订单                 */
    function tyreOrder() {


        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminOrder/getShoe',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var html = '';
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].order.order_no == '') {
                                var order_no = '&nbsp;'
                            } else {
                                var order_no = data.data[i].order.order_no;
                            }
                            html += ' <li data-id="' + data.data[i].order.order_no + '">' +
                            '<div>' +
                            '<div class="filterOrder"><span>' + order_no + '</span></div>' +
                            '<div class="phone"><span>' + data.data[i].order.phone + '</span></div>' +
                            '<div class="plat_number"><span>' + data.data[i].order.plat_number + '</span></div>' +
                            '<div><span>' + data.data[i].order.total_price + '</span></div>' +
                            '<div>' +
                            '<a href="##" class="tyreOrderEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        }
                        $('.tyreOrderList>ul').append(html);
                        $('.tyreOrderList>ul').on('click', '.tyreOrderEdit', function (e) {
                            e.preventDefault();
                            $('.tyreOrderInfo').css({display: "block"});
                            var order_id = $(this).parent().parent().parent().attr('data-id');
                            for (var i = 0; i < data.data.length; i++) {
                                if (order_id == data.data[i].order.order_no) {
                                    $('.tyreOrderInfo .order_no').html(data.data[i].order.order_no);
                                    $('.tyreOrderInfo .phone').html(data.data[i].order.phone);
                                    $('.tyreOrderInfo .name').html(data.data[i].order.name);
                                    $('.tyreOrderInfo .plat_number').html(data.data[i].order.plat_number);
                                    $('.tyreOrderInfo .total_no').html(data.data[i].order.total_no);
                                    $('.tyreOrderInfo .total').html(data.data[i].order.total_price);
                                    $('.tyreOrderInfo .size').html(data.data[i].size);
                                    $('.tyreOrderInfo .brand').html(data.data[i].brand);
                                    $('.tyreOrderInfo .flgure').html(data.data[i].flgure);
                                    $('.tyreOrderInfo .flgure_name').html(data.data[i].flgure_name);
                                    $('.tyreOrderInfo .year').html(data.data[i].order.time.split(' ')[0]);
                                    $('.tyreOrderInfo .mouth').html(data.data[i].order.time.split(' ')[1]);
                                }
                            }
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
        //筛选
        $(window).ready(function () {
            $(".tyreOrderList>ul>li").show()
        });
        $('.tyreOrderContent>.query>div>div>button').click(function () {
            var inputVal = $('.tyreOrderContent>.query>div>div>input').val();
            $(".tyreOrderList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });


        //返回列表
        $('.tyreOrderButtonBack').click(function () {
            $('.tyreOrderInfo').css({display: 'none'})
        })
    }

    tyreOrder();

})();


























