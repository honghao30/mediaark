$(document).on("click", ".nav-link", function(e) {
    e.preventDefault();
  
    var hash = $(this).attr("href");
    if ($(hash).length === 0) {
      return;
    }
    //console.log($(hash).offset().top)
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800)
})

$(document).ready(function(){

  $("#wrap").scroll(function(){ 
    var height = $("#wrap").scrollTop(); //실시간으로 스크롤의 높이를 측정
    var fixedHeight=150;
    if(height > fixedHeight){ 
        $('.header').addClass('fixed'); 
    }else if(height < fixedHeight){ 
        $('.header').removeClass('fixed'); 
    } 
  });

});

	$(function(){  
		$("html, body").on('mousewheel DOMMouseScroll', function(e) {
			var E = e.originalEvent;
			delta = 0;
			if (E.detail) {
        delta = E.detail * -40;
        
			}else{
        delta = E.wheelDelta;
      };

      if(delta==120){
        
      }else if(delta==-120){
        
      }
		});
  });
  
var total_section = 0; //전체 원페이지 수
var current_idx = 0;
var screen_h = 0; // 화면 높이
var page_h = 0;
var last_y = 0; // 총스크롤 높이
var onpage_on = true;
var isScroll = false;
var sectionNum=0;
var thisId="";
var h=0;
var dump=0;
var isSuccess=false;

$(document).ready(function(){
	
	init();

	$(document).on("blur",".header .btn-wrap a", function(e){
		if(current_idx==0){
			console.log($(".section02").find("a").length);
			if($(".section02").find("a").length){
				onFocusAnchor($(".section02"));
			}else{
				onFindAnchor($(".section02"));
			}
		}else if(current_idx==1){
			if($(".section03").find("a").length){
				onFocusAnchor($(".section03"));
			}else{
				onFindAnchor($(".section03"));
			}
		}else if(current_idx==2){
			if($(".section05").find("a").length){
				onFocusAnchor($(".section05"));
			}else{
				onFindAnchor($(".section05"));
			}
		}else if(current_idx==3){
			if($(".section04").find("a").length){
				onFocusAnchor($(".section04"));
			}else{
				onFindAnchor($(".section04"));
			}
		}else if(current_idx==4){
			if($(".footer").find("a").length){
				onFocusAnchor($(".footer"));
			}else{
				onFindAnchor($(".footer"));
			}
		}
	})
	function onFocusAnchor(e){
		e.find("a").first().focus();
	}
	function onFindAnchor(e){
		e.nextAll(".section").find("a").first().focus();
	}

	$(".section").each(function(){
		if(!$(this).find("a").length){
			
		}
		$(this).find("a").first().focus(function(e){
			e.preventDefault();
			console.log("포커스를 얻음.");
			thisId=$(this).closest(".section").attr("id");
			dump=current_idx+1;
			if(thisId=="s02"){current_idx=1}
			else if(thisId=="s03"){current_idx=2}
			else if(thisId=="s05"){current_idx=3}
			else if(thisId=="s04"){current_idx=4}
			y = current_idx * page_h;	
			h = (dump-1) * page_h;	
			$("#wrap").scrollTop(h);
			$('#wrap').animate({scrollTop: y}, 1000, function(){
				isScroll=false;
				gnbAreaActive();
			});	
		})
		$(this).find("a").last().blur(function(){
			$(".header .logo_mask h1 a").first().attr("tabIndex","1").focus();
		});
	});
  
  $(".gnb_area li").on("click",function(event){
    $(".gnb_area li").removeClass("active");
    $(this).addClass("active");
    console.log(isScroll);
    	
    if(isScroll) return; // 현재 스크롤이 동작중이면 종료
    isScroll = true;
    sectionNum=$(this).index()+1;
    if(sectionNum==3){sectionNum=4}
    current_idx=sectionNum;
	y = current_idx * page_h;		
    $('#wrap').animate({scrollTop: y}, 1000, function(){isScroll=false;});	
  });
		
	// Scroll Event
	$('html').on('scroll touchmove mousewheel', function(event) {	
		if(last_y > $("#wrap").scrollTop() && !onpage_on){
			
			//원페이지 스크롤 진입
			console.log(":: 원페이지 시작 ::");
			onpage_on = true;
			isScroll = false;
		}
		
		if(!onpage_on) return;
		console.log(isScroll);
		//스크롤 이벤트 막기
		if(isScroll) return; // 현재 스크롤이 동작중이면 종료
		
		isScroll = true;		
		var direction = event.originalEvent.wheelDelta; //마우스 휠 방향
		var y = 0;

		if(direction > 0){
			// up
      current_idx --;
      if(current_idx < 0){current_idx = 0;}
			y = current_idx * page_h;
		}
		else{
			// down
			current_idx ++;
			if(current_idx > total_section){
				current_idx = total_section;
				onpage_on = false;
				return;
			}
			
			y = current_idx * page_h;		
		}

		$('#wrap').animate({scrollTop: y}, 1000, function(){
			isScroll=false;
			gnbAreaActive();
		});	
	});
	function gnbAreaActive(){
		$(".gnb_area li").removeClass("active");
		if(current_idx==1){
			$(".gnb_area li").first().addClass("active");
		}else if(current_idx==2){
			$(".gnb_area li").eq(1).addClass("active");
		}else if(current_idx==4){
			$(".gnb_area li").last().addClass("active");
		}
	}
});

$( window ).resize(function() {
	
	// 반응형
	setHeight();
});


function init(){
	
	setHeight();
	
  total_section = $('#wrap > .section').length;
  last_y = page_h * total_section;
}	

function setHeight(){
	
	// 높이 설정
	screen_h = document.body.clientHeight;
  page_h = screen_h - 0; // header 높이값을 빼주나, 현 페이지는 header와 section이 겹쳐진 상태임으로, 0을 준다.
	$("#wrap > .section").height(page_h);
}
