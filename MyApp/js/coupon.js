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
        $('.priceReactUndoAdd').click(function () {
            $('.priceReact').css({display: 'none'})
        });
        $('.priceList>ul').on('click', '.priceEdit', function (e) {
            $(this).parent().parent().parent().parent();
            $('.priceReact').css({display: 'block'})
        });


        $('.priceReact .serviceItems>div>div').on('mouseover', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "block"})
        });
        $('.priceReact .serviceItems>div>div').on('mouseout', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "none"})
        });
        //删除单个项目
        $('.priceReact .serviceItems>div>div.service').on('click', 'i', function (e) {
            e.preventDefault();
            if (confirm('确定删除?')) {
                $(this).parent().remove();
            }
        });
        //选项卡切换
        $(".serviceItemsTab>div>ul>li>a").click(function (e) {
            e.stopPropagation();
            $(".serviceItemsTab>div>ul>li>a").eq($(this).parent().index()).parent().addClass('serviceItemsTabConActive').siblings().removeClass("serviceItemsTabConActive");
            $(".serviceItemsTabCon>div").eq($(this).parent().index()).addClass('serviceItemsTabConBlock').siblings().removeClass('serviceItemsTabConBlock');
        });

        //选项卡中选择项目
        $('.serviceItemsTabCon>div>div').on('click', 'span', function (e) {
            e.stopPropagation();
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $(this).addClass('select')
            } else {
                $(this).attr('data-id', 1);
                $(this).removeClass('select')
            }
        });
        //确定添加
        $('.serviceItemsTabButton>button').click(function (e) {
            e.stopPropagation();
            var arr = [];
            $('.serviceItemsTabCon>div>div>span').each(function () {
                if ($(this).attr('data-id') == 2) {
                    arr.push($(this).text())
                }
            });
            console.log(arr);
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += '<span>' + arr[i] + ' <i></i></span>';
            }
            $('.service').append(html);
            $('.serviceMatte').css({display: 'none'})
        });


        $('.serviceItemsSelect').click(function (e) {
            $('.serviceMatte').css({display: 'block'});
            console.log(e.clientX, e.clientY);
            $('.serviceItemsTab').css({
                left:e.clientX,
                top:e.clientY
            });
        });
        $('.serviceMatte').click(function(e){
            $(this).css({
                display:"none"
            })
        });


        //添加优惠券
        $('.priceAddList>div>a').click(function(){
            $('.priceAdd').css({display:"block"})
        });
        $('.priceAddUndoAdd').click(function () {
            $('.priceAdd').css({display: 'none'})
        });
        $('.priceAdd .priceAddServiceItems>div>div').on('mouseover', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "block"})
        });
        $('.priceAdd .priceAddServiceItems>div>div').on('mouseout', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "none"})
        });
        //删除单个项目
        $('.priceAdd .priceAddServiceItems>div>div.service').on('click', 'i', function (e) {
            e.preventDefault();
            if (confirm('确定删除?')) {
                $(this).parent().remove();
            }
        });
        //选项卡切换
        $(".serviceItemsTabAdd>div>ul>li>a").click(function (e) {
            e.stopPropagation();
            $(".serviceItemsTabAdd>div>ul>li>a").eq($(this).parent().index()).parent().addClass('serviceItemsTabConActive').siblings().removeClass("serviceItemsTabConActive");
            $(".serviceItemsTabConAdd>div").eq($(this).parent().index()).addClass('serviceItemsTabConBlock').siblings().removeClass('serviceItemsTabConBlock');
        });

        //选项卡中选择项目
        $('.serviceItemsTabConAdd>div>div').on('click', 'span', function (e) {
            e.stopPropagation();
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $(this).addClass('select')
            } else {
                $(this).attr('data-id', 1);
                $(this).removeClass('select')
            }
        });
        //确定添加
        $('.serviceItemsTabButtonAdd>button').click(function (e) {
            e.stopPropagation();
            var arr = [];
            $('.serviceItemsTabConAdd>div>div>span').each(function () {
                if ($(this).attr('data-id') == 2) {
                    arr.push($(this).text())
                }
            });
            console.log(arr);
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += '<span>' + arr[i] + ' <i></i></span>';
            }
            $('.priceAddServiceItems .service').append(html);
            $('.serviceMatteAdd').css({display: 'none'})
        });


        $('.priceAddServiceItemsSelect').click(function (e) {
            $('.serviceMatteAdd').css({display: 'block'});
            console.log(e.clientX, e.clientY);
            $('.serviceItemsTabAdd').css({
                left:e.clientX,
                top:e.clientY
            });
        });
        $('.serviceMatteAdd').click(function(e){
            $(this).css({
                display:"none"
            })
        })
    }

    /*现金优惠券*/
    function cash() {
        $('.cashReactUndoAdd').click(function () {
            $('.cashReact').css({display: 'none'})
        });
        $('.cashList>ul').on('click', '.cashEdit', function (e) {
            $(this).parent().parent().parent().parent();
            $('.cashReact').css({display: 'block'})
        });


        $('.cashReact .cashServiceItems>div>div').on('mouseover', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "block"})
        });
        $('.cashReact .cashServiceItems>div>div').on('mouseout', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "none"})
        });
        //删除单个项目
        $('.cashReact .cashServiceItems>div>div.cashService').on('click', 'i', function (e) {
            e.preventDefault();
            if (confirm('确定删除?')) {
                $(this).parent().remove();
            }
        });
        //选项卡切换
        $(".cashServiceItemsTab>div>ul>li>a").click(function (e) {
            e.stopPropagation();
            $(".cashServiceItemsTab>div>ul>li>a").eq($(this).parent().index()).parent().addClass('cashServiceItemsTabConActive').siblings().removeClass("cashServiceItemsTabConActive");
            $(".cashServiceItemsTabCon>div").eq($(this).parent().index()).addClass('cashServiceItemsTabConBlock').siblings().removeClass('cashServiceItemsTabConBlock');
        });

        //选项卡中选择项目
        $('.cashServiceItemsTabCon>div>div').on('click', 'span', function (e) {
            e.stopPropagation();
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $(this).addClass('select')
            } else {
                $(this).attr('data-id', 1);
                $(this).removeClass('select')
            }
        });
        //确定添加
        $('.cashServiceItemsTabButton>button').click(function (e) {
            e.stopPropagation();
            var arr = [];
            $('.cashServiceItemsTabCon>div>div>span').each(function () {
                if ($(this).attr('data-id') == 2) {
                    arr.push($(this).text())
                }
            });
            console.log(arr);
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += '<span>' + arr[i] + ' <i></i></span>';
            }
            $('.cashService').append(html);
            $('.cashServiceMatte').css({display: 'none'})
        });


        $('.cashServiceItemsSelect').click(function (e) {
            $('.cashServiceMatte').css({display: 'block'});
            console.log(e.clientX, e.clientY);
            $('.cashServiceItemsTab').css({
                left:e.clientX,
                top:e.clientY
            });
        });
        $('.cashServiceMatte').click(function(e){
            $(this).css({
                display:"none"
            })
        });


        //添加优惠券
        $('.cashAddList>div>a').click(function(){
            $('.cashAdd').css({display:"block"})
        });
        $('.cashAddUndoAdd').click(function () {
            $('.cashAdd').css({display: 'none'})
        });
        $('.cashAdd .cashAddServiceItems>div>div').on('mouseover', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "block"})
        });
        $('.cashAdd .cashAddServiceItems>div>div').on('mouseout', 'span', function (e) {
            e.preventDefault();
            $(this).children('i').css({display: "none"})
        });
        //删除单个项目
        $('.cashAdd .cashAddServiceItems>div>div.cashService').on('click', 'i', function (e) {
            e.preventDefault();
            if (confirm('确定删除?')) {
                $(this).parent().remove();
            }
        });
        //选项卡切换
        $(".cashServiceItemsTabAdd>div>ul>li>a").click(function (e) {
            e.stopPropagation();
            $(".cashServiceItemsTabAdd>div>ul>li>a").eq($(this).parent().index()).parent().addClass('cashServiceItemsTabConActive').siblings().removeClass("cashServiceItemsTabConActive");
            $(".cashServiceItemsTabConAdd>div").eq($(this).parent().index()).addClass('cashServiceItemsTabConBlock').siblings().removeClass('cashServiceItemsTabConBlock');
        });

        //选项卡中选择项目
        $('.cashServiceItemsTabConAdd>div>div').on('click', 'span', function (e) {
            e.stopPropagation();
            if ($(this).attr('data-id') == 1) {
                $(this).attr('data-id', 2);
                $(this).addClass('select')
            } else {
                $(this).attr('data-id', 1);
                $(this).removeClass('select')
            }
        });
        //确定添加
        $('.cashServiceItemsTabButtonAdd>button').click(function (e) {
            e.stopPropagation();
            var arr = [];
            $('.cashServiceItemsTabConAdd>div>div>span').each(function () {
                if ($(this).attr('data-id') == 2) {
                    arr.push($(this).text())
                }
            });
            console.log(arr);
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                html += '<span>' + arr[i] + ' <i></i></span>';
            }
            $('.cashAddServiceItems .cashService').append(html);
            $('.cashServiceMatteAdd').css({display: 'none'})
        });


        $('.cashAddServiceItemsSelect').click(function (e) {
            $('.cashServiceMatteAdd').css({display: 'block'});
            console.log(e.clientX, e.clientY);
            $('.cashServiceItemsTabAdd').css({
                left:e.clientX,
                top:e.clientY
            });
        });
        $('.cashServiceMatteAdd').click(function(e){
            $(this).css({
                display:"none"
            })
        })
    }

    price();
    cash()
})();
