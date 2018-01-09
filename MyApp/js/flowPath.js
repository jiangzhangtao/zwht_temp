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


    /*                   轮胎服务流程                 */
    function flowPath() {
        var content = [];
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminFlow/getList',
            data: {
                admin_id: admin_id,
                token: token,
                type: 1
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html = '<li data-id="' + data.data[i].id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data[i].title + '</span></div>' +
                            '<div class="sStep"><span>' +data.data[i].step_no  + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data[i].content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.storeCategoryList>ul').append(html);
                            content.push(data.data[i].content);
                        }
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
        //查看详细描述信息
        $('.storeCategoryList>ul').on('mouseover', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "block"
            })
        });
        $('.storeCategoryList>ul').on('mouseout', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "none"
            })
        });
        //添加
        $('.cooperativeListAdd').click(function () {
            $('.storeCategoryAdd').css({
                display: "block"
            });
            document.getElementsByClassName('storeCategoryAddBtnOk')[0].onclick = function () {
                var title = $('.storeCategoryAdd .titleInput').val();
                var content = $('.storeCategoryAdd .contentText').val();
                var step_no = $('.storeCategoryAdd .stepInput').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        title: title,
                        content: content,
                        step_no: step_no,
                        flow_type: 1
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('添加成功');
                            var html = '';
                            html = '<li data-id="' + data.data.id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data.title + '</span></div>' +
                            '<div class="sStep"><span>' + data.data.step_no + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data.content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.storeCategoryList>ul').append(html);
                            $('.storeCategoryAdd').css({
                                display: "none"
                            });
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

            }

        });

        //取消添加
        $('.storeCategoryUndoAdd').click(function(){
            $('.storeCategoryAdd').css({
                display: "none"
            });
        });
        $('.storeCategoryUndoRedact').click(function(){
            $('.storeCategoryRedact').css({
                display: "none"
            });
        });
        //删除    
        $('.storeCategoryList>ul').on('click', '.delete', function (e) {
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            e.preventDefault();
            if (confirm('确定删除?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        flow_id: flow_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove()
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            }
        });

        //编辑
        $('.storeCategoryList>ul').on('click', '.storeCategoryEdit', function (e) {
            e.preventDefault();
            $('.storeCategoryRedact').css({display: "block"});
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that=this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminFlow/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    flow_id: flow_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.storeCategoryRedact .contentText').val(data.data.content);
                        $('.storeCategoryRedact .titleInput').val(data.data.title);
                        $('.storeCategoryRedact .stepInput').val(data.data.step_no);
                        document.getElementsByClassName('storeCategoryRedactBtnOk')[0].onclick = function () {
                            var content=$('.storeCategoryRedact .contentText').val();
                            var step_no=$('.storeCategoryRedact .stepInput').val();
                            var title=$('.storeCategoryRedact .titleInput').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminFlow/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    flow_id: flow_id,
                                    content:content,
                                    step_no:step_no,
                                    title:title,
                                    flow_type:1
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        $('.storeCategoryRedact').css({display: "none"});
                                        $(that).parent().siblings('.sTitle').children('span').html(data.data.title);
                                        $(that).parent().siblings('.sStep').children('span').html(data.data.step_no);
                                        $(that).parent().parent().siblings('.stripeInfo').children('span').html(data.data.content)
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                        }
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        });
    };

    /*                  轮胎更换流程                              */

    function tyreChange() {

        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminFlow/getList',
            data: {
                admin_id: admin_id,
                token: token,
                type:2
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html = '<li data-id="' + data.data[i].id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data[i].title + '</span></div>' +
                            '<div class="sStep"><span>' + data.data[i].step_no + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data[i].content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.severListList>ul').append(html);
                        }
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //查看详细描述信息
        $('.severListList>ul').on('mouseover', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "block"
            })
        });
        $('.severListList>ul').on('mouseout', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "none"
            })
        });

        //添加
        $('.severListAdd').click(function () {
            $('.tyreChangeAdd').css({
                display: "block"
            });
            document.getElementsByClassName('tyreChangeAddBtnOk')[0].onclick = function () {
                var title = $('.tyreChangeAdd .titleInput').val();
                var content = $('.tyreChangeAdd .contentText').val();
                var step_no = $('.tyreChangeAdd .stepInput').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        title: title,
                        content: content,
                        step_no: step_no,
                        flow_type: 2
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('添加成功');
                            var html = '';
                            html = '<li data-id="' + data.data.id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data.title + '</span></div>' +
                            '<div class="sStep"><span>' + data.data.step_no + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data.content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.severListList>ul').append(html);
                            $('.tyreChangeAdd').css({
                                display: "none"
                            });
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

            }

        });
        //取消添加
        $('.tyreChangeUndoAdd').click(function(){
            $('.tyreChangeAdd').css({
                display: "none"
            });
        });
        $('.tyreChangeUndoRedact').click(function(){
            $('.tyreChangeRedact').css({
                display: "none"
            });
        });
        //删除
        $('.severListList>ul').on('click', '.delete', function (e) {
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            e.preventDefault();
            if (confirm('确定删除?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        flow_id: flow_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove()
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            }
        });
        //编辑
        $('.severListList>ul').on('click', '.storeCategoryEdit', function (e) {
            e.preventDefault();
            $('.tyreChangeRedact').css({display: "block"});
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that=this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminFlow/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    flow_id: flow_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.tyreChangeRedact .contentText').val(data.data.content);
                        $('.tyreChangeRedact .titleInput').val(data.data.title);
                        $('.tyreChangeRedact .stepInput').val(data.data.step_no);
                        document.getElementsByClassName('tyreChangeRedactBtnOk')[0].onclick = function () {
                            var content=$('.tyreChangeRedact .contentText').val();
                            var step_no=$('.tyreChangeRedact .stepInput').val();
                            var title=$('.tyreChangeRedact .titleInput').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminFlow/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    flow_id: flow_id,
                                    content:content,
                                    step_no:step_no,
                                    title:title,
                                    flow_type:2
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        $('.tyreChangeRedact').css({display: "none"});
                                        $(that).parent().siblings('.sTitle').children('span').html(data.data.title);
                                        $(that).parent().siblings('.sStep').children('span').html(data.data.step_no);
                                        $(that).parent().parent().siblings('.stripeInfo').children('span').html(data.data.content)
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                        }
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        });
    }

    /*         品质服务           */
    function qualityRedact() {

        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminFlow/getList',
            data: {
                admin_id: admin_id,
                token: token,
                type:3
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data);
                    if (data.data) {
                        for (var i = 0; i < data.data.length; i++) {
                            var html = '';
                            html = '<li data-id="' + data.data[i].id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data[i].title + '</span></div>' +
                            '<div class="sStep"><span>' + data.data[i].step_no + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data[i].content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.InventoryCategoriesList>ul').append(html);
                        }
                    }
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        //查看详细描述信息
        $('.InventoryCategoriesList>ul').on('mouseover', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "block"
            })
        });
        $('.InventoryCategoriesList>ul').on('mouseout', ".description>span>button", function (e) {
            e.preventDefault();
            $(this).parent().parent().parent().siblings().css({
                display: "none"
            })
        });

        //添加
        $('.InventoryCategoriesListAdd').click(function () {
            $('.InventoryCategoriesAdd').css({
                display: "block"
            });
            document.getElementsByClassName('InventoryCategoriesAddBtnOk')[0].onclick = function () {
                var title = $('.InventoryCategoriesAdd .titleInput').val();
                var content = $('.InventoryCategoriesAdd .contentText').val();
                var step_no = $('.InventoryCategoriesAdd .stepInput').val();
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/add',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        title: title,
                        content: content,
                        step_no: step_no,
                        flow_type: 3
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            alert('添加成功');
                            var html = '';
                            html = '<li data-id="' + data.data.id + '"><div>' +
                            '<div class="sTitle"><span>' + data.data.title + '</span></div>' +
                            '<div class="sStep"><span>' + data.data.step_no + '</span></div>' +
                            '<div class="description"><span><button class="look">查看详情</button></span></div>' +
                            '<div>' +
                            '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                            '<a href="##" class="delete"><span class="storeCategoryRemove fa fa-external-link "></span>移除</a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="stripeInfo">' +
                            '<span>' + data.data.content + '</span>' +
                            '</div>' +
                            '</li>';
                            $('.InventoryCategoriesList>ul').append(html);
                            $('.InventoryCategoriesAdd').css({
                                display: "none"
                            });
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

            }

        });
        //取消添加
        $('.InventoryCategoriesUndoAdd').click(function(){
            $('.InventoryCategoriesAdd').css({
                display: "none"
            });
        });
        $('.InventoryCategoriesUndoRedact').click(function(){
            $('.InventoryCategoriesRedact').css({
                display: "none"
            });
        });
        //删除
        $('.InventoryCategoriesList>ul').on('click', '.delete', function (e) {
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that = this;
            e.preventDefault();
            if (confirm('确定删除?')) {
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminFlow/delete',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        flow_id: flow_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            alert('删除成功');
                            $(that).parent().parent().parent().remove()
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });
            }
        });
        //编辑
        $('.InventoryCategoriesList>ul').on('click', '.storeCategoryEdit', function (e) {
            e.preventDefault();
            $('.InventoryCategoriesRedact').css({display: "block"});
            var flow_id = $(this).parent().parent().parent().attr('data-id');
            var that=this;
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminFlow/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    flow_id: flow_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.InventoryCategoriesRedact .contentText').val(data.data.content);
                        $('.InventoryCategoriesRedact .titleInput').val(data.data.title);
                        $('.InventoryCategoriesRedact .stepInput').val(data.data.step_no);
                        document.getElementsByClassName('InventoryCategoriesRedactBtnOk')[0].onclick = function () {
                            var content=$('.InventoryCategoriesRedact .contentText').val();
                            var step_no=$('.InventoryCategoriesRedact .stepInput').val();
                            var title=$('.InventoryCategoriesRedact .titleInput').val();
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminFlow/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    flow_id: flow_id,
                                    content:content,
                                    step_no:step_no,
                                    title:title,
                                    flow_type:3
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        console.log(data);
                                        alert('修改成功');
                                        $('.InventoryCategoriesRedact').css({display: "none"});
                                        $(that).parent().siblings('.sTitle').children('span').html(data.data.title);
                                        $(that).parent().siblings('.sStep').children('span').html(data.data.step_no);
                                        $(that).parent().parent().siblings('.stripeInfo').children('span').html(data.data.content)
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });

                        }
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });

        });
    }

    qualityRedact();
    tyreChange();
    flowPath()
})();


























