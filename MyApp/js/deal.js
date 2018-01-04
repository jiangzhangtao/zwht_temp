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
        $("#" + this_id + "").css({ "display": "block" });
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




    /*                     用户协议列表                    */
    function system() {

        //    加红
        $("#addRed").click(function () {
            var targetVal = $("#textEdit").val();
            $("#textEdit").val(targetVal + "<red><\/red>");
            $("#textEdit").focus();
            targetVal = $("#textEdit").val();
            document.getElementById("textEdit").setSelectionRange(targetVal.length, targetVal.length - 6);
        });
        //    加粗
        $("#addB").click(function () {
            var targetVal = $("#textEdit").val();
            $("#textEdit").val(targetVal + "<b><\/b>");
            $("#textEdit").focus();
            targetVal = $("#textEdit").val();
            document.getElementById("textEdit").setSelectionRange(targetVal.length, targetVal.length - 4);
        });
        //    加标题
        $("#addTit").click(function () {
            var targetVal = $("#textEdit").val();
            $("#textEdit").val(targetVal + "\r<til><\/til>");
            $("#textEdit").focus();
            targetVal = $("#textEdit").val();
            document.getElementById("textEdit").setSelectionRange(targetVal.length, targetVal.length - 6);
        }); 

        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminDeal/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var text;
                    $('.system .systemText>textarea').val(data.data[0].content.split('<br>'));
                    $('.system .systemVersions input').val(data.data[0].head_url);
                    $('.system .titleUrl').html(data.data[0].head_url);
                    //解析
                    var html = "";
                    html = data.data[0].content.replace(/<til>(.*)<\/til>/ig, function (word, $1, position) {

                        if (position == 0) {
                            return "<div class='tit'>" + $1 + "</div>";
                        } else {
                            return "<classify><div class='tit'>" + $1 + "</div>";
                        }
                    });
                    // console.log(html);
                    //切分模块
                    var classIfyArr = html.split("<classify>");
                    // console.log(classIfyArr);
                    var agreementHtml = "";
                    for (var i = 0; i < classIfyArr.length; i++) {
                        agreementHtml += "<div class='classify'>";
                        //每一个模块
                        var one = classIfyArr[i];
                        //加入模块标题
                        agreementHtml += one.split("</\div>")[0] + "</div>";
                        //   console.log(one);
                        // 按模块切分段落
                        classIfyContent = one.split("</\div>")[1].split("<br>");
                        // console.log(classIfyContent);
                        var classIfyContentHtml = "";
                        for (var subI = 0; subI < classIfyContent.length; subI++) {
                            var subOne = classIfyContent[subI];
                            if (subOne) {
                                classIfyContentHtml += "<p>";
                                subOne = subOne.replace(/<red>(.*)<\/red>/ig, function (subWord, $1) {
                                    // console.log(subWord,$1);
                                    return "<span>" + $1 + "</span>";
                                });
                                // console.log(subOne);
                                classIfyContentHtml += subOne;
                                classIfyContentHtml += "</p>";
                            }
                        }
                        //加入模块段落内容
                        agreementHtml += classIfyContentHtml;
                        agreementHtml += "</div>";
                    }
                    $("#ponyAgreementPage>.agreementBody>.detail").html(agreementHtml);
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        $('.systemButton').click(function () {
            var content = $('.system .systemText>textarea').val().replace(/[\n\r]+/ig, '<br>');
            var head_url = $('.system .systemVersions input').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminDeal/edit',
                data: {
                    admin_id: admin_id,
                    token: token,
                    deal_id: 1,
                    head_url: head_url,
                    content: content
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data)
                        alert('修改成功')
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
        })


    }

    // 商家协议
    function merchant() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminDeal/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var text;
                    $('.merchant .systemText>textarea').val(data.data[1].content.split('<br>'));
                    $('.merchant .systemVersions input').val(data.data[1].head_url);
                    $('.merchant .titleUrl').html(data.data[1].head_url);
                    //解析
                    var html = "";
                    html = data.data[1].content.replace(/<til>(.*)<\/til>/ig, function (word, $1, position) {

                        if (position == 0) {
                            return "<div class='tit'>" + $1 + "</div>";
                        } else {
                            return "<classify><div class='tit'>" + $1 + "</div>";
                        }
                    });
                    // console.log(html);
                    //切分模块
                    var classIfyArr = html.split("<classify>");
                    // console.log(classIfyArr);
                    var agreementHtml = "";
                    for (var i = 0; i < classIfyArr.length; i++) {
                        agreementHtml += "<div class='classify'>";
                        //每一个模块
                        var one = classIfyArr[i];
                        //加入模块标题
                        agreementHtml += one.split("</\div>")[0] + "</div>";
                        //   console.log(one);
                        // 按模块切分段落
                        classIfyContent = one.split("</\div>")[1].split("<br>");
                        // console.log(classIfyContent);
                        var classIfyContentHtml = "";
                        for (var subI = 0; subI < classIfyContent.length; subI++) {
                            var subOne = classIfyContent[subI];
                            if (subOne) {
                                classIfyContentHtml += "<p>";
                                subOne = subOne.replace(/<red>(.*)<\/red>/ig, function (subWord, $1) {
                                    // console.log(subWord,$1);
                                    return "<span>" + $1 + "</span>";
                                });
                                // console.log(subOne);
                                classIfyContentHtml += subOne;
                                classIfyContentHtml += "</p>";
                            }
                        }
                        //加入模块段落内容
                        agreementHtml += classIfyContentHtml;
                        agreementHtml += "</div>";
                    }
                    $("#merchantPage>.agreementBody>.detail").html(agreementHtml);
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        $('.merchantButton').click(function () {
            var content = $('.merchant .systemText>textarea').val().replace(/[\n\r]+/ig, '<br>');
            var head_url = $('.merchant .systemVersions input').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminDeal/edit',
                data: {
                    admin_id: admin_id,
                    token: token,
                    deal_id: 2,
                    head_url: head_url,
                    content: content
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data)
                        alert('修改成功')
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
        })
   //    加红
   $("#merchantaddRed").click(function () {
    var targetVal = $("#merchantTextEdit").val();
    $("#merchantTextEdit").val(targetVal + "<red><\/red>");
    $("#merchantTextEdit").focus();
    targetVal = $("#merchantTextEdit").val();
    document.getElementById("merchantTextEdit").setSelectionRange(targetVal.length, targetVal.length - 6);
});
//    加粗
$("#merchantaddB").click(function () {
    var targetVal = $("#merchantTextEdit").val();
    $("#merchantTextEdit").val(targetVal + "<b><\/b>");
    $("#merchantTextEdit").focus();
    targetVal = $("#merchantTextEdit").val();
    document.getElementById("merchantTextEdit").setSelectionRange(targetVal.length, targetVal.length - 4);
});
//    加标题
$("#merchantaddTit").click(function () {
    var targetVal = $("#merchantTextEdit").val();
    $("#merchantTextEdit").val(targetVal + "\r<til><\/til>");
    $("#merchantTextEdit").focus();
    targetVal = $("#merchantTextEdit").val();
    document.getElementById("merchantTextEdit").setSelectionRange(targetVal.length, targetVal.length - 6);
}); 

    }
    merchant();
    system();
})();
