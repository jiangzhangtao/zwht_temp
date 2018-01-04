(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];
    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).height();
        console.log($('.details').innerHeight())
        $(".menu").css({
            height: bodyHeight - logoHeight - 1,
            minHeight: 800+'px'
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
        var bodyHeight = $(window).height();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: bodyHeight - logoHeight - 1
        });
    });

    /*                  车辆品牌设置                      */
    function vehicle() {
        //筛选
        $(window).ready(function () {
            $(".vehicleBrandList>ul>li").show()
        });
        var sifting = $(".sifting>span");
        $(".select").change(function () {
            var selectData = $(".select option:selected").text();
            //假数据
            var lis = $(".vehicleBrandList>ul>li").length;
            for (var i = 0; i < lis; i++) {
                var siftingData = $(".sifting>span")[i].innerText;
                if (selectData == siftingData) {
                    $(".vehicleBrandList>ul>li").hide().filter(":contains('" + siftingData + "')").show();
                }
            }
        });

        //列表展示
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminCarBrands/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var vehicleBrand = data.data;
                        for (var i = 0; i < vehicleBrand.length; i++) {
                            var list = '<li data-id="' + vehicleBrand[i].id + '">' +
                                '<div><div><span class="vehicleBrandName">' + vehicleBrand[i].name + '</span></div>' +
                                '<div class="vehicleBrandImg"><img src="' + vehicleBrand[i].img_url + '" alt=""/></div>' +
                                '<div class="sifting"><span>' + vehicleBrand[i].icon + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="vehicleBrandEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="vehicleBrandRemove fa fa-external-link"></span>移除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.vehicleBrandList>ul').append(list);

                            //厂商内列表展示
                            var option = ' <option value="' + vehicleBrand[i].id + '">' + vehicleBrand[i].name + '</option>';
                            $('#agencyRedactTypeNum').append(option);
                            $('#AMGListSelect').append(option);
                            $('#AmgAddTypeNum').append(option);
                            $('#AmgRedactTypeNum').append(option);
                            $('#CarProxy').append(option);
                            $('#CarAddTypeNum').append(option);
                            $('#CarRedactTypeNum').append(option);
                        }
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


        //remove
        $(".vehicleBrandList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            if (removeLi == true) {
                var brand_id = $(this).parent().parent().parent().attr('data-id');
                var that = $(this);
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCarBrands/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        brand_id: brand_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功!');
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
        });

        //edit
        $(".vehicleBrandList>ul").on("click", ".vehicleBrandEdit", function (e) {
            e.preventDefault();
            var brand_id = $(this).parent().parent().parent().attr('data-id');
            var that = $(this);
            $(".redact").css("display", "block");
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCarBrands/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    brand_id: brand_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.redact .brandLogo>img').attr('src', data.data.img_url);
                        $('.redact .inputAndSelect>.brandName>input').val(data.data.name);
                        $('.redact .inputAndSelect>.brandLetter>select').val(data.data.icon);
                        //图片更换
                        $('.redact #redactFile').change(function () {
                            var file = this.files[0];
                            console.log(file);
                            if (file == null) {
                                $(".redact #redactFile").parent().parent().siblings('img').attr('src', e.target.result);
                                return;
                            }
                            var render = new FileReader();
                            render.readAsDataURL(file);
                            render.onloadend = function (e) {
                                $(".redact #redactFile").parent().parent().siblings('img').attr('src', e.target.result);
                            }
                        });



                        //redact addOK
                        $('.redact').one('click', '.addBtnOk', function () {
                            var fData = new FormData(document.getElementById('brandRedact'));
                            fData.append('admin_id', admin_id);
                            fData.append('token', token);
                            fData.append('brand_id', brand_id);
                            var name = $('.redact .brandName>input').val();
                            var icon = $('.redact .brandLetter>select').val();
                            var img_url = $('.brandLogo>img').attr('src');
                            var _this = that.parent().parent().parent();
                            $.ajax({
                                type: 'post',
                                processData: false,
                                contentType: false,
                                url: 'http://180.76.243.205:8383/_API/_adminCarBrands/edit',
                                data: fData,
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功!');
                                        $(".redact").css("display", "none");
                                        _this.children().children().children('.vehicleBrandName').html(name);
                                        _this.children().children('.sifting').children('span').html(icon);
                                        _this.children().children('.vehicleBrandImg').children('img').attr('src', img_url);
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


                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        });

        //redact undoAdd
        $(".redact .undoAdd").click(function () {
            $(".redact").css("display", "none")
        });


        //addHtml undoAdd
        $(".addHtml .undoAdd").click(function () {
            $(".addHtml").css("display", "none")
        });

        //addHtml addOK
        $(".addHtml .addBtnOk").click(function () {
            var fData = new FormData(document.getElementById('brandAdd'));
            fData.append('admin_id', admin_id);
            fData.append('token', token);
            console.log($('.ae').val())
            $.ajax({
                type: 'post',
                processData: false,
                contentType: false,
                url: 'http://180.76.243.205:8383/_API/_adminCarBrands/add',
                data: fData,
                success: function (data) {
                    if (data.code == 'E0000') {
                        alert('添加成功')
                        $(".addHtml").css("display", "none");
                        var html = "";
                        html += '<li>' +
                            '<div>' +
                            ' <div><span class="vehicleBrandName">' + data.data.name + '</span></div>' +
                            '<div class="vehicleBrandImg"><img src="' + data.data.img_url + '" alt=""/></div>' +
                            '<div class="sifting"><span>' + data.data.icon + '</span></div>' +
                            '<div>' +
                            ' <a href="##" class="vehicleBrandEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            ' <a href="##" class="delete"><span class="vehicleBrandRemove fa fa-external-link"></span>删除</a>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        $(".vehicleBrandList>ul").append(html);
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


        });

        //添加分类
        $(".vehicleBrandAdd>div>a").click(function () {
            $(".addHtml").css("display", "block")
        });
    }

    /*                      代理厂商                      */
    function AmgAdd() {
        $(window).ready(function () {
            $(".agencyList>ul>li").show()
        });


        //厂商展示
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminCarFactory/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var agency = data.data;
                    if (agency) {
                        for (var i = 0; i < agency.length; i++) {
                            var list = '<li data-id="' + agency[i].id + '">' +
                                '<div><div><span>' + agency[i].factory + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="agencyEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="agencyRemove fa fa-external-link"></span>移除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.agencyList>ul').append(list);
                            var option = ' <option value="' + agency[i].id + '">' + agency[i].factory + '</option>';
                            $('#AmgAgency').append(option);
                            $('#AmgRedactAgency').append(option);
                            $('#CarFactory').append(option);
                            $('#CarFactoryRedact').append(option);
                        }
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


        /*编辑厂商*/
        $('.agencyList>ul').on("click", ".agencyEdit", function (e) {
            e.preventDefault();
            $(".agencyRedact").css({ display: "block" });
            var factory_id = $(this).parent().parent().parent().attr('data-id');
            var _thisLi = $(this).parent().parent().parent();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCarFactory/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    factory_id: factory_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.agencyName').attr('data-id', data.data.id);
                        $('.agencyName input').val(data.data.factory);
                        $('#agencyRedactTypeNum').val(data.data.car_brand_id);
                        var na = $('#agencyRedactTypeNum option:selected').text();
                        $('#agencyRedactMakeupCo').val(na)
                    } else {
                        alert(data.message);
                    }
                },
                error: function (err) {
                    console.log(err)
                }
            });
            /*确认编辑厂商*/
            document.getElementsByClassName('agencyRedactBtnOk')[0].onclick = function () {
                var car_brand_id = $('#agencyRedactTypeNum').val();
                var factory_id = $(this).parent().siblings('.agencyName').attr('data-id');
                var name = $(this).parent().siblings().children('div').children('input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCarFactory/edit',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_brand_id: car_brand_id,
                        factory_id: factory_id,
                        name: name
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('修改成功');
                            $(".agencyRedact").css({ display: "none" });
                            _thisLi.children().children().children('span').html(data.data.factory)
                        } else {
                            alert(data.message)
                        }
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            };
        });


        /*添加厂商的筛选*/
        var agencyName = $(".agencyList>ul>li>div>div>span");
        $('.proxy').bind('input propertychange', function () {
            var proxyData = $(".proxy").val();
            var lis = $(".agencyList>ul>li").length;
            for (var i = 0; i < lis; i++) {
                $(".agencyList>ul>li").hide().filter(":contains('" + proxyData + "')").show();
            }
        });
        //下拉搜索
        var typeNumAdd = 'agencyAddTypeNum';
        var codeAdd = 'agencyAddMakeupCo';
        temp(typeNumAdd, codeAdd);
        $('#agencyAddMakeupCo').on("click", focus);
        $('#agencyAddMakeupCo').on("input", inputChagen);
        $('#agencyAddTypeNum').on("change", changeF);

        /*添加*/
        $(".agencyAdd>div>a").click(function () {
            $(".agencyAddHtml").css({ display: "block" });
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCarBrands/getList',
                data: {
                    admin_id: admin_id,
                    token: token
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        if (data.data) {
                            var vehicleBrand = data.data;
                            for (var i = 0; i < vehicleBrand.length; i++) {
                                //厂商内列表展示
                                var option = ' <option value="' + vehicleBrand[i].id + '">' + vehicleBrand[i].name + '</option>'
                                $('#agencyAddTypeNum').append(option);
                            }
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
        });
        /*取消添加直接关闭*/
        $('.agencyUndoAdd').click(function () {
            $(".agencyAddHtml").css({ display: "none" });
            $('.agencyRedact').css({ display: "none" })
        });
        /*确认添加拼接字符串添加进去*/
        $('.agencyAddBtnOk').click(function () {
            var car_brand_id = $('#agencyAddTypeNum').val();
            var name = $('.agencyAddHtml .agencyName input').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCarFactory/add',
                data: {
                    admin_id: admin_id,
                    token: token,
                    car_brand_id: car_brand_id,
                    name: name
                },
                success: function (data) {
                    console.log(data);
                    if (data.code == 'E0000') {
                        alert('添加成功');
                        var str = '';
                        str += '<li data-id="' + data.data.id + '">';
                        str += '<div>';
                        str += '<div><span>' + name + '</span></div>';
                        str += '<div>';
                        str += '<a href="##" class="agencyEdit"><span class="fa fa-edit"></span>编辑</a>';
                        str += '<a href="##" class="delete"><span class="agencyRemove"></span>删除</a>';
                        str += '</div>';
                        str += '</div>';
                        str += '</li>';
                        console.log(str);
                        $('.agencyList>ul').append(str);
                        $(".agencyAddHtml").css({ display: "none" });
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        });

        /*删除厂商*/
        $('.agencyList>ul').on("click", ".delete", function () {
            var factory_id = $(this).parent().parent().parent().attr('data-id');
            var _this = $(this);
            if (confirm("确认删除此厂商？")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCarFactory/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        factory_id: factory_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            _this.parent().parent().parent().remove()
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
        });


        //编辑厂商的下拉
        var typeNum = 'agencyRedactTypeNum';
        var code = 'agencyRedactMakeupCo';
        temp(typeNum, code);
        $('#agencyRedactMakeupCo').on("click", focus);
        $('#agencyRedactMakeupCo').on("input", inputChagen);
        $('#agencyRedactTypeNum').on("change", changeF);
    }

    /*                      车系列表                       */
    function AmgList() {
        //筛选
        $(window).ready(function () {
            $(".AMGList>ul>li").show()
        });
        /*添加厂商的筛选*/
        $('.AMGProxy').bind('input propertychange', function () {
            var proxyData = $(".AMGProxy").val();
            $(".AMGList>ul>li").hide().children().children(".AMGName").filter(":contains('" + proxyData + "')").parent().parent().show();

        });
        var img = '';
        //列表展示
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminCarBrands/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var vehicleBrand = data.data;
                        for (var i = 0; i < vehicleBrand.length; i++) {
                            //车系内列表展示
                            var option = ' <option value="' + vehicleBrand[i].id + '">' + vehicleBrand[i].name + '</option>';
                            $('#AMGListSelect').append(option);

                        }
                    }
                    var car_brand_id = $('#AMGListSelect').val();
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            car_brand_id: car_brand_id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                var AMG = data.data;
                                var brand = $('#AMGListSelect option:selected').text()
                                if (AMG) {
                                    for (var i = 0; i < AMG.length; i++) {
                                        img = AMG[i].img;
                                        var html = "";
                                        html += '<li data-id="' + AMG[i].id + '">' +
                                            '<div>' +
                                            '<div class="AMGName"><span>' + AMG[i].verhicle + '</span></div>' +
                                            '<div><span>' + brand + '</span></div>' +
                                            '<div><img src="' + AMG[i].img + '" alt=""/></div>' +
                                            '<div>' +
                                            ' <a href="##" class="AMGEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                            ' <a href="##" class="delete"><span class="AMGRemove fa fa-external-link"></span>删除</a>' +
                                            '</div>' +
                                            '</div>' +
                                            '</li>';
                                        $(".AMGList>ul").append(html);
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
                } else {
                    alert(data.message);
                    window.location.href = 'index.html'
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //下拉框重置数据改变

        $('#AMGListSelect').change(function () {
            $(".AMGList>ul>li").remove();
            $('.AMGProxy').val('');
            var car_brand_id = $('#AMGListSelect').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
                data: {
                    admin_id: admin_id,
                    token: token,
                    car_brand_id: car_brand_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        var AMG = data.data;
                        if (AMG) {
                            for (var i = 0; i < AMG.length; i++) {
                                img = AMG[i].img;
                                var html = "";
                                html += '<li data-id="' + AMG[i].id + '">' +
                                    '<div>' +
                                    '<div class="AMGName"><span>' + AMG[i].car_version + '</span></div>' +
                                    '<div><span>' + AMG[i].verhicle + '</span></div>' +
                                    '<div><img src="' + AMG[i].img + '" alt=""/></div>' +
                                    '<div>' +
                                    ' <a href="##" class="AMGEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                    ' <a href="##" class="delete"><span class="AMGRemove fa fa-external-link"></span>删除</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                                $(".AMGList>ul").append(html);
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


        //remove
        $(".AMGList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            if (removeLi == true) {
                var verhicle_id = $(this).parent().parent().parent().attr('data-id');
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminVerhicle/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        verhicle_id: verhicle_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(_this).parent().parent().parent().remove();
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

        //编辑
        $(".AMGList>ul").on("click", ".AMGEdit", function (e) {
            e.preventDefault();
            $(".AmgRedact").css("display", "block");
            var verhicle_id = $(this).parent().parent().parent().attr('data-id');
            var _that = $(this).parent().siblings('.AMGName').children('span');
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    verhicle_id: verhicle_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        var verhicle = data.data.verhicle;
                        var verhicleData = verhicle.split('-')[1];
                        $('.AmgRedactName').val(verhicleData);
                        $('.AmgRedactVersion').val(data.data.car_version);
                        $('#AmgRedactAgency').val(data.data.factory_id);
                        $('#AmgRedactTypeNum').val(data.data.car_brand_id);
                        var AmgRedactCarName = $('#AmgRedactTypeNum option:selected').text();
                        $('#AmgRedactMakeupCo').val(AmgRedactCarName);


                        //确认编辑
                        document.getElementsByClassName('AmgRedactBtnOk')[0].onclick = function () {
                            var name = $('.AmgRedactName').val();
                            var car_brand_id = $('#AmgRedactTypeNum').val();
                            var factory_id = $('#AmgRedactAgency').val();
                            var version = $('.AmgRedactVersion').val();
                            name = version + '-' + name;
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminVerhicle/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    name: name,
                                    car_brand_id: car_brand_id,
                                    factory_id: factory_id,
                                    version: version,
                                    verhicle_id: verhicle_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(".AmgRedact").css("display", "none");
                                        _that.html(name)
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

        //redact undoAdd
        $(".AmgRedactBtn .AmgUndoAdd").click(function () {
            $(".AmgRedact").css("display", "none")
        });


        //addHtml undoAdd
        $(".AmgAddHtml .agencyUndoAdd").click(function () {
            $(".AmgAddHtml").css("display", "none")
        });


        //添加车系
        $(".AMGAdd>div>a").click(function () {
            //确定添加车系
            $(".AmgAddHtml").css("display", "block");
            document.getElementsByClassName('AmgAddBtnOk')[0].onclick = function () {
                var car_brand_id = $('#AmgAddTypeNum').val();
                var factory_id = $('#AmgAgency').val();
                var DId = $('#AMGListSelect').val();
                //车辆型号
                var version = $('.version').val();
                var name = $('.name').val();
                //车系名称
                name = version + '-' + name;

                var AmgAgencyName = $('#AmgAgency option:selected').text();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminVerhicle/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_brand_id: car_brand_id,
                        factory_id: factory_id,
                        version: version,
                        name: name
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            if (car_brand_id == DId) {
                                var html = "";
                                html += '<li data-id="' + data.data.id + '">' +
                                    '<div>' +
                                    '<div class="AMGName"><span>' + name + '</span></div>' +
                                    '<div><span>' + AmgAgencyName + '</span></div>' +
                                    '<div><img src="' + img + '" alt=""/></div>' +
                                    '<div>' +
                                    '<a href="##" class="AMGEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                    '<a href="##" class="delete"><span class="AMGRemove fa fa-external-link"></span>删除</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                                $(".AMGList>ul").append(html);
                            }
                            $('.version').val('');
                            $('.name').val('');

                        } else {
                            alert(data.message);
                            window.location.href = 'index.html'
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                $(".AmgAddHtml").css("display", "none");

            };

        });

        var typeNumRedact = 'AmgRedactTypeNum';
        var codeRedact = 'AmgRedactMakeupCo';
        temp(typeNumRedact, codeRedact);
        $('#AmgRedactMakeupCo').on("click", focus);
        $('#AmgRedactMakeupCo').on("input", inputChagen);
        $('#AmgRedactTypeNum').on("change", changeF);
        var typeNum = 'AmgAddTypeNum';
        var code = 'AmgAddMakeupCo';
        temp(typeNum, code);
        $('#AmgAddMakeupCo').on("click", focus);
        $('#AmgAddMakeupCo').on("input", inputChagen);
        $('#AmgAddTypeNum').on("change", changeF);
    }

    /*                      汽车总表                       */
    function carList() {

        var car_brand_id = $('select#CarProxy').val();
        //初始列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
            data: {
                admin_id: admin_id,
                token: token,
                car_brand_id: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].verhicle + '</option>';
                            $('#carVer').append(option);
                            $('#CarVerhicleRedact').append(option);
                        }
                    }
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminCar/getList',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            car_brand_id: 1,
                            verhicle_id: $('#carVer').val()
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                if (data.data) {
                                    var carData = data.data;
                                    for (var i = 0; i < carData.length; i++) {
                                        var html = "";
                                        html += '<li data-id="' + carData[i].id + '">' +
                                            '<div>' +
                                            '<div class="CarBrad"><span>' + carData[i].brand + '</span></div>' +
                                            '<div class="CarSet"><span>' + carData[i].verhicle + '</span></div>' +
                                            '<div class="CarCc"><span>' + carData[i].pailiang + '</span></div>' +
                                            '<div class="CarYear"><span>' + carData[i].year + '</span></div>' +
                                            '<div class="CarName"><span>' + carData[i].name + '</span></div>' +
                                            '<div>' +
                                            '<a href="##" class="CarEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                            '<a href="##" class="delete"><span class="CarRemove fa fa-external-link"></span>删除</a>' +
                                            '</div>' +
                                            '</div>' +
                                            '</li>';
                                        $('.CarList>ul').append(html)
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


                } else {
                    alert(data.message);

                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //品牌更改
        $('#CarProxy').change(function () {
            var car_brand_id = $('select#CarProxy').val();
            $('#carVer>option').remove();
            $('.CarList>ul>li').remove();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
                data: {
                    admin_id: admin_id,
                    token: token,
                    car_brand_id: car_brand_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        if (data.data) {
                            for (var i = 0; i < data.data.length; i++) {
                                var option = '<option value="' + data.data[i].id + '">' + data.data[i].verhicle + '</option>';
                                $('#carVer').append(option);
                            }
                        }
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminCar/getList',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                car_brand_id: car_brand_id,
                                verhicle_id: $('#carVer').val()
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    console.log(data);
                                    if (data.data) {
                                        var carData = data.data;
                                        for (var i = 0; i < carData.length; i++) {
                                            var html = "";
                                            html += '<li data-id="' + carData[i].id + '">' +
                                                '<div>' +
                                                '<div class="CarBrad"><span>' + carData[i].brand + '</span></div>' +
                                                '<div class="CarSet"><span>' + carData[i].verhicle + '</span></div>' +
                                                '<div class="CarCc"><span>' + carData[i].pailiang + '</span></div>' +
                                                '<div class="CarYear"><span>' + carData[i].year + '</span></div>' +
                                                '<div class="CarName"><span>' + carData[i].name + '</span></div>' +
                                                '<div>' +
                                                '<a href="##" class="CarEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                                '<a href="##" class="delete"><span class="CarRemove fa fa-external-link"></span>删除</a>' +
                                                '</div>' +
                                                '</div>' +
                                                '</li>';
                                            $('.CarList>ul').append(html)
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


                    } else {
                        alert(data.message);

                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
        });
        //车系更改
        $('#carVer').change(function () {
            var car_brand_id = $('select#CarProxy').val();
            $('.CarList>ul>li').remove();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCar/getList',
                data: {
                    admin_id: admin_id,
                    token: token,
                    car_brand_id: car_brand_id,
                    verhicle_id: $('#carVer').val()
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        if (data.data) {
                            var carData = data.data;
                            for (var i = 0; i < carData.length; i++) {
                                var html = "";
                                html += '<li data-id="' + carData[i].id + '">' +
                                    '<div>' +
                                    '<div class="CarBrad"><span>' + carData[i].brand + '</span></div>' +
                                    '<div class="CarSet"><span>' + carData[i].verhicle + '</span></div>' +
                                    '<div class="CarCc"><span>' + carData[i].pailiang + '</span></div>' +
                                    '<div class="CarYear"><span>' + carData[i].year + '</span></div>' +
                                    '<div class="CarName"><span>' + carData[i].name + '</span></div>' +
                                    '<div>' +
                                    '<a href="##" class="CarEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                    '<a href="##" class="delete"><span class="CarRemove fa fa-external-link"></span>删除</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';
                                $('.CarList>ul').append(html)
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

        //删除
        $(".CarList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            var carId = $(this).parent().parent().parent().attr('data-id');
            var _this = this;
            if (removeLi == true) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCar/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_id: carId
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(_this).parent().parent().parent().remove();
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

        //编辑
        $(".CarList>ul").on("click", ".CarEdit", function (e) {
            e.preventDefault();
            $(".CarRedact").css("display", "block");
            var car_id = $(this).parent().parent().parent().attr('data-id');
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminCar/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    car_id: car_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('#CarRedactTypeNum').val(data.data.car_brand_id);
                        $('#CarRedactMakeupCo').val($('#CarRedactTypeNum option:selected').text());
                        $('#CarVerhicleRedact').val(data.data.verhicle_id);
                        $('#CarFactoryRedact').val(data.data.factory_id);
                        $('.CarPL input').val(data.data.pailiang);
                        $('.CarYear input').val(data.data.year);
                        var carname = data.data.name;
                        var ca = carname.split(' ');
                        $('.CarRedact .Carname input').val(ca[ca.length - 1]);
                        $('.CarRedact .CarFont input').val(data.data.font);
                        $('.CarRedact .CarRear input').val(data.data.rear);

                        $('#CarRedactTypeNum').change(function () {
                            var car_brand_id = $('#CarRedactTypeNum').val();
                            $('#CarVerhicleRedact>option').remove();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    car_brand_id: car_brand_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        if (data.data) {
                                            for (var i = 0; i < data.data.length; i++) {
                                                var option = '<option value="' + data.data[i].id + '">' + data.data[i].verhicle + '</option>';
                                                $('#CarVerhicleRedact').append(option);
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
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


            //确定编辑
            document.getElementsByClassName('CarRedactBtnOk')[0].onclick = function () {
                var car_brand_id = $('#CarRedactTypeNum').val();
                var verhicle_id = $('#CarVerhicleRedact').val();
                var factory_id = $('#CarFactoryRedact').val();
                var pl = $('.CarRedact .CarPL input').val();
                var year = $('.CarRedact .CarYear input').val();
                var name = $('.CarRedact .Carname input').val();
                name = year + '款 ' + pl + ' ' + name;
                var font = $('.CarRedact .CarFont input').val();
                var rear = $('.CarRedact .CarRear input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCar/edit',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_brand_id: car_brand_id,
                        verhicle_id: verhicle_id,
                        factory_id: factory_id,
                        pl: pl,
                        year: year,
                        name: name,
                        font: font,
                        rear: rear,
                        car_id: car_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('修改成功');
                            $('#CarRedactTypeNum').val(car_brand_id);
                            $('#CarRedactMakeupCo').val($('#CarRedactTypeNum option:selected').text());
                            $('#CarVerhicleRedact').val(verhicle_id);
                            $('#CarFactoryRedact').val(factory_id);
                            $('.CarPL input').val(pl);
                            $('.CarYear input').val(year);
                            $('.CarRedact .Carname input').val(name);
                            $('.CarRedact .CarFont input').val(font);
                            $('.CarRedact .CarRear input').val(rear);
                            $(".CarAddHtml").css("display", "none");
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });


                $(".CarRedact").css("display", "none")
            };


        });

        //redact undoAdd
        $(".CarRedactBtn .CarUndoRedact").click(function () {
            $(".CarRedact").css("display", "none")
        });


        //addHtml undoAdd
        $(".CarAddHtml .CarUndoAdd").click(function () {
            $(".CarAddHtml").css("display", "none")
        });


        //添加车辆
        $(".CarAdd>div>a>p").click(function () {
            $(".CarAddHtml").css("display", "block");
            $('#CarAddTypeNum').change(function () {
                $('#CarVerhicle>option').remove();
                var car_brand_id = $('#CarAddTypeNum').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminVerhicle/getList',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_brand_id: car_brand_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            if (data.data) {
                                for (var i = 0; i < data.data.length; i++) {
                                    var option = '<option value="' + data.data[i].id + '">' + data.data[i].verhicle + '</option>';
                                    $('#CarVerhicle').append(option);
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
            //addHtml addOK
            document.getElementsByClassName('CarAddBtnOk')[0].onclick = function () {
                var car_brand_id = $('#CarAddTypeNum').val();
                var verhicle_id = $('#CarVerhicle').val();
                var factory_id = $('#CarFactory').val();
                var pl = $('.CarAddHtml .CarPL input').val();
                var year = $('.CarAddHtml .CarYear input').val();
                var name = $('.CarAddHtml .Carname input').val();
                name = year + '款 ' + pl + ' ' + name;
                var font = $('.CarAddHtml .CarFont input').val();
                var rear = $('.CarAddHtml .CarRear input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminCar/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        car_brand_id: car_brand_id,
                        verhicle_id: verhicle_id,
                        factory_id: factory_id,
                        pl: pl,
                        year: year,
                        name: name,
                        font: font,
                        rear: rear
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var carBrand = $('#CarAddTypeNum option:selected').text();
                            var carSet = $('#CarVerhicle option:selected').text();
                            var html = "";
                            html += '<li data-id="' + data.data.id + '">' +
                                '<div>' +
                                '<div class="CarBrad"><span>' + carBrand + '</span></div>' +
                                '<div class="CarSet"><span>' + carSet + '</span></div>' +
                                '<div class="CarCc"><span>' + pl + '</span></div>' +
                                '<div class="CarYear"><span>' + year + '</span></div>' +
                                '<div class="CarName"><span>' + name + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="CarEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="CarRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            if (verhicle_id == $('#carVer').val()) {
                                $('.CarList>ul').append(html)
                            }
                            $(".CarAddHtml").css("display", "none");
                            $('#CarAddTypeNum').val('');
                            $('#CarVerhicle').val('');
                            $('#CarFactory').val('');
                            $('.CarAddHtml .CarPL input').val('');
                            $('.CarAddHtml .CarYear input').val('');
                            $('.CarAddHtml .Carname input').val('');
                            $('.CarAddHtml .CarFont input').val('');
                            $('.CarAddHtml .CarRear input').val('');
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


        var typeNumRedact = 'CarRedactTypeNum';
        var codeRedact = 'CarRedactMakeupCo';
        temp(typeNumRedact, codeRedact);
        $('#CarRedactMakeupCo').on("click", focus);
        $('#CarRedactMakeupCo').on("input", inputChagen);
        $('#CarRedactTypeNum').on("change", changeF);
        var typeNum = 'CarAddTypeNum';
        var code = 'CarAddMakeupCo';
        temp(typeNum, code);
        $('#CarAddMakeupCo').on("click", focus);
        $('#CarAddMakeupCo').on("input", inputChagen);
        $('#CarAddTypeNum').on("change", changeF);
    }

    /*                       车牌号                        */
    function plateNumber() {
        //省份列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminPlat/getPosition',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('#plateNumberProxy').append(option);
                            $('#plateNumberRedactTypeNum').append(option);
                            $('#plateNumberAddTypeNum').append(option);
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
        //车牌列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminPlat/getPro',
            data: {
                admin_id: admin_id,
                token: token,
                position_id: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = "";
                            html += '<li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="plateNumberProvince"><span>' + data.data[i].province_name + '</span></div>' +
                                '<div class="plateNumberProvinceCode"><span>' + data.data[i].province_code + '</span></div>' +
                                '<div class="plateNumberCity"><span>' + data.data[i].city_name + '</span></div>' +
                                '<div class="plateNumberCityCode"><span>' + data.data[i].city_code + '</span></div>' +
                                '<div class="plateNumberEnglish"><span>' + data.data[i].city_pinyin + '</span></div>' +
                                '<div class="plateNumberLine"><span>' + data.data[i].level + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="plateNumberEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="plateNumberRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';

                            $(".plateNumberList>ul").append(html);
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

        //下拉更新数据
        $('#plateNumberProxy').change(function () {
            var position_id = $(this).val();
            $(".plateNumberList>ul>li").remove();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminPlat/getPro',
                data: {
                    admin_id: admin_id,
                    token: token,
                    position_id: position_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        if (data.data) {
                            for (var i = 0; i < data.data.length; i++) {
                                var html = "";
                                html += '<li data-id="' + data.data[i].id + '">' +
                                    '<div>' +
                                    '<div class="plateNumberProvince"><span>' + data.data[i].province_name + '</span></div>' +
                                    '<div class="plateNumberProvinceCode"><span>' + data.data[i].province_code + '</span></div>' +
                                    '<div class="plateNumberCity"><span>' + data.data[i].city_name + '</span></div>' +
                                    '<div class="plateNumberCityCode"><span>' + data.data[i].city_code + '</span></div>' +
                                    '<div class="plateNumberEnglish"><span>' + data.data[i].city_pinyin + '</span></div>' +
                                    '<div class="plateNumberLine"><span>' + data.data[i].level + '</span></div>' +
                                    '<div>' +
                                    '<a href="##" class="plateNumberEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                    '<a href="##" class="delete"><span class="plateNumberRemove fa fa-external-link"></span>删除</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>';

                                $(".plateNumberList>ul").append(html);
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
        $('#plateNumberAddTypeNum').change(function () {
            var position_id = $(this).val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminPlat/getPro',
                data: {
                    admin_id: admin_id,
                    token: token,
                    position_id: position_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        if (data.data) {
                            $('.plateAddCityCode').val(data.data[0].province_code)
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
        //删除
        $(".plateNumberList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            var plat_id = $(this).parent().parent().parent().attr('data-id');
            if (removeLi == true) {
                var that = this;
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminPlat/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        plat_id: plat_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove()
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                $(this).parent().parent().parent().remove();
            }
        });

        //edit
        $(".plateNumberList>ul").on("click", ".plateNumberEdit", function (e) {
            e.preventDefault();
            $(".plateNumberRedact").css("display", "block");
            var plat_id = $(this).parent().parent().parent().attr('data-id');
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminPlat/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    plat_id: plat_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);

                        $('.plateNumberRedact .plateRedactName').val(data.data.city_name);
                        $('.plateNumberRedact .city_code').val(data.data.city_code);
                        $('.plateNumberRedact .city_pinyin').val(data.data.city_pinyin);
                        $('.plateNumberRedact .plateRedactCityCode').val(data.data.province_code);
                        $('#plateNumberRedactTypeNum').val(data.data.position_id);
                        $('#plateNumberRedactMakeupCo').val($('#plateNumberRedactTypeNum option:selected').text());
                        $('#PlatelevelRedact').val(data.data.level);
                        //redact addOK
                        document.getElementsByClassName('plateNumberRedactBtnOk')[0].onclick = function () {
                            var city_name = $('.plateNumberRedact .plateRedactName').val();
                            var city_code = $('.plateNumberRedact .city_code').val();
                            var city_pinyin = $('.plateNumberRedact .city_pinyin').val();
                            var level = $('#PlatelevelRedact').val();

                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminPlat/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    plat_id: plat_id,
                                    city_name: city_name,
                                    city_code: city_code,
                                    city_pinyin: city_pinyin,
                                    level: level
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        //$('.plateNumberProvince>span').html($('#plateNumberRedactMakeupCo').val());
                                        //$('.plateNumberProvinceCode>span').html($('.plateNumberRedact .plateRedactCityCode').val());
                                        //$('.plateNumberCity>span').html(city_name);
                                        //$('.plateNumberCityCode>span').html(city_code);
                                        //$('.plateNumberEnglish>span').html(city_pinyin);
                                        //$('.plateNumberLine>span').html(level);
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                            $(".plateNumberRedact").css("display", "none")
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

        //redact undoAdd
        $(".plateNumberRedactBtn .plateNumberUndoAdd").click(function () {
            $(".plateNumberRedact").css("display", "none")
        });


        //addHtml undoAdd
        $(".plateNumberAddHtml .plateNumberUndoAdd").click(function () {

            //addHtml addOK

        });

        document.getElementsByClassName("plateNumberAddBtnOk")[0].onclick = function () {
            var pro_id = $('#plateNumberAddTypeNum').val();
            var city_name = $('.plateNumberAddHtml .plateAddName').val();
            var city_code = $('.plateNumberAddHtml .city_code').val();
            var city_pinyin = $('.plateNumberAddHtml .city_pinyin').val();
            var level = $('#Platelevel').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminPlat/add',
                data: {
                    admin_id: admin_id,
                    token: token,
                    city_name: city_name,
                    city_code: city_code,
                    city_pinyin: city_pinyin,
                    level: level,
                    pro_id: pro_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        alert('添加成功');
                        if ($('#plateNumberProxy').val() == pro_id) {
                            var a = $('#plateNumberAddTypeNum option:selected').text();
                            var html = "";
                            html += '<li data-id="' + data.data.id + '">' +
                                '<div>' +
                                '<div class="plateNumberProvince"><span>' + data.data.province_name + '</span></div>' +
                                '<div class="plateNumberProvinceCode"><span>' + data.data.province_code + '</span></div>' +
                                '<div class="plateNumberCity"><span>' + data.data.city_name + '</span></div>' +
                                '<div class="plateNumberCityCode"><span>' + data.data.city_code + '</span></div>' +
                                '<div class="plateNumberEnglish"><span>' + data.data.city_pinyin + '</span></div>' +
                                '<div class="plateNumberLine"><span>' + data.data.level + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="plateNumberEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="plateNumberRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $(".plateNumberAddHtml").css("display", "none");
                            $(".plateNumberList>ul").append(html);
                        } else {
                            $(".plateNumberAddHtml").css("display", "none");
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

        //添加车系
        $(".plateNumberAdd>div>a").click(function () {
            $(".plateNumberAddHtml").css("display", "block")
        });


        var typeNumRedact = 'plateNumberRedactTypeNum';
        var codeRedact = 'plateNumberRedactMakeupCo';
        temp(typeNumRedact, codeRedact);
        $('#plateNumberRedactMakeupCo').on("click", focus);
        $('#plateNumberRedactMakeupCo').on("input", inputChagen);
        $('#plateNumberRedactTypeNum').on("change", changeF);

        var typeNum = 'plateNumberAddTypeNum';
        var code = 'plateNumberAddMakeupCo';
        temp(typeNum, code);
        $('#plateNumberAddMakeupCo').on("click", focus);
        $('#plateNumberAddMakeupCo').on("input", inputChagen);
        $('#plateNumberAddTypeNum').on("change", changeF);


    }

    plateNumber();
    vehicle();
    AmgAdd();
    AmgList();
    carList()
})();


























