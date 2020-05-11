/*-------------------------------------------------------------------
    파일정의 : Settings
    작성날짜 : 2020.04 송예성
    참고사항 : 스크립트에 대한 기초
-------------------------------------------------------------------*/
$(document).on('ready', function() {
    // gnb
    menuHeight();
    // gnb type-1
    $(".gnb-type01 .one-depth").on("mouseover",function(){
        depthOver($(this));
    });
    $(".gnb-type01 .one-depth").on("mouseleave",function(){
        depthLeave($(this));
    });
    if($(".gnb-type01").hasClass("type2")){
        $(".gnb-type01 .one-depth > li").css({
            position:"static"
        });
        $(".gnb-type01 .one-depth").unbind("mouseover mouseleave");
        $(".gnb-type01 .two-depth li > ul ul").prev("a").addClass("toggle-depth");
    }
    // gnb type2-2
    $(".type2 .one-depth > li > a").on("click",function(){
        depthToggle($(this).parent("li"));
    });

    $(".type2 .one-depth .toggle-depth").on("click",function(){
        contentToggle($(this));
    });
    $(window).scroll(function(){ 
        var height = $(document).scrollTop(); //실시간으로 스크롤의 높이를 측정
        var fixedHeight=150;
        if(height > fixedHeight){ 
            $('.header-wrap .gnb-wrap_type1').addClass('fixed'); 
            //$('.header-wrap .btn-gnb_all').addClass('fixed'); 
        }else if(height < fixedHeight){ 
            $('.header-wrap .gnb-wrap_type1').removeClass('fixed'); 
           // $('.header-wrap .btn-gnb_all').removeClass('fixed'); 
        } 
    });

    // header__gnb-all
    $(".btn-gnb_all").on("click",function(){
        if($(document).width() < 768){
            // 모바일
            gnbOneDepthToggle();
        } else{
            // 데스크탑
            gnbAllToggle();
        }
    });
    if($(document).width() < 768){
        // 모바일
       $(".btn-gnb_all").text("열기");
       $(".gnb-type01 .one-depth").unbind("mouseover mouseleave");
       if(!$(".gnb-type01").hasClass("type2")){
            depthAddEvent();
        }
    }else{
        // 데스크탑
    }
    $(window).resize(function() {
        if($(document).width() < 768){
            // 모바일 리사이징
        }else{
            // 데스크탑
        }
    });

    var mql = window.matchMedia("screen and (max-width: 768px)");

    mql.addListener(function(e) {
        if(e.matches) {
            // 모바일
            $(".gnb-type01 .one-depth").unbind("mouseover mouseleave");
            if(!$(".gnb-type01").hasClass("type2")){
                depthAddEvent();
            } 
            if($(".btn-gnb_all").hasClass("active")){
                $(".gnb-type01 .one-depth").addClass("on");
                $(".dimm").addClass("on");
            }
        } else {
            // 데스크탑
            menuHeight();  
            $(".gnb-type01.type2 .two-depth").removeClass("on");
            $(".gnb-type01 .one-depth").removeClass("on");
            $(".dimm").removeClass("on");
            if(!$(".gnb-type01").hasClass("type2")){
                depthType1Test();
            }
            if($(".btn-gnb_all").hasClass("active")){
                $(".header__gnb-all").addClass("on");
            }
        }
    });
    function depthOver(e){
        e.find('li > ul').addClass("on");
        $(".dimm").addClass("on");
    }
    function depthLeave(e){
        e.find('li > ul').removeClass("on");
        $(".dimm").removeClass("on");
    }
    function menuHeight(){
        var temp=0;
        var gnbHeight=$(".gnb-wrap_type1").outerHeight();
        $(".two-depth").css({
            top:gnbHeight
        });
        if($(".gnb-type01").hasClass("type2")){
            
        }else{
            $(".gnb-type01 .two-depth").each(function(){
                var thisHeight=$(this).outerHeight();
                if(temp < thisHeight){
                    temp=thisHeight;                
                    $(".gnb-type01 .two-depth").outerHeight(temp); 
                }
            }).promise().done(function(){
                $(".dimm").css({
                    height:temp
                });
            });
        }
    }
    function depthToggle(e){
        var $Depth=e.parent("ul").children("li").children("ul");
        if(e.children("ul").hasClass("on")){
            e.children("ul").removeClass("on");
        }else{
            $Depth.removeClass("on");
            e.children("ul").addClass("on");
        }
    }
    
    function contentToggle(e){
        if(e.hasClass("on")){
            e.removeClass("on");
            e.siblings("ul").removeClass("on");
        }else{
            e.addClass("on");
            e.siblings("ul").addClass("on");
        }
    }
    function gnbOneDepthToggle(){
        if(!$(".gnb-type01 .one-depth").hasClass("on")){
            $(".gnb-type01 .one-depth").addClass("on");
            $(".btn-gnb_all").addClass('active').text("닫기");
            $(".dimm").addClass("on");
        }else{
            $(".gnb-type01 .one-depth").removeClass("on");
            $(".btn-gnb_all").removeClass('active').text("열기");
            $(".dimm").removeClass("on");
        }
    }
    function gnbAllToggle(){
        if(!$(".header__gnb-all").hasClass("on")){
            $(".header__gnb-all").addClass("on");
            $(".btn-gnb_all").addClass('active').text("닫기");
        }else{
            $(".header__gnb-all").removeClass("on");
            $(".btn-gnb_all").removeClass('active').text("열기");
        }
    } 
    function depthAddEvent(){
        $(".gnb-type01 .one-depth > li > a").on("click",function(){ 
            depthToggle($(this).parent("li"));
        })
    }
    // type1 function include && remove event 
    function depthType1Test(){
        $(".gnb-type01 .one-depth > li > a").unbind("click");
        $(".gnb-type01 .one-depth").on("mouseover",function(){
            depthOver($(this));
        });
        $(".gnb-type01 .one-depth").on("mouseleave",function(){
            depthLeave($(this));
        });
    }
    // gnb end

    // lnb
    $(".lnb-menu .one-depth > li > a").on("click",function(){
        $parentItem=$(this).siblings('ul');
        if($parentItem.hasClass("on")){
            $parentItem.removeClass("on"); 
        }else{
            $(".lnb-menu .one-depth > li > ul").removeClass("on");
            $parentItem.addClass("on").attr("tabindex", "0").focus();
        }
    });
    $(".lnb-menu .one-depth .toggle-depth").on("click",function(){
        $parentItem=$(this).siblings('ul');
        if($parentItem.hasClass("on")){
            $(this).removeClass("on"); 
            $parentItem.removeClass("on"); 
        }else{
            $(this).addClass("on");
            $parentItem.addClass("on");
        }
    });
    // lnb type2
    // $(".lnb-menu .one-depth > li > a").on("click",function(){
    //     $(this).siblings('ul').toggle();
    // });
    // $(".lnb-menu .one-depth > li > ul a").on("click",function(){
    //     $(this).siblings('ul').toggle();
    // });
    
    // tab
        var $contentItem=$('.tab__content');
        var $listItem=$('.tab__list li');
        if($(document).width() > 768){
            // 데스크탑
            $listItem.children("a").click(function(){
                tabToggle($(this));
            });
        }else{
            // 모바일
            contentListAdd()
            $contentItem.hide();
            $(document).on("click", ".tab__list li a",function(){
                tabSiblingsToggle($(this));
            });
        }
        // var mql = window.matchMedia("screen and (max-width: 768px)");

        mql.addListener(function(e) {
            if(e.matches) {
                // 모바일
                contentListAdd();
                $contentItem.hide();
                $(document).on("click", ".tab__list li a",function(){
                    tabSiblingsToggle($(this));
                });
            } else {
                // 데스크탑
                $contentItem.show();
                $listItem.children("div").hide();
                $listItem.children("a").click(function(){
                    tabSiblingsToggle(undefined);
                    tabToggle($(this));
                });
            }
        });
        function contentListAdd(){
            if($contentItem.hasClass("one")){
                return false;
            }else{
                $('.tab__content > div').each(function(index){
                    $contentItem.addClass("one");
                    var addDiv=$(this).clone();
                    $listItem.eq(index).append(addDiv);
                });
            }
        }
        function tabSiblingsToggle($item){
            if(typeof $item=="undefined"){
                return false;   
            }
            $listItem.removeClass('active');
            $listItem.children("div").hide();
            $item.parent().addClass("active");
            $item.siblings("div").show();
        }
        function tabToggle($listBtn){
            $contentItem.children("div").hide();
            $contentItem.children("div").eq($listBtn.parent().index()).show();
            $listItem.removeClass('active');
            $listItem.eq($listBtn.parent("li").index()).addClass('active');
        }


    // 스와이프 필수
    function setCurrentSlide(ele,index){
        $(".swiper-title .swiper-slide").removeClass("selected");
        ele.addClass("selected");
        //swiper-title.initialSlide=index;
      }

      var swiperTitle = new Swiper('.swiper-title', {
            slidesPerView: 5,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true,
            loop: false,
            onlyExternal: true,
            onTab:function(swiper){
              var n = swiperTitle.clickedIndex;
              alert(1);
            },
            breakpoints: {
                768 : {
                  onlyExternal: false
                }
            }
        });
        swiperTitle.slides.each(function(index,val){
        var ele=$(this);
        ele.on("click",function(){
          setCurrentSlide(ele,index);
          swiper2.slideTo(index, 500, false);
          //mySwiper.initialSlide=index;
        });
      });
      
      
    var swiper2 = new Swiper ('.swiper-content', {
        direction: 'horizontal',
        loop: false,
        autoHeight: true,
        onlyExternal: true,
        onSlideChangeEnd: function(swiper){
          var n=swiper.activeIndex;
          setCurrentSlide($(".swiper-title .swiper-slide").eq(n),n);
          swiperTitle.slideTo(n, 500, false);
        },
        breakpoints: {
            768 : {
              onlyExternal: false
            }
        }
    });
    // 스와이프 필수 end
    // 스와이프 옵션 링크이동
     $(".swiper-title .swiper-slide").on("dblclick",function(){
        var move=$(this).data("link");
        if(typeof move=="undefined"){
            console.log("빈값");
        }else{
            console.log(move);
            window.location.href=move;
        }
     });

     $('.slider').each(function(key, item) {

        var sliderIdName = 'slider' + key;
        var sliderNavIdName = 'sliderNav' + key;
      
        this.id = sliderIdName;
        $('.slider-nav')[key].id = sliderNavIdName;
      
        var sliderId = '#' + sliderIdName;
        var sliderNavId = '#' + sliderNavIdName;
      
        $(sliderId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: sliderNavId,
            draggable: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        draggable: true
                    }
                },
            ]
        });
      
        $(sliderNavId).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: sliderId,
            dots: false,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            draggable: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        draggable: true
                    }
                },
            ]
        });
      });
      
      
    // 토글
    $(".toggle-wrap .cont-wrap__btn").on("click",function(){
        var isShow=$(".toggle-wrap__box").toggle().css("display");
        if(isShow=="none"){
            $(this).text("열기");
        }else{
            $(this).text("닫기");
        }
    })
    // 모달
    var cnt = 0;
    var layerId="";
    $(".modal-wrap3 .modal-wrap3__btn").on("click",function(){
       layerId = 'layer'+(cnt++);
       $(this).attr('data-btn',layerId);
       $('.modal-layer').show().attr('data-layer',layerId);
       $('.modal-layer[data-layer='+layerId+']').attr("tabindex", "0").focus();
    });
    $(".modal-layer .close").on("click",function(){
        $(this).closest('.modal-layer').hide();
        $('.modal-wrap__btn[data-btn='+layerId+']').attr("tabindex", "0").focus();
    });

    // 드롭다운
    $(".dropdown__wrap li").on("click",function(){
        if($(this).children("ul").hasClass("on")){
            $(this).children("ul").removeClass("on");
        }else{
            $(this).children("ul").addClass("on");
        }
    });

    // 패밀리사이트
    $(".btn-move").on("click",function(){
        var move=$("#forward").val();
        if(typeof move=="undefined"){
        }else{
          $(this).attr('href', move);
        }
    });

    // faq
    // 가져갈시에 해제 var mql = window.matchMedia("screen and (max-width: 768px)");
    var questionTxt="";
    var $addList=$(".faq__list li").eq(0);

    $('.tab-list li a').click(function(){
        $('.tab-content > div').hide();
        $('.tab-content > div').eq($(this).parent().index()).show();
        $('.tab-list li').removeClass('active');
        $('.tab-list li').eq($(this).parent().index()).addClass('active');
	});

    mql.addListener(function(e) {
        if(e.matches) {
            // 모바일
            questionTxt=$(".faq__question").text();
            $(".faq__list li").removeClass("on");
            $(".faq > div").removeClass("on");
            $addList.children("a").text(questionTxt);
        } else {
            // 데스크탑
            $addList.addClass("on").children("a").text("질문");
            $(".faq__question").addClass("on");
            $(".faq__answer").removeClass("on");
        }
    });
    
    if($(document).width() < 768){
        // 모바일
        questionTxt=$(".faq__question").text();
        $(".faq__list li").removeClass("on");
        $(".faq > div").removeClass("on");
        $addList.children("a").text(questionTxt);
    }else{
        // 데스크탑
        $addList.addClass("on").children("a").text("질문");
        $(".faq__question").addClass("on");
        $(".faq__answer").removeClass("on");
    }

    // faq-wrap
    $(".faq-wrap div a").on("click",function(){
        var $parentItem=$(this).parent("div");
        if($parentItem.hasClass("on")){
            $parentItem.removeClass("on"); 
        }else{
            $("div").removeClass("on");
            $parentItem.addClass("on").attr("tabindex", "0").focus();
        }
    });
});