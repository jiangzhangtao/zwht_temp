(function () {

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var detailsHeight = $('.details').innerHeight();
        var navigationHeight = $(".navigation").innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        $(".menu").css({
            height: bodyHeight - logoHeight-1,
            minHeight: bodyHeight - logoHeight-1
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
        var windowHeight = $(document.body).innerHeight();
        var logoHeight = $('.header').innerHeight();
        $(".menu").css({
            height: detailsHeight + navigationHeight
        });
    });

    /*                  轮胎总表                      */

var that='';
    $('.tireList>ul').on('click','li',function(e){
        e.preventDefault();
        var mouseX= e.clientX+3;
        var mouseY= e.clientY+3;
        $('.listRedact>div').css({
            display:"block",
            top:mouseY,
            left:mouseX
        });
        $('.listRedact').css({
            display:"block"
        });
        that=$(this);

    });
    /*删除*/
    $('.tireList').on('click','.tireListRemove',function(){
        if(confirm('确认删除？')){
            that.remove()
        }
    });
    /*编辑*/
    $('.listRedact').click(function(){
        $('.listRedact>div').css({
            display:"none"
        });
        $('.listRedact').css({
            display:"none"
        });
        $('.tireListRedact').css({display:"block"})
    });

    //取消编辑
    $('.tireListUndoRedact').click(function(){
        $('.tireListRedact').css({display:"none"})
    });
    //确认编辑
    $('.tireListRedactBtnOk').click(function(){
        $('.tireListRedact').css({display:"block"})
    });

    //添加
    $('.tireAdd').click(function(){
        $('.tireListAdd').css({display:"block"})
    });
    //取消
    $('.tireListUndoAdd').click(function(){
        $('.tireListAdd').css({display:"none"})
    });
    //确认
    $('.tireListAddBtnOk').click(function(){
        $('.tireListAdd').css({display:"none"});
        var html='';
        html+='<li>'+
            '<div>'+
            '<div><span>LanYi4</span></div>'+
            '<div><span>PCR</span></div>'+
            '<div><span>165/70RJ</span></div>'+
            "<div><span>'165</span></div>"+
            '<div><span>13</span></div>'+
            '<div><span>79</span></div>'+
            '<div><span>T</span></div>'+
            '<div><span>XL</span></div>'+
            '<div><span>CATCHGRE GT100</span></div>'+
            '<div><span>经济节油</span></div>'+
            '<div><span>BSW</span></div>'+
            '<div><span>5J</span></div>'+
            '</div>'+
            '</li>';
        $('.tireList>ul').append(html)
    })
})();


























