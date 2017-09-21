(function () {

    /*自适应屏幕*/
    (function(){
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
    })()

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

    /*车辆品牌设置*/
    (function(){
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
    })();


    /*                      代理厂商                      */
    (function(){
        $(window).ready(function () {
            $(".agencyList>ul>li").show()
        });
        /*添加厂商的筛选*/
        var agencyName=$(".agencyList>ul>li>div>div>span");
        $('.proxy').bind('input propertychange', function() {
            var proxyData=$(".proxy").val();
            var lis=$(".agencyList>ul>li").length;
            for(var i=0;i<lis;i++){
                $(".agencyList>ul>li").hide().filter(":contains('" + proxyData + "')").show();
            }
        });
        //下拉搜索
        (function(){
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
            function changeF(){
                $(this).prev('input').val($(this).find("option:selected").text());
                $("#agencyAddTypeNum").css('display','none')
            }
            function focus(){
                $("#agencyAddTypeNum").css({"display":"block"});
            }
            function inputChagen(event){
                var select=$("#agencyAddTypeNum");
                select.html('');
                for(var i=0;i<tempArr.length;i++){
                    //如果找到已txt的内容开头的。添加option
                    if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
                        var option = $("<option></option>").text(tempArr[i]);
                        select.append(option);
                    }
                }
            }
            $('#agencyAddMakeupCo').on("click",focus);
            $('#agencyAddMakeupCo').on("input",inputChagen);
            $('#agencyAddTypeNum').on("change",changeF);
        })()

        /*添加*/
        $(".agencyAdd>div>a").click(function(){
            $(".agencyAddHtml").css({display:"block"})
        });
        /*取消添加直接关闭*/
        $('.agencyUndoAdd').click(function(){
            $(".agencyAddHtml").css({display:"none"});
            $('.agencyRedact').css({display:"none"})
        });
        /*确认添加拼接字符串添加进去*/
        $('.agencyAddBtnOk').click(function(){
            $(".agencyAddHtml").css({display:"none"});
            var str='';
            str+='<li>';
            str+='<div>';
            str+='<div><span>东风</span></div>';
            str+='<div><img src="img/basic/baolong.jpg" alt=""/></div>';
            str+='<div>';
            str+='<a href="##" class="agencyEdit"><span class="fa fa-edit"></span>编辑</a>';
            str+='<a href="##" class="delete"><span class="agencyRemove"></span>删除</a>';
            str+='</div>';
            str+='</div>';
            str+='</li>';
            console.log(str);
            $('.agencyList>ul').append(str);
        });

        /*编辑厂商*/
        $('.agencyList>ul').on("click",".agencyEdit",function(){
            $(".agencyRedact").css({display:"block"})
        });
        /*删除厂商*/
        $('.agencyList>ul').on("click",".delete",function(){
            if(confirm("确认删除此厂商？")){
                $(this).parent().parent().parent().remove()
            }
        });
        /*确认编辑厂商*/
        $('.agencyEdit').click(function(){
            $(".agencyRedact").css({display:"none"})
        });

            //编辑厂商的下拉
        var tempArr=[];//储存option
        $(function(){
            //现将数据存入数组
            $('#agencyRedactTypeNum option').each(function(index,ele){
                tempArr[index]=$(this).text();
            });
            $(document).bind("click",function(e){
                var e=e||window.event;
                var elem= e.target|| e.srcElement;
                while(elem){
                    if(elem.id&&(elem.id=='agencyRedactTypeNum'||elem.id=='agencyRedactMakeupCo')){
                        return;
                    }
                    elem =elem.parentNode;
                }
                $("#agencyRedactTypeNum").css('display','none')
            })
        });

        //更换文字
        function changeF(){
            $(this).prev('input').val($(this).find("option:selected").text());
            $("#agencyRedactTypeNum").css('display','none')
        }
        function focus(){
            $("#agencyRedactTypeNum").css({"display":"block"});
        }
        function inputChagen(event){
            var select=$("#agencyRedactTypeNum");
            select.html('');
            for(var i=0;i<tempArr.length;i++){
                //如果找到已txt的内容开头的。添加option
                if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
                    var option = $("<option></option>").text(tempArr[i]);
                    select.append(option);
                }
            }
        }
        $('#agencyRedactMakeupCo').on("click",focus);
        $('#agencyRedactMakeupCo').on("input",inputChagen);
        $('#agencyRedactTypeNum').on("change",changeF);
    })()

    /*                      车系列表                       */
    function Amg(){
            //筛选
            $(window).ready(function () {
                $(".AMGList>ul>li").show()
            });
            /*添加厂商的筛选*/
            var agencyName=$(".AMGList>ul>li>div>div>span");
            $('.AMGProxy').bind('input propertychange', function() {
                var proxyData=$(".AMGProxy").val();
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
                $(".AmgRedact").css("display","block")
            });

            //redact undoAdd
            $(".AmgRedactBtn .AmgUndoAdd").click(function(){
                $(".AmgRedact").css("display","none")
            });

            //redact addOK
            $(".AmgRedactBtn .AmgRedactBtnOk").click(function(){
                $(".AmgRedact").css("display","none")
            });

            //addHtml undoAdd
            $(".AmgAddHtml .agencyUndoAdd").click(function(){
                $(".AmgAddHtml").css("display","none")
            });

            //addHtml addOK
            $(".AmgAddHtml .AmgAddBtnOk").click(function(){
                $(".AmgAddHtml").css("display","none");
                var html="";
                html+='<li>'+
                '<div>'+
                '<div class="AMGName"><span>沃尔沃</span></div>'+
                 '<div><span>德国宝马</span></div>'+
                '<div><img src="img/basic/bj.jpg" alt=""/></div>'+
                '<div>'+
                ' <a href="##" class="AMGEdit"><span class="fa fa-edit"></span>编辑</a>'+
                ' <a href="##" class="delete"><span class="AMGRemove"></span>删除</a>'+
                '</div>'+
                '</div>'+
                '</li>';
                $(".AMGList>ul").append(html);
            });

            //添加车系
            $(".AMGAdd>div>a").click(function(){
                $(".AmgAddHtml").css("display","block")
            });
        function AmgRedactHtml(){
            var tempArr=[];//储存option
            $(function(){
                //现将数据存入数组
                $('#AmgRedactTypeNum option').each(function(index,ele){
                    tempArr[index]=$(this).text();
                });
                $(document).bind("click",function(e){
                    var e=e||window.event;
                    var elem= e.target|| e.srcElement;
                    while(elem){
                        if(elem.id&&(elem.id=='AmgRedactTypeNum'||elem.id=='AmgRedactMakeupCo')){
                            return;
                        }
                        elem =elem.parentNode;
                    }
                    $("#AmgRedactTypeNum").css('display','none')
                })
            });

            //更换文字
            function changeF(){
                $(this).prev('input').val($(this).find("option:selected").text());
                $("#AmgRedactTypeNum").css('display','none')
            }
            function focus(){
                $("#AmgRedactTypeNum").css({"display":"block"});
            }
            function inputChagen(event){
                var select=$("#AmgRedactTypeNum");
                select.html('');
                for(var i=0;i<tempArr.length;i++){
                    //如果找到已txt的内容开头的。添加option
                    if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
                        var option = $("<option></option>").text(tempArr[i]);
                        select.append(option);
                    }
                }
            }
            $('#AmgRedactMakeupCo').on("click",focus);
            $('#AmgRedactMakeupCo').on("input",inputChagen);
            $('#AmgRedactTypeNum').on("change",changeF);
        }
        AmgRedactHtml();
        function AmgAddHtml(){
            var tempArr=[];//储存option
            $(function(){
                //现将数据存入数组
                $('#AmgAddTypeNum option').each(function(index,ele){
                    tempArr[index]=$(this).text();
                });
                $(document).bind("click",function(e){
                    var e=e||window.event;
                    var elem= e.target|| e.srcElement;
                    while(elem){
                        if(elem.id&&(elem.id=='AmgAddTypeNum'||elem.id=='AmgAddMakeupCo')){
                            return;
                        }
                        elem =elem.parentNode;
                    }
                    $("#AmgAddTypeNum").css('display','none')
                })
            });

            //更换文字
            function changeF(){
                $(this).prev('input').val($(this).find("option:selected").text());
                $("#AmgAddTypeNum").css('display','none')
            }
            function focus(){
                $("#AmgAddTypeNum").css({"display":"block"});
            }
            function inputChagen(event){
                var select=$("#AmgAddTypeNum");
                select.html('');
                for(var i=0;i<tempArr.length;i++){
                    //如果找到已txt的内容开头的。添加option
                    if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
                        var option = $("<option></option>").text(tempArr[i]);
                        select.append(option);
                    }
                }
            }
            $('#AmgAddMakeupCo').on("click",focus);
            $('#AmgAddMakeupCo').on("input",inputChagen);
            $('#AmgAddTypeNum').on("change",changeF);
        }
        AmgAddHtml();





    }
    Amg();

})();








