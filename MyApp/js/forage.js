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
    }

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

    /*                     系统充值列表                    */
    function system() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminRecharge/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    if (data.data) {
                        var html = '';
                        for (var i = 0; i < data.data.length; i++) {
                            html += '<li data-id="' + data.data[i].id + '">' +
                            '<div>' +
                            '<div class="filterOrder"><span>' + (i + 1) + '</span></div>' +
                            '<div><span class="recharge_value">' + data.data[i].recharge_value + '</span></div>' +
                            '<div><span class="ml_value">' + data.data[i].ml_value + '</span></div>' +
                            '<div>' +
                            '<a href="##" class="systemEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '</div>' +
                            '</div>' +
                            '</li>';
                        }
                        $('.systemList>ul').html(html);
                        //查看详情
                        $('.systemList>ul').on('click', '.systemEdit', function (e) {
                            e.preventDefault();
                            var that = this;
                            $('.systemReact').css({display: "block"});
                            var recharge_id = $(this).parent().parent().parent().attr('data-id');
                            var recharge_value = $(this).parent().siblings().children('.recharge_value').html();
                            var ml_value = $(this).parent().siblings().children('.ml_value').html();
                            $('.systemReact .recharge').val(recharge_value);
                            $('.systemReact .ml').val(ml_value);
                            document.getElementsByClassName('systemReactBtnOk')[0].onclick = function () {
                                $.ajax({
                                    type: 'post',
                                    url: 'http://180.76.243.205:8383/_API/_adminRecharge/edit',
                                    data: {
                                        admin_id: admin_id,
                                        token: token,
                                        recharge_id: recharge_id,
                                        recharge_value: $('.systemReact .recharge').val(),
                                        ml_value: $('.systemReact .ml').val()
                                    },
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            alert('修改成功');
                                            $(that).parent().siblings().children('.recharge_value').html($('.systemReact .recharge').val());
                                            $(that).parent().siblings().children('.ml_value').html($('.systemReact .ml').val());
                                            $('.systemReact').css({display: "none"});
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
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });


        //返回列表
        $('.systemReactUndoAdd').click(function () {
            $('.systemReact').css({display: "none"})
        });

    }

    /*                      自定义充值                       */
    function custom() {

        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminRecharge/showCustom',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    $('.rate>input').val(data.data.rate);
                    $('.ca').html(data.data.value);
                    $('.value>input').val((data.data.value * data.data.rate).toFixed(2))
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
        $('.moneyButton').click(function () {
            var $this_input = $(this).parent().siblings().children().children().children().children('input');
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $this_input.attr('disabled', false);

            } else {
                $(this).attr('data-id', 1);
                $this_input.attr('disabled', true);
                var rate = $('.rate>input').val();
                var value = $('.ca').html();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminRecharge/setCustom',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        value: value,
                        rate: rate
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data)
                            alert('修改成功');
                            $('.value>input').val((value * rate).toFixed(2))
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

    custom();
    system();
})();
