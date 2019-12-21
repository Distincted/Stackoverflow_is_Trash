
var notifys = function(data, increment){
	if(data.length==0){
		return '';
	}
//	$vv(data, 'notifys');
	return(
		$ul({},
			$for((data1)=>{
				return '<a href="" >'+'<li>'+data1.text_people+'</li></a>';
			}, data	)
			+
			$div({ "style":"text-align: center;","class":"woerw" },
				$a({ "href":"","class":"color1" },'Ver Todas Notificações'
				 
				)
			)	
		)
	)
	
}

var nav_template = function(data, params=''){
	const jend = "javascript:;";
//	console.log(data)
//	console.log(params)
	var result;
	$.ajax({
		url: get_base_url('start/get_noti_full'),
		type: 'POST',
		async: false,
		cache: false,
		timeout: 3000,
		dataType: 'text',
		data: {validate: window.validate},
		error: function(){
		//	alert('Error08923490 ')
		//	return true;
		},
		success: function(data){ 
		//	result = JSON.parse(data);
		//	validate = noti.validate;

	//	$vv(result, 'nav_template');
			
		//	delete noti.validate;
		//	console.log();
		//	return false;
		}

	});
	return(
		$nav({class:"menuu navbar navbar-expand-sm navbar-darkk bg-darkk", style:""},
			$anchor({  class:"navbar-brand"},
				'',
				jend
			)+
			$button({style: 'background: #C1AC44;', class: "navbar-toggler", type:"button", 'data-toggle':"collapse", 'data-target':"#navbarNavAltMarkup", 'aria-controls':"navbarNavAltMarkup", 'aria-expanded':"false", 'aria-label':"Toggle navigation"},
				$span({ class:"navbar-toggler-icon"},
					''
				)
			)+
			$div({ class:"collapse navbar-collapse", id:"navbarNavAltMarkup"},
				$div({class:"navbar-nav"},
					$anchor({ class:"nav-item nav-link "},
						'Dashboard'+
					//	data['nome']+
						$span({class:"sr-only"},
							'(current)'
						)
						,get_base_url()
					)+
					$anchor({ class:"nav-item nav-link "},
						'Anúncios',
						get_base_url('ads/buy')
					)+
					$anchor({ class:"nav-item nav-link "},
						'Anunciar',
						get_base_url('ads/adscreate')
					)+
					$a({class:"nav-item nav-link ", "href": get_base_url("ads/my_ads")},
						'Meus Anúncios'
					)+
					$anchor({ class:"nav-item nav-link "},
						'Depositar',
						get_base_url('finance/depositar')
					)+
					
					
//##################1111111##############################
					$div({ href:jend, class:"menu-links npes", id: 'notify', onclick: 'open_noty(1)', style: 'color: burlywood;'},
						// notificacao
						$i({class:"fa fa-bell-o", style:"font-size:20px; margin-right: 10px; "},
							''
						)+
						$div({id:"res_npes"},
							''//+result.noti_notify_count
						)+
						$div({id:"show_npessssssssssss", class:"noting d-none", style:"margin-top: 15px;"},	
							$div({class: 'nano'},
								$div({class: 'nano-content'},
									$h3({},
										'Notificação'
									
									)+
									$hr()
									

								)
							)
						)
					)+
				
				
				//	$template('input_search')+
					$anchor({class:"nav-item nav-link", style:"float:right;"},
						'Sair'
						,get_base_url('start/logout')
					)+

					// trazido do fancy_template_btn :
					$div({'id':"page-content-wrapper" },
					
						$button({'type':"button",'class':"hamburger is-closed",'data-toggle':"offcanvas" },
							$span({'class':"hamb-top" },
								''
							)+
							$span({'class':"hamb-middle" },
								''
							)+
							$span({'class':"hamb-bottom" },
								''
							)
						
						)
					
					)
			

				)
			)
		)
	)
};

