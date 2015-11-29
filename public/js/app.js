$(function(){
	
	setTimeout(function(){
		//adjust();
		if(loggedIn){
			transitDiv('loading','login');
			
		}else{
			transitDiv('loading','login');	
			localStorage.loggedIn = JSON.stringify(1);
		}
		
	},2500);
	
	$(".loginBtn").bind('mousedown',function(){
		transitDiv('login','main');		
	});

	$(".name").bind('mousedown',function(){
		person = $(this).children('green').html();
		$(".contactPay").html('sending to Mom');
		transitDiv('contact','sendPay');
	});

	$(".payLocal").bind('mousedown',function(){
		closeDrawer();
		transitDiv('main','localPay');		
	});

	$(".sendMoney").bind('mousedown',function(){
		closeDrawer();
		transitDiv('main','contact');		
	});

	$(".successHomeBtn").bind('mousedown',function(){
		transitDiv('otp','main');		
	});

	$(".usuccessHomeBtn").bind('mousedown',function(){
		transitDiv('otpOther','main');		
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
	$(".toMainContact").bind('mousedown',function(){
		transitDiv('contact','main');
	});

	$(".key").bind('mousedown',function(){
		if(!verifyOn){
			$(this).toggleClass('keyPressed');	
		}else{
			$(this).toggleClass('businessKey');
		}
		
	}).bind('mouseup',function(){
		$(".payUser").removeClass('inactive');
		if(!verifyOn){
			$(this).toggleClass('keyPressed');	
		}else{
			$(this).toggleClass('businessKey');
		}
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
			$('.dot').removeClass('dotOn');
			if(pinCount == 1){
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
				$('.verifyBtn').removeClass('inactive');
				verifyOn = false;
				verifySucess = true;
			}
		}else{
			if(!verifySucess){
				$('.localPayValue').html(string);		
			}
			
		}
		
		//console.log(string);
	});

	$(".payUser").bind('mouseup',function(){
		if(!$(this).hasClass('inactive')){
			//Enter Pin
			$(".payUser").html('VERIFY').addClass('verifyBtn');
			$(this).removeClass('payUser');
			$(".verifyBtn").addClass('inactive');
			$('.verifyBtn').bind('mouseup',function(){
				if($(this).hasClass('inactive')){
					console.log('test');
					completeLocalPayment();
				}
			});
			$(".blink").hide();
			$(".localPaySub").html('store please verify.');
			$('.localPay').addClass('localPayChange');
			$('.payUser').addClass('businessBtn');
			verifyOn = true;
			pin = '';
		}
	});

	$(".paySentUser").bind('mouseup',function(){
		completeDirectPayment();
	});

});

var string = '';
var pin = '';
var pinCount = 0;
var verifyOn = false;
var verifySucess = false;
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
function completeLocalPayment(){
	verifySucess = false;
	transitDiv('localPay','otp');
	setTimeout(function(){
				$('.otpTextInner').html('523419 it is!');
				$('.smallOtpText').html('we are just verifying it and you will be done in no time');
				setTimeout(function(){
					$('.otpTextInner').html('thank you for paying with us!');
					$('.smallOtpText').hide();
					$('.successHomeBtn').show();
					$('.anim').hide();
				},2000);
	},2500);
}

function completeDirectPayment(){
	verifySucess = false;
	transitDiv('sendPay','otpOther');
	setTimeout(function(){
				$('.otpTextInner').html('checking citrus balance!');
				$('.smallOtpText').html('once done the payment will complete automatically');
				setTimeout(function(){
					$('.otpTextInner').html('thank you for paying with us!');
					$('.smallOtpText').hide('remaining balance: Rs. 350');
					$('.usuccessHomeBtn').show();
					$('.anim').hide();
				},2000);
	},2500);
}