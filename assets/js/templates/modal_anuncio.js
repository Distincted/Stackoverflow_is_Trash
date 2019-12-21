

var coment = function(data){
//	$vv(data.id_ads, 'coment')
	return(
		$div({ "class":"askki" },
			''+
		 	$textarea({ "style":"width: 100%;","class":"form-control txtarea","placeholder":"Digite sua pergunta..." },
				''
		 		
			)+
			$button({ "class":"btn btn-success","onclick":"resMsg("+data.id_ads+","+data.id+","+data.val+")" },
				'Postar'
			)	
		)
	)
};


var coments_anuncio = function(data){
//	$vv(data, 'coments_anuncio')
	return(
	 	$div({ "class":"border "+((data.local_child==null)?('msgpadd'):('msgres')),"id":"_msgres"+data.id },
			$div({},
				$h6({},
					''+data.mensagem
				)
			)+							
			$h6({},
				'Postado por: d............f1'+
					$br()+
					$a({ "href":"javascript:;","onclick":"responder("+data.local+","+data.anuncio_id+","+data.id+")" },
					'Responder'
				)							
			)+
			$h6({},
				''+data.date
			)		
		)
	)	
};

 modal_anuncio = function(data){
 	//	$vv(data, 'modal_anuncio')


	return(
		$div({ "class":"modal fade bd-example-modal-lg hide","tabindex":"-1","role":"dialog","aria-labelledby":"myLargeModalLabel","style":"padding-right: 16px; display: block; " },
			$div({ "id":"saida3" },''
			)+
			$div({ "class":"modal-dialog modal-lg",style: 'min-width: 98%;' },''+
				$div({ "class":"modal-content" },''+
					$div({ "class":"modal-header" },''+
						$h5({ "class":"modal-title","id":"exampleModalLongTitle" },''
						)+
						$h1({ },''+data.ask[0].nomeanuncio
						)+
						$button({ "type":"button","class":"close btn-danger","data-dismiss":"modal","aria-label":"Close", onclick: '' },''+
							$span({ "aria-hidden":"true" },'×'
							)
						)
					)+
					$div({ "class":"modal-body" },''+
						$div({ "class":"container color2" },''+
							$div({ "class":"row border" },''+
								$div({ "class":"col-md-7","id":"zoomteste","style":"margin-bottom: -114px; " },''+
									$div({ "style":"margin: 150px auto; max-width: 960px; margin-top: -1px;","class":"" },''+
						
										$div({ "class":"show","href": (null==data.ask[0].photo_first)?(get_base_url("assets/default.png")): get_base_url("uploads/"+data.ask[0].photo_first),"style":"position: relative;" },''+
											((data.ask[0].photo_first!=null)?(

												$img({ "id":"show-img", onclick: "show_small_img(this)", "src": get_base_url("assets/uploads/")+data.ask[0].local ,"alt":"now","style":"border: 1px solid rgb(149, 27, 37); padding: 2px;" })
											):(
												$img({ "class":"show-small-img", onclick: "show_small_img(this)", "src":get_base_url("assets/default.png"),"alt":"Sem foto","style":"border: 1px solid rgb(149, 27, 37); padding: 2px;" },'')
											))
										)+
									
										$div({ "class":"small-img" },
											
											$div({ "class":"small-container" },
												$div({ "id":"small-img-roll" },
													
													$for((valor)=>{
													//	$vv(valor, 'for modal_anuncio')
														return $if(valor.photo_first==null,()=>{

															return $img({ "class":"show-small-img", onclick: "show_small_img(this)", "src": get_base_url("assets/default.png"),"alt":"Sem foto","style":"border: 1px solid rgb(149, 27, 37); padding: 2px;" },'')
															
														},()=>{

															return  $img({ "class":"show-small-img", onclick: "show_small_img(this)", "src": get_base_url("assets/uploads/")+valor.local ,"alt":"now","style":"border: 1px solid rgb(149, 27, 37); padding: 2px;" },'')
															
															
														})
													
													}, data.ask)
												)

											)+
											$div({},
												$img({ "src":"http://localhost/codeigniter/fatoc/assets/img/online_icon_right@2x.png","class":"icon-left","alt":"","id":"prev-img", onclick: 'prev_img()' },''
												)+
												$img({ "src":"http://localhost/codeigniter/fatoc/assets/img/online_icon_right@2x.png","class":"icon-right","alt":"","id":"next-img", onclick: 'next_img()' },''
												)

											)
										)
									)
									
									
								)+
								$div({ "class":"col-md-5" },''+
									$div({ "style":"border: 1px solid rgba(97,127,137,0.27);; padding: 5px; margin-top: 10px;" },''+
										$h1({ },'Preço: R$ '+formatDollar(data.ask[0].preco)
										)+
										
										$h3({ },'Localização: '
										)+
										$h4({ },'Quantidade: '+
											$input({ "type":"number","value":"1","class":"form-control" },''
				 
											)+
											$hr({ },''
											)
										)
										+$button({class: 'btn btn-success'},'Comprar')
									)
								)
							)+
							$div({ "class":"row" },''+
								$div({ "class":"col-md-12" },''+
									$hr({ },''
									)+
									$h2({ },'Descrição:'
									)+
									$div({ "class":" border","style":"background: rgba(97,127,137,0.07); border-radius: 3px; min-height: 100px; padding: 10px;" },'Paisagem bonita			'
									)+
									$hr({ },''
									)+
									$h4({ },'Perguntas:'
									)+
									$div({ "class":"","id":"e_coments" },''+
										$if(data.coments.length>0, ()=>{
											return $div({ "class":"colorrr askmsg" },
												$foreach_template('coments_anuncio', data.coments, 'desc')
											)
										},()=> '')
									)
									
								)
							)
						)
					)+
					//run_script(()=>{ delete modal_anuncio;},200)
					$div({ "class":"modal-footer" },''+
						$button({ "type":"button","class":"btn btn-secondary","data-dismiss":"modal", onclick: '' },'Close'
						)
					)
				)
			)
		)
	)
};

