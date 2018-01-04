(function () {
    var admin_id=sessionStorage['admin_id'];
    var token=sessionStorage['token'];

    /*自适应屏幕*/
    (function () {
        var documentWidth = $(window).width();
        var menuWidth = $('.menu').innerWidth();
        var menuHeight = $('.menu').innerHeight();
        var logoHeight = $('.header').innerHeight();
        var bodyHeight = $(window).innerHeight();
        var detailsHeight = $('.details').innerHeight();
        var contentHeight = $('.content').height();
        console.log(menuHeight + logoHeight);
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

    /*               服务优惠券                */
    function price() {


        //列表	
         $.ajax({
			type:'post',
			url:'http://180.76.243.205:8383/_API/_adminSales/getServiceList',
			data:{
				admin_id:admin_id,
				token:token
			},
			success:function(data){
				if(data.code=='E0000'){
                    if(data.data){
                        var html='';
                        for(var i=0;i<data.data.length;i++){
                            html+='<li data-id="'+data.data[i].id+'"><div>'+
                            ' <div class="filterOrder"><span>'+(i+1)+'</span></div>'+
                            '<div><span>'+data.data[i].name+'</span></div>'+
                            '<div><span>'+data.data[i].every_months+'</span></div>'+
                            '<div>'+
                            '<a href="##" class="priceEdit" data-id="1">'+
                            '<span class="fa fa-eye "></span><i>查看</i></a>'+
                    
                            '</div></div></li>';
                        }
                        $('.priceList>ul').html(html)
                    }
				}else{
					alert(data.message);
				}
			},
			err:function(err){
				console.log(err);
			}
		});

        //查看单一优惠券
        $('.priceList>ul').on('click', '.priceEdit', function (e) {
           var sale_id= $(this).parent().parent().parent().attr('data-id');
            $('.priceReact').css({display: 'block'});
            $.ajax({
                type:'post',
                url:'http://180.76.243.205:8383/_API/_adminSales/getService',
                data:{
                    admin_id:admin_id,
                    token:token,
                    sale_id:sale_id
                },
                success:function(data){
                    if(data.code=='E0000'){
                        console.log(data);
                    
                        $('.priceReact .name>div>span').html(data.data.name);
                        $('.priceReact .rule>div>span').html(data.data.rule);
                        $('.priceReact .time>div>span').html(data.data.time);
                        $('.priceReact .type>div>span').html(data.data.service_type);
                        $('.priceReact .content>div>textarea').html(data.data.content);
                        $('.priceReact .money>div>span').html(data.data.sale_services.name);
                        $('.priceReact .img').attr('src',data.data.img);
                



                    }else{
                        alert(data.message);
                    }
                },
                err:function(err){
                    console.log(err);
                }
            });
    

        });

       
        $('.priceAddServiceItemsSelect').click(function (e) {
            $('.serviceMatteAdd').css({display: 'block'});
            console.log(e.clientX, e.clientY);
            $('.serviceItemsTabAdd').css({
                left:e.clientX,
                top:e.clientY
            });
        });
        $('.priceReactBtnOk').click(function(){
            $('.priceReact').css({display:'none'})
        })
    
    }

    /*               现金优惠券                */
    function cash() {
        $.ajax({
			type:'post',
			url:'http://180.76.243.205:8383/_API/_adminSales/getCashList',
			data:{
				admin_id:admin_id,
				token:token
			},
			success:function(data){
				if(data.code=='E0000'){
                    console.log(data);
                    if(data.data){
                        var html="";
                        for(var i=0;i<data.data.length;i++){
                            html+='<li data-id="'+data.data[i].id+'"><div>'+
                            '<div class="filterOrder"><span>'+(i+1)+'</span></div>'+
                            '<div class="filterOrder"><span>'+data.data[i].name+'</span></div>'+
                            '<div class="filterOrder"><span>'+data.data[i].value+'</span></div>'+
                            '<div class="filterOrder"><span>'+data.data[i].content+'</span></div>'+
                            '<div class="filterOrder"><span>'+data.data[i].expiry_days+'</span></div>'+
                            '<div><a href="##" class="cashEdit" data-id="1"><span class="fa fa-eye "></span><i>查看</i></a></div>'+
                            '</div></li>';
                        }
                        $('.cashList>ul').html(html)
                    }
				}else{
					alert(data.message);
				}
			},
			err:function(err){
				console.log(err);
			}
		});

           //查看单一优惠券
           $('.cashList>ul').on('click', '.cashEdit', function (e) {
            var sale_id= $(this).parent().parent().parent().attr('data-id');
             $('.cashReact').css({display: 'block'});
             $.ajax({
                 type:'post',
                 url:'http://180.76.243.205:8383/_API/_adminSales/getCash',
                 data:{
                     admin_id:admin_id,
                     token:token,
                     sale_id:sale_id
                 },
                 success:function(data){
                     if(data.code=='E0000'){
                         $('.cashReact .name>div>span').html(data.data.name);
                         $('.cashReact .rule>div>span').html(data.data.rule);
                         $('.cashReact .time>div>span').html(data.data.time);
                         $('.cashReact .type>div>span').html(data.data.service_type);
                         $('.cashReact .content>div>textarea').html(data.data.content);
                         $('.cashReact .money>div>span').html(data.data.value);
                         $('.cashReact .img').attr('src',data.data.img);
                         var service_type='';
                         for(var j=0;j<data.data.service_type.length;j++){
                            service_type+=data.data.service_type[j]+' ';
                         }
                         $('.cashReact .service_type>div>span').html(service_type);
                     }else{
                         alert(data.message);
                     }
                 },
                 err:function(err){
                     console.log(err);
                 }
             });
         });
        $('.cashReactUndoAdd').click(function () {
            $('.cashReact').css({display: 'none'})
        });
    }

    price();
    cash()
})();