var tempArr=[];//储存option
function temp(id1,id2){
    //现将数据存入数组
    $('#'+id1+' option').each(function(index,ele){
        tempArr[index]=$(this).text();
    });
    $(document).bind("click",function(e){
        var e=e||window.event;
        var elem= e.target|| e.srcElement;
        while(elem){
            if(elem.id&&(elem.id==''+id1+''||elem.id==''+id2+'')){
                return;
            }
            elem =elem.parentNode;
        }
        $("#"+id1+"").css('display','none')
    })
}
var typeNum='AmgAddTypeNum';
var code='AmgAddMakeupCo';
temp(typeNum,code);

//更换文字
function changeF(id){
    $(this).prev('input').val($(this).find("option:selected").text());
    $("#AmgAddTypeNum").css('display','none')
}
;
function focus(){
    $("#AmgAddTypeNum").css({"display":"block"});
}
function inputChagen(event){
    var select=$("#AmgAddTypeNum");
    select.html('');
    for(var i=0;i<tempArr.length;i++){
        //如果找到已txt的内容开头的。添加option
        if(tempArr[i].substring(0,$(this).val().length).indexOf($(this).val())==0){
            var option = $("<option></option>").text(tempArr[i]);
            select.append(option);
        }
    }
}
$('#AmgAddMakeupCo').on("click",focus);
$('#AmgAddMakeupCo').on("input",inputChagen);
$('#AmgAddTypeNum').on("change",changeF(typeNum));

















