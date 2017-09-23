(function () {

    /*自适应屏幕*/
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
        var windowHeight = $(document.body).innerHeight();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight
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
            $(".redact").css("display", "block")
        });

        //redact undoAdd
        $(".redact .undoAdd").click(function () {
            $(".redact").css("display", "none")
        });

        //redact addOK
        $(".redact .addBtnOk").click(function () {
            $(".redact").css("display", "none")
        });

        //addHtml undoAdd
        $(".addHtml .undoAdd").click(function () {
            $(".addHtml").css("display", "none")
        });

        //addHtml addOK
        $(".addHtml .addBtnOk").click(function () {
            $(".addHtml").css("display", "none");
            var html = "";
            html += '<li>' +
            '<div>' +
            ' <div><span>宝骏</span></div>' +
            '<div><img src="img/basic/bj.jpg" alt=""/></div>' +
            '<div class="sifting"><span>B</span></div>' +
            '<div>' +
            ' <a href="##" class="vehicleBrandEdit"><span class="fa fa-edit"></span>编辑</a>' +
            ' <a href="##" class="delete"><span class="vehicleBrandRemove"></span>删除</a>' +
            '</div>' +
            '</div>' +
            '</li>';
            $(".vehicleBrandList>ul").append(html);
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
            $(".agencyAddHtml").css({display: "block"})
        });
        /*取消添加直接关闭*/
        $('.agencyUndoAdd').click(function () {
            $(".agencyAddHtml").css({display: "none"});
            $('.agencyRedact').css({display: "none"})
        });
        /*确认添加拼接字符串添加进去*/
        $('.agencyAddBtnOk').click(function () {
            $(".agencyAddHtml").css({display: "none"});
            var str = '';
            str += '<li>';
            str += '<div>';
            str += '<div><span>东风</span></div>';
            str += '<div><img src="img/basic/baolong.jpg" alt=""/></div>';
            str += '<div>';
            str += '<a href="##" class="agencyEdit"><span class="fa fa-edit"></span>编辑</a>';
            str += '<a href="##" class="delete"><span class="agencyRemove"></span>删除</a>';
            str += '</div>';
            str += '</div>';
            str += '</li>';
            console.log(str);
            $('.agencyList>ul').append(str);
        });

        /*编辑厂商*/
        $('.agencyList>ul').on("click", ".agencyEdit", function () {
            $(".agencyRedact").css({display: "block"})
        });
        /*删除厂商*/
        $('.agencyList>ul').on("click", ".delete", function () {
            if (confirm("确认删除此厂商？")) {
                $(this).parent().parent().parent().remove()
            }
        });
        /*确认编辑厂商*/
        $('.agencyEdit').click(function () {
            $(".agencyRedact").css({display: "none"})
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

        //remove
        $(".AMGList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            if (removeLi == true) {
                $(this).parent().parent().parent().remove();
            }
        });

        //edit
        $(".AMGList>ul").on("click", ".AMGEdit", function (e) {
            e.preventDefault();
            $(".AmgRedact").css("display", "block")
        });

        //redact undoAdd
        $(".AmgRedactBtn .AmgUndoAdd").click(function () {
            $(".AmgRedact").css("display", "none")
        });

        //redact addOK
        $(".AmgRedactBtn .AmgRedactBtnOk").click(function () {
            $(".AmgRedact").css("display", "none")
        });

        //addHtml undoAdd
        $(".AmgAddHtml .agencyUndoAdd").click(function () {
            $(".AmgAddHtml").css("display", "none")
        });

        //addHtml addOK
        $(".AmgAddHtml .AmgAddBtnOk").click(function () {
            $(".AmgAddHtml").css("display", "none");
            var html = "";
            html += '<li>' +
            '<div>' +
            '<div class="AMGName"><span>沃尔沃</span></div>' +
            '<div><span>德国宝马</span></div>' +
            '<div><img src="img/basic/bj.jpg" alt=""/></div>' +
            '<div>' +
            ' <a href="##" class="AMGEdit"><span class="fa fa-edit"></span>编辑</a>' +
            ' <a href="##" class="delete"><span class="AMGRemove"></span>删除</a>' +
            '</div>' +
            '</div>' +
            '</li>';
            $(".AMGList>ul").append(html);
        });

        //添加车系
        $(".AMGAdd>div>a").click(function () {
            $(".AmgAddHtml").css("display", "block")
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

        //筛选
        $(window).ready(function () {
            $(".AMGList>ul>li").show()
        });
        /*品牌的筛选*/
        $('.CarProxy').bind('input propertychange', function () {
            var proxyData = $(".CarProxy").val();
            $(".CarList>ul>li").hide().children().children(".CarBrad").filter(":contains('" + proxyData + "')").parent().parent().show();

        });

        //remove
        $(".CarList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            if (removeLi == true) {
                $(this).parent().parent().parent().remove();
            }
        });

        //edit
        $(".CarList>ul").on("click", ".CarEdit", function (e) {
            e.preventDefault();
            $(".CarRedact").css("display", "block")
        });

        //redact undoAdd
        $(".CarRedactBtn .CarUndoRedact").click(function () {
            $(".CarRedact").css("display", "none")
        });

        //redact addOK
        $(".CarRedactBtn .CarRedactBtnOk").click(function () {
            $(".CarRedact").css("display", "none")
        });

        //addHtml undoAdd
        $(".CarAddHtml .CarUndoAdd").click(function () {
            $(".CarAddHtml").css("display", "none")
        });

        //addHtml addOK
        $(".CarAddHtml .CarAddBtnOk").click(function () {
            $(".CarAddHtml").css("display", "none");
            var html = "";
            html +='<li>'+
                '<div>'+
                '<div class="CarBrad"><span>雪佛兰</span></div>'+
                '<div class="CarSet"><span>3系</span></div>'+
                '<div class="CarCc"><span>1.6L/100KW</span></div>'+
                '<div class="CarYear"><span>2013</span></div>'+
                '<div class="CarName"><span>2013款雪佛兰克罗兹</span></div>'+
                '<div>'+
                '<a href="##" class="CarEdit"><span class="fa fa-edit"></span>编辑</a>'+
                '<a href="##" class="delete"><span class="CarRemove"></span>删除</a>'+
                '</div>'+
                '</div>'+
                '</li>';

            $(".CarList>ul").append(html);
        });

        //添加车系
        $(".CarAdd>div>a").click(function () {
            $(".CarAddHtml").css("display", "block")
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
    function plateNumber(){

        //筛选
        $(window).ready(function () {
            $(".plateNumberList>ul>li").show()
        });
        /*品牌的筛选*/
        $('.plateNumberProxy').bind('input propertychange', function () {
            var proxyData = $(".plateNumberProxy").val();
            $(".plateNumberList>ul>li").hide().children().children(".plateNumberProvince").filter(":contains('" + proxyData + "')").parent().parent().show();

        });

        //remove
        $(".plateNumberList>ul").on("click", ".delete", function (e) {
            e.preventDefault();
            var removeLi = confirm("确认删除？");
            if (removeLi == true) {
                $(this).parent().parent().parent().remove();
            }
        });

        //edit
        $(".plateNumberList>ul").on("click", ".plateNumberEdit", function (e) {
            e.preventDefault();
            $(".plateNumberRedact").css("display", "block")
        });

        //redact undoAdd
        $(".plateNumberRedactBtn .plateNumberUndoAdd").click(function () {
            $(".plateNumberRedact").css("display", "none")
        });

        //redact addOK
        $(".plateNumberRedactBtn .plateNumberRedactBtnOk").click(function () {
            $(".plateNumberRedact").css("display", "none")
        });

        //addHtml undoAdd
        $(".plateNumberAddHtml .plateNumberUndoAdd").click(function () {
            $(".plateNumberAddHtml").css("display", "none")
        });

        //addHtml addOK
        $(".plateNumberAddHtml .plateNumberAddBtnOk").click(function () {
            $(".plateNumberAddHtml").css("display", "none");
            var html = "";
            html +='<li>'+
                '<div>'+
                '<div class="plateNumberProvince"><span>山东</span></div>'+
                '<div class="plateNumberProvinceCode"><span>京</span></div>'+
                '<div class="plateNumberCity"><span>朝阳区</span></div>'+
                '<div class="plateNumberCityCode"><span>A</span></div>'+
                '<div class="plateNumberEnglish"><span>beijing</span></div>'+
                '<div class="plateNumberLine"><span>1</span></div>'+
                '<div>'+
                '<a href="##" class="plateNumberEdit"><span class="fa fa-edit"></span>编辑</a>'+
                '<a href="##" class="delete"><span class="plateNumberRemove"></span>删除</a>'+
                '</div>'+
                '</div>'+
                '</li>';

            $(".plateNumberList>ul").append(html);
        });

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


























