


 var  resMsg = function(id, id_ads,val){
		var msg =  $('#_msgres'+val+' div.askki textarea').val();

		if(msg=='' || msg.trim()==''){
			echomsg('Campo de Pergunta Está em Branco...', '#e_coments',4, 2);
			window.location.href = "#twerr_temp";
			
			return false;
		}
		 $.post( get_base_url("ads/sendMsg") ,{anuncio: id, msg: msg, divpai: id_ads}, function(data){
		//2 	$('#_msgres'+val).append(data);
		 	$('#_msgres'+val).after(
				$template('coments_anuncio', JSON.parse(data) )
			).hide().fadeIn(1000);
		 	setTimeout(()=>{
				$('#_msgres'+val+' div.askki').remove(); 
		 		
		 	},500);
		})
		 
	};
 var responder = function(id, id_ads,val){

		var aa =  $('#_msgres'+val+' div.askki').length;
		if(aa>=1){
			$('#_msgres'+val+' div.askki').fadeOut(1000);
			setTimeout(()=>{
				$('#_msgres'+val+' div.askki').remove();	
			},900);
			

			return;
		}else{
			var aux = $('div.askki');
			var bb = $('div.askki').length;
			if(bb==1){
				$.when( $('div.askki').fadeOut(3000) ).then(aux.remove());
			}
		}
		
		$('#_msgres'+val).append(
			$template('coment',{id: id, id_ads: id_ads, val: val})
		).hide().fadeIn(1000);
		$('#_msgres'+val+' div.askki > textarea').select(); 

	};

 var sendMsg = function(){
		var id = id_geral;
		var msg = $('#mensagemsend').val();
		if(msg=='' || msg.trim()==''){
			echomsg('Campo de Pergunta Está em Branco...', '#e_coments',4, 2);
			return false;
		}
		$.post( get_base_url('ads/sendMsg'), {anuncio: id, msg: msg}, function(data){
			$('#e_coments').append(
				$div({class:'askmsg colorrr'},
					$template('coments_anuncio', JSON.parse(data) )
				)
			);
		});
		$('#mensagemsend').val('');
	};

  var formatDollar = function(num) {
	num = parseFloat(num);
//	alert();
	var p = num.toFixed(2).split(".");
	var chars = p[0].split("").reverse();
	var newstr = '';
	var count = 0;
	for (var x in chars) {
		count++;
		if(count%3 == 1 && count != 1) {
			newstr = chars[x] + '.' + newstr;
		}else{
			newstr = chars[x] + newstr;
		}
	}
//	$vv( newstr + "." + p[1], 'buy formatDollar' );
 //var formatDollar = function(num) {
	return newstr + "," + p[1];
};


	var show_small_img = function(thiss){
//	$('.show-small-img').click(function() {
	
	$('#show-img').attr('src', $(thiss).attr('src'));
	$('#big-img').attr('src', $(thiss).attr('src'));
	var teste = $('#zoomteste > div > a').removeAttr().attr('onclick', 'seeImage("'+$(thiss).attr('src')+'")' );

	$(thiss).attr('alt', 'now').siblings().removeAttr('alt');
	$(thiss).css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'});
	if ($('#small-img-roll').children().length > 4) {
		if ($(thiss).index() >= 3 && $(thiss).index() < $('#small-img-roll').children().length - 1){
			$('#small-img-roll').css('left', -($(thiss).index() - 2) * 76 + 'px');
		} else if ($(thiss).index() == $('#small-img-roll').children().length - 1) {
			$('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px');
		} else {
			$('#small-img-roll').css('left', '0');
		}
	}
};

	var next_img = function(){
//	$('#next-img').click(function (){

	$('#show-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'));
	$('#big-img').attr('src', $(".show-small-img[alt='now']").next().attr('src'));
	$('#zoomteste > div > a').removeAttr().attr('onclick', 'seeImage("'+$("#big-img").attr('src')+'")' );
	// var aux = $(".show-small-img[alt='now']").next().attr('src');
	// var teste = $('#zoomteste > div > a').removeAttr().attr('onclick', 'seeImage("'+aux+'")' );
	//var test = $('<a>').attr('onclick','seeImage("'+aux+'")').attr('href','javascript:;');


	$(".show-small-img[alt='now']").next().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
	$(".show-small-img[alt='now']").next().attr('alt', 'now').siblings().removeAttr('alt')
	if ($('#small-img-roll').children().length > 4) {
		if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
			$('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
		} else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
			$('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
		} else {
			$('#small-img-roll').css('left', '0');
		}
	}
};

 var prev_img = function(){
	//$('#prev-img').click(function (){
	$('#show-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'));
	$('#big-img').attr('src', $(".show-small-img[alt='now']").prev().attr('src'));
	$('#zoomteste > div > a').removeAttr().attr('onclick', 'seeImage("'+$("#big-img").attr('src')+'")' );
	// var aux = $(".show-small-img[alt='now']").next().attr('src');
	// var teste = $('#zoomteste > div > a').removeAttr().attr('onclick', 'seeImage("'+aux+'")' );
//var teste = $('#zoomteste > div > a').attr('onclick',  );
//var aux = $('.show-small-img').attr("src");
//var test = $('<a>').attr('onclick','seeImage("'+aux+'")').attr('href','javascript:;');
	$(".show-small-img[alt='now']").prev().css({'border': 'solid 1px #951b25', 'padding': '2px'}).siblings().css({'border': 'none', 'padding': '0'})
	$(".show-small-img[alt='now']").prev().attr('alt', 'now').siblings().removeAttr('alt')
	if ($('#small-img-roll').children().length > 4) {
		if ($(".show-small-img[alt='now']").index() >= 3 && $(".show-small-img[alt='now']").index() < $('#small-img-roll').children().length - 1){
			$('#small-img-roll').css('left', -($(".show-small-img[alt='now']").index() - 2) * 76 + 'px')
		} else if ($(".show-small-img[alt='now']").index() == $('#small-img-roll').children().length - 1) {
			$('#small-img-roll').css('left', -($('#small-img-roll').children().length - 4) * 76 + 'px')
		} else {
			$('#small-img-roll').css('left', '0');
		}
	}
};



 var seeImage = function(valor){
//	$vv(valor, 'veranuncioget33')
	$('#saida3').html($template('modal_img', valor) );
	
};


/*
 var  resMsg = function(id, id_ads,val){
		var msg =  $('#_msgres'+val+' div.askki textarea').val();
		 $.post( get_base_url("start/sendMsg") ,{anuncio: id, msg: msg, divpai: id_ads}, function(data){
		//2 	$('#_msgres'+val).append(data);
		 	$('#_msgres'+val).after(
				$template('coments_anuncio', JSON.parse(data) )
			).hide().fadeIn(1000);
		 	run_script(()=>{
				$('#_msgres'+val+' div.askki').remove(); 
		 		
		 	},500);
		})
		 
	};
 var responder = function(id, id_ads,val){
		var aa =  $('#_msgres'+val+' div.askki').length;
		if(aa>=1){
			$('#_msgres'+val+' div.askki').fadeOut(1000);
			run_script(()=>{
				$('#_msgres'+val+' div.askki').remove();	
			},900);
			

			return;
		}else{
			var aux = $('div.askki');
			var bb = $('div.askki').length;
			if(bb==1){
				$.when( $('div.askki').fadeOut(3000) ).then(aux.remove());
			}
		}
		
		$('#_msgres'+val).append(
			$template('coment',{id: id, id_ads: id_ads, val: val})
		).hide().fadeIn(1000);
		$('#_msgres'+val+' div.askki > textarea').select(); 

	};

*/