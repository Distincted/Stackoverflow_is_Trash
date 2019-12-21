
var input_post = function(data){

return ''+
	$div({style: "padding: 7px; box-shadow: 0px 2px 2px darkcyan;" },
		$label({ "for":"pergunta" },'Digite Uma Classe: '
		 
		)+
		$textarea({ "type":"text","id":"pergunta","onkeyup":"createAntEnter()","class":"form-control","placeholder":"Crie Uma Classe..." },
			''
		 
		)+


		$input({ "id":"check_static","type":"checkbox","value":"1" },''	)+
		$label({}, 'Essa Classe não pode ser escolhida',"check_static" )+$br()+
		$input({ "id":"check_oposto","type":"checkbox","value":"1" },'' )+
		$label({}, 'Essa Classe não tem oposição',"check_oposto")+



		$input({ "id":"descript","type":"checkbox","value":"1", onclick: '($("#div_descript").css("display")=="none" )? ($("#div_descript").css("display","block")) : ($("#div_descript").css("display","none"));' },'' )+
		$label({}, 'Adicionar Descrição',"descript")+

	//	$template('txt_descript')+
		$div({style: 'display: none', id: 'div_descript'},
		//	$label({},'Descrição', 'description')+
			$textarea({class: 'form-control', placeholder: 'Digite Uma Descrição...', id: 'txt_descriptt'}

			)
		)+
		$button({ "class":"btn-success btn-block btn","id":"msgAnt_","onclick":"ask()" },'Acc'
		 
		)
		//+$input({id: "sel", value:"0", type:"hidden"})
	)
}

/*<script>*/

	function ask(){
		let aa = $('#pergunta').val();
		if(aa=='' || aa.trim()==''){
			return;
		}
		let sel = $('#sel').val();
	//	let like = $('#like').val()
	//	let unlike = $('#unlike').val()
	//	let bb = parseInt( 0 )
		let chave;
		if( $('#check_static').is(':checked') ){
			chave = 1;
		}else{
			chave = 0;
		}
		let descript;
		if( $('#descript:checkbox:checked').length==0){
			descript = '';
		}else{
			descript =  $('#txt_descriptt').val();
		}
		var antoni;
		if( $('#check_oposto:checkbox:checked').length==0){
			antoni = 1;
		}else{
			antoni =  0;
		}
		$.post( get_base_url("start/ask"),{pergunta: aa, chave: chave, divpai: sel, descript: descript, can_be_ant: antoni },function(data){
			data = JSON.parse(data);
		//	$vv(data.can_be_ant==0, 'input_post')
			var obj ={};
			obj[0] = {can_be_ant: 0};
//	$vv(data, 'input_post');
	
			$template('alisk_post',obj);
			$('#class_post').append(
				((data.can_be_ant==0)?(
					$template('li_post',data)
					+$div({ "class":"imgid" })

				):(
					$div({ "class":"itens","id":"__"+data.idd },
						$ul({ "class":"wind" },
							''+
						//	$input({id: "sel_antonima"})+
							$template('li_post',data)
							+$template('create_antonima',data.idd)
							+organizar_classe(data.idd)
						)
					)
					+$template('left_right',{idd: data.idd})
					
				))
				

			);
			$('#pergunta').val('');
			$('#txt_descriptt').val('');
			$('#pergunta').select();

		//	console.log(data)
		});
	//	return;

	}

/*</script>*/