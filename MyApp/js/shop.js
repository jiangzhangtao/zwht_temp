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
            minHeight: 810 + 'px'
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

    /*                   门店类别                      */
    function storeCategory() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminStoreType/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<li><div>' +
                            '<div><span>' + (i + 1) + '</span></div>' +
                            '<div><span>' + data.data[i].name + '</span></div>' +
                            '<div><span>' + data.data[i].time + '</span></div>' +
                            '<div><div style="background:' + data.data[i].color + '"><span>' + data.data[i].name + '</span></div></div>' +
                            '</div>' +
                            '</li>';
                    }
                    $('.storeCategoryList>ul').append(html)
                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });


        //添加类别
        $('.storeCategoryListAdd a').click(function () {
            $('.storeCategoryAdd').css({ display: "block" })
        });
        //确认添加
        $('.storeCategoryAddBtnOk').click(function () {
            $('.storeCategoryAdd').css({ display: "none" });
            var html = "";
            html += '<li>' +
                '<div>' +
                '<div><span>1</span></div>' +
                '<div><span>快修</span></div>' +
                '<div><span>2014-12-23 13:33:22</span></div>' +
                '<div>' +
                '<a href="##" class="storeCategoryEdit"><span class="fa fa-edit"></span>编辑</a>' +
                '<a href="##" class="delete"><span class="storeCategoryRemove"></span>删除</a>' +
                '</div>' +
                '</div>' +
                '</li>';
            $('.storeCategoryList>ul').append(html)
        });
        //取消添加
        $('.storeCategoryUndoAdd').click(function () {
            $('.storeCategoryAdd').css({ display: "none" })
        });
        //编辑类别
        $('.storeCategoryList>ul').on('click', '.storeCategoryEdit', function () {
            $('.storeCategoryRedact').css({ display: "block" })
        });
        //取消编辑
        $('.storeCategoryUndoRedact').click(function () {
            $('.storeCategoryRedact').css({ display: "none" })
        });
        //确定编辑
        $('.storeCategoryRedactBtnOk').click(function () {
            $('.storeCategoryRedact').css({ display: "none" })
        })
    }

    /*                    合作项目                     */
    var service_type;

    function cooperative() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminServiceType/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    console.log(data)
                    service_type = data.data;
                    var html = '';
                    var option = '';
                    var htnk1 = '';
                    var severListOption;
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<li data-id="' + data.data[i].id + '">' +
                            '<div>' +
                            '<div><span>' + (i + 1) + '</span></div>' +
                            '<div><span>' + data.data[i].name + '</span></div>' +
                            '<div class="description"><span><button>查看描述</button></span></div>' +
                            '</div>' +
                            '<div class="stripeInfo">';
                        for (var j = 0; j < data.data[i].service_list.length; j++) {
                            html += '<span>' + data.data[i].service_list[j].name + '</span>';
                        }
                        html += '</div>' +
                            '</li>';
                        option += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                    }
                    $('.cooperativeList>ul').html(html);
                    $('.severListAddAdd .serverTypeSelect').append(option);
                    $('.severListRedact .serverTypeSelect').append(option);
                    $('.severListContent>div>p>select').append(option);
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminService/getStockTypes',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            service_type_id: data.data[0].id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                for (var i = 0; i < data.data.length; i++) {
                                    var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
                                    $('.severListAddAdd .stockTypeSelect').append(option);
                                    $('.severListRedact .stockTypeSelect').append(option)
                                }


                            } else {
                                alert(data.message);
                            }
                        },
                        err: function (err) {
                            console.log(err);
                        }
                    });
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminService/getList',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            service_type_id: data.data[0].id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                for (var i = 0; i < data.data.length; i++) {
                                    for (var j = 0; j < service_type.length; j++) {
                                        if (data.data[i].service_type_id == service_type[j].id) {
                                            var serviceTypeName = service_type[j].name;
                                        }
                                    }
                                    htnk1 += '<li data-id="' + data.data[i].id + '">' +
                                        '<div data-id="' + data.data[i].service_type_id + '">' +
                                        '<div><span>' + (i + 1) + '</span></div>' +
                                        '<div class="name"><span>' + data.data[i].name + '</span></div>' +
                                        '<div><span>' + serviceTypeName + '</span></div>' +
                                        '<div>' +
                                        '<a href="##" class="severListEdit" data-id="1"><span class="fa fa-edit"></span>编辑</a>' +
                                        '</div>' +
                                        '</div>' +
                                        '</li>';
                                    var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>'
                                }
                                $('.severListList>ul').append(htnk1)


                            } else {
                                alert(data.message);
                            }
                        },
                        err: function (err) {
                            console.log(err);
                        }
                    });

                    //查看详细描述信息
                    $('.cooperativeList>ul').on('mouseover', ".description>span>button", function (e) {
                        e.preventDefault();
                        $(this).parent().parent().parent().siblings().css({
                            display: "block"
                        })
                    });
                    $('.cooperativeList>ul').on('mouseout', ".description>span>button", function (e) {
                        e.preventDefault();
                        $(this).parent().parent().parent().siblings().css({
                            display: "none"
                        })
                    });


                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });


        $('.storeCategoryRedactBtnOk').click(function () {
            $('.cooperativeListServer').css({ display: "none" })
        })
    }

    /*                   服务列表                      */
    function severList() {

        $('.severListContent>div>p>select').change(function () {
            $('.severListList>ul>li').remove();
            var service_type_id = $('.severListContent>div>p>select').val();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminService/getList',
                data: {
                    admin_id: admin_id,
                    token: token,
                    service_type_id: service_type_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data)
                        var html = '';
                        for (var i = 0; i < data.data.length; i++) {
                            for (var j = 0; j < service_type.length; j++) {
                                if (data.data[i].service_type_id == service_type[j].id) {
                                    var serviceTypeName = service_type[j].name;
                                }
                            }
                            html += '<li data-id="' + data.data[i].id + '">' +
                                '<div data-id="' + data.data[i].service_type_id + '">' +
                                '<div><span>' + (i + 1) + '</span></div>' +
                                '<div class="name"><span>' + data.data[i].name + '</span></div>' +
                                '<div><span>' + serviceTypeName + '</span></div>' +
                                '<div>' +
                                '<a href="##" class="severListEdit" data-id="1"><span class="fa fa-edit"></span>编辑</a>' +
                                '</div>' +
                                '</div>' +
                                '</li>';
                        }
                        $('.severListList>ul').append(html)

                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
        });

        /*编辑下拉框更改*/
        ////添加更换
        //$('.severListAddAdd .serverTypeSelect').change(function () {
        //    var service_type_id = $('.severListAddAdd .serverTypeSelect').val()
        //    $('.severListAddAdd .stockTypeSelect>option').remove();
        //    $.ajax({
        //        type: 'post',
        //        url: 'http://180.76.243.205:8383/_API/_adminService/getStockTypes',
        //        data: {
        //            admin_id: admin_id,
        //            token: token,
        //            service_type_id: service_type_id
        //        },
        //        success: function (data) {
        //            if (data.code == 'E0000') {
        //                for (var i = 0; i < data.data.length; i++) {
        //                    var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
        //                    $('.severListAddAdd .stockTypeSelect').append(option)
        //                }
        //            } else {
        //                alert(data.message);
        //            }
        //        },
        //        err: function (err) {
        //            console.log(err);
        //        }
        //    });
        //});
        ////编辑更换
        //$('.severListRedact .serverTypeSelect').change(function () {
        //    var service_type_id = $('.severListRedact .serverTypeSelect').val();
        //    $('.severListRedact .stockTypeSelect>option').remove();
        //    $.ajax({
        //        type: 'post',
        //        url: 'http://180.76.243.205:8383/_API/_adminService/getStockTypes',
        //        data: {
        //            admin_id: admin_id,
        //            token: token,
        //            service_type_id: service_type_id
        //        },
        //        success: function (data) {
        //            if (data.code == 'E0000') {
        //                for (var i = 0; i < data.data.length; i++) {
        //                    var option = '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
        //                    $('.severListRedact .stockTypeSelect').append(option)
        //                }
        //            } else {
        //                alert(data.message);
        //            }
        //        },
        //        err: function (err) {
        //            console.log(err);
        //        }
        //    });
        //});

        //编辑
        $('.severListList>ul').on('click', '.severListEdit', function (e) {
            e.preventDefault();
            var $_thisLi = $(this).parent().parent().parent();
            var $_thisDiv = $(this).parent().parent();
            var service_id = $(this).parent().parent().parent().attr('data-id');
            $('.severListRedact').css({
                display: "block"
            });
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminService/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    service_id: service_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data);
                        $('.severListRedact .name').val(data.data.name);
                        document.getElementsByClassName('severListRedactBtnOk')[0].onclick = function () {
                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminService/edit',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    service_id: service_id,
                                    name: $('.severListRedact .name').val()
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改成功');
                                        $_thisLi.children().children('.name').children().html($('.severListRedact .name').val())
                                        $('.severListRedact').css({
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
                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });


            //if($(this).attr("data-id")==1){
            //    $(this).attr("data-id",2);
            //    $_thisDiv.children().children().children("input").attr("disabled",false);
            //    $_thisDiv.children().children().children("select").attr("disabled",false);
            //    $_thisLi.siblings().children().children().children().children("select").attr("disabled",true);
            //    $_thisLi.siblings().children().children().children().children("input").attr("disabled",true);
            //    $_thisLi.siblings().children().children().children(".severListEdit").attr("data-id",1)
            //}else{
            //    $(this).attr("data-id",1);
            //    $_thisDiv.children().children().children("input").attr("disabled",true);
            //    $_thisDiv.children().children().children("select").attr("disabled",true)
            //}
        });

        /*删除*/
        //$('.severListList>ul').on('click','.delete',function(){
        //        var service_id=$(this).parent().parent().parent().attr('data-id');
        //    var that=this;
        //    $.ajax({
        //            type:'post',
        //            url:'http://180.76.243.205:8383/_API/_adminService/delete',
        //            data:{
        //                admin_id:admin_id,
        //                token:token,
        //                service_id:service_id
        //            },
        //            success:function(data){
        //                if(data.code=='E0000'){
        //                    alert('删除成功');
        //                    $(that).parent().parent().parent().remove()
        //                }else{
        //                    alert(data.message);
        //                }
        //            },
        //            err:function(err){
        //                console.log(err);
        //            }
        //        });
        //})
        //添加服务
        /*添加*/
        //$(".severListAdd>div>a").click(function () {
        //    $('.severListAddAdd').css({display: "block"});
        //
        //
        //
        //                document.getElementsByClassName('severListAddAddBtnOk')[0].onclick = function () {
        //     var name = $('.severListAddAdd .name').val();
        //     var service_type_id=$('.severListAddAdd .serverTypeSelect').val();
        //     var stock_type_id=$('.severListAddAdd .stockTypeSelect').val();
        //     var html;
        //     $.ajax({
        //     type: 'post',
        //     url: 'http://180.76.243.205:8383/_API/_adminStockType/getList',
        //     data: {
        //     admin_id: admin_id,
        //     token: token
        //     },
        //     success: function (data) {
        //     if (data.code == 'E0000') {
        //     console.log(data);
        //     var html = '';
        //     var option;
        //     for (var i = 0; i < data.data.length; i++) {
        //     option += '<option value="' + data.data[i].stock_type_id + '">' + data.data[i].name + '</option>'
        //     }
        //     $('.severListAddAdd .stockTypeSelect').append(option);
        //
        //     $('.InventoryCategoriesList>ul').append(html);
        //     } else {
        //     alert(data.message);
        //     }
        //     },
        //     err: function (err) {
        //     console.log(err);
        //     }
        //     });
        //     $.ajax({
        //     type: 'post',
        //     url: 'http://180.76.243.205:8383/_API/_adminService/add',
        //     data: {
        //     admin_id: admin_id,
        //     token: token,
        //     name: name,
        //     service_type_id: service_type_id,
        //     stock_type_id: stock_type_id
        //     },
        //     success: function (data) {
        //     if (data.code == 'E0000') {
        //     console.log(data);
        //     alert('添加成功');
        //     $('.severListAddAdd').css({display: "none"});
        //
        //     } else {
        //     alert(data.message);
        //     }
        //     },
        //     err: function (err) {
        //     console.log(err);
        //     }
        //     });
        //
        //     }
        //
        //
        //});

        /*           //取消添加
         $('.severListAddUndoAdd').click(function () {
         $('.severListAddAdd').css({display: "none"})
         });*/
        // 取消添加
        $('.severListRedactUndo').click(function () {
            $('.severListRedact').css({ display: "none" })
        });

    }

    /*                    库存类别                     */
    function InventoryCategories() {
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminStockType/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var html = '';
                    var option;
                    for (var i = 0; i < data.data.length; i++) {
                        for (var j = 0; j < service_type.length; j++) {
                            if (data.data[i].service_type_id == service_type[j].id) {
                                var serviceTypeName = service_type[j].name;
                            }
                        }
                        html += '<li data-id="' + data.data[i].service_id + '">' +
                            '<div data-id="' + data.data[i].service_type_id + '">' +
                            '<div><span>' + (i + 1) + '</span></div>' +
                            '<div><span>' + data.data[i].name + '</span></div>' +
                            '<div><span>' + serviceTypeName + '</span></div>' +
                            '</div>' +
                            '</li>';
                    }
                    $('.InventoryCategoriesList>ul').append(html)


                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });

        /*
         $('.InventoryCategoriesList>ul').on('click', '.InventoryCategoriesEdit', function (e) {


         e.preventDefault();
         var $_thisLi = $(this).parent().parent().parent();
         var $_thisDiv = $(this).parent().parent();
         if ($(this).attr("data-id") == 1) {
         $(this).attr("data-id", 2);
         $_thisDiv.children().children().children("input").attr("disabled", false);
         $_thisDiv.children().children().children("select").attr("disabled", false);
         $_thisLi.siblings().children().children().children().children("select").attr("disabled", true);
         $_thisLi.siblings().children().children().children().children("input").attr("disabled", true);
         $_thisLi.siblings().children().children().children(".InventoryCategoriesEdit").attr("data-id", 1)
         } else {
         $(this).attr("data-id", 1);
         $_thisDiv.children().children().children("input").attr("disabled", true);
         $_thisDiv.children().children().children("select").attr("disabled", true)
         }
         });

         //添加服务
         $(".InventoryCategoriesAdd>div>a").click(function () {
         $('.InventoryCategoriesListAdd').css({display: "block"})
         });
         //取消添加
         $('.InventoryCategoriesListAddUndoAdd').click(function () {
         $('.InventoryCategoriesListAdd').css({display: "none"})
         });
         //确定添加
         $('.InventoryCategoriesListAddBtnOk').click(function () {
         $('.InventoryCategoriesListAdd').css({display: "none"});
         var html = '';
         html += '<li>' +
         '<div>' +
         '<div><span>1</span></div>' +
         '<div><span><input type="text" disabled value="普通洗车"/></span></div>' +
         '<div><span>' +
         '<select disabled>' +
         '<option value="">美容清洗</option>' +
         '<option value="">轮胎服务</option>' +
         '<option value="">轮胎服务</option>' +
         '<option value="">轮胎服务</option>' +
         '<option value="">轮胎服务</option>' +
         '</select>' +
         '</span></div>' +
         '<div>' +
         '<a href="##" class="InventoryCategoriesEdit" data-id="1"><span class="fa fa-edit"></span>编辑</a>' +
         '<a href="##" class="delete"><span class="InventoryCategoriesRemove"></span>删除</a>' +
         '</div>' +
         '</div>' +
         '</li>';
         $('.InventoryCategoriesList>ul').append(html);
         })*/
    }


    /*                  轮胎总表                      */
    function shopList() {
        //列表
        $.ajax({
            type: 'post',
            url: 'http://180.76.243.205:8383/_API/_adminStore/getList',
            data: {
                admin_id: admin_id,
                token: token
            },
            success: function (data) {
                if (data.code == 'E0000') {
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].status == 1) {
                            var status = '正常'
                        } else {
                            var status = '停业'
                        }
                        html += '<li data-id="' + data.data[i].id + '">' +
                            '<div>' +
                            '<div class="shopName"><span>' + data.data[i].name + '</span></div>' +
                            '<div class="shopImg"><img src="' + data.data[i].location_img_url + '" alt="" /></div>' +
                            '<div class="shopType"><span>' + data.data[i].type_name + '</span></div>' +
                            '<div class="shopAddress"><span>' + data.data[i].address + '</span></div>' +
                            '<div class="shopStatus"><span>' + status + '</span></div>' +
                            '<div><a href="##" class="shopEdit"><span class="fa fa-eye"></span>查看</a></div>' +
                            '</div>' +
                            '</li>';
                    }
                    $('.shopList>ul').append(html)

                } else {
                    alert(data.message);
                }
            },
            err: function (err) {
                console.log(err);
            }
        });
        //查看门店信息
        $('.shopList>ul').on('click', ".shopEdit", function () {
            $('.shopInfoLockLeft .shopTeamwork>ul>li').remove();
            var shop_id = $(this).parent().parent().parent().attr('data-id');
            $('.shopInfo').css({ display: "block" });
            $('.shopInfoLock').css({ display: "block" });
            var shopList = $(this).parent().parent().parent();
            $.ajax({
                type: 'post',
                url: 'http://180.76.243.205:8383/_API/_adminStore/getSingle',
                data: {
                    admin_id: admin_id,
                    token: token,
                    store_id: shop_id
                },
                success: function (data) {
                    if (data.code == 'E0000') {
                        console.log(data)
                        var producer = data.data.producer; //商户数据
                        var store = data.data.store; //店铺数据
                        var service = data.data.service; //合作数据
                        if (producer.app_expert == 1) {
                            var app_expert = '是'
                        } else {
                            var app_expert = '否'
                        }
                        if (store.status == 1) {
                            var status = '正常'
                        } else {
                            var status = '停业';
                        }

                        //商家信息
                        $('.shopInfoLock>.shopInfoLockLeft .id_img').attr('src', producer.id_img);
                        $('.shopInfoLock>.shopInfoLockLeft .name').html(producer.name);
                        $('.shopInfoLock>.shopInfoLockLeft .phone').html(producer.phone);
                        $('.shopInfoLock>.shopInfoLockLeft .balance').html(producer.balance);
                        $('.shopInfoLock>.shopInfoLockLeft .app_expert').html(app_expert);
                        $('.shopInfoLock>.shopInfoLockLeft .time').html(producer.time);
                        $('.shopInfoLock>.shopInfoLockLeft .state span').html(status);

                        //门店信息
                        $('.shopInfoLock>.shopInfoLockRight .name').html(store.name);
                        $('.shopInfoLock>.shopInfoLockRight .type_name').html(store.type_name);
                        $('.shopInfoLock>.shopInfoLockRight .tel').html(store.tel);
                        $('.shopInfoLock>.shopInfoLockRight .city_name').html(store.city_name);
                        $('.shopInfoLock>.shopInfoLockRight .address').html(store.address);
                        $('.shopInfoLock>.shopInfoLockRight .business_license_url').attr('src', store.business_license_url);
                        $('.shopInfoLock>.shopInfoLockRight .location_img_url').attr('src', store.location_img_url);
                        $('.shopInfoLock>.shopInfoLockRight .indoor_img_url').attr('src', store.indoor_img_url);
                        $('.shopInfoLock>.shopInfoLockFooter .shopRepertoryStatus').attr('data-id', store.status);
                        $('.shopInfoLock>.shopInfoLockRight .factory_img_url').attr('src', store.factory_img_url);

                        //合作项目
                        var html = '';
                        for (var key in service) {
                            var datas = service[key];
                            if (datas) {
                                if (datas.details) {
                                    html += '<li><div>' +
                                        '<p>' +
                                        '<span>' + datas.name + ':</span>';
                                    for (var i = 0; i < datas.details.length; i++) {
                                        html += '<span class="shopService">' + datas.details[i].name + '</span>';
                                    }
                                    html += '</p>' +
                                        '</div>' +
                                        '</li>';
                                }
                            }
                        }
                        $('.shopInfoLockLeft .shopTeamwork>ul').append(html);


                        //停业与正常的切换
                        document.getElementsByClassName('shopRepertoryStatus')[0].onclick = function () {
                            if ($(this).attr("data-id") == 1) {
                                $(this).attr("data-id", 2);
                                var status = $(this).attr('data-id');
                                $('.state>div>p>span').html('停业');
                                shopList.children().children('.shopStatus').children().html('停业')

                            } else {
                                $(this).attr("data-id", 1);
                                var status = $(this).attr('data-id');
                                $('.state>div>p>span').html('正常');
                                shopList.children().children('.shopStatus').children().html('正常')
                            }


                            $.ajax({
                                type: 'post',
                                url: 'http://180.76.243.205:8383/_API/_adminStore/setStatus',
                                data: {
                                    admin_id: admin_id,
                                    token: token,
                                    store_id: shop_id,
                                    status: status
                                },
                                success: function (data) {
                                    if (data.code == 'E0000') {
                                        alert('修改店铺状态成功!')
                                    } else {
                                        alert(data.message);
                                    }
                                },
                                err: function (err) {
                                    console.log(err);
                                }
                            });
                        };


                    } else {
                        alert(data.message);
                    }
                },
                err: function (err) {
                    console.log(err);
                }
            });
            var shop = $(this).parent().parent().parent();

            //库存列表
            $('.shopRepertory>button').click(function () {
                $('.shopInventory').css({ display: "block" });
                $('.shopInfoLock').css({ display: "none" });
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminStore/getStock',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        store_id: shop_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data);
                            if (data.data) {
                                var html = '';
                                for (var i = 0; i < data.data.length; i++) {
                                    html += '<li>' +
                                        '<span>' + (i + 1) + '</span>' +
                                        '<span class="shopTimelineImg"><img src="' + data.data[i].img_url + '" alt=""/></span>' +
                                        '<span>' + data.data[i].name + '</span>' +
                                        ' <span>' + data.data[i].amount + '</span>' +
                                        ' <span>' + data.data[i].sold_no + '</span>' +
                                        '</li>'
                                }
                                $('.shopInventoryTimeline>ul').append(html)
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

            //查看评论
            $('.shopReview').click(function () {
                $('.shopInfoLock').css({ display: "none" });
                $('.shopInfoDiscuss').css({ display: "block" });
                $.ajax({
                    type: 'post',
                    url: 'http://180.76.243.205:8383/_API/_adminStore/getCommit',
                    data: {
                        admin_id: admin_id,
                        token: token,
                        store_id: shop_id
                    },
                    success: function (data) {
                        if (data.code == 'E0000') {
                            console.log(data)
                            $('.shopInfoDiscussTotal>span').html('共' + data.data.total + '条评论');
                            if (data.data.commit) {
                                var html = '';
                                for (var i = 0; i < data.data.commit.length; i++) {
                                    html += '<li data-id="' + data.data.commit[i].commit_id + '"><div>' +
                                        '<img src="' + data.data.commit[i].header + '" alt=""/>' +
                                        '<span>' + data.data.commit[i].nick + '</span>' +
                                        '<button class="commitDelete">删除该条评论</button>' +
                                        '</div>' +
                                        '<div><p>' +
                                        '<span>评分：</span>';
                                    for (var j = 0; j < data.data.commit[i].star_no; j++) {
                                        html += '<img src="img/shop/shopDiscuss.png" alt=""/>';
                                    }
                                    html += '</p></div>' +
                                        '<div>' +
                                        '<p>' +
                                        '<span>评论：</span>' +
                                        '<span>' + data.data.commit[i].content + '</span>' +
                                        '</p>' +
                                        '</div>' +
                                        '</li>';
                                }
                                $('.shopInfoDiscussContent>ul').append(html)
                            }
                        } else {
                            alert(data.message);
                        }
                    },
                    err: function (err) {
                        console.log(err);
                    }
                });

                //删除评论
                $('.shopInfoDiscussContent').on('click', '.commitDelete', function () {
                    var commit_id = $(this).parent().parent().attr('data-id');
                    var thisLi = $(this).parent().parent();
                    if (confirm('确认删除该条评论?')) {
                        $.ajax({
                            type: 'post',
                            url: 'http://180.76.243.205:8383/_API/_adminStore/deleteCommit',
                            data: {
                                admin_id: admin_id,
                                token: token,
                                commit_id: commit_id,
                                store_id: shop_id
                            },
                            success: function (data) {
                                if (data.code == 'E0000') {
                                    alert('删除成功');
                                    thisLi.remove();
                                    var len = $('.shopInfoDiscussContent>ul>li').length;
                                    $('.shopInfoDiscussTotal>span').html('共' + len + '条评论');
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
            });


            //重置密码
            document.getElementsByClassName('paw')[0].onclick = function () {
                if (confirm('确认要重置密码?如果重置密码,系统会随机生成6位密码.')) {
                    $.ajax({
                        type: 'post',
                        url: 'http://180.76.243.205:8383/_API/_adminStore/resetPwd',
                        data: {
                            admin_id: admin_id,
                            token: token,
                            store_id: shop_id
                        },
                        success: function (data) {
                            if (data.code == 'E0000') {
                                alert('您已重置密码,新密码为 ' + data.data.new_pwd + ' 。请牢记您的新密码！')
                            } else {
                                alert(data.message);
                            }
                        },
                        err: function (err) {
                            console.log(err);
                        }
                    });
                }

            };

        });



        $('.shopRepertory>button').click(function () {
            $('.shopInventory').css({ display: "block" });
            $('.shopInfoLock').css({ display: "none" });
        });

        //库存列表返回
        $('.comeBack>button').click(function () {
            $('.shopInventory').css({ display: "none" });
            $('.shopInfoLock').css({ display: "block" })
        });

        //确定关闭详细窗口
        $('.shopOk').click(function () {
            $('.shopInfo').css({ display: "none" })
        });


        //评论页面返回上一页
        $('.shopDiscussComeBack>button').click(function () {
            $('.shopInfoDiscuss').css({ display: "none" });
            $('.shopInfoLock').css({ display: "block" })
        })

    }

    InventoryCategories();
    severList();
    cooperative();
    storeCategory();
    shopList();
})();


