/*<script>*/
	var tempo;
	function search_go_enter(){
	//	tempo = clearSetInterval();
		document.getElementById("input_search").onkeypress = function(e) {
			if (e.keyCode == 13) {
				search_go();
				e.preventDefault();
			}
		}
	}
	function search_go(){
		var sea = $('#input_search').val();
		var base = "http://"+location.hostname+"/codeigniter/chatradio2"+"/start/search_go";
	//	alert(get_base_url('start/search_go?sea='+sea))
		window.location.href= get_base_url('start/search_go?sea='+sea)
	}

	var trigger = $('.hamburger'),
	overlay = $('.overlay'),
	isClosed = false;

	trigger.click(function () {
		hamburger_cross();
	});

	function hamburger_cross() {
//console.log('laskjlkjl')
		if (isClosed == true) {
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;
		} else {   
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}
	}
/*
	$(function(){
		var ee = false;
		var nav = $('.menuu');
		$(window).scroll(function(){

			if($(this).scrollTop()>55 && ee==true){
				$('#logado_com').css("margin-top","55px");
				nav.addClass('menu-fixo');
				ee =!ee;
			}else{
				if($(this).scrollTop()<55 && ee==false){
					$('#logado_com').css("margin-top","0px");
					nav.removeClass('menu-fixo');
					ee=!ee;
				}
			}

		});
	});
*/
	$('[data-toggle="offcanvas"]').click( function(){
		$('#wrapper').toggleClass('toggled');
			$('#wrapper').addClass('animating').delay(500).queue(function(){
			$(this).removeClass("animating").dequeue();
		});
	});

	
	function organizar_notify(){


		

	}

	function open_noty(val){
		var text= '';
		switch(val){
			case 1:
				//notiry
				text = 'notify';
				break;
			case 2:
				// batepapo
				text = 'batepapo';
				break;
			case 3:
				//bar_npes
				text = 'barnpes';
				break;
			default: 
				return;
		}
		var testing = ['notiry','batepapo','barnpes'];
		if( parseInt( $('#'+text+' #res_npes').html().trim())>0 ||true){

			$.post( get_base_url()+'/start/notify_number_people', {open: 1, type_text: text}, function(data){
				//'#res_npes',0);
				var retorno = JSON.parse(data);
				$('#res_npes').html( retorno['noti_people'] );
			});
			
			
		}
		var teste = $('#'+text+' div:nth-last-child(1)').attr('class');
	//	console.log(teste);
		if( teste=='noting d-none'){
			$('#'+text+' div:nth-last-child(1)').removeClass('d-none');
		}else{
			$('#'+text+' div:nth-last-child(1)').addClass('d-none');
		}
		
	}


/*</script>*/

/*<style>
	.navbar-darkk{background: #014546 none repeat scroll 0 0; box-shadow: 1px 1px 3px black;  margin: 1px auto 4px auto; }
	.noting{position: absolute; background: aliceblue; z-index: 1;}
	.nano-content{ box-shadow: 0px 2px 5px black; margin: 5px; padding: 13px;}
	.nano-content ul li{ height: 58px; box-shadow: 0px -9px 4px black; border-radius: 9px; padding: 7px; margin-bottom: 9px; }
		#navbarNavAltMarkup{ font-family: 'ZCOOL QingKe HuangYou', cursive; }
	
	.nav-link:hover{ background: gray; border-radius: 7px; color: ghostwhite; }

	.menu-fixo{ position: fixed; top: 0; z-index: 10; width: 100%; }
	.fa{ width: 20px; margin: 9px 7px;}	
	div.npes { cursor: pointer;  }
	div.npes:hover{ background: white; border-radius: 7px; box-shadow: 1px 1px 1px black; }
	div#show_npes{  background: white; position: absolute; display: none;  min-width: 13em; cursor: auto; z-index: 20;  padding: 4px; border: 1px solid #606060;  max-height: 572px; }
	div#bar_npes ul{ list-style: none; font-size: 11pt; font-family: "Times New Roman", Times, serif; width: 100%;    padding: 5px; position: relative; top: 1px; }
	div#show_npes ul li{ border: 1px solid black; margin: 1px; padding: 3px;  }
	div#res_npes{ position: absolute; font-family: Arial;  padding:2px 2px; background: #d00; color: #fff; font-size: 9px; border-radius:3px; z-index: 3; text-indent: 0px; }
	.notifs{ color: red; font-size:20px; }
	.notifc{ color: black; font-size:20px; }
	@media  screen and (max-width: 975px) {
		div#show_npes {
			min-width: 15em;
		}
	}





</style>*/