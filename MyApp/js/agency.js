(function () {
    var documentWidth = $(window).width();
    var menuWidth = $('.menu').innerWidth();
    var detailsHeight = $('.details').innerHeight();
    var navigationHeight = $(".navigation").innerHeight();
    var logoHeight = $('.header').innerHeight();
    var bodyHeight = $(window).height();
    $(".menu").css({
        height: detailsHeight + navigationHeight,
        minHeight: bodyHeight - logoHeight
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
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight - logoHeight
        });
        $('.details').css({
            width: documentWidth - menuWidth - 20
        });
        $('.navigation').css({
            width: documentWidth - menuWidth - 20
        })
    });
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


    /*                车辆品牌设置                 */
    //筛选
    $(window).ready(function () {
        $(".vehicleBrandList>ul>li").show()
    });
    $(".select").change(function () {
        var selectData = $(".select option:selected").text();
        var sifting = $(".sifting>span");
        console.log(sifting)
        //假数据
        var lis = $(".vehicleBrandList>ul>li").length;
        for (var i = 0; i < lis; i++) {
            var siftingData = $(".sifting>span")[i].innerText;
            if (selectData == siftingData) {
                $(".vehicleBrandList>ul>li").hide().filter(":contains('" + siftingData + "')").show();
            }
        }
    });

    //remove
    $(".vehicleBrandList>ul").on("click", ".delete", function (e) {
        e.preventDefault();
        var removeLi = confirm("确认删除？");
        if (removeLi == true) {
            $(this).parent().parent().parent().remove();
        }
    });

    //edit
    $(".vehicleBrandList>ul").on("click", ".vehicleBrandEdit", function (e) {
        e.preventDefault();
        $(".redact").css("display","block")
    });

    //redact undoAdd
    $(".redact .undoAdd").click(function(){
        $(".redact").css("display","none")
    });

    //redact addOK
    $(".redact .addBtnOk").click(function(){
        $(".redact").css("display","none")
    });

    //addHtml undoAdd
    $(".addHtml .undoAdd").click(function(){
        $(".addHtml").css("display","none")
    });

    //addHtml addOK
    $(".addHtml .addBtnOk").click(function(){
        $(".addHtml").css("display","none")
    });

    //添加分类
    $(".vehicleBrandAdd>div>a").click(function(){
        $(".addHtml").css("display","block")
    })
})();