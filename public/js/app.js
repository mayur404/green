$(function(){
	
	setTimeout(function(){
		//adjust();
		if(loggedIn){
			transitDiv('loading','localPay');
		}else{
			transitDiv('loading','login');	
			localStorage.loggedIn = JSON.stringify(1);
		}
		
	},1500);
	
	$(".loginBtn").bind('mousedown',function(){
		transitDiv('login','main');		
	});

	$(".actionDrawer").bind('mousedown',function(){
		$(this).toggleClass('opened');
		if($(this).hasClass('opened')){
			openDrawer();	
		}else{
			closeDrawer();
		}
		
	});

	$(".username").bind('mousedown',function(){
		transitDiv('main','account');
	});
	$(".backToMain").bind('mousedown',function(){
		transitDiv('account','main');
	});

});


if(localStorage.loggedIn){
	loggedIn = JSON.parse(localStorage.loggedIn);
	console.log(loggedIn);
}else{
	localStorage.loggedIn = JSON.stringify(0);
	loggedIn = 0;
	console.log(loggedIn);
}

function adjust(){
	var height = $(".adjust").height();
	$(".adjust").css({'margin-top':-height/2});
}

function transitDiv(from,to){
        
        $("."+from).transition({opacity:0},400,function(){
        $("."+from).hide();
        $("."+to).show();
        $("."+to).css({opacity:0});
        $("."+to).transition({opacity:1},400);  
    });
    
}

function openDrawer(){
	$('.actionDrawer').transition({rotate:'45deg',scale:[0.8,0.8],opacity:0.5});
	$('.sendMoney').transition({rotate:'0deg',y:'-=80px'});
	$('.payLocal').transition({rotate:'0deg',y:'-=160px'});
}

function closeDrawer(){
	$('.actionDrawer').transition({rotate:'0deg',scale:[1,1],opacity:1});
	$('.sendMoney').transition({rotate:'-45deg',y:'0px'});
	$('.payLocal').transition({rotate:'-45deg',y:'0px'});
}