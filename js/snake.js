$(function(){
	var changjing = $(".changjing");
	var end= $(".end");
	var t = 1;
	var model =500;
	var shiwu;
	var she = [
		{x:10,y:10},
		{x:10,y:11},
		{x:10,y:12}
	];
	var shebiao = {
		"10_10":true,
		"10_11":true,
		"10_12":true
	};
	var stars = 0;
	var fangxiang="you";
	var key =39;
	var state = "play";
	var p = $(".pause");
	init();

	function init(){
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				var g = Math.floor(Math.random()*256);
				var b = Math.floor(Math.random()*30);
				var divs = $("<div>")
				.addClass("back")
				.attr("id",i+"_"+j)
				.css({backgroundImage:'url(img/back.jpg)'})
				.appendTo(changjing);
				divs.wrapInner("<div class='inner' id="+i+"-"+j+"></div>");
			}
		}

		she = [
			{x:10,y:10},
			{x:10,y:11},
			{x:10,y:12}
		];
		for(var i=0; i<she.length; i++){
			if(i==she.length-1){
				$('#'+she[i].x+'-'+she[i].y).addClass("shetou");
				continue;
			}
			$('#'+she[i].x+'-'+she[i].y).addClass("she");
		}
		shiwu = fangshiwu();
	}

	for(var i=0;i<20;i++){
		$("<div>").addClass("worm dongqilai").prependTo($(".bao1"));
	}
	for(var i=0;i<20;i++){
		$("<div>").addClass("worm1 fanxiang").prependTo("body");
	}
	function move(){
		var jiutou = she[she.length-1];
		if(fangxiang == "you"){
			var xintou = {x:jiutou.x,y:jiutou.y+1};
			var yidong=$('#'+(parseInt(xintou.x)+1)+'_'+(parseInt(xintou.y)));
      		var yidong2=$('#'+(parseInt(xintou.x)-1)+'_'+(parseInt(xintou.y)));

			$("#"+xintou.x+"-"+xintou.y).attr('class','shetou');
			$("#"+xintou.x+"-"+xintou.y).addClass("shetouyou");

      		yidong.animate({top:10}).delay(300).animate({top:0});
      		yidong2.animate({bottom:10}).delay(300).animate({bottom:0});
		}
		if(fangxiang == "zuo"){
			var xintou = {x:jiutou.x,y:jiutou.y-1};
			var yidong = $('#'+(parseInt(xintou.x)+1)+'_'+(parseInt(xintou.y)));
      		var yidong2 = $('#'+(parseInt(xintou.x)-1)+'_'+(parseInt(xintou.y)));

			$("#"+xintou.x+"-"+xintou.y).attr('class','shetou');
			$("#"+xintou.x+"-"+xintou.y).addClass("shetouzuo");
      		yidong.animate({top:10}).delay(300).animate({top:0});
      		yidong2.animate({bottom:10}).delay(300).animate({bottom:0});
		}
		if(fangxiang == "shang"){
			var xintou = {x:jiutou.x-1,y:jiutou.y};
			var yidong=$('#'+(parseInt(xintou.x))+'_'+(parseInt(xintou.y)-1));
      		var yidong2=$('#'+(parseInt(xintou.x))+'_'+(parseInt(xintou.y)+1));
			
			$("#"+xintou.x+"-"+xintou.y).attr('class','shetou');
			$("#"+xintou.x+"-"+xintou.y).addClass("shetoushang");
      		yidong.animate({right:10}).delay(300).animate({right:0});
      		yidong2.animate({left:10}).delay(300).animate({left:0});
		}
		if(fangxiang == "xia"){
			var xintou = {x:jiutou.x+1,y:jiutou.y};
			var yidong=$('#'+(parseInt(xintou.x))+'_'+(parseInt(xintou.y)-1));
      		var yidong2=$('#'+(parseInt(xintou.x))+'_'+(parseInt(xintou.y)+1));
			
			$("#"+xintou.x+"-"+xintou.y).attr('class','shetou');
			$("#"+xintou.x+"-"+xintou.y).addClass("shetouxia");
      		yidong.animate({right:10}).delay(300).animate({right:0});
      		yidong2.animate({left:10}).delay(300).animate({left:0});
		}

		if(xintou.x <0 || xintou.x>19 || xintou.y<0 || xintou.y>19){
			clearInterval(t);
			btnPlay.addClass("pausee");
			end.addClass("endjiemian");
			endTime();
			state = "over";
			return;
		}
		for(var i=0;i<she.length;i++){
			if((xintou.x==she[i].x)&&(xintou.y == she[i].y)){
				state = "over";
				clearInterval(t);
				btnPlay.addClass("pausee");
				endTime();
				var daoshuer = she[she.length-1];
				$("#"+daoshuer.x+"-"+daoshuer.y).addClass("she").removeClass("shetou");
				end.addClass("endjiemian");
				return;
			}
		}
		she.push(xintou);
		shebiao[xintou.x+"_"+xintou.y] = true;

		for(var i=0; i<she.length; i++){
			if(i==she.length-1){
				continue;
			}
			$('#'+she[i].x+'-'+she[i].y).addClass("she").removeClass("shetou");
		}

		if(xintou.x == shiwu.x && xintou.y == shiwu.y){
			stars += 1;
			$(".state .star").html(stars);
			$("#"+shiwu.x+"-"+shiwu.y).addClass("she");
			$("#"+shiwu.x+"-"+shiwu.y).removeClass("shiwu");
			shiwu = fangshiwu();
		}else{
			var weiba = she.shift();
			$('#'+weiba.x+'-'+weiba.y).removeClass("shetou").removeClass("she");
			delete shebiao[weiba.x+"_"+weiba.y];
		}
	}

	function fangshiwu(){
		do{
			var a = Math.floor(Math.random()*20);
			var b = Math.floor(Math.random()*20);
		}while(shebiao[a+"_"+b]);

		var shiwu = {x:a,y:b};

		$("#"+shiwu.x+"-"+shiwu.y).addClass("shiwu");
		return {x:shiwu.x,y:shiwu.y};
	}

	$(document).on("keydown",function(e){
		e.preventDefault();
		if(Math.abs(key-e.keyCode) == 2){
			return;
		}
		if(e.keyCode == 32){
			if(state=="play"){
				p.addClass("pauseShow");
				btnPlay.addClass("pausee");
				pause();
			}else if(state == "pause"){
				p.removeClass("pauseShow");
				btnPlay.removeClass("pausee");
				start();
			}
		}
		if(e.keyCode == 37){
			fangxiang = "zuo";
			key = e.keyCode;
		}
		if(e.keyCode == 39){
			fangxiang = "you";
			key = e.keyCode;
		}
		if(e.keyCode == 38){
			fangxiang = "shang";
			key = e.keyCode;
		}
		if(e.keyCode == 40){
			fangxiang = "xia";
			key = e.keyCode;
		}
	});

	var rest = $(".restart");
	rest.on("click",function(){
		restart();
	});

	function restart(){
		for(var i=0;i<she.length;i++){
			$('#'+she[i].x+'-'+she[i].y).removeClass("shetou she");
		}
		$("#"+shiwu.x+"-"+shiwu.y).removeClass("shiwu");

		end.removeClass("endjiemian");
		she = [
			{x:10,y:10},
			{x:10,y:11},
			{x:10,y:12}
		];
		for(var i=0; i<she.length; i++){
			if(i==she.length-1){
				$('#'+she[i].x+'-'+she[i].y).addClass("shetou");
				continue;
			}
			$('#'+she[i].x+'-'+she[i].y).addClass("she");
		}
		shiwu = fangshiwu();
		fangxiang="you";
		state="over";
		btnPlay.removeClass("pausee");
		t =setInterval(move,model);
		stars = 0;
		$(".state .star").html(0);
		startTime();
	}
	function start(){
		clearInterval(t);
		btnPlay.removeClass("pausee");
		p.removeClass("pauseShow");
		$(".worm").removeClass("dongqilai");
		$(".worm1").removeClass("fanxiang");
		t =setInterval(move,model);
		startTime();
		state="play";
	}

	function pause(){
		clearInterval(t);
		btnPlay.addClass("pausee");
		p.addClass("pauseShow");
		$(".worm").addClass("dongqilai");
		$(".worm1").addClass("fanxiang");
		endTime();
		state="pause";
	}

	var  startGame = $(".startGame");
	startGame.on("click",function(e){
		e.preventDefault();
		$(".kaishi").addClass("kaishihide");
		start();
		state="play";
	});
	function startTime(){
		clearInterval(tt);
		tt = setInterval(jishi,1000);
	}
	function endTime(){
		clearInterval(tt);
	}
	var tt;
	var time=0;
	var min=0;
	var second=0;
	function jishi(){
		if(state=="over"){
			time = 0;
			min=0;
			second=0;
			$(".jishi span").html("0:00");
		}
		time +=1;
		second=time%60;
		if(time%60 == 0){
			min = parseInt(min);
			min += 1;
			min = (min<10)?'0'+min:min;
		}
		second = (second<10)?'0'+second:second;
		$(".jishi span").html(min +':'+second);
		state="play";
	}

	var btnPlay = $(".state .play");
	btnPlay.on("click",function(){
		if(state=="play"){
			pause();
		}else if(state=="pause"){
			start();
		}
	});


	var easy = $(".easy");
	var medium = $(".medium");
	var hard = $(".hard");
	easy.on("click",function(e){
		e.stopPropagation();
		model = 800;
		start();
		$(".kaishi").addClass("kaishihide");
		state="play";
	});
	medium.on("click",function(e){
		e.stopPropagation();
		model = 500;
		start();
		$(".kaishi").addClass("kaishihide");
		state="play";
	});
	hard.on("click",function(e){
		e.stopPropagation();
		model = 200;
		start();
		$(".kaishi").addClass("kaishihide");
		state="play";
	});

	var startMenu = $(".startMenu");
	startMenu.on("click",function(){
		$(".kaishi").removeClass("kaishihide");
		end.removeClass("endjiemian");
		for(var i=0;i<she.length;i++){
			$('#'+she[i].x+'-'+she[i].y).removeClass("shetou she");
		}
		$("#"+shiwu.x+"-"+shiwu.y).removeClass("shiwu");
		$('.changjing').empty();
		init();
		model =500;
		$(".worm").addClass("dongqilai");
		$(".worm1").addClass("fanxiang");
	});



})