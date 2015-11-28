$(function(){
	
	setTimeout(function(){
		//adjust();
		if(loggedIn){
			transitDiv('loading','main');
		}else{
			transitDiv('loading','login');	
			localStorage.loggedIn = JSON.stringify(1);
		}
		
	},1000);
	
	$(".loginBtn").bind('mousedown',function(){
		transitDiv('login','main');		
	});

	$(".actionInner").bind('mousedown',function(){
		$(this).toggleClass('opened');
		if($(this).hasClass('opened')){
			openDrawer();	
		}else{
			closeDrawer();
		}
		
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

}

function closeDrawer(){
	
}