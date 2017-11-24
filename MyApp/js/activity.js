(function () {

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
            minHeight: detailsHeight + 50
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

    /*               价格增量                */
    function price() {

        $(".priceList>ul").on('click', '.priceEdit', function (e) {
            e.preventDefault();
            //其他li的input框
            var thisLi = $(this).parent().parent().parent();
            var otherLi = $(this).parent().parent().parent().siblings();
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                //当前Li的input框
                $(this).parent().siblings().children().children('input').attr('disabled', false);
                //其他li的input框
                otherLi.children().children().children().children('input').attr('disabled', true);
                thisLi.css({
                    height: 85 + 'px',
                    lineHeight: 85 + 'px'
                });
                otherLi.css({
                    height: 60+ 'px',
                    lineHeight: 60 + 'px'
                });
                $(this).children("i").html('确定');
                $(this).children("span").removeClass("fa-edit").addClass("fa-check-circle");
                $('.priceAdd a').attr('data-id', 0);
                otherLi.children().children().children().children('i').html('编辑');
                otherLi.children().children().children().attr('data-id',1);
                otherLi.children().children().children().children('span').removeClass('fa-check-circle').addClass('fa-edit');
            } else {
                $(this).attr('data-id', 1);
                //当前Li的input框
                $(this).parent().siblings().children().children('input').attr('disabled', true);
                thisLi.css({
                    height: 60 + 'px',
                    lineHeight: 60 + 'px'
                });
                $(this).children("i").html('编辑');
                $(this).children("span").removeClass('fa-check-circle').addClass('fa-edit')
            }
            $('.newLi').css({
                display: "none"
            });
        });

        $('.priceAdd>div>a').click(function () {
            if ($(this).attr('data-id') == 0) {
                $(this).attr('data-id', 1);
                $('.newLi').css({
                    display: "block"
                })
            } else {
                $(this).attr('data-id', 0);
                $('.newLi').css({
                    display: "none"
                })
            }
            $('.priceList li').css({
                height: 60 + 'px',
                lineHeight: 60 + 'px'
            });
            $('.priceList>ul>li input').attr('disabled', true);
            $('.priceEdit').attr('data-id', 1);
            $('.priceEdit').children('i').html('编辑');
            $('.priceEdit').children('span').removeClass('fa-check-circle').addClass('fa-edit');
        });
        //确认添加
        $('.priceConfirmAdd').click(function () {
            $('.priceAdd a').attr('data-id', 0);
            var newLi = '';
            newLi += '<li>';
            newLi += '<div>' +
            '<div class="filterOrder"><span>1</span></div>' +
            '<div><span><input type="text" disabled value=""/></span></span></div>' +
            '<div><span><input type="text" disabled value=""/></span></span></div>' +
            '<div>' +
            '<a href="##" class="priceEdit" data-id="1">' +
            '<span class="fa fa-edit"></span><i>编辑</i></a>' +
            '</div>' +
            '</div>';
            newLi += '</li>';
            $('.priceList>ul').append(newLi);
            //假的数据框删除掉
            $('.newLi').css({
                display: "none"
            });

        });


        //点击导航消失
        $('.navigation li').click(function () {
            $('.newLi').css({
                display: "none"
            });
            $('.priceList li').css({
                height: 60 + 'px',
                lineHeight: 60 + 'px'
            });
            $('.priceList>ul>li input').attr('disabled', true);
            $('.priceEdit').attr('data-id', 1);
            $('.priceEdit').children('i').html('编辑');
            $('.priceEdit').children('span').removeClass('fa-check-circle').addClass('fa-edit');
            $('.priceAdd a').attr('data-id', 0)
        })


    }

    price()
})();
