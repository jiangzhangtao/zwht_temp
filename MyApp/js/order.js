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
        console.log(menuHeight + logoHeight)
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

    /*                     待发货                    */
    function shipments() {
        //筛选
        $(window).ready(function () {
            $(".shipmentsList>ul>li").show()
        });
        $('.shipmentsContent>.query>div>div>button').click(function () {
            var inputVal = $('.shipmentsContent>.query>div>div>input').val();
            $(".shipmentsList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });

        //返回列表
        $('.orderButtonBack').click(function () {
            $('.orderInfo').css({display:"none"})
        });
        //查看详情
        $('.shipmentsList>ul').on('click','.shipmentsEdit',function(e){
            e.preventDefault();
            $('.orderInfo').css({display:"block"})
        })
    }

    /*                      待收货                       */
    function receiving(){
        //筛选
        $(window).ready(function () {
            $(".receivingList>ul>li").show()
        });
        $('.receivingContent>.query>div>div>button').click(function () {
            var inputVal = $('.receivingContent>.query>div>div>input').val();
            $(".receivingList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //返回列表
        $('.receivingButtonBack').click(function () {
            $('.receivingInfo').css({display:"none"})
        });
        //查看详情
        $('.receivingList>ul').on('click','.receivingEdit',function(e){
            e.preventDefault();
            $('.receivingInfo').css({display:"block"})
        })
    }

    /*                      待服务                        */
    function service(){
        //筛选
        $(window).ready(function () {
            $(".serviceList>ul>li").show()
        });
        $('.serviceContent>.query>div>div>button').click(function () {
            var inputVal = $('.serviceContent>.query>div>div>input').val();
            $(".serviceList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //返回列表
        $('.serviceButtonBack').click(function () {
            $('.serviceInfo').css({display:"none"})
        });
        //查看详情
        $('.serviceList>ul').on('click','.serviceEdit',function(e){
            e.preventDefault();
            $('.serviceInfo').css({display:"block"})
        });

        //查看图片详情
        $('.serviceInfo .serviceButtonOrderImg').click(function(){
            $('.serviceOrderInfo').css({display:"none"});
            $('.serviceOrderImg').css({display:"block"});
        });
        //返回查看详情
        $('.serviceOrderImg .ServiceAffirmComeBack').click(function(){
            $('.serviceOrderInfo').css({display:"block"});
            $('.serviceOrderImg').css({display:"none"});
        })
    }

    /*                      已完成                        */
    function finish(){
        //筛选
        $(window).ready(function () {
            $(".finishList>ul>li").show()
        });
        $('.finishContent>.query>div>div>button').click(function () {
            var inputVal = $('.finishContent>.query>div>div>input').val();
            $(".finishList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });
        //查看详情
        $('.finishList>ul').on('click','.finishEdit',function(e){
            e.preventDefault();
            $('.finishInfo').css({display:"block"})
        });
        //返回列表
        $('.finishButtonBack').click(function(){
            $(".finishInfo").css({display:"none"})
        })
    }

    /*                       待服务轮胎订单                 */
    function tyreOrder(){
        //筛选
        $(window).ready(function () {
            $(".tyreOrderList>ul>li").show()
        });
        $('.tyreOrderContent>.query>div>div>button').click(function () {
            var inputVal = $('.tyreOrderContent>.query>div>div>input').val();
            $(".tyreOrderList>ul>li").hide().children().children(".filterOrder").filter(":contains('" + inputVal + "')").parent().parent().show();
        });

        $('.tyreOrderList>ul').on('click','.tyreOrderEdit',function(e){
            e.preventDefault();
            $('.tyreOrderInfo').css({display:"block"})
        });

        //返回列表
        $('.tyreOrderButtonBack').click(function(){
            $('.tyreOrderInfo').css({display:'none'})
        })
    }
    tyreOrder();
    finish();
    service();
    receiving();
    shipments()
})();


























