(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];
    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();

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
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var windowHeight = $(document.body).innerHeight();

        console.log(menuHeight + logoHeight);
        $(".menu").css({
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight - logoHeight - 1
        });
    });
    //获取省份
    var province;

    $.ajax({
        type: 'post',
        url: 'http://180.76.243.205:8383/_API/_province/get',
        success: function (data) {
            if (data.code == 'E0000') {
                province = data.data;
                for (var i = 0; i < province.length; i++) {
                    var option = '<option value="' + province[i].id + '">' + province[i].name + '</option>';
                    $('.warehouseRedactSelect').append(option);
                    $('.warehouseAddSelect').append(option);
                }
            } else {
                alert(data.message);
            }
        },
        err: function (err) {
            console.log(err);
        }
    });
    ////获取城市

    /*                   仓库列表                 */
    function warehouse() {

        //获取总数据
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminStorage/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    // console.log(data);
                    var wareHouse = data.data;
                    if (wareHouse.length) {
                        var wareProvince; //省份具体数据
                        for (var i = 0; i < wareHouse.length; i++) {
                            for (var p = 0; p < province.length; p++) {
                                if (wareHouse[i].province_id == province[p].id) {
                                    wareProvince = province[p].name;
                                }
                            }
                            var html = '<li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="wareHouseName"><span>' + data.data[i].name + '</span></div>' +
                                '<div class="wareHouseProvince" data-id="' + data.data[i].province_id + '"><span>' + data.data[i].province_name + '</span></div>' +
                                '<div class="wareHouseCity" data-id="' + data.data[i].city_id + '"><span>' + data.data[i].city_name + '</span></div>' +
                                '<div class="wareHousePosition" data-id="' + data.data[i].area_id + '"><span>' + data.data[i].area_name + '</span></div>' +
                                '<div class="description"><span><button>查看描述</button></span></div>' +
                                '<div><a href="##" class="warehouseEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="warehouseRemove fa fa-external-link"></span>移除</a></div>' +
                                '</div>' +
                                '<div class="stripeInfo">' +
                                '<span>' + data.data[i].address + '</span>' +
                                '</div>' +
                                '</li>';
                            $('.warehouseList>ul').append(html);
                        }

                        //查看详细描述信息
                        $('.warehouseList>ul').on('mouseover', ".description>span>button", function (e) {
                            e.preventDefault();
                            $(this).parent().parent().parent().siblings().css({
                                display: "block"
                            })
                        });
                        $('.warehouseList>ul').on('mouseout', ".description>span>button", function (e) {
                            e.preventDefault();
                            $(this).parent().parent().parent().siblings().css({
                                display: "none"
                            })
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


        //添加
        $('.warehouseAddList').click(function () {
            $('.warehouseAdd').css({display: "block"});
            //拿取城市   
            $('.warehouseAddSelect').change(function () {
                $('.wareHouseAddCity>option').remove();
                var province_id = $(this).val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_city/get',
                    data: {
                        province_id: province_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            // console.log(data);
                            for (var i = 0; i < data.data.length; i++) {
                                var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                $('.wareHouseAddCity').append(option)
                            }

                            //获取地区
                            $('.wareHouseAddArea>option').remove();
                            var city_id = $('.wareHouseAddCity').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_area/get',
                                data: {
                                    city_id: city_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        // console.log(data);
                                        for (var i = 0; i < data.data.length; i++) {
                                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                            $('.wareHouseAddArea').append(option);
                                        }
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });


                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            });
            //拿取地区
            $('.wareHouseAddCity').change(function () {
                $('.wareHouseAddArea>option').remove();
                var city_id = $(this).val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_area/get',
                    data: {
                        city_id: city_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            // console.log(data);
                            for (var i = 0; i < data.data.length; i++) {
                                var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                $('.wareHouseAddArea').append(option);
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
            //确定添加
            document.getElementsByClassName('warehouseAddBtnOk')[0].onclick = function () {
                var name = $('.warehouseAdd .wareHouseName').val();
                var address = $('.warehouseAdd .wareHouseAddress').val();
                var position_id = $('.wareHouseAddArea').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminStorage/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name,
                        address: address,
                        position_id: position_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('添加成功');
                            var html = '<li data-id="' + data.data.id + '">' +
                                '<div>' +
                                '<div class="wareHouseName"><span>' + data.data.name + '</span></div>' +
                                '<div class="wareHouseProvince" data-id="' + data.data.province_id + '"><span>' + data.data.province_name + '</span></div>' +
                                '<div class="wareHouseCity" data-id="' + data.data.city_id + '"><span>' + data.data.city_name + '</span></div>' +
                                '<div class="wareHousePosition" data-id="' + data.data.area_id + '"><span>' + data.data.area_name + '</span></div>' +
                                '<div class="description"><span><button>查看描述</button></span></div>' +
                                '<div><a href="##" class="warehouseEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="warehouseRemove fa fa-external-link"></span>移除</a></div>' +
                                '</div>' +
                                '<div class="stripeInfo">' +
                                '<span>' + data.data.address + '</span>' +
                                '</div>' +
                                '</li>';
                            $('.warehouseList>ul').append(html);

                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                $('.warehouseAdd').css({display: "none"})

            };

        });

        $('.warehouseUndoAdd').click(function () {
            $('.warehouseAdd').css({display: "none"})
        });
        //编辑
        $('.warehouseList>ul').on('click', ".warehouseEdit", function (e) {
            e.preventDefault();
            $('.warehouseRedact').css({display: "block"});
            var storage_id = $(this).parent().parent().parent().attr('data-id');
            var province_id = $(this).parent().siblings('.wareHouseProvince').attr('data-id');
            var city_id = $(this).parent().siblings('.wareHouseCity').attr('data-id');
            var area_id = $(this).parent().siblings('.wareHousePosition').attr('data-id');
            var lis=$(this).parent().parent().parent();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_city/get',
                data: {
                    province_id: province_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        for (var i = 0; i < data.data.length; i++) {
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.wareHouseRedactCity').append(option)
                        }
                        $('.warehouseRedact .wareHouseRedactCity').val(city_id);
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_area/get',
                data: {
                    city_id: city_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        for (var i = 0; i < data.data.length; i++) {
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.wareHouseRedactArea').append(option);
                        }
                        $('.warehouseRedact .wareHouseRedactArea').val(area_id);
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminStorage/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    storage_id: storage_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.warehouseRedact .wareHouseName').val(data.data.name);
                        $('.warehouseRedact .warehouseRedactSelect').val(data.data.province_id);
                        $('.warehouseRedact .wareHouseAddress').val(data.data.address);
                        //拿取城市  省市地区三级联动
                        $('.warehouseRedactSelect').change(function () {
                            $('.wareHouseRedactCity>option').remove();
                            var province_id = $(this).val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_city/get',
                                data: {
                                    province_id: province_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        for (var i = 0; i < data.data.length; i++) {
                                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                            $('.wareHouseRedactCity').append(option)
                                        }
                                        // 拿取地区
                                        $('.wareHouseRedactArea>option').remove();
                                        var city_id = $('.wareHouseRedactCity').val();
                                        $.ajax({
                                            type: 'post',
                                            url: 'http://180.76.243.205:8383/_API/_area/get',
                                            data: {
                                                city_id: city_id
                                            },
                                            success: function (data) {
                                                if (data.code == 'E0000') {
                                                    // console.log(data);
                                                    for (var i = 0; i < data.data.length; i++) {
                                                        var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                                        $('.wareHouseRedactArea').append(option);
                                                    }
                                                } else {
                                                    alert(data.message);
                                                }
                                            },
                                            err: function (err) {
                                                console.log(err);
                                            }
                                        });
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        });
                        //拿取地区
                        $('.wareHouseRedactCity').change(function () {
                            $('.wareHouseRedactArea>option').remove();
                            var city_id = $(this).val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_area/get',
                                data: {
                                    city_id: city_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        for (var i = 0; i < data.data.length; i++) {
                                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                            $('.wareHouseRedactArea').append(option);
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
                        document.getElementsByClassName('warehouseRedactBtnOk')[0].onclick = function () {
                            var name = $('.warehouseRedact .wareHouseName').val();
                            var address = $('.warehouseRedact .wareHouseAddress').val();
                            var position_id = $('.wareHouseRedactArea').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminStorage/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    name: name,
                                    address: address,
                                    position_id: position_id,
                                    storage_id: storage_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        var name = $('.warehouseRedact .wareHouseName').val();
                                        var address = $('.warehouseRedact .wareHouseAddress').val();
                                        var city=$('.warehouseRedact .wareHouseRedactCity option:selected').text();
                                        var province=$('.warehouseRedact .warehouseRedactSelect option:selected').text();
                                        var area=$('.warehouseRedact .wareHouseRedactArea option:selected').text();
                                        lis.children().children('.wareHouseName').children().html(name);
                                        lis.children().children('.wareHouseProvince').children().html(province);
                                        lis.children().children('.wareHouseCity').children().html(city);
                                        lis.children().children('.wareHousePosition').children().html(area);
                                        lis.children('.stripeInfo').children('span').html(address);
                                        $('.warehouseRedact').css({display: "none"})
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

        });
        //删除
        $('.warehouseList>ul').on('click', '.delete', function () {
            var storage_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            if (confirm('确认删除?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminStorage/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        storage_id: storage_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
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


        });
        $('.warehouseUndoRedact').click(function () {
            $('.warehouseRedact').css({display: "none"})
        });

    }

    /*                    运费列表                */
    function freight() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminFare/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        var html = '<li data-id="' + data.data[i].id + '"><div>' +
                            '<div class="shoeInch"><span>' + data.data[i].shoe_inch + '</span></div>' +
                            '<div class="inCity"><span>' + data.data[i].in_city + '</span></div>' +
                            '<div class="inProvince"><span>' + data.data[i].in_province + '</span></div>' +
                            '<div class="notInProvince"><span>' + data.data[i].not_in_province + '</span></div>' +
                            '<div><a href="##" class="freightEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="freightRemove fa fa-external-link"></span>移除</a></div>' +
                            '</div></li>';
                        $('.freightList>ul').append(html)
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });


        //添加
        $('.freightAddList').click(function () {
            $('.freightAdd').css({display: "block"});
            document.getElementsByClassName('freightAddBtnOk')[0].onclick = function () {
                var shoe_inch = $('.freightAdd .shoeInch').val();
                var inCity = $('.freightAdd .inCity').val();
                var inProvince = $('.freightAdd .inProvince').val();
                var notInProvince = $('.freightAdd .notInProvince').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFare/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_inch: shoe_inch,
                        in_city: inCity,
                        in_province: inProvince,
                        not_in_province: notInProvince
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('添加成功');
                            var html = '<li data-id="' + data.data.id + '"><div>' +
                                '<div class="shoeInch"><span>' + data.data.shoe_inch + '</span></div>' +
                                '<div class="inCity"><span>' + data.data.in_city + '</span></div>' +
                                '<div class="inProvince"><span>' + data.data.in_province + '</span></div>' +
                                '<div class="notInProvince"><span>' + data.data.not_in_province + '</span></div>' +
                                '<div><a href="##" class="freightEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="freightRemove fa fa-external-link"></span>移除</a></div>' +
                                '</div></li>';
                            $('.freightList>ul').append(html);
                            $('.freightAdd').css({display: "none"});
                            $('.freightAdd .shoeInch').val('');
                            $('.freightAdd .inCity').val('');
                            $('.freightAdd .inProvince').val('');
                            $('.freightAdd .notInProvince').val('');
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

        $('.freightUndoAdd').click(function () {
            $('.freightAdd').css({display: "none"})
        });
        //编辑
        $('.freightList>ul').on('click', ".freightEdit", function (e) {
            e.preventDefault();
            $('.freightRedact').css({display: "block"});
            var fare_id = $(this).parent().parent().parent().attr('data-id');
            var lis=$(this).parent().parent().parent();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminFare/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    fare_id: fare_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.freightRedact .shoeInch').val(data.data.shoe_inch);
                        $('.freightRedact .inCity').val(data.data.in_city);
                        $('.freightRedact .inProvince').val(data.data.in_province);
                        $('.freightRedact .notInProvince').val(data.data.not_in_province);
                        document.getElementsByClassName('freightRedactBtnOk')[0].onclick=function(){
                            var shoe_inch=$('.freightRedact .shoeInch').val();
                            var inCity=$('.freightRedact .inCity').val();
                            var inProvince=$('.freightRedact .inProvince').val();
                            var notInProvince=$('.freightRedact .notInProvince').val();
                            $.ajax({
                                type:'post',
                                url:'http://180.76.243.205:8383/_API/_adminFare/edit',
                                data:{
                                    admin_id:admin_id,
                                    token:token,
                                    shoe_inch: shoe_inch,
                                    in_city: inCity,
                                    in_province: inProvince,
                                    not_in_province: notInProvince,
                                    fare_id:fare_id
                                },
                                success:function(data){
                                    if(data.code=='E0000'){
                                        console.log(data);
                                        alert('修改成功');
                                        lis.children().children('.shoeInch').children().html(data.data.shoe_inch);
                                        lis.children().children('.inCity').children().html(data.data.in_city);
                                        lis.children().children('.inProvince').children().html(data.data.in_province);
                                        lis.children().children('.notInProvince').children().html(data.data.not_in_province)
                                    }else{
                                        alert(data.message);
                                    }
                                },
                                err:function(err){
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
        $('.freightRedactBtnOk').click(function () {
            $('.freightRedact').css({display: "none"})
        });
        $('.freightUndoRedact').click(function () {
            $('.freightRedact').css({display: "none"})
        });

        //删除
        $('.freightList>ul').on('click', '.delete', function () {
            var fare_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            if (confirm('确认删除?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFare/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        fare_id: fare_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
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


        })

    }


    warehouse();
    freight();
})();


























