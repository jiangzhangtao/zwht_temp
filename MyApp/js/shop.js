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
    function shopList(){



        $('.shopRepertory>button').click(function(){
            $('.shopInventory').css({display:"block"});
            $('.shopInfoLock').css({display:"none"})
        });

        //库存列表返回
        $('.comeBack>button').click(function(){
            $('.shopInventory').css({display:"none"});
            $('.shopInfoLock').css({display:"block"})
        });

        //确定关闭详细窗口
        $('.shopOk').click(function(){
            $('.shopInfo').css({display:"none"})
        });

        //查看门店信息
        $('.shopList>ul').on('click',".shopEdit",function(){
            $('.shopInfo').css({display:"block"});
            $('.shopInfoLock').css({display:"block"})
        });
        //停业与正常的切换
        $('.shopStatus').click(function(){
            if($(this).attr("data-id")==1){
                $(this).attr("data-id",2);
                $('.state>div>p>span').html('正常');
                $(this).html('停业');
            }else{
                $(this).attr("data-id",1);
                $('.state>div>p>span').html('停业');
                $(this).html('恢复')
            }
        });
        //查看评论
        $('.shopReview').click(function(){
            $('.shopInfoLock').css({display:"none"});
            $('.shopInfoDiscuss').css({display:"block"})
        });
        //评论页面返回上一页
        $('.shopDiscussComeBack>button').click(function(){
            $('.shopInfoDiscuss').css({display:"none"});
            $('.shopInfoLock').css({display:"block"})
        })

    }

    /*                   门店类别                      */
    function storeCategory(){


        //添加类别
        $('.storeCategoryListAdd a').click(function(){
            $('.storeCategoryAdd').css({display:"block"})
        });
        //确认添加
        $('.storeCategoryAddBtnOk').click(function(){
            $('.storeCategoryAdd').css({display:"none"});
            var html="";
            html+='<li>'+
                '<div>'+
                '<div><span>1</span></div>'+
                '<div><span>快修</span></div>'+
                '<div><span>2014-12-23 13:33:22</span></div>'+
                '<div>'+
                '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>'+
                '<a href="##" class="delete"><span class="storeCategoryRemove"></span>删除</a>'+
                '</div>'+
                '</div>'+
                '</li>';
            $('.storeCategoryList>ul').append(html)
        });
        //取消添加
        $('.storeCategoryUndoAdd').click(function(){
            $('.storeCategoryAdd').css({display:"none"})
        });
        //编辑类别
        $('.storeCategoryList>ul').on('click','.storeCategoryEdit',function(){
            $('.storeCategoryRedact').css({display:"block"})
        });
        //取消编辑
        $('.storeCategoryUndoRedact').click(function(){
            $('.storeCategoryRedact').css({display:"none"})
        });
        //确定编辑
        $('.storeCategoryRedactBtnOk').click(function(){
            $('.storeCategoryRedact').css({display:"none"})
        })
    }

    /*                    合作项目                     */
    function cooperative(){
        $('.cooperativeList>ul').on('click',"button",function(){
            $('.cooperativeListServer').css({display:"block"})
        });
        $('.storeCategoryRedactBtnOk').click(function(){
            $('.cooperativeListServer').css({display:"none"})
        })
    }
    cooperative();
    storeCategory();
    shopList();
})();


























