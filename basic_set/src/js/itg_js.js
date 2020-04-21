/*-------------------------------------------------------------------
    파일정의 : Settings
    작성날짜 : 2020.04 송예성
    참고사항 : 스크립트에 대한 기초
-------------------------------------------------------------------*/
$(document).on('ready', function() {
    // gnb
    // gnb type-1
    $(".gnb-type01 .one-depth").on("mouseover",function(){
        $(this).find('li > ul').show();
    });
    $(".gnb-type01 .one-depth").on("keydown",function(e){
        if(e.keyCode==13){
            $(this).find('ul').show();
        }
    });
    $(".gnb-type01 .one-depth").on("mouseleave",function(){
        $(this).find('ul').hide();
    });

    // gnb type 1-1
    // $(".header__gnb .one-depth li").on("mouseover",function(){
    //     $(this).find('ul').show();
    // });
    // $(".header__gnb .one-depth li").on("mouseleave",function(){
    //     $(this).find        ('ul').hide();
    // });
    // $(".header__gnb .one-depth li").on("keydown",function(e){
    //     if(e.keyCode==13){
    //         $(this).find('ul').show();
    //     }
    // });
    // $(".header__gnb .one-depth").on("mouseleave",function(){
    //     $(this).find('ul').hide();
    // });

    // gnb type2
    // $(".header__gnb-type2 .one-depth").on("click",function(){
    //     $(this).find('li > ul').toggle();
    // });

    // gnb type2-1
    // $(".header__gnb-type2 .one-depth > li").on("click",function(){
    //     $(this).find('ul').toggle();
    // });

    // gnb type2-2
    $(".header__gnb-type2 .one-depth > li > a").on("click",function(){
        depthToggle($(this).parent("li"));
    });

    $(".header__gnb-type2 .one-depth .toggle-depth").on("click",function(){
        contentToggle($(this));
    });
    
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
    $(window).scroll(function(){ 
        var height = $(document).scrollTop(); //실시간으로 스크롤의 높이를 측정
        var fixedHeight=300;
        if(height > fixedHeight){ 
            $('.header-wrap .gnb-wrap_type1').addClass('fixed'); 
            //$('.header-wrap .btn-gnb_all').addClass('fixed'); 
        }else if(height < fixedHeight){ 
            $('.header-wrap .gnb-wrap_type1').removeClass('fixed'); 
           // $('.header-wrap .btn-gnb_all').removeClass('fixed'); 
        } 
    });

    // gnb clone
    $(".btn-gnb_all").on("click",function(){
        if($(document).width() < 768){
            // 모바일
            $(".header__gnb .one-depth").toggle();
        } else{
            $(".btn-gnb_all").toggle();
        }
        if(!($(".btn-gnb_all").hasClass("active"))){
            $(".btn-gnb_all").addClass('active');
            $(this).text("닫기");
        }else{
            $(".btn-gnb_all").removeClass('active');
            $(this).text("열기");
        }
    }); 
    if($(document).width() < 768){
        // 모바일
       $(".btn-gnb_all").hide();
       $(".btn-gnb_all").text("열기");
       $(".header__gnb .one-depth").unbind();
       $(".header__gnb .one-depth").hide();
    }else{
        // 데스크탑
    }
    $(window).resize(function() {
        if($(document).width() < 768){
            // 모바일 리사지징
        }else{
            // 데스크탑
        }
    });

    var mql = window.matchMedia("screen and (max-width: 768px)");

    mql.addListener(function(e) {
        if(e.matches) {
            // 모바일
            var isShow=$(".btn-gnb_all").css("display");
            if(isShow=="block"){
                $(".header__gnb .one-depth").show();
                $(".btn-gnb_all").addClass('active').text("닫기");
                $(".btn-gnb_all").hide();
            }else{
                $(".header__gnb .one-depth").hide();
                $(".btn-gnb_all").removeClass('active').text("열기");
                $(".btn-gnb_all").hide();
            }
        } else {
            // 데스크탑
            var isShow2=$(".header__gnb .one-depth").css("display");
            $(".header__gnb .one-depth").show();
            if(isShow2=="block"){
                $(".btn-gnb_all").addClass('active').text("닫기");
                $(".btn-gnb_all").show();
            }else{
                $(".btn-gnb_all").removeClass('active').text("열기");
            }   
        }
    });
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
    $('.tab__list li a').click(function(){
        $('.tab__content > div').hide();
        $('.tab__content > div').eq($(this).parent().index()).show();
        $('.tab__list li').removeClass('active');
        $('.tab__list li').eq($(this).parent().index()).addClass('active');
	});


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
    $(".modal-wrap .modal-wrap__btn").on("click",function(){
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
    $(".forwardBtn").on("click",function(){
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