(function () {
    var admin_id = sessionStorage['admin_id'];
    var token = sessionStorage['token'];
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
            minHeight: 810+'px'
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
    }

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

    /*                     系统充值列表                    */
    function system() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminShare/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    // console.log(data)
                    if (data.data) {
                        var html = '';
                        html += '<li data-id="'+data.data.id+'">' +
                        '<div>' +
                        '<div class="filterOrder"><span>' + data.data.url + '</span></div>' +
                        '<div><span class="recharge_value">' + data.data.title + '</span></div>' +
                        '<div><button class="lock">查看内容</button></div>' +
                        '<div>' +
                        '<a href="##" class="systemEdit"><span class="fa fa-edit"></span>编辑</a>' +
                        '</div>' +
                        '</div>' +
                        ' <div class="contentDetail">'+data.data.content+'</div>'+
                        '</li>';
            
                        $('.systemList>ul').html(html);
                        //编辑
                        $('.systemList>ul').on('click', '.systemEdit', function (e) {
                            e.preventDefault();
                            var that = this;
                            $('.systemReact').css({display: "block"});
                            var share_id = $(this).parent().parent().parent().attr('data-id');
                            $.ajax({
                                type:'post',
                                url:'http://180.76.243.205:8383/_API/_adminShare/getList',
                                data:{
                                    admin_id:admin_id,
                                    token:token
                                },
                                success:function(data){
                                    if(data.code=='E0000'){
                                        $('.systemReact .url').val(data.data.url);
                                        $('.systemReact .title').val(data.data.title);
                                        $('.systemReact .textContent').val(data.data.content);
                                        $('.systemReact .img').attr('src',data.data.img);
                                    }else{
                                        alert(data.message);
                                    }
                                },
                                err:function(err){
                                    console.log(err);
                                }
                            });
                       
                            document.getElementsByClassName('systemReactBtnOk')[0].onclick = function () {
                                var fData = new FormData(document.getElementById('share'));
                                fData.append('admin_id',admin_id);
                                fData.append('share_id',share_id);
                                fData.append('token',token);
                                $.ajax({
                                    type: 'post',
                                    processData: false,
                                    contentType: false,
                                    url: 'http://180.76.243.205:8383/_API/_adminShare/edit',
                                    data: fData,
                                    success: function (data) {
                                        if (data.code == 'E0000') {
                                            // console.log(data)
                                            alert('修改成功');
                                           $('.contentDetail').html($('.textContent').val());
                                           $('.recharge_value').html($('.title').val());
                                           $('.filterOrder').html($('.url').val());
                                            $('.systemReact').css({display: "none"});
                                        } else {
                                            alert(data.message);
                                        }
                                    },
                                    err: function (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        })
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
      //图片更换
      $('.systemReact #file').change(function () {
        var file = this.files[0];
        if (file == null) {
            $(".img").attr('src', e.target.result);
            return;
        }
        var render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = function (e) {
            $(".img").attr('src', e.target.result);
        }
    });
        //查看内容
        $('.systemList>ul').on('mouseover','.lock',function(){
            $('.contentDetail').css({display: "block"})
        })
        $('.systemList>ul').on('mouseout','.lock',function(){
            $('.contentDetail').css({display: "none"})
        })
        //返回列表
        $('.systemReactUndoAdd').click(function () {
            $('.systemReact').css({display: "none"})
        });
    }
    system();
})();
