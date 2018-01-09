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
        console.log(menuHeight + logoHeight);
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
    }

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
        //获取列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminRecommends/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var html = '';
                        for (var i = 0; i < data.data.length; i++) {
                            if (data.data[i].status == 1) {
                                var status = '是'
                            } else {
                                var status = '否'
                            }
                            if (!data.data[i].recommended.plat_number) {
                                var plat_number = '尚未绑定车辆'
                            } else {
                                var plat_number = data.data[i].recommended.plat_number
                            }
                            html += '<li><div>' +
                                ' <div class="filterOrder" data-id="' + data.data[i].referrer_id + '"><span><a href="##">' + data.data[i].referrer.name + '</a></span></div>' +
                                ' <div class="filterOrder" data-id="' + data.data[i].recommended_id + '"><span><a href="##">' + data.data[i].recommended.name + '</a></span></div>' +
                                '<div class=""><span>' + plat_number + '</span></div>' +
                                '<div><span>' + data.data[i].time + '</span></div>' +
                                '<div><span>' + status + '</span></div>' +
                                '</div></li>';
                        }
                        $('.priceList>ul').html(html)
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //查看用户信息
        $('.priceList>ul').on('click', '.filterOrder a', function (e) {
            var user_id = $(this).parent().parent().attr('data-id');
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
                        if (data.data.gender == 1) {
                            var gender = '男'
                        } else {
                            var gender = '女'
                        }
                        if (data.data.status == 1) {
                            var status = '锁定'
                        } else {
                            var status = "未锁定"
                        }
                        $('.personal .headImg').attr('src', data.data.headimgurl);
                        $('.personal .phone').html(data.data.phone);
                        $('.personal .name').html(data.data.nick);
                        $('.personal .gender').html(gender);
                        $('.personal .ml').html(data.data.ml);
                        $('.personal .userSetInfoState').html(status);

                        //查看该用户所有车辆
                        document.getElementsByClassName('userSetInfoAllBut')[0].onclick = function () {
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
                                        var li = '';
                                        for (var i = 0; i < data.data.length; i++) {
                                            array.push(data.data[i]);
                                            li += '<li data-id="' + data.data[i].id + '">' +
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
                                        }
                                        $('.userInfoCarList>ul').html(li);
                                        $('.userInfoCarList>ul').on('click', '.carEdit', function () {
                                            var car_id = $(this).parent().parent().parent().parent().attr('data-id');
                                            var data;
                                            for (var i = 0; i < array.length; i++) {
                                                if (car_id == array[i].id) {
                                                    data = array[i];
                                                    $('.carDetail .car_name').html(data.car_name);
                                                    $('.carDetail .plat_number').html(data.plat_number);
                                                    $('.carDetail .city_name').html(data.city_name);
                                                    $('.carDetail .rear').html(data.rear);
                                                    $('.carDetail .drivingFront img').attr('src', data.traveled_img_obverse);
                                                    $('.carDetail .drivingReverse img').attr('src', data.traveled_img_inverse);
                                                    $('.carDetail .insuranceImg img').attr('src', data.insurance_img);
                                                    $('.carDetail .mileageImg img').attr('src', data.maturity_img);
                                                    $('.carDetail .logoImg').attr('src', data.logo);
                                                    $('.carDetail .driving_license_date').html(data.driving_license_date);
                                                    $('.carDetail .service_end_date').html(data.service_end_date);
                                                    $('.carDetail .referee').html(data.referee);
                                                    $('.carDetail .font').html(data.font);
                                                    $('.carDetail .time').html(data.time);
                                                    if (data.is_default == 1) {
                                                        var a = '是'
                                                    } else {
                                                        var a = '否'
                                                    }
                                                    $('.carDetail .is_default').html(a);
                                                }
                                            }


                                        })
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

            e.preventDefault();
            $('.userSetInfo').css({
                display: "block"
            });
            //点击确定关闭
            $('.userSetInfoConfirmOK').click(function () {
                $('.userSetInfo').css({
                    display: "none"
                });
            });
            //点击查看用户车辆
            $('.userSetInfoAllBut').click(function () {
                $('.personal').css({
                    display: "none"
                });
                $('.userCarList').css({
                    display: "block"
                })
            });
            //返回上一步
            $('.userSetInfoComeback').click(function () {
                $('.userCarList').css({
                    display: "none"
                });
                $('.personal').css({
                    display: "block"
                })
            })
        });

        //查看每辆车的信息
        $('.userInfoCarList>ul').on('click', '.carEdit', function (e) {
            e.preventDefault();
            $('.userCarList').css({
                display: "none"
            });
            $('.carDetail').css({
                display: "block"
            });
        });

        //返回用户资料首页
        $('.carDetailBtnLookInfo').click(function () {
            $('.carDetail').css({
                display: "none"
            });
            $('.personal').css({
                display: "block"
            });
        });
        //返回宝驹列表
        $('.carDetailBtnComeback').click(function () {
            $('.carDetail').css({
                display: "none"
            });
            $('.userCarList').css({
                display: "block"
            });
        })

    }

    referrer();
})();