/*<script>*/
	

	function seeImage(valor){
	//	$vv(valor, 'veranuncioget33')
		$('#saida3').html($template('modal_img', valor) )
		
	}
	function comprarAcc(){
		alert();
	}

	$(document).ready(function(){
		var id = 2;
	//	$.post( get_base_url('start/mensagerads') , {anuncio: id},'.askmsg', 2);







	});
	$('.show-small-img:first-of-type').css({'border': 'solid 1px #951b25', 'padding': '2px'});
	$('.show-small-img:first-of-type').attr('alt', 'now').siblings().removeAttr('alt');
	
// $import_func(get_base_url('assets/js/functions/helper.js'), 'show_small_img, next_img, prev_img' );
//	$import_func(get_base_url('assets/js/functions/helper.js'), 'formatDollar' );
/*</script>*/

/*<style>
.askmsg{ box-shadow: 1px 1px 1px black; border-radius: 7px; padding: 7px;  }
.askmsg h8{ font-size: 7pt;  }
.msgres{ padding-left: 30px; margin: 5px; }
.msgpadd{ padding: 5px; }

.small-img{
	width: 298px;
	height: 70px;
	margin-top: 10px;
	position: relative;
	left: -6px;
}
.small-img .icon-left, .small-img .icon-right{
	width: 12px;
	height: 24px;
	cursor: pointer;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
}
.small-img .icon-left{
	transform: rotate(180deg);
	background: beige;	width: 30px; height: 30px;	border-radius: 15px;	padding: 5px;
}
.small-img .icon-right{
	background: beige;	width: 30px; height: 30px;	border-radius: 15px;	padding: 5px;
	right: 0;
}
.small-img .icon-left:hover, .small-img .icon-right:hover{
	opacity: .5;
}
.small-container{
	width: 310px;
	height: 70px;
	overflow: hidden;
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
}
.small-container div{
	width: 800%;
	position: relative;
}

.small-container .show-small-img{
	width: 70px;
	height: 70px;
	margin-right: 6px;
	cursor: pointer;
	float: left;
}
.small-container .show-small-img:last-of-type{
	margin-right: 0;
}

#small-img-roll{  }

#big-img{  }


</style>*/