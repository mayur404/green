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

	$(".key").bind('mousedown',function(){
		$(this).toggleClass('keyPressed');
	}).bind('mouseup',function(){
		$(".payUser").removeClass('inactive');
		$(this).toggleClass('keyPressed');
		myClass = $(this).prop('className');
		keyUp = myClass.split(" ");
		key = keyUp[1].split('');
		if(key[1] == 'b'){
			string = string.substring(0,string.length - 1);
			pin = pin.substring(0,pin.length - 1);
		}else{
			string = string + key[1];	
			pin = pin + key[1];	
		}
		if(verifyOn){
			pinCount++;
			console.log("Hey");
			if(pinCount){
				//console.log('dotOne');
				$('.dot1').addClass('dotOn');
			}else if(pinCount == 2){
				$('.dot1').addClass('dotOn');
				$('.dot2').addClass('dotOn');
			}else if(pinCount == 3){
				$('.dot1').addClass('dotOn');
				$('.dot2').addClass('dotOn');
				$('.dot3').addClass('dotOn');
			}else if(pinCount == 4){
				$('.dot1').addClass('dotOn');
				$('.dot2').addClass('dotOn');
				$('.dot3').addClass('dotOn');
				$('.dot4').addClass('dotOn');
			}

		}else{
			$('.localPayValue').html(string);	
		}
		
		//console.log(string);
	});

	$(".payUser").bind('mouseup',function(){
		if(!$(this).hasClass('inactive')){
			//Enter Pin
			$(".payUser").html('VERIFY').addClass('verifyBtn');
			$(".blink").hide();
			$(".localPaySub").html('store please verify.');
			$('.localPay').addClass('localPayChange');
			$('.payUser').addClass('businessBtn');
			verifyOn = true;
			pin = '';
		}
	});


});

var string = '';
var pin = '';
var pinCount = 0;
var verifyOn = false;
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