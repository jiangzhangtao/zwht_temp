(function () {

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight=$('.details').innerHeight();
        var contentHeight=$('.content').height();
        console.log(menuHeight+logoHeight)
        $(".menu").css({
            height: bodyHeight - logoHeight-1,
            minHeight: detailsHeight+50
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
                height: detailsHeight + navigationHeight-1,
                minHeight: windowHeight - logoHeight-1
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

        console.log(menuHeight+logoHeight);
        $(".menu").css({
            height: detailsHeight + navigationHeight,
            minHeight: windowHeight - logoHeight-1
        });
    });

  /*                   轮胎服务流程                 */
    function flowPath(){
        //编辑
        $('.storeCategoryList>ul').on('click','.look',function(e){
            e.preventDefault();
            $('.cooperativeListServer').css({display:"block"})
        });
        $('.storeCategoryRedactBtnOk').click(function(){
            $('.storeCategoryRedact').css({display:"none"});
        });
        $('.storeCategoryUndoRedact').click(function(){
            $('.storeCategoryRedact').css({display:"none"});
        });
        //chakan
        $('.storeCategoryList>ul').on('click','.storeCategoryEdit',function(e){
            e.preventDefault();
            $('.storeCategoryRedact').css({display:"block"})
        });
        $('.cooperativeListServer .storeCategoryRedactBtnOk').click(function(){
            $('.cooperativeListServer').css({display:"none"})
        })

    };

    /*                              轮胎更换流程                              */

    function tyreChange(){
        //编辑
        $('.severListList>ul').on('click','.look',function(e){
            e.preventDefault();
            $('.tyreChange').css({display:"block"})
        });
        $('.tyreChangeRedactBtnOk').click(function(){
            $('.tyreChangeRedact').css({display:"none"});
        });
        $('.tyreChangeUndoRedact').click(function(){
            $('.tyreChangeRedact').css({display:"none"});
        });
        //chakan
        $('.severListList>ul').on('click','.severListEdit',function(e){
            e.preventDefault();
            $('.tyreChangeRedact').css({display:"block"})
        });
        $('.tyreChangeBtnOk').click(function(){
            $('.tyreChange').css({display:"none"})
        })
    }

    /*         品质服务           */
    function qualityRedact(){
        //编辑
        $('.InventoryCategoriesList>ul').on('click','.look',function(e){
            e.preventDefault();
            $('.quality').css({display:"block"})
        });
        $('.qualityRedactBtnOk').click(function(){
            $('.qualityRedact').css({display:"none"});
        });
        $('.qualityUndoRedact').click(function(){
            $('.qualityRedact').css({display:"none"});
        });
        //chakan
        $('.InventoryCategoriesList>ul').on('click','.InventoryCategoriesEdit',function(e){
            e.preventDefault();
            $('.qualityRedact').css({display:"block"})
        });
        $('.qualityBtnOk').click(function(){
            $('.quality').css({display:"none"})
        })
    }
    qualityRedact();
    tyreChange();
    flowPath()
})();


























