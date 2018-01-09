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

    });

    var tireArray = [];
    var brandArray = [];
    var loadArray = [];
    var speedArray = [];
    var figureArray = [];
    var stripeArray = [];
    var sidewallArray = [];
    var moduleArray = [];
    var typeArray = [];
    var cxArray = [];

    /*                  品牌列表                      */
    function brand() {
        var length;
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShoeBrand/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        length = data.data.length;
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '  <li data-id="' + data.data[i].id + '">' +
                                ' <div>' +
                                '<div class="brandName"><span>' + (i + 1) + '</span></div>' +
                                ' <div class="brandNames"><span>' + data.data[i].name + '</span></div>' +
                                '<div><span>' + data.data[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="brandEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="brandRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.brandList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListBrand select').append(option);
                            $('.tireListAdd .tireListBrand select').append(option);
                            $('.tireContent>.screen>p select.brandSelect').append(option);
                            brandArray.push({ name: data.data[i].name, id: data.data[i].id })
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

        //tianjia
        $('.brandAdd').click(function () {
            $('.brandListAdd').css({ display: "block" });

            //确认添加
            document.getElementsByClassName('brandListAddBtnOk')[0].onclick = function () {
                $('.brandListAdd').css({ display: "none" });
                var name = $('.brandListAdd .tireListName input').val();
                $('.brandListAdd .tireListName input').val('');
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeBrand/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var length = $('.brandList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="brandName"><span>' + length + '</span></div>' +
                                ' <div><span>' + data.data.name + '</span></div>' +
                                '<div><span>' + data.data.time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="brandEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="brandRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.brandList>ul').append(html)
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


        //取消添加
        $('.brandUndoAdd').click(function () {
            $('.brandListAdd').css({ display: "none" });
        });
        //编辑
        $('.brandList>ul').on('click', '.brandEdit', function () {
            $('.brandListRedact').css({ display: "block" });
            var that = this;
            var shoe_brand_id = $(this).parent().parent().parent().attr('data-id');
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminShoeBrand/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_brand_id: shoe_brand_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        // console.log(data);
                        $('.brandListRedact .brandListName input').val(data.data.name);
                        //确认编辑

                        //确认编辑
                        document.getElementsByClassName('brandListRedactBtnOk')[0].onclick = function () {
                            var name = $('.brandListRedact .brandListName input').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminShoeBrand/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    name: name,
                                    shoe_brand_id: shoe_brand_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        // console.log(data);
                                        alert('修改成功');
                                        $(that).parent().siblings('.brandNames').children('span').html(name);

                                        $('.brandListRedact').css({ display: "none" })
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


        $('.brandListUndoRedact').click(function () {
            $('.brandListRedact').css({ display: "none" })
        });

        $(".brandList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var shoe_brand_id = $(this).parent().parent().parent().attr('data-id');
            if (confirm("确认删除")) {
                var _this = this;
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeBrand/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_brand_id: shoe_brand_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(_this).parent().parent().parent().remove();
                            var ulList = $(".brandList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.brandName').children('span').html(i + 1)
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
    }

    /*                  负荷指数                     */
    function load() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShoeLoad/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '  <li data-id="' + data.data[i].id + '">' +
                                ' <div>' +
                                '<div class="loadName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="loadExponent">' + data.data[i].exponent + '</span></div>' +
                                '<div><span class="loadValue">' + data.data[i].value + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="loadEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="loadRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.loadList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].exponent + '</option>';
                            $('.tireListRedact .tireListLoad select').append(option);
                            $('.tireListAdd .tireListLoad select').append(option);
                            $('.tireContent>.screen>p select.loadSelect').append(option);
                            loadArray.push({ name: data.data[i].exponent, id: data.data[i].id })
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


        //添加
        $('.loadAdd').click(function () {
            $('.loadListAdd').css({ display: "block" });

            document.getElementsByClassName('loadListAddBtnOk')[0].onclick = function () {
                var value = $('.loadListAdd .loadValue').val();
                var exponent = $('.loadListAdd .loadExponent').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeLoad/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        exponent: exponent,
                        value: value
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var length = $('.loadList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="loadName"><span>' + length + '</span></div>' +
                                '<div><span class="loadExponent">' + exponent + '</span></div>' +
                                '<div><span class="loadValue">' + value + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="loadEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="loadRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.loadList>ul').append(html);
                            $('.loadListAdd').css({ display: "none" });
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

        //取消添加
        $('.loadUndoAdd').click(function () {
            $('.loadListAdd').css({ display: "none" });
        });
        //编辑
        $(".loadList>ul").on("click", ".loadEdit", function (e) {
            e.preventDefault();
            $('.loadListRedact').css({ display: "block" });
            var shoe_load_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            //获取单一
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminShoeLoad/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_load_id: shoe_load_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.loadListRedact .loadExponent').val(data.data.exponent);
                        $('.loadListRedact .loadValue').val(data.data.value);
                        document.getElementsByClassName('loadListRedactBtnOk')[0].onclick = function () {
                            var value = $('.loadListRedact .loadValue').val();
                            var exponent = $('.loadListRedact .loadExponent').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminShoeLoad/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    shoe_load_id: shoe_load_id,
                                    value: value,
                                    exponent: exponent
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.loadExponent').html(exponent);
                                        $(that).parent().siblings().children('.loadValue').html(value);
                                        $('.loadListRedact').css({ display: "none" })
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

        $('.loadListUndoRedact').click(function () {
            $('.loadListRedact').css({ display: "none" })
        });

        $(".loadList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var that = this;
            var shoe_load_id = $(this).parent().parent().parent().attr('data-id');
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeLoad/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_load_id: shoe_load_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".loadList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.loadName').children('span').html(i + 1)
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
    }

    /*                  速度级别                     */
    function speed() {

        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminSpeed/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '  <li data-id="' + data.data[i].id + '">' +
                                ' <div>' +
                                '<div class="speedName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="speedLevel">' + data.data[i].level + '</span></div>' +
                                '<div><span class="speedValue">' + data.data[i].value + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="speedEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="loadRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.speedList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].level + '</option>';
                            $('.tireListRedact .tireListSpeed select').append(option);
                            $('.tireListAdd .tireListSpeed select').append(option);
                            $('.tireContent>.screen>p select.speedSelect').append(option);
                            speedArray.push({ name: data.data[i].name, id: data.data[i].id })
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

        //tianjia
        $('.speedAdd').click(function () {
            $('.speedListAdd').css({ display: "block" });

            document.getElementsByClassName('speedListAddBtnOk')[0].onclick = function () {
                var level = $('.speedListAdd .level').val();
                var value = $('.speedListAdd .speed').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminSpeed/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        level: level,
                        value: value
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var len = $('.speedList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="speedName"><span>' + len + '</span></div>' +
                                '<div><span class="speedLevel">' + data.data.level + '</span></div>' +
                                '<div><span class="speedValue">' + data.data.value + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="speedEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="loadRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.speedList>ul').append(html);
                            $('.speedListAdd').css({ display: "none" });
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

        //取消添加
        $('.speedUndoAdd').click(function () {
            $('.speedListAdd').css({ display: "none" });
        });
        //编辑
        $('.speedList>ul').on('click', '.speedEdit', function () {
            "use strict";
            $('.speedListRedact').css({ display: "block" });
            var speed_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            //获取单一
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminSpeed/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    speed_id: speed_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.speedListRedact .level').val(data.data.level);
                        $('.speedListRedact .speed').val(data.data.value);
                        document.getElementsByClassName('speedListRedactBtnOk')[0].onclick = function () {
                            var value = $('.speedListRedact .speed').val();
                            var level = $('.speedListRedact .level').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminSpeed/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    speed_id: speed_id,
                                    value: value,
                                    level: level
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.speedLevel').html(level);
                                        $(that).parent().siblings().children('.speedValue').html(value);
                                        $('.speedListRedact').css({ display: "none" })
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
        //确认编辑
        $('.speedListUndoRedact').click(function () {
            $('.speedListRedact').css({ display: "none" })
        });
        //删除
        $(".speedList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var that = this;
            if (confirm("确认删除")) {
                var speed_id = $(this).parent().parent().parent().attr('data-id');
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminSpeed/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        speed_id: speed_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".speedList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.speedName').children('span').html(i + 1)
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
    }

    /*                  花纹名称                     */
    function figure() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminFlgure/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '  <li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="figureName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="figureVa">' + data.data[i].name + '</span></div>' +
                                '<div><span class=figureTime>' + data.data[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="figureEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="figureRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.figureList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListFigure select').append(option);
                            $('.tireListAdd .tireListFigure select').append(option);
                            $('.tireContent>.screen>p select.figureSelect').append(option);
                            figureArray.push({ name: data.data[i].name, id: data.data[i].id })
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

        //tianjia
        $('.figureAdd').click(function () {
            $('.figureListAdd').css({ display: "block" });
            document.getElementsByClassName('figureListAddBtnOk')[0].onclick = function () {
                var name = $('.figureListAdd .figureListName input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlgure/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var len = $('.figureList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="figureName"><span>' + len + '</span></div>' +
                                '<div ><span class="figureVa">' + data.data.name + '</span></div>' +
                                '<div><span class="figureTime">' + data.data.time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="figureEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="figureRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.figureList>ul').append(html);
                            $('.figureListAdd').css({ display: "none" });
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

        //取消添加
        $('.figureUndoAdd').click(function () {
            $('.figureListAdd').css({ display: "none" });
        });
        //编辑
        $('.figureList>ul').on('click', '.figureEdit', function () {
            $('.figureListRedact').css({ display: "block" });
            var flgure_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            //获取单一
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminFlgure/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    flgure_id: flgure_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.figureListRedact .figureListName input').val(data.data.name);
                        document.getElementsByClassName('figureListRedactBtnOk')[0].onclick = function () {
                            var name = $('.figureListRedact .figureListName input').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminFlgure/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    name: name,
                                    flgure_id: flgure_id
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.figureVa').html(name);
                                        $('.figureListRedact').css({ display: "none" })
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

        $('.figureListUndoRedact').click(function () {
            $('.figureListRedact').css({ display: "none" })
        });
        //删除
        $(".figureList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var flgure_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlgure/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        flgure_id: flgure_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".figureList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.figureName').children('span').html(i + 1)
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
    }

    /*                  花纹属性                     */
    function stripe() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShoeFlgure/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '<li data-id="' + data.data[i].id + '">' +
                                ' <div>' +
                                '<div class="stripeOrder"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="stripeName">' + data.data[i].name + '</span></div>' +
                                '<div><img src="' + data.data[i].img_url + '" alt="" class="stripeImg"/></div>' +
                                '<div class="description">' +
                                '<span><button>查看描述</button></span>' +
                                '</div>' +
                                '<div>' +
                                '<a href="##" class="stripeEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="stripeRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '<div class="stripeInfo">' +
                                '<span>' + data.data[i].description + '</span>' +
                                '</div>' +
                                '</li>';
                            $('.stripeList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListStripe select').append(option);
                            $('.tireListAdd .tireListStripe select').append(option);
                            $('.tireContent>.screen>p select.stripeSelect').append(option);
                            stripeArray.push({ name: data.data[i].name, id: data.data[i].id })
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


        //查看详细描述信息
        $('.stripeList>ul').on('mouseover', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "block"
            })
        });
        $('.stripeList>ul').on('mouseout', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "none"
            })
        });

        //
        //tianjia
        $('.stripeAdd').click(function () {
            $('.stripeListAdd').css({ display: "block" });
            //图片
            $('.stripeListAdd #addFile').change(function () {
                var file = this.files[0];
                if (file == null) {
                    $(".stripeListAdd #addFile").parent().siblings('.stripeImg').children('img').attr('src', '../img/index/yulan.png');
                    return;
                }
                var render = new FileReader();
                render.readAsDataURL(file);
                render.onloadend = function (e) {
                    $(".stripeListAdd #addFile").parent().siblings('.stripeImg').children('img').attr('src', e.target.result);
                }
            });
            document.getElementsByClassName('stripeListAddBtnOk')[0].onclick = function () {
                var fData = new FormData(document.getElementById('stripeAdd'));
                fData.append('admin_id', admin_id);
                fData.append('token', token);
                $.ajax({
                    type: 'post',
                    processData: false,
                    contentType: false,
                    url: 'http://180.76.243.205:8383/_API/_adminShoeFlgure/add',
                    data: fData,
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var length = $('.stripeList>ul>li').length + 1;
                            var html = '';
                            html += '<li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="stripeOrder"><span>' + length + '</span></div>' +
                                '<div><span class="stripeName">' + data.data.name + '</span></div>' +
                                '<div><img src="' + data.data.img_url + '" alt="" class="stripeImg"/></div>' +
                                '<div class="description">' +
                                '<span><button>查看描述</button></span>' +
                                '</div>' +
                                '<div>' +
                                '<a href="##" class="stripeEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="stripeRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '<div class="stripeInfo">' +
                                '<span>' + data.data.description + '</span>' +
                                '</div>' +
                                '</li>';
                            $('.stripeList>ul').append(html);
                            $('.stripeListAdd').css({ display: "none" });
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

        //取消添加
        $('.stripeListUndoAdd').click(function () {
            $('.stripeListAdd').css({ display: "none" });
        });
        //图片
        $('.stripeListRedact #file').change(function () {
            var file = this.files[0];
            console.log(file);
            if (file == null) {
                $(".stripeListRedact #file").parent().parent().siblings('.stripeImg').children('img').attr('src', '../img/index/yulan.png');
                return;
            }
            var render = new FileReader();
            render.readAsDataURL(file);
            render.onloadend = function (e) {
                $(".stripeListRedact #file").parent().parent().siblings('.stripeImg').children('img').attr('src', e.target.result);
            }
        });
        //编辑
        $('.stripeList>ul').on('click', ".stripeEdit", function (e) {
            e.preventDefault();
            $('.stripeListRedact').css({ display: "block" });
            var shoe_flgure_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminShoeFlgure/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_flgure_id: shoe_flgure_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.stripeListRedact .stripeImg>img').attr('src', data.data.img_url);
                        $('.stripeListRedact .stripeRedactName').val(data.data.name);
                        $('.stripeListRedact .stripeText').val(data.data.description);
                        document.getElementsByClassName('stripeListRedactBtnOk')[0].onclick = function () {

                            var fData = new FormData(document.getElementById('stripeRedact'));
                            fData.append('admin_id', admin_id);
                            fData.append('token', token);
                            fData.append('shoe_flgure_id', shoe_flgure_id);
                            $.ajax({
                                type: 'post',
                                processData: false,
                                contentType: false,
                                url: 'http://180.76.243.205:8383/_API/_adminShoeFlgure/edit',
                                data: fData,
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        // console.log(data);
                                        alert('修改成功');
                                        $('.stripeListRedact').css({ display: "none" });
                                        $(that).parent().siblings().children('.stripeName').html(data.data.name);
                                        $(that).parent().siblings().children('img').attr('src', data.data.img_url);
                                        $(that).parent().parent().siblings('.stripeInfo').children('span').html(data.data.description)
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
        $('.stripeEdit').click(function () {

        });
        //取消编辑
        $('.stripeListUndoRedact').click(function () {
            $('.stripeListRedact').css({ display: "none" })
        });

        $(".stripeList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var shoe_flgure_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeFlgure/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_flgure_id: shoe_flgure_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".stripeList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.stripeOrder').children('span').html(i + 1)
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
    }

    /*                  胎侧类型                     */
    function sidewall() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminSideWall/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '<li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="sidewallName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="sidewallva">' + data.data[i].name + '</span></div>' +
                                '<div><span class="sidewallTime">' + data.data[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="sidewallEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="sidewallRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.sidewallList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListSidewall select').append(option);
                            $('.tireListAdd .tireListSidewall select').append(option);
                            $('.tireContent>.screen>p select.sidewallSelect').append(option);
                            sidewallArray.push({ name: data.data[i].name, id: data.data[i].id })
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
        //tianjia
        $('.sidewallAdd').click(function () {
            $('.sidewallListAdd').css({ display: "block" });
            document.getElementsByClassName('sidewallListAddBtnOk')[0].onclick = function () {
                var name = $('.sidewallListAdd .sidewallListName input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminSideWall/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            // console.log(data);
                            var len = $('.sidewallList>ul>li').length + 1;
                            var html = '';
                            html += '<li data-id="' + data.data.id + '">' +
                                '<div>' +
                                '<div class="sidewallName"><span>' + len + '</span></div>' +
                                '<div><span class="sidewallva">' + name + '</span></div>' +
                                '<div><span class="sidewallTime">' + data.data.time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="sidewallEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="sidewallRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.sidewallList>ul').append(html);
                            $('.sidewallListAdd').css({ display: "none" });
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

        //取消添加
        $('.sidewallUndoAdd').click(function () {
            $('.sidewallListAdd').css({ display: "none" });
        });
        //编辑
        $(".sidewallList>ul").on('click', '.sidewallEdit', function () {
            $('.sidewallListRedact').css({ display: "block" });
            var side_wall_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminSideWall/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    side_wall_id: side_wall_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.sidewallListRedact .sidewallListName input').val(data.data.name);
                        document.getElementsByClassName('sidewallListRedactBtnOk')[0].onclick = function () {
                            $('.sidewallListRedact').css({ display: "none" });
                            var name = $('.sidewallListRedact .sidewallListName input').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminSideWall/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    side_wall_id: side_wall_id,
                                    name: name
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.sidewallva').html(name)
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

        $('.sidewallListUndoRedact').click(function () {
            $('.sidewallListRedact').css({ display: "none" })
        });

        $(".sidewallList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var that = this;
            var side_wall_id = $(this).parent().parent().parent().attr('data-id');
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminSideWall/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        side_wall_id: side_wall_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".sidewallList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.sidewallName').children('span').html(i + 1);
                            }
                            $('.sidewallListAdd .sidewallListName input').val('')
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
    }

    /*                  模具标识                     */
    function module() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminModule/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '<li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="mouldName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="mouldVa">' + data.data[i].name + '</span></div>' +
                                '<div><span class="mouldTime">' + data.data[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="mouldEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="mouldRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.mouldList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListMould select').append(option);
                            $('.tireListAdd .tireListMould select').append(option);
                            $('.tireContent>.screen>p select.moduleSelect').append(option);
                            moduleArray.push({ name: data.data[i].name, id: data.data[i].id })
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
        //tianjia
        $('.mouldAdd').click(function () {
            $('.mouldListAdd').css({ display: "block" });
            document.getElementsByClassName('mouldListAddBtnOk')[0].onclick = function () {
                var name = $('.mouldListAdd .mouldListName input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminModule/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var len = $('.mouldList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="mouldName"><span>' + len + '</span></div>' +
                                '<div ><span class="mouldVa">' + data.data.name + '</span></div>' +
                                '<div><span class="mouldTime">' + data.data.time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="mouldEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="mouldRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.mouldList>ul').append(html);
                            $('.mouldListAdd').css({ display: "none" });
                            $('.mouldListRedact .mouldListName input').val('')
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

        //取消添加
        $('.mouldUndoAdd').click(function () {
            $('.mouldListAdd').css({ display: "none" });
        });
        //编辑
        $(".mouldList>ul").on('click', '.mouldEdit', function () {
            $('.mouldListRedact').css({ display: "block" });
            var shoe_module_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminModule/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_module_id: shoe_module_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.mouldListRedact .mouldListName input').val(data.data.name);
                        document.getElementsByClassName('mouldListRedactBtnOk')[0].onclick = function () {
                            $('.mouldListRedact').css({ display: "none" });
                            var name = $('.mouldListRedact .mouldListName input').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminModule/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    shoe_module_id: shoe_module_id,
                                    name: name
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.mouldVa').html(name)
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
        //确认编辑
        $('.mouldListRedactBtnOk').click(function () {
            $('.mouldListRedact').css({ display: "none" })
        });
        $('.mouldListUndoRedact').click(function () {
            $('.mouldListRedact').css({ display: "none" })
        });

        $(".mouldList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var that = this;
            var shoe_module_id = $(this).parent().parent().parent().attr('data-id')
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminModule/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_module_id: shoe_module_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".mouldList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.mouldName').children('span').html(i + 1)
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
    }

    /*                  轮胎类型                    */
    function type() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShoeType/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html += '<li data-id="' + data.data[i].id + '">' +
                                '<div>' +
                                '<div class="typeName"><span>' + (i + 1) + '</span></div>' +
                                '<div><span class="typeVa">' + data.data[i].name + '</span></div>' +
                                '<div><span class="typeTime">' + data.data[i].time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="typeEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                '<a href="##" class="delete"><span class="typeRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.typeList>ul').append(html);
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                            $('.tireListRedact .tireListType select').append(option);
                            $('.tireListAdd .tireListType select').append(option);
                            $('.tireContent>.screen>p select.typeSelect').append(option);
                            typeArray.push({ name: data.data[i].name, id: data.data[i].id })
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
        //tianjia
        $('.typeAdd').click(function () {
            $('.typeListAdd').css({ display: "block" });
            document.getElementsByClassName('typeListAddBtnOk')[0].onclick = function () {
                var name = $('.typeListAdd .typeListName input').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeType/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        name: name
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.code == 'E0000') {
                            alert('添加成功');
                            var len = $('.typeList>ul>li').length + 1;
                            var html = '';
                            html += '  <li data-id="' + data.data.id + '">' +
                                ' <div>' +
                                '<div class="typeName"><span>' + len + '</span></div>' +
                                '<div ><span class="typeVa">' + data.data.name + '</span></div>' +
                                '<div><span class="typeTime">' + data.data.time + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="typeEdit"><span class="fa fa-edit"></span>编辑</a>' +
                                ' <a href="##" class="delete"><span class="typeRemove fa fa-external-link"></span>删除</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                            $('.typeList>ul').append(html);
                            $('.typeListAdd .typeListName input').val('');
                            $('.typeListAdd').css({ display: "none" });
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

        //取消添加
        $('.typeUndoAdd').click(function () {
            $('.typeListAdd').css({ display: "none" });
        });
        //编辑
        $(".typeList>ul").on('click', '.typeEdit', function () {
            $('.typeListRedact').css({ display: "block" });
            var shoe_type_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminShoeType/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_type_id: shoe_type_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        $('.typeListRedact .typeListName input').val(data.data.name);
                        document.getElementsByClassName('typeListRedactBtnOk')[0].onclick = function () {
                            $('.typeListRedact').css({ display: "none" });
                            var name = $('.typeListRedact .typeListName input').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminShoeType/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    shoe_type_id: shoe_type_id,
                                    name: name
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $(that).parent().siblings().children('.typeVa').html(name)
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
        //确认编辑
        $('.typeListRedactBtnOk').click(function () {
            $('.typeListRedact').css({ display: "none" })
        });
        $('.typeListUndoRedact').click(function () {
            $('.typeListRedact').css({ display: "none" })
        });

        $(".typeList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var that = this;
            var shoe_type_id = $(this).parent().parent().parent().attr('data-id');
            if (confirm("确认删除")) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoeType/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_type_id: shoe_type_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove();
                            var ulList = $(".typeList>ul").children();
                            for (var i = 0; i < ulList.length; i++) {
                                var one = ulList[i];
                                $(one).children().children('.typeName').children('span').html(i + 1)
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
    }

    /*                  轮胎总表                      */
    function tire() {


        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShoe/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    // console.log(data);
                    var datalist = data.data;
                    if (datalist) {
                        for (var i = 0; i < datalist.length; i++) {
                            var html = '';
                            html += '<li data-id="' + datalist[i].id + '">' +
                                '<div>' +
                                '<div class="tireBrand"><span>' + datalist[i].brand + '</span></div>' +
                                '<div class="tireType"><span>' + datalist[i].type + '</span></div>' +
                                '<div class="tireSize"><span>' + datalist[i].size + '</span></div>' +
                                "<div class='tireInch'><span>" + datalist[i].inch_mm + "</span></div>" +
                                '<div class="tireDiameter"><span>' + datalist[i].diameter + '</span></div>' +
                                '<div class="tireLoad"><span>' + datalist[i].load_index + '</span></div>' +
                                '<div class="tireSpeed"><span>' + datalist[i].speed + '</span></div>' +
                                '<div class="tireLevel"><span>' + datalist[i].level + '</span></div>' +
                                '<div class="tireFlgureName"><span>' + datalist[i].flgure_name + '</span></div>' +
                                '<div class="tireFlgure"><span>' + datalist[i].flgure + '</span></div>' +
                                '<div class="tireTires_Type"><span>' + datalist[i].tires_type + '</span></div>' +
                                '<div class="tireMould"><span>' + datalist[i].mould + '</span></div>' +
                                '<div class="tireCx"><span>' + datalist[i].changxiao + '</span></div>' +
                                '<div class="tirePrice"><span>' + datalist[i].price + '</span></div>' +
                                '</div>' +
                                '</li>';
                            $('.tireList>ul').append(html)
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
        //畅销等级
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminCx/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    // console.log(data);
                    var datalist = data.data;
                    if (datalist) {
                        for (var i = 0; i < datalist.length; i++) {
                            var option = '<option value="' + data.data[i].id + '">' + data.data[i].level + '</option>';
                            $('.tireListRedact .tireListCx select').append(option);
                            $('.tireListAdd .tireListCx select').append(option);
                            cxArray.push({ name: data.data[i].level, id: data.data[i].id })
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

        var that = '';
        //编辑
        $('.tireList>ul').on('click', 'li', function (e) {
            e.preventDefault();
            var mouseX = e.clientX + 3;
            var mouseY = e.clientY + 3;
            $('.listRedact>div').css({
                display: "block",
                top: mouseY,
                left: mouseX
            });
            $('.listRedact').css({
                display: "block"
            });
            that = $(this);




        });
        /*删除*/
        $('.tireList').on('click', '.tireListRemove', function (e) {
            e.stopPropagation();
            var shoe_id = $(that).attr('data-id');
            if (confirm('确认删除？')) {

                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminShoe/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        shoe_id: shoe_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            that.remove();
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            }
            $('.listRedact').css({ display: "none" })
        });
        $('.listRedact').click(function () {
            $(this).css({
                display: "none"
            })
        });
        //图片
        $('.imgList').on('change', '.imgListFile', function (event) {
            var file = this.files[0];
            var that = this;
            console.log(file);
            if (file == null) {
                $(this).siblings('img').attr('src', '../img/index/yulan.png');
                return;
            }
            var render = new FileReader();
            render.readAsDataURL(file);
            render.onloadend = function (e) {
                $(that).siblings('img').attr('src', e.target.result);
            }
        })
        /*编辑*/
        $('.tireList>div').on('click', '.tireListEdit', function () {
            var shoe_id = $(that).attr('data-id');
            $('.listRedact>div').css({
                display: "none"
            });
            $('.listRedact').css({
                display: "none"
            });
            $('.tireListRedact').css({ display: "block" });
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminShoe/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    shoe_id: shoe_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data)
                        function su(arr, data, select) {
                            for (var i = 0; i < arr.length; i++) {
                                if (data == arr[i].name) {
                                    select.val(arr[i].id)
                                }
                            }
                        };
                        su(loadArray, data.data.load_index, $('.tireListRedact .tireListLoad select'));
                        su(brandArray, data.data.brand, $('.tireListRedact .tireListBrand select'));
                        su(speedArray, data.data.speed, $('.tireListRedact .tireListSpeed select'));
                        su(figureArray, data.data.flgure_name, $('.tireListRedact .tireListFigure select'));
                        su(stripeArray, data.data.flgure, $('.tireListRedact .tireListStripe select'));
                        su(sidewallArray, data.data.tires_type, $('.tireListRedact .tireListSidewall select'));
                        su(moduleArray, data.data.mould, $('.tireListRedact .tireListMould select'));
                        su(cxArray, data.data.changxiao, $('.tireListRedact .tireListCx select'));
                        su(typeArray, data.data.type, $('.tireListRedact .tireListType select'));

                        $('.tireListRedact .tireListSize input').val(data.data.size);
                        $('.tireListRedact .tireListInch_mm input').val(data.data.inch_mm);
                        $('.tireListRedact .tireListInch input').val(data.data.inch);
                        $('.tireListRedact .tireListDiameter input').val(data.data.diameter);
                        $('.tireListRedact .tireListLevel input').val(data.data.level);
                        $('.tireListRedact .tireListPrice input').val(data.data.price);


                        if (data.data.img) {
                            $('.tireListRedact .leftImg img').attr('src', data.data.img.left_img);
                            $('.tireListRedact .rightImg img').attr('src', data.data.img.right_img);
                            $('.tireListRedact .overImg img').attr('src', data.data.img.down_img);
                            $('.tireListRedact .upImg img').attr('src', data.data.img.up_img);
                            $('.tireListRedact .frontImg img').attr('src', data.data.img.middle_img);
                            $('.tireListRedact .imgList').attr('data-id', data.data.img.id);
                        }

                        //确定编辑按钮
                        document.getElementsByClassName('tireListRedactBtnOk')[0].onclick = function () {
                            var brand_id = $('.tireListRedact .tireListBrand select').val();
                            var load_id = $('.tireListRedact .tireListLoad select').val();
                            var speed_id = $('.tireListRedact .tireListSpeed select').val();
                            var size = $('.tireListRedact .tireListSize input').val();
                            var inch_mm = $('.tireListRedact .tireListInch_mm input').val();
                            var inch = $('.tireListRedact .tireListInch input').val();
                            var diameter = $('.tireListRedact .tireListDiameter input').val();
                            var level = $('.tireListRedact .tireListLevel input').val();
                            var flgure_id = $('.tireListRedact .tireListFigure select').val();
                            var flgure_name_id = $('.tireListRedact .tireListStripe select').val();
                            var tire_type_id = $('.tireListRedact .tireListSidewall select').val();
                            var module_id = $('.tireListRedact .tireListMould select').val();
                            var changxiao_id = $('.tireListRedact .tireListCx select').val();
                            var type_id = $('.tireListRedact .tireListType select').val();
                            var price = $('.tireListRedact .tireListPrice input').val();
                            var img_id = $('.tireListRedact .imgList').attr('data-id');

                            var fData = new FormData(document.getElementById('tireListRedactRorm'));
                            fData.append('admin_id', admin_id);
                            fData.append('token', token);
                            fData.append('brand_id', brand_id);
                            fData.append('load_id', load_id);
                            fData.append('speed_id', speed_id);
                            fData.append('size', size);
                            fData.append('inch_mm', inch_mm);
                            fData.append('inch', inch);
                            fData.append('diameter', diameter);
                            fData.append('level', level);
                            fData.append('flgure_id', flgure_id);
                            fData.append('flgure_name_id', flgure_name_id);
                            fData.append('tire_type_id', tire_type_id);
                            fData.append('module_id', module_id);
                            fData.append('changxiao_id', changxiao_id);
                            fData.append('price', price);
                            fData.append('shoe_id', shoe_id);
                            fData.append('img_id', img_id);
                            fData.append('type_id', type_id);





                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminShoe/edit',
                                processData: false,
                                contentType: false,
                                data: fData,
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        $(that).children().children('.tireBrand').children('span').html(data.data.brand);
                                        $(that).children().children('.tireType').children('span').html(data.data.type);
                                        $(that).children().children('.tireSize').children('span').html(data.data.size);
                                        $(that).children().children('.tireInch').children('span').html(data.data.inch_mm);
                                        $(that).children().children('.tireDiameter').children('span').html(data.data.diameter);
                                        $(that).children().children('.tireLoad').children('span').html(data.data.load_index);
                                        $(that).children().children('.tireSpeed').children('span').html(data.data.speed);
                                        $(that).children().children('.tireLevel').children('span').html(data.data.level);
                                        $(that).children().children('.tireFlgureName').children('span').html(data.data.flgure_name);
                                        $(that).children().children('.tireFlgure').children('span').html(data.data.flgure);
                                        $(that).children().children('.tireTires_Type').children('span').html(data.data.tires_type);
                                        $(that).children().children('.tireMould').children('span').html(data.data.mould);
                                        $(that).children().children('.tireCx').children('span').html(data.data.changxiao);
                                        $(that).children().children('.tirePrice').children('span').html(data.data.price);
                                        $('.tireListRedact').css({ display: "none" });
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

        //取消编辑
        $('.tireListUndoRedact').click(function () {
            $('.tireListRedact').css({ display: "none" })
        });

        //添加
        $('.tireAdd').click(function () {
            $('.tireListAdd').css({ display: "block" });

            //确定添加
            document.getElementsByClassName('tireListAddBtnOk')[0].onclick = function () {
                var brand_id = $('.tireListAdd .tireListBrand select').val();
                var load_id = $('.tireListAdd .tireListLoad select').val();
                var speed_id = $('.tireListAdd .tireListSpeed select').val();
                var size = $('.tireListAdd .tireListSize input').val();
                var inch_mm = $('.tireListAdd .tireListInch_mm input').val();
                var inch = $('.tireListAdd .tireListInch input').val();
                var diameter = $('.tireListAdd .tireListDiameter input').val();
                var level = $('.tireListAdd .tireListLevel input').val();
                var flgure_id = $('.tireListAdd .tireListFigure select').val();
                var flgure_name_id = $('.tireListAdd .tireListStripe select').val();
                var tire_type_id = $('.tireListAdd .tireListSidewall select').val();
                var module_id = $('.tireListAdd .tireListMould select').val();
                var changxiao_id = $('.tireListAdd .tireListCx select').val();
                var type_id = $('.tireListAdd .tireListType select').val();
                var price = $('.tireListAdd .tireListPrice input').val();



                var fData = new FormData(document.getElementById('tireListAddRorm'));
                fData.append('admin_id', admin_id);
                fData.append('token', token);
                fData.append('brand_id', brand_id);
                fData.append('load_id', load_id);
                fData.append('speed_id', speed_id);
                fData.append('size', size);
                fData.append('inch_mm', inch_mm);
                fData.append('inch', inch);
                fData.append('diameter', diameter);
                fData.append('level', level);
                fData.append('flgure_id', flgure_id);
                fData.append('flgure_name_id', flgure_name_id);
                fData.append('tire_type_id', tire_type_id);
                fData.append('module_id', module_id);
                fData.append('changxiao_id', changxiao_id);
                fData.append('price', price);

                fData.append('type_id', type_id);
                $.ajax({
                    type: 'post',
                    processData: false,
                    contentType: false,
                    url: 'http://180.76.243.205:8383/_API/_adminShoe/add',
                    data: fData,
                    success: function (data) {
                        if (data.code == 'E0000') {
                            // console.log(data);
                            alert('添加成功!')
                            $('.tireListAdd').css({ display: "none" });
                            var html = '';
                            html += '<li data-id="' + data.data.id + '">' +
                                '<div>' +
                                '<div><span>' + data.data.brand + '</span></div>' +
                                '<div><span>' + data.data.type + '</span></div>' +
                                '<div><span>' + data.data.size + '</span></div>' +
                                "<div><span>" + data.data.inch_mm + "</span></div>" +
                                '<div><span>' + data.data.diameter + '</span></div>' +
                                '<div><span>' + data.data.load_index + '</span></div>' +
                                '<div><span>' + data.data.speed + '</span></div>' +
                                '<div><span>' + data.data.level + '</span></div>' +
                                '<div><span>' + data.data.flgure_name + '</span></div>' +
                                '<div><span>' + data.data.flgure + '</span></div>' +
                                '<div><span>' + data.data.tires_type + '</span></div>' +
                                '<div><span>' + data.data.mould + '</span></div>' +
                                '<div><span>' + data.data.changxiao + '</span></div>' +
                                '<div><span>' + data.data.price + '</span></div>' +
                                '</div>' +
                                '</li>';
                            $('.tireList>ul').append(html)
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
        //取消
        $('.tireListUndoAdd').click(function () {
            $('.tireListAdd').css({ display: "none" })
        });
        //筛选
        $(window).ready(function () {
            $(".tireList>ul>li").show()
        });
        function fittle(cls, select) {
            $("." + select + "").siblings('select').val('0')
            var sifting = $("." + cls + ">span");

            var selectData = $("." + select + " option:selected").text();
            //假数据
            var lis = $(".tireList>ul>li").length;
            for (var i = 0; i < lis; i++) {
                var siftingData = $("." + cls + ">span")[i].innerText;

                if (selectData == siftingData) {
                    $(".tireList>ul>li").hide().children().children('.' + cls + '').filter(":contains('" + siftingData + "')").parent().parent().show();
                    return;
                } else {
                    $(".tireList>ul>li").hide();
                }
                if ($("." + select + " option:selected").val() == '0') {
                    $(".tireList>ul>li").show();
                }
            }
        }


        //判断数据源.绑定筛选方法
        $('.tire .screen').on('change', 'select', function (e) {
            switch (e.target.className) {
                case "brandSelect":
                    fittle("tireBrand", "brandSelect");
                    break;
                case "typeSelect":
                    fittle("tireType", "typeSelect");
                    break;
                case "loadSelect":
                    fittle("tireLoad", "loadSelect");
                    break;
                case "speedSelect":
                    fittle("tireSpeed", "speedSelect");
                    break;
                case "figureSelect":
                    fittle("tireFlgureName", "figureSelect");
                    break;
                case "stripeSelect":
                    fittle("tireFlgure", "stripeSelect");
                    break;
                case "sidewallSelect":
                    fittle("tireTires_Type", "sidewallSelect");
                    break;
                case "moduleSelect":
                    fittle("tireMould", "moduleSelect");
                    break
            }
        })
    }
    type();
    module();
    sidewall();
    stripe();
    figure();
    speed();
    load();
    brand();
    tire()
})();


























