(function () {

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();

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

    /*                   仓库列表                 */
    function warehouse() {
        //添加
        $('.warehouseAddList').click(function () {
            $('.warehouseAdd').css({display: "block"})
        });
        $('.warehouseAddBtnOk').click(function () {
            $('.warehouseAdd').css({display: "none"})
        });
        $('.warehouseUndoAdd').click(function () {
            $('.warehouseAdd').css({display: "none"})
        });
        //编辑
        $('.warehouseList>ul').on('click', ".warehouseEdit", function (e) {
            e.preventDefault();
            $('.warehouseRedact').css({display: "block"})
        });
        $('.warehouseRedactBtnOk').click(function () {
            $('.warehouseRedact').css({display: "none"})
        });
        $('.warehouseUndoRedact').click(function () {
            $('.warehouseRedact').css({display: "none"})
        });

    }

    /*                    运费列表                */
    function freight(){
        //添加
        $('.freightAddList').click(function () {
            $('.freightAdd').css({display: "block"})
        });
        $('.freightAddBtnOk').click(function () {
            $('.freightAdd').css({display: "none"})
        });
        $('.freightUndoAdd').click(function () {
            $('.freightAdd').css({display: "none"})
        });
        //编辑
        $('.freightList>ul').on('click', ".freightEdit", function (e) {
            e.preventDefault();
            $('.freightRedact').css({display: "block"})
        });
        $('.freightRedactBtnOk').click(function () {
            $('.freightRedact').css({display: "none"})
        });
        $('.freightUndoRedact').click(function () {
            $('.freightRedact').css({display: "none"})
        });

    }



    warehouse();
    freight();
})();


























