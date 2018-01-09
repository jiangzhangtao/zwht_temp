(function () {
    var admin_id = sessionStorage["admin_id"];
    var token = sessionStorage["token"];
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
    function userSet() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminUser/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].gender == 1) {
                            var gender = '男'
                        } else {
                            var gender = '女'
                        }
                        if (data.data[i].status == 1) {
                            var status = '锁定'
                        } else {
                            var status = '未锁定'
                        }
                        var html = ' <li data-id="' + data.data[i].id + '"><div><div>' +
                            '<img src="' + data.data[i].headimgurl + '" alt=""/></div>' +
                            '<div class="filterPhone"><span>' + data.data[i].phone + '</span></div>' +
                            '<div class="userNick"><span>' + data.data[i].nick + '</span></div>' +
                            '<div class="userGender"><span>' + gender + '</span></div>' +
                            '<div class="filterMoney"><span>' + data.data[i].ml + '</span></div>' +
                            '<div class="userStatus"><span>' + status + '</span></div>' +
                            '<div><a href="##" class="userSetEdit"><span class="fa fa-eye"></span>查看</a>' +
                            '<a href="##" class="delete"><span class="userSetRemove fa fa-external-link"></span>移除</a>' +
                            '</div></div></li>';
                        $('.userSetList>ul').append(html)
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //锁定

        //返回关闭
        $('.userBlackBut').click(function () {
            $('.userSetInfo').css({display: "none"})
        });
        //确定修改

        //查看
        $('.userSetList>ul').on('click', '.userSetEdit', function () {
            $('.userSetInfo').css({display: "block"});
            var lis = $(this).parent().parent().parent();
            var user_id = $(this).parent().parent().parent().attr('data-id');
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
                
                        } else {
                            var status = '未锁定'
                        }
                        $('.personal .userSetInfoAvatar img').attr('src', data.data.headimgurl);
                        $('.personal .userPhone').val(data.data.phone);
                        $('.personal .userNice').val(data.data.nick);
                        $('.personal .userGender').val(data.data.gender);
                        $('.personal .userSetInfoState').html(status);
                        $('.personal .userSetInfoState').attr('data-id',data.data.status);
                        $('.personal .userMoney').val(data.data.ml);
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

            //确定修改用户
            document.getElementsByClassName('userSetInfoConfirmOK')[0].onclick = function () {
                var phone = $('.personal .userPhone').val();
                var nick = $('.personal .userNice').val();
                var gender = $('.personal .userGender').val();
                var status = $('.personal .userSetInfoState').attr('data-id');
                var ml = $('.personal .userMoney').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/edit',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        phone: phone,
                        nick: nick,
                        gender: gender,
                        ml: ml,
                        user_id: user_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('修改成功');
                            if (data.data.gender == 1) {
                                var gender = '男'
                            } else {
                                var gender = '女'
                            }
                            lis.children().children('.filterPhone').children().html(data.data.phone);
                            lis.children().children('.userNick').children().html(data.data.nick);
                            lis.children().children('.userGender').children().html(gender);
                            lis.children().children('.filterMoney').children().html(data.data.ml);
                            $('.userSetInfo').css({display: "none"})
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            };

            //锁定用户
            document.getElementsByClassName('userSetLock')[0].onclick = function () {
           
                if ($('.personal .userSetInfoState').attr('data-id') == 1) {
                    $(this).attr('data-id', 2);
                    $('.personal .userSetInfoState').attr('data-id', 2);
                
                } else {
                    $(this).attr('data-id', 1);
                    $('.personal .userSetInfoState').attr('data-id', 1);
                }
                var status = $('.personal .userSetInfoState').attr('data-id');
                console.log(status)
                var that=this;
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/lock',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        user_id: user_id,
                        status: status
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('修改成功');
                            if ($(that).attr('data-id') == 1) {
                                $('.userSetInfoState').html('锁定');
                                var status = '锁定';
                     
                            } else {
                                $('.userSetInfoState').html('未锁定');
                                var status = '未锁定';
                        
                            }
                            lis.children().children('.userStatus').children().html(status);
                            $('.userSetInfo').css({display: "none"})
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            };

            //查看用户车辆列表
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
                            // console.log(data);
                            var li='';
                            if (data.data) {
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
                                    for (var i = 0; i < array.length; i++) {
                                        if (car_id == array[i].id) {
                                            var data = array[i];
                                        }
                                    }
                                    $('.carDetail .car_name').html(data.car_name);
                                    $('.carDetail .plat_number').html(data.plat_number);
                                    $('.carDetail .city_name').html(data.city_name);
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
                                    $('.carDetail .rear').html(data.rear);
                                    if (data.is_default == 1) {
                                        var a = '是'
                                    } else {
                                        var a = '否'
                                    }
                                    $('.carDetail .is_default').html(a);

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

            //重置密码
            document.getElementsByClassName('new_paw')[0].onclick = function () {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/resetPwd',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        user_id: user_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('密码已经重置，新密码为 ' + data.data.new_pwd + ' 。请您牢记登陆密码！')
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

//删除用户
        $('.userSetList>ul').on('click', '.delete', function () {
            var user_id = $(this).parent().parent().parent().attr('data-id');
            var thisLi = $(this).parent().parent().parent();
            if (confirm('确认删除此用户吗?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminUser/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        user_id: user_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('成功删除');
                            thisLi.remove()
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
        })
    }

    /*         车辆设置       */
    function carSet() {
        $.ajax({
            type:'post',
            url:'http://180.76.243.205:8383/_API/_adminUserCar/getList',
            data:{
                admin_id:admin_id,
                token:token
            },
            success:function(data){
                if(data.code=='E0000'){
                    console.log(data);
                    if(data.data){
                        var html='';
                        for(var i=0;i<data.data.length;i++){
                            html+='<li data-id="'+data.data[i].id+'">'+
                                '<div data-id="'+data.data[i].user_id+'">'+
                                '<div class="filterPlate"><span>'+data.data[i].plat_number+'</span></div>'+
                                '<div class="carCityName"><span>'+data.data[i].city_name+'</span></div>'+
                                '<div class="carTraveled"><span>'+data.data[i].traveled+'</span></div>'+
                                '<div class="carLicense"><span>'+data.data[i].driving_license_date.split(' ')[0]+'</span></div>'+
                                '<div class="carService"><span>'+data.data[i].service_end_date.split(' ')[0]+'</span></div>'+
                                '<div><a href="##" class="carSetEdit"><span class="fa fa-eye"></span>查看</a>'+
                                '<a href="##" class="delete"><span class="carSetRemove fa fa-external-link"></span>移除</a>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                        }
                        $('.carSetList>ul').append(html)

                    }
                }else{
                    alert(data.message);
                }
            },
            err:function(err){
                console.log(err);
            }
        });



        //筛选
        $(window).ready(function () {
            $(".carSetList>ul>li").show()
        });
        /*手机号的筛选*/
        $('.carSetPlate>button').click('input', function () {
            var proxyData = $(".carSetPlate>input").val();
            $(".carSetList>ul>li").hide().children().children(".filterPlate").filter(":contains('" + proxyData + "')").parent().parent().show();
        });



        //查看
        $('.carSetList>ul').on('click', '.carSetEdit', function (e) {
            e.preventDefault();
            $('.CarSetInfo').css({display: "block"});
            $('.CarSetPersonal').css({display: "none"});
            $('.CarSetList').css({display: 'none'});
            $('.CarDetail').css({display: "block"});
            var user_id=$(this).parent().parent().attr('data-id');
            var user_car_id=$(this).parent().parent().parent().attr('data-id');
            $.ajax({
                type:'post',
                url:'http://180.76.243.205:8383/_API/_adminUserCar/getSingle',
                data:{
                    admin_id:admin_id,
                    token:token,
                    user_id:user_id,
                    user_car_id:user_car_id
                },
                success:function(data){
                    if(data.code=='E0000'){
                        console.log(data);
                        $('.CarDetail .car_name').html(data.data.car_name);
                        $('.CarDetail .plat_number').html(data.data.plat_number);
                        $('.CarDetail .city_name').html(data.data.city_name);
                        $('.CarDetail .CarDrivingFront img').attr('src', data.data.traveled_img_obverse);
                        $('.CarDetail .CarDrivingReverse img').attr('src', data.data.traveled_img_inverse);
                        $('.CarDetail .CarDrivingInsuranceImg img').attr('src', data.data.insurance_img);
                        $('.CarDetail .CarDrivingMileageImg img').attr('src', data.data.maturity_img);
                        $('.CarDetail .logoImg').attr('src', data.data.logo);
                        $('.CarDetail .driving_license_date').html(data.data.driving_license_date);
                        $('.CarDetail .service_end_date').html(data.data.service_end_date);
                        $('.CarDetail .referee').html(data.data.referee);
                        $('.CarDetail .font').html(data.data.font);
                        $('.CarDetail .time').html(data.data.time);
                        $('.CarDetail .rear').html(data.data.rear);
                        if (data.data.is_default == 1) {
                            var a = '是'
                        } else {
                            var a = '否'
                        }
                        $('.CarDetail .is_default').html(a);
                    }else{
                        alert(data.message);
                    }
                },
                err:function(err){
                    console.log(err);
                }
            });




        });
        $('.CarDetailBtnLookInfo').click(function () {
            $('.CarSetPersonal').css({display: "block"});
            $('.CarSetList').css({display: 'none'});
            $('.CarDetail').css({display: "none"});
        });
        $('.CarSetInfoAllBut>button').click(function () {
            $('.CarSetPersonal').css({display: "none"});
            $('.CarSetList').css({display: 'block'});
            $('.CarDetail').css({display: "none"});
        });
        //suoding
        $('.CarSetLock').click(function () {
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $('.CarSetInfoState').html('锁定');
                $(this).html('恢复')
            } else {
                $(this).attr('data-id', 1);
                $('.CarSetInfoState').html('未锁定');
                $(this).html('锁定')
            }
        });
        //确定关闭
        $('.CarSetInfoConfirmOK').click(function () {
            $('.CarSetInfo').css({display: "none"})
        });
        //
        $('.CarSetInfoComeback').click(function () {
            $('.CarSetPersonal').css({display: "block"});
            $('.CarSetList').css({display: 'none'});
            $('.CarDetail').css({display: "none"});
        });
        $('.CarSetInfoCarList>ul').on('click', '.CarEdit', function (e) {
            e.preventDefault();
            $('.CarSetPersonal').css({display: "none"});
            $('.CarSetList').css({display: 'none'});
            $('.CarDetail').css({display: "block"});
        });
        $('.CarDetailBtnComeback').click(function () {
            $('.CarSetInfo').css({display: "none"})
        })
    }

    userSet();
    carSet();
})
();


























