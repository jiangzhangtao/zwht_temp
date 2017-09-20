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
        $(".addHtml").css("display","none");
        var html="";
        html+='<li>'+
            '<div>'+
                ' <div><span>宝骏</span></div>'+
                '<div><img src="img/basic/bj.jpg" alt=""/></div>'+
                '<div class="sifting"><span>B</span></div>'+
                '<div>'+
                    ' <a href="##" class="vehicleBrandEdit"><span class="fa fa-edit"></span>编辑</a>'+
                    ' <a href="##" class="delete"><span class="vehicleBrandRemove"></span>删除</a>'+
                '</div>'+
            '</div>'+
            '</li>';
        $(".vehicleBrandList>ul").append(html);
    });

    //添加分类
    $(".vehicleBrandAdd>div>a").click(function(){
        $(".addHtml").css("display","block")
    });


    /*                      代理厂商                      */
    $(window).ready(function () {
        $(".agencyList>ul>li").show()
    });
        //筛选
    var agencyName=$(".agencyList>ul>li>div>div>span");
    $('.proxy').bind('input propertychange', function() {
        var proxyData=$(".proxy").val();
        var lis=$(".agencyList>ul>li").length;
        for(var i=0;i<lis;i++){
            $(".agencyList>ul>li").hide().filter(":contains('" + proxyData + "')").show();
        }
    });
    //下拉搜索
    var tempArr=[];//储存option
    $(function(){
        //现将数据存入数组
        $('#agencyAddTypeNum option').each(function(index,ele){
            tempArr[index]=$(this).text();
        });
        $(document).bind("click",function(e){
            var e=e||window.event;
            var elem= e.target|| e.srcElement;
            while(elem){
                if(elem.id&&(elem.id=='agencyAddTypeNum'||elem.id=='agencyAddMakeupCo')){
                    return;
                }
                elem =elem.parentNode;
            }
            $("#agencyAddTypeNum").css('display','none')
        })
    });
            //更换文字
    function changeF(this_){
        $(this).prev('input').val($(this).find("option:selected").text());
        $("#agencyAddTypeNum").css('display','none')
    }
    function focus(){
        $("#agencyAddTypeNum").css({"display":"block"});
        //var select=$("#agencyAddTypeNum");
        //for(var i=0;i<tempArr.length;i++){
        //    var option=$("<option></option>").text(tempArr[i]);
        //    select.append(option)
        //}
    }
    function inputChagen(){
        $("#agencyAddTypeNum").css('display',"block");
        var select=$("#agencyAddTypeNum");
        console.log($(this).val())
        select.html('');
        for(var i=0;i<tempArr.length;i++){
            console.log($(this).val())
            //如果找到已txt的内容开头的。添加option
            if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
                var option = $("<option></option>").text(tempArr[i]);
                select.html(option);
            }else{
                console.log("no");
                var option = $("<option></option>").text(tempArr[i]);
                select.append(option);
            }
        }
    }
    $('#agencyAddMakeupCo').on("click",focus);
    $('#agencyAddMakeupCo').on("keyup",inputChagen);

    $('#agencyAddTypeNum').on("change",changeF);
})();