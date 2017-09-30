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
        $(".menu").css({
            height: detailsHeight + navigationHeight
        });
    });

    /*                  轮胎总表                      */
   function tire(){
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
   }

    /*                  品牌列表                      */
    function brand(){
        //tianjia
        $('.brandAdd').click(function(){
            $('.brandListAdd').css({display:"block"})
        });
        //确认添加
        $('.brandListAddBtnOk').click(function(){
            $('.brandListAdd').css({display:"none"});
            var html='';
            html+='  <li>'+
                ' <div>'+
                '<div class="brandName"><span>五菱</span></div>'+
                ' <div><span>LANVIGATO2013</span></div>'+
                '<div><span>2013-1-2</span></div>'+
                '<div>'+
                '<a href="##" class="brandEdit"><span class="fa fa-edit"></span>编辑</a>'+
                ' <a href="##" class="delete"><span class="brandRemove"></span>删除</a>'+
                '</div>'+
                '</div>'+
                '</li>';
            $('.brandList>ul').append(html)
        });

        //取消添加
        $('.brandUndoAdd').click(function(){
            $('.brandListAdd').css({display:"none"});
        });
        //编辑
        $('.brandEdit').click(function(){
            $('.brandListRedact').css({display:"block"})
        });
        //确认编辑
        $('.brandListRedactBtnOk').click(function(){
            $('.brandListRedact').css({display:"none"})
        });
        $('.brandListUndoRedact').click(function(){
            $('.brandListRedact').css({display:"none"})
        });

        $(".brandList>ul").on("click",".delete",function(e){
            e.preventDefault();
           if(confirm("确认删除")){
               $(this).parent().parent().parent().remove();
           }
        });
    }

    /*                  负荷指数                     */
    function load(){
        //tianjia
        $('.loadAdd').click(function(){
            $('.loadListAdd').css({display:"block"})
        });
        //确认添加
        $('.loadListAddBtnOk').click(function(){
            $('.loadListAdd').css({display:"none"});
            var html='';
            html+='  <li>'+
            ' <div>'+
            '<div ><span>1</span></div>'+
            '<div><span>61</span></div>'+
            '<div><span>最大载重425</span></div>'+
            '<div>'+
            '<a href="##" class="brandEdit"><span class="fa fa-edit"></span>编辑</a>'+
            ' <a href="##" class="delete"><span class="loadRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '</li>';
            $('.loadList>ul').append(html)
        });

        //取消添加
        $('.loadUndoAdd').click(function(){
            $('.loadListAdd').css({display:"none"});
        });
        //编辑
        $('.loadEdit').click(function(){
            $('.loadListRedact').css({display:"block"})
        });
        //确认编辑
        $('.loadListRedactBtnOk').click(function(){
            $('.loadListRedact').css({display:"none"})
        });
        $('.loadListUndoRedact').click(function(){
            $('.loadListRedact').css({display:"none"})
        });

        $(".loadList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }

    /*                  速度级别                     */
    function speed(){
        //tianjia
        $('.speedAdd').click(function(){
            $('.speedListAdd').css({display:"block"})
        });
        //确认添加
        $('.speedListAddBtnOk').click(function(){
            $('.speedListAdd').css({display:"none"});
            var html='';
            html+='  <li>'+
            ' <div>'+
            '<div ><span>1</span></div>'+
            '<div><span>61</span></div>'+
            '<div><span>最大载重425</span></div>'+
            '<div>'+
            '<a href="##" class="brandEdit"><span class="fa fa-edit"></span>编辑</a>'+
            ' <a href="##" class="delete"><span class="loadRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '</li>';
            $('.speedList>ul').append(html)
        });

        //取消添加
        $('.speedUndoAdd').click(function(){
            $('.speedListAdd').css({display:"none"});
        });
        //编辑
        $('.speedEdit').click(function(){
            $('.speedListRedact').css({display:"block"})
        });
        //确认编辑
        $('.speedListRedactBtnOk').click(function(){
            $('.speedListRedact').css({display:"none"})
        });
        $('.speedListUndoRedact').click(function(){
            $('.speedListRedact').css({display:"none"})
        });

        $(".speedList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }

    /*                  花纹名称                     */
    function figure(){
        //tianjia
        $('.figureAdd').click(function(){
            $('.figureListAdd').css({display:"block"})
        });
        //确认添加
        $('.figureListAddBtnOk').click(function(){
            $('.figureListAdd').css({display:"none"});
            var html='';
            html+='  <li>'+
            ' <div>'+
            '<div ><span>1</span></div>'+
            '<div><span>61</span></div>'+
            '<div><span>最大载重425</span></div>'+
            '<div>'+
            '<a href="##" class="figureEdit"><span class="fa fa-edit"></span>编辑</a>'+
            ' <a href="##" class="delete"><span class="figureRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '</li>';
            $('.figureList>ul').append(html)
        });

        //取消添加
        $('.figureUndoAdd').click(function(){
            $('.figureListAdd').css({display:"none"});
        });
        //编辑
        $('.figureEdit').click(function(){
            $('.figureListRedact').css({display:"block"})
        });
        //确认编辑
        $('.figureListRedactBtnOk').click(function(){
            $('.figureListRedact').css({display:"none"})
        });
        $('.figureListUndoRedact').click(function(){
            $('.figureListRedact').css({display:"none"})
        });

        $(".figureList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }

    /*                  花纹属性                     */
    function stripe(){
        //查看详细描述信息
        $('.stripeList>ul').on('mouseover',".description>span>button",function(e){
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display:"block"
            })
        });
        $('.stripeList>ul').on('mouseout',".description>span>button",function(e){
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display:"none"
            })
        });

        //
        //tianjia
        $('.stripeAdd').click(function(){
            $('.stripeListAdd').css({display:"block"})
        });
        //确认添加
        $('.stripeListAddBtnOk').click(function(){
            $('.stripeListAdd').css({display:"none"});
            var html='';
            html+='  <li>'+
            ' <div>'+
            '<div ><span>1</span></div>'+
            '<div><span>百边复古</span></div>'+
            '<div><img src="../img/tireSet/stripe-01.jpg" alt=""/></div>'+
            '<div class="description">'+
            '<span><button>查看描述</button></span>'+
            '</div>'+
            '<div>'+
            '<a href="##" class="stripeEdit"><span class="fa fa-edit"></span>编辑</a>'+
            '<a href="##" class="delete"><span class="stripeRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '<div class="stripeInfo">'+
            '<span>123alkajsdjalksjdlkasjdksaljdkaljsdlk</span>'+
            '</div>'+
            '</li>';
            $('.stripeList>ul').append(html)
        });

        //取消添加
        $('.stripeListUndoAdd').click(function(){
            $('.stripeListAdd').css({display:"none"});
        });
        //编辑
        $('.stripeEdit').click(function(){
            $('.stripeListRedact').css({display:"block"})
        });
        //确认编辑
        $('.stripeListRedactBtnOk').click(function(){
            $('.stripeListRedact').css({display:"none"})
        });
        $('.stripeListUndoRedact').click(function(){
            $('.stripeListRedact').css({display:"none"})
        });

        $(".stripeList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }

    /*                  胎侧类型                     */
    function sidewall(){
        //tianjia
        $('.sidewallAdd').click(function(){
            $('.sidewallListAdd').css({display:"block"})
        });
        //确认添加
        $('.sidewallListAddBtnOk').click(function(){
            $('.sidewallListAdd').css({display:"none"});
            var html='';
            html+='<li>'+
            '<div>'+
            '<div class="sidewallName"><span>1</span></div>'+
            '<div><span>BBW</span></div>'+
            '<div><span>2013-1-2 12:22:11</span></div>'+
            '<div>'+
            '<a href="##" class="sidewallEdit"><span class="fa fa-edit"></span>编辑</a>'+
            '<a href="##" class="delete"><span class="sidewallRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '</li>';
            $('.sidewallList>ul').append(html)
        });

        //取消添加
        $('.sidewallUndoAdd').click(function(){
            $('.sidewallListAdd').css({display:"none"});
        });
        //编辑
        $('.sidewallEdit').click(function(){
            $('.sidewallListRedact').css({display:"block"})
        });
        //确认编辑
        $('.sidewallListRedactBtnOk').click(function(){
            $('.sidewallListRedact').css({display:"none"})
        });
        $('.sidewallListUndoRedact').click(function(){
            $('.sidewallListRedact').css({display:"none"})
        });

        $(".sidewallList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }

    /*                  模具标识                     */
    function module(){
        //tianjia
        $('.mouldAdd').click(function(){
            $('.mouldListAdd').css({display:"block"})
        });
        //确认添加
        $('.mouldListAddBtnOk').click(function(){
            $('.mouldListAdd').css({display:"none"});
            var html='';
            html+='<li>'+
            '<div>'+
            '<div class="mouldName"><span>1</span></div>'+
            '<div><span>BBW</span></div>'+
            '<div><span>2013-1-2 12:22:11</span></div>'+
            '<div>'+
            '<a href="##" class="mouldEdit"><span class="fa fa-edit"></span>编辑</a>'+
            '<a href="##" class="delete"><span class="mouldRemove"></span>删除</a>'+
            '</div>'+
            '</div>'+
            '</li>';
            $('.sidewallList>ul').append(html)
        });

        //取消添加
        $('.mouldUndoAdd').click(function(){
            $('.mouldListAdd').css({display:"none"});
        });
        //编辑
        $('.mouldEdit').click(function(){
            $('.mouldListRedact').css({display:"block"})
        });
        //确认编辑
        $('.mouldListRedactBtnOk').click(function(){
            $('.mouldListRedact').css({display:"none"})
        });
        $('.mouldListUndoRedact').click(function(){
            $('.mouldListRedact').css({display:"none"})
        });

        $(".mouldList>ul").on("click",".delete",function(e){
            e.preventDefault();
            if(confirm("确认删除")){
                $(this).parent().parent().parent().remove();
            }
        });
    }
    module();
    sidewall();
    stripe();
    figure();
    speed();
    load();
    brand();
    tire()
})();


























