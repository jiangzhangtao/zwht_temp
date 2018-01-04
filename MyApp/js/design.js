(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();
        var contentHeight = $('.content').height();
        $(".menu").css({
            height: bodyHeight - logoHeight - 1,
            minHeight: 925+'px'
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
    /*选项卡切换*/
    $(".navigation>div>ul>li>a").click(function () {
        $(".navigation>div>ul>li>a").eq($(this).parent().index()).parent().addClass('active').siblings().removeClass("active");
        $(".details>div").eq($(this).parent().index()).addClass('present').siblings().removeClass('present');
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        var windowHeight = $(window).innerHeight();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight - logoHeight - 1
        });
    });


    /***********************公示****************/
        //展示
    $.ajax({
        type: 'post',
        url: 'http://180.76.243.205:8383/_API/_adminFormula/get',
        data: {
            admin_id: admin_id,
            token: token
        },
        success: function (data) {
            if (data.code == 'E0000') {
                console.log(data);
                /* 一年天数*/
                var yearDays = data.data.year_days;
                $('.yearDays').val(yearDays);
                $('.yearDays').attr('disabled', true);

                /*轮胎规格*/
                var shoe_list = data.data.shoe_list;
                if (shoe_list) {
                    for (var j = 0; j < shoe_list.length; j++) {
                        var shoe_listOption = '<option value="' + shoe_list[j].size + '">' + shoe_list[j].size + '</option>';
                        $('.shoe').append(shoe_listOption)
                    }
                    $('.shoe').blur(function () {
                        $('.flgures').html('');
                        var size = $(this).val();
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminFormula/getFlgure',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                size: size
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    if (data.data) {
                                        for (var i = 0; i < data.data.length; i++) {
                                            var option = '<option value="' + data.data[i].flgure_id + '">' + data.data[i].flgure_name + '</option>';
                                            $('.flgures').append(option);
                                        }
                                    }
                                } else {
                                    alert(data.message);
                                    window.location.href = 'index.html'
                                }
                            },
                            error: function (err) {
                                console.log(err)
                            }
                        })
                    })
                }

                //获取当前年份
                var dateYear = new Date();
                var year = dateYear.getFullYear();
                $('.year').val(year);

                /*城市等级分类*/
                var plats = data.data.plats;
                if (plats) {
                    for (var k = 0; k < plats.length; k++) {
                        var option = '<option value="' + plats[k].id + '">' + plats[k].level + '</option>';
                        $('.plats').append(option);

                        /*城市等级增量*/
                        var cityLi = '<li data-id="' + plats[k].id + '">' +
                            '<span>' + (k + 1) + '</span>' +
                            '<span>' + plats[k].id + '</span>' +
                            '<span><input type="text" value="' + plats[k].index_no + '" disabled/>' +
                            '</span>' +
                            '<span><a href="##" class="compile" data-id="1"><b class="fa fa-edit"></b><i>编辑</i></a>' +
                            '</span>' +
                            '</li>';
                        $('.cityAdd .list>ul').append(cityLi)
                    }
                }

                /*行驶路况*/
                var roads = data.data.roads;
                var roadsNameArr=[];
                var road_info=[];  //所有有用的数据都在他

                if (roads) {
                    for(var i=0;i<roads.length;i++){
                        var obj={};
                        obj.road_id=roads[i].id;
                        obj.selected='type_iii_rate';
                        road_info.push(obj)
                    }
                    obj=null;
                    var typeDivWidth = $('.roadsSelect>div>div').innerWidth();
                    var typeDivHeight = $('.roadsSelect>div>div').innerHeight();
                    $(".roadsSelect>div>div").css({
                        marginTop: -(typeDivWidth / 2),
                        marginLeft: -(typeDivHeight / 2)
                    });

                    $('.type_rate').on('click', 'input', function (e) {
                        switch (e.target.className){
                            case 'type_i_rate':
                                $('.roadsSelect1').css({
                                    display: "block"
                                });
                                break;
                            case 'type_ii_rate':
                                $('.roadsSelect2').css({
                                    display: "block"
                                });
                                break;
                        }


                        //判断事件源
                        if(e.target.className=='type_i_rate'){
                            $('.roadsSelectLi').remove();
                            for (var i = 0; i < roads.length; i++) {
                                roadsNameArr.push(roads[i].name);
                                var roadsSelectLi = '<li data-id="' + roads[i].id + '" class="roadsSelectLi"><div>' +
                                    '<p class="roads_name" data-id="2">' + roads[i].name + '</p>' +
                                    '</div></li>';
                                $('.roadsSelect1 .addBtn').before(roadsSelectLi);
                            }

                            //选择路况
                            var roadName=[];
                            var road_i_id='';
                            $('.roadsSelect1 ul').on('click','.roads_name',function(){
                                if($(this).attr('data-id')==2){
                                    road_i_id=$(this).parent().parent().attr('data-id');
                                    for(var i=0;i<road_info.length;i++){
                                        if(road_i_id==road_info[i].road_id){
                                            road_info[i].selected='type_i_rate'
                                        }
                                    };
                                    roadName.push($(this).html());
                                    $(this).addClass('on').attr('data-id',1);
                                }else{
                                    $(this).removeClass('on').attr('data-id',2);
                                    for(var i=0;i<roadName.length;i++){
                                        if(roadName[i]==$(this).html()){
                                            roadName.splice(i,(i+1));
                                        }
                                    }
                                }
                                $('.roadsSelect1 .addBtnOk').click(function(){
                                    $('.roadsSelect1').css({
                                        display: "none"
                                    });
                                    if(roadName){
                                        console.log(road_info);
                                        var ro= roadName.toString();
                                        $(".type_i_rate").val(ro)
                                    }
                                });
                            });
                        }
                        else if(e.target.className=='type_ii_rate'){
                            $('.roadsSelectLi').remove();
                                for(var j=0;j<road_info.length;j++){
                                    if(road_info[j].selected!='type_i_rate'){
                                            roadsNameArr.push(roads[j].name);
                                            var roadsSelectLi = '<li data-id="' + roads[j].id + '" class="roadsSelectLi"><div>' +
                                                '<p class="roads_name" data-id="2">' + roads[j].name + '</p>' +
                                                '</div></li>';
                                            $('.roadsSelect2 .addBtn').before(roadsSelectLi);
                                    }
                                }
                            //选择路况
                            var roadName=[];
                            var road_ii_id='';
                            $('.roadsSelect2 ul').on('click','.roads_name',function(){
                                if($(this).attr('data-id')==2){
                                    road_ii_id=$(this).parent().parent().attr('data-id');
                                    for(var i=0;i<road_info.length;i++){
                                        if(road_ii_id==road_info[i].road_id){
                                            road_info[i].selected='type_ii_rate'
                                        }
                                    };
                                    roadName.push($(this).html());
                                    $(this).addClass('on').attr('data-id',1);
                                }else{
                                    $(this).removeClass('on').attr('data-id',2);
                                    for(var i=0;i<roadName.length;i++){
                                        if(roadName[i]==$(this).html()){
                                            roadName.splice(i,(i+1));
                                        }
                                    }
                                }
                                $('.roadsSelect2 .addBtnOk').click(function(){
                                    $('.roadsSelect2').css({
                                        display: "none"
                                    });
                                    if(roadName){
                                        console.log(road_info);
                                        var ro= roadName.toString();
                                        $(".type_ii_rate").val(ro)
                                    }
                                });
                            });
                        }
                        else{
                            var roadName=[];
                            for(var j=0;j<road_info.length;j++){
                                if(road_info[j].selected=='type_iii_rate'){
                                    roadsNameArr.push(roads[j].name);
                                    var roadsSelectLi = '<li data-id="' + roads[j].id + '" class="roadsSelectLi"><div>' +
                                        '<p class="roads_name" data-id="2">' + roads[j].name + '</p>' +
                                        '</div></li>';
                                    $('.roadsSelect3 .addBtn').before(roadsSelectLi);
                                    roadName.push(roads[j].name);
                                }
                            }
                            if(roadName){
                                console.log(road_info);
                                var ro= roadName.toString();
                                $(".type_iii_rate").val(ro)
                            }
                        }
                    })
                }
                //
                $('.driving_license_date').blur(function(){
                    var driving_license_date = $('.driving_license_date').val();
                    var license_register_date = driving_license_date.split('-')[0];
                    console.log(license_register_date);
                    $('.license_register_date').val(license_register_date);
                });
                //计算
                $('.formulaButton>button').click(function () {
                    var cxwy = $('.cxwy').val();
                    var shoe_size = $('.shoe').val();
                    var flgure_id = $('.flgures').val();
                    var level_id = $('.plats').val();
                    var traveled = $('.traveled').val();
                    var driving_license_date = $('.driving_license_date').val();
                    var license_register_date = driving_license_date.split('-')[0];
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminFormula/calculate',
                        data:{
                            cxwy:cxwy,
                            shoe_size:shoe_size,
                            flgure_id:flgure_id,
                            level_id:level_id,
                            traveled:traveled,
                            license_register_date:license_register_date,
                            driving_license_date:driving_license_date,
                            admin_id:admin_id,
                            token:token,
                            road_info:road_info
                        },
                        success:function(data){
                            if(data.code=='E0000'){
                                console.log(data);
                                $('.shoe_price>p>b').text(data.data.shoe_price)
                            }else{
                                alert(data.message)
                            }
                        },
                        error:function(err){
                            console.log(err)
                        }
                    })
                });
                //
            } else {
                alert(data.message);
                window.location.href = 'index.html'
            }
        }, error: function (err) {
            console.log(err)
        }
    });
    //取消选择路况
    $('.roadsSelect .undoAdd').click(function () {
        $('.roadsSelect').css({
            display: "none"
        });
        $('.roadsSelectLi').remove();
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
            $(this).children("b").removeClass("fa-check-circle").addClass("fa-edit");
            /*编辑城市等级增量*/
            if ($(this).children("i").html() == '编辑') {
                var level_id = $(this).parent().parent().attr('data-id');
                var index_no = $(this).parent().siblings().children('input').val();
                $.ajax({
                    type: "post",
                    url: 'http://180.76.243.205:8383/_API/_adminCity/edit',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        level_id: level_id,
                        index_no: index_no
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('修改成功!')
                        } else {
                            alert(data.message);
                            window.location.href = 'index.html';
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            }
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

        //路况增量展示
    $.ajax({
        type: 'post',
        url: 'http://180.76.243.205:8383/_API/_adminRoad/get',
        data: {
            admin_id: admin_id,
            token: token
        },
        success: function (data) {
            if (data.code == 'E0000') {
                if (data.data) {
                    var traffic = data.data;
                    for (var i = 0; i < traffic.length; i++) {
                        var trafficLi = '<li data-id="' + traffic[i].id + '">' +
                            '<div><span class="describeName">' + traffic[i].name + '</span></div>' +
                            '<div><span><img src="' + traffic[i].img + '" alt="" class="describeImg"/></span></div>' +
                            '<div class="describe"><span><button>查看描述</button></span>' +
                            ' <div class="describeInfo">' + traffic[i].description + '</div></div>' +
                            '<div><span class="describeType_i">' + traffic[i].type_i_rate + '</span></div>' +
                            '<div><span class=describeType_ii>' + traffic[i].type_ii_rate + '</span></div>' +
                            '<div><span class="describeType_iii">' + traffic[i].type_iii_rate + '</span></div>' +
                            '<div><span>' +
                            '<a href="##" class="edit"><b class="fa fa-edit"></b>' +
                            '<i>编辑</i></a>' +
                            '<a href="##" class="remo"><b class="fa fa-external-link"></b>' +
                            '<i>移除</i></a>' +
                            '</span>' +
                            '</div>' +
                            '</li>';
                        $('.traffic .trafficList>ul>.add').before(trafficLi);
                    }

                    //编辑路况
                    $('.trafficList>ul').on("click", ".edit", function (e) {
                        e.preventDefault();
                        $('.redact').css({
                            display: "block"
                        });
                        var addDivWidth = $('.redact>div>div').innerWidth();
                        var addDivHeight = $('.redact>div>div').innerHeight();
                        $(".redact>div>div").css({
                            marginTop: -(addDivHeight / 2),
                            marginLeft: -(addDivWidth / 2)
                        });
                        //展示单条数据
                        var thisDiv = $(this).parent().parent().parent().children();
                        $('.redact .trafficName').val(thisDiv.children('.describeName').text());
                        $('.redact .trafficImg').attr('src', thisDiv.children().children('.describeImg').attr('src'));
                        $('.redact .trafficInfo').val(thisDiv.children('.describeInfo').text());
                        $('.redact .levelOne').val(thisDiv.children('.describeType_i').text());
                        $('.redact .levelTwo').val(thisDiv.children('.describeType_ii').text());
                        $('.redact .levelThree').val(thisDiv.children('.describeType_iii').text());
                        var road_id = $(this).parent().parent().parent().attr('data-id');

                        //确定编辑
                        $('.redact').one('click', '.addBtnOk', function () {
                            "use strict";
                            var fData = new FormData(document.getElementById('trafficRedact'));
                            fData.append('road_id', road_id);
                            fData.append('admin_id', admin_id);
                            fData.append('token', token);
                            $.ajax({
                                type: 'post',
                                processData: false,
                                contentType: false,
                                url: 'http://180.76.243.205:8383/_API/_adminRoad/edit',
                                data: fData,
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功!');
                                        //关闭模态框
                                        $('.redact').css({
                                            display: "none"
                                        });
                                        //重新赋值
                                        var name = $('.redact .trafficName').val();
                                        var img = $('.redact .trafficImg').attr('src');
                                        var info = $('.redact .trafficInfo').val();
                                        var type_i = $('.redact .levelOne').val();
                                        var type_ii = $('.redact .levelTwo').val();
                                        var type_iii = $('.redact .levelThree').val();
                                        console.log()
                                        thisDiv.children('.describeName').text(name);
                                        thisDiv.children().children('.describeImg').attr('src', img);
                                        thisDiv.children('.describeInfo').text(info);
                                        thisDiv.children('.describeType_i').text(type_i);
                                        thisDiv.children('.describeType_ii').text(type_ii);
                                        thisDiv.children('.describeType_iii').text(type_iii);

                                    } else {
                                        alert(data.message);
                                        window.location.href = 'index.html'
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        })
                    });

                }
            } else {
                alert(data.message);
                window.location.href = 'index.html'
            }
        },
        err: function (err) {
            console.log(err);
        }
    });


    //描述信息
    $('.trafficList>ul').on('mouseover', ".describe>span>button", function (e) {
        e.preventDefault();
        $(this).parent().siblings().css({
            display: "block"
        })
    });
    $('.trafficList>ul').on('mouseout', ".describe>span>button", function (e) {
        e.preventDefault();
        $(this).parent().siblings().css({
            display: "none"
        })
    });

    //添加路况
    $('.add').click(function () {
        $('.addHtml').css({
            display: "block"
        });
        var addDivWidth = $('.addHtml>div>div').innerWidth();
        var addDivHeight = $('.addHtml>div>div').innerHeight();
        $(".addHtml>div>div").css({
            marginTop: -(addDivHeight / 2),
            marginLeft: -(addDivWidth / 2)
        })
    });


    //确定添加路况
    $('.addHtml').one('click', '.addBtnOk', function () {
        var fData = new FormData(document.getElementById('trafficAdd'));
        fData.append('admin_id', admin_id);
        fData.append('token', token);
        $.ajax({
            type: 'post',
            processData: false,
            contentType: false,
            url: 'http://180.76.243.205:8383/_API/_adminRoad/add',
            data: fData,
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    alert('添加成功');
                    $('.addHtml').css({
                        display: "none"
                    });
                    var addName = $(".addHtml .trafficName").val();
                    var addImg = '';
                    var addText = $('.addHtml .trafficInfo').val();
                    var addLevelOne = $('.addHtml .levelOne').val();
                    var addLevelTwo = $(".addHtml .levelTwo").val();
                    var addLevelThree = $(".addHtml .levelThree").val();
                    //拼接字符串
                    var str = '';
                    str += "<li data-id='" + data.data.id + "'>" +
                    "<div><span class='describeName'>" + addName + "</span></div>" +
                    "<div><span><img src='" + addImg + "' class='describeImg'/></span></div>" +
                    "<div class='describe'><span><button>查看描述</button></span>" +
                    '<div class="describeInfo">' + addText + '</div>' +
                    '</div>' +
                    '<div><span class="describeType_i">' + addLevelOne + '</span></div>' +
                    '<div><span class="describeType_ii">' + addLevelTwo + '</span></div>' +
                    '<div><span class="describeType_iii">' + addLevelThree + '</span></div>' +
                    '<div>' +
                    '<span>' +
                    '<a href="##" class="edit">' +
                    '<b class="fa fa-edit"></b>' +
                    '<i>编辑</i>' +
                    '</a>' +
                    '<a href="##" class="remo"><b class="fa fa-external-link"></b>' +
                    '<i>移除</i></a>' +
                    "</span>" +
                    '</div>' +
                    '</li>';
                    $(".add").before(str);
                    var detailsHeight = $('.details').innerHeight();
                    var navigationHeight = $(".navigation").innerHeight();
                    $(".menu").css({
                        height: detailsHeight + navigationHeight
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

    //删除路况
    $('.trafficList>ul').on('click', '.remo', function () {
        var road_id = $(this).parent().parent().parent().attr('data-id');
        var that = $(this);
        if (confirm('确认删除?')) {
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminRoad/delete',
                data: {
                    admin_id: admin_id,
                    token: token,
                    road_id: road_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        alert('删除成功');
                        that.parent().parent().parent().remove();
                    } else {
                        alert(data.message);
                        window.location.href = 'index.html'
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        }
        var fData = new FormData(document.getElementById('homeLogoAdd'));

    });

    //图片
    $('.files>input').change(function () {
        var file = this.files[0];
        console.log(file);
        if (file == null) {
            $(this).parent().siblings('img').attr('src', "img/design/img1.jpg");
            return;
        }
        var render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = function (e) {
            $(".files>input").parent().siblings('img').attr('src', e.target.result);
        }
    });
    //取消添加
    $('.undoAdd').click(function () {
        $('.addHtml').css({
            display: "none"
        });
        $('.redact').css({
            display: "none"
        })
    });

    /*                     固定变量                    */
    function variable() {
        //固定变量展示
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminVariable/get',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    $('.variableLong').val(data.data.max_service_years);
                    $('.variableYearDays').val(data.data.year_days);
                } else {
                    alert(data.message);
                    window.location.href = 'index.html'
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
        //固定变量编辑
        $('.variable .variableList>div>p>button').click(function () {
            var year_days = $('.variableYearDays').val();
            var max_service_years = $('.variableLong').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminVariable/edit',
                data: {
                    admin_id: admin_id,
                    token: token,
                    year_days: year_days,
                    max_service_years: max_service_years
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        alert('修改成功!')
                    } else {
                        alert(data.message);
                        window.location.href = 'index.html'
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        })
    }

    variable();

    /*                     畅销等级议价                */
    function market() {
        //畅销等级展示
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminCx/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var market = data.data;
                        for (var i = 0; i < market.length; i++) {
                            var marketLi = '<li data-id="' + market[i].id + '">' +
                                '<span>' + (i + 1) + '</span>' +
                                '<span>' +
                                '<select id="marketSelect' + [(i + 1)] + '" disabled>' +
                                '<option value="A++">A++</option>' +
                                '<option value="A+">A+</option>' +
                                '<option value="A">A</option>' +
                                '<option value="B">B</option>' +
                                '<option value="C">C</option>' +
                                '<option value="D">D</option>' +
                                '</select>' +
                                '</span>' +
                                '<span><input type="text" value="' + market[i].rate + '" disabled/></span>' +
                                '<span><a href="##" class="markerCompile" data-id="1"><b class="fa fa-edit"></b>' +
                                '<i>编辑</i>' +
                                '</a>' +
                                '</span>';
                            $('.market .marketList>ul').append(marketLi);
                            $('#marketSelect' + [(i + 1)] + '').val(market[i].level);
                        }
                    }
                } else {
                    alert(data.message);
                    window.location.href = 'index.html'
                }
            },
            error: function (err) {
                console.log(err);
            }
        });

        $('.marketList>ul').on("click", ".markerCompile", function (e) {
            e.preventDefault();
            if ($(this).attr("data-id") == 1) {
                $(this).attr("data-id", 2);
                $(this).parent().siblings().children("select").attr("disabled", false);
                $(this).parent().siblings().children("input").attr("disabled", false);
                //另外的select和input全都关闭
                $(this).parent().parent().siblings().children().children("select").attr("disabled", true);
                $(this).parent().parent().siblings().children().children("input").attr("disabled", true);
                //其他兄弟元素的data-id=1；
                $(this).parent().parent().siblings().children().children('.markerCompile').attr("data-id", 1);
                //按钮改为确认按钮
                $(this).children("i").html("确认");
                $(this).children("b").removeClass("fa-edit").addClass("fa-check-circle");
                $(this).parent().parent().siblings().children().children("a").children("i").html("编辑");
                $(this).parent().parent().siblings().children().children("a").children("b").addClass("fa-edit").removeClass("fa-check-circle");
                //添加边框
                $(this).parent().siblings().children("input").addClass('border_setting');
                $(this).parent().parent().siblings().children().children("input").removeClass('border_setting');
                $(this).parent().siblings().children("select").css({
                    background: "#fff"
                });
                $(this).parent().parent().siblings().children().children("select").css({
                    background: "transparent"
                })
            }
            else {
                $(this).attr("data-id", 1);
                $(this).children("i").html("编辑");
                if ($(this).children('i').html() == '编辑') {
                    var grade_id = $(this).parent().parent().attr('data-id');
                    var level = $(this).parent().siblings().children('select').val();
                    var rate = $(this).parent().siblings().children('input').val();
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminCx/edit',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            grade_id: grade_id,
                            level: level,
                            rate: rate
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                console.log(data);
                                alert('修改成功')
                            } else {
                                alert(data.message);
                                window.location.href = 'index.html'
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                }

                $(this).parent().siblings().children("select").attr("disabled", true);
                $(this).parent().siblings().children("input").attr("disabled", true);
                $(this).children("b").removeClass("fa-check-circle").addClass("fa-edit");
                $(this).parent().siblings().children("input").removeClass('border_setting');
                $(this).parent().siblings().children("select").css({
                    background: "transparent"
                });
            }
        })

    }

    market();


})();