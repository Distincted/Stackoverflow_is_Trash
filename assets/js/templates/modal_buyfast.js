
var voltar_confirm_ = function(data){
	return(
		$div({ "class":"modal-body" },''+
			$div({ "id":"result_pay" },

				$div({ "class":'csfc' },
					
					
					$br()+
					$label({ "for":"" },
						'Digite o id do vendedor: '
					)
					+$input({ "id":"id_seller","type":"number","class":"form-control","value":""+data.id_buy },
						''
					)+
					$br()+
					$label({ "for":"" },
						'Digite o valor: '
					)
					+$input({ "id":"valor_seller","value":""+ data.valor_buy,"type":"text","onkeyup":"calcvalor()","class":"form-control" },
						''
					)+
					$div({},
						$h1({ "id":"price_value" },
						''
						)
					)														
					+$br()+
					$button({ "type":"button","class":"btn btn-success","onclick":"avancar()" },
						'Avançar'
					)														
				)
			)
		)
	);
};

var confirm_buy = function(data){

	var number_user = parseFloat( data.price );
	var number_for = (number_user * 10 /100);
	var number_total = (number_user * 10 /100)+number_user;

	$vv(data, 'modal_buyfast confirm_buy')
	return(
		$div({ "id":"result_pay" },
			''+
		 	$h1({class: 'btn-success'},
				'Você está certo que quer transferir R$ '+formatMoney( number_user )+' para '+data.nome+' e R$ '+formatMoney(number_for )+' para o seu FC?(Total: R$ '+formatMoney( number_total )+').'
			)+
			$h2({},
				'Você está certo disso?'
			
			)+
			$label({ "for":"" },
				'Digite sua senha:'
			)

			+$div({id: 'box_field'},
				$button({class: 'btn btn-secondary', onclick: 'more_one()'},
					'+'
				)+
				$button({class: 'btn btn-secondary', onclick: 'minus_one()'},
					'-'
				)+
				$input({id: 'pass_result', type: 'hidden'},
					''
				)+
				$label({class: 'badge badge-secondary', id: 'row_pass'},
					''

				)
			)+
			$div({id: 'pass_exit'})+
			$button({class: 'btn-warning', id: 'btn_change', onclick: 'see_pass()'},'Mostrar Senha')+


			
			$input({ "type":"hidden","value":data.id,"id":"confirm_id" },
				''
			)+
			$input({ "type":"hidden","value": data.name,"id":"confirm_nome" },
				''
			)+
			$input({ "type":"hidden","value":data.price,"id":"confirm_price" },
				''
			)+
			$input({ "type":"hidden","value":"csrf","id":"confirm_confirm" },
				''
			)+
			$button({ "class":'btn btn-success', onclick: "confirm_transfer(1)" },
				'Confirmar '
			)+
			$button({ "class":'btn btn-danger', onclick: "voltar_confirm()" },
				'Voltar'
			)		
		)
	);
};


var modal_buyfast = function(data){
//	$vv(data)
	return(
		$div({ "class":"modal fade bd-example-modal-lg hide","tabindex":"-1","role":"dialog","aria-labelledby":"myLargeModalLabel","style":"padding-right: 16px; display: block; " },
			$div({ "id":"saida3" },''
			)+
			$div({ "class":"modal-dialog modal-lg",style: 'min-width: 98%;' },''+
				$div({ "class":"modal-content" },''+
					$div({ "class":"modal-header" },''+
						$h5({ "class":"modal-title","id":"exampleModalLongTitle" },''
						)+
						$h1({ },'Transferir/Comprar'
						)+
						$button({ "type":"button","class":"close btn-danger","data-dismiss":"modal","aria-label":"Close", onclick: '' },''+
							$span({ "aria-hidden":"true" },'×'
							)
						)
					)+
					$div({ "class":"modal-body" },''+
						$div({ "id":"result_pay" },
	
							$div({ "class":'csfc' },
								
								
								$br()+
								$label({ "for":"" },
									'Digite o id do vendedor: '
								)
								+$input({ "id":"id_seller","type":"number","class":"form-control","value":""+data.id_buy },
									''
								)+
								$br()+
								$label({ "for":"" },
									'Digite o valor: '
								)
								+$input({ "id":"valor_seller","value":""+ data.valor_buy/*.replace(',','.')*/ ,"type":"text","onkeyup":"calcvalor()","class":"form-control" },
									''
								)+
								$div({},
									$h1({ "id":"price_value" },
									''
									)
								)														
								+$br()+
								$button({ "type":"button","class":"btn btn-success","onclick":"avancar()" },
									'Avançar'
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
	);
};


/*<script>*/
	var field_pass = 1;
	function open_field(){
		var txt = '';
		for(var i =0; i< field_pass;i++){
			txt += $template('password_',i)
		}
		$('#pass_exit').html( txt );
	}

	function see_pass(){
		for(var i = 0; i<field_pass;i++){
			if( $('#pass_'+i).attr('type')=='password' ){
				$('#pass_'+i).attr('type', 'text');
			}else{
				$('#pass_'+i).attr('type', 'password');
			}
		}
		if( $('#btn_change').attr('class')=='btn-warning' ){
			$('#btn_change').attr('class','btn-success')
			$('#btn_change').html('Ocultar Senha')
		}else{
			$('#btn_change').attr('class','btn-warning')
			$('#btn_change').html('Mostrar Senhas')

		}
	}

	function more_one(val=''){
		if(field_pass!=4){
			$('#pass_exit').append( $template('password_',field_pass) )
			increment_pass();
			$('#row_pass').html( $h2({},'Total de Linhas: '+field_pass+'.'))
		}	
	}
	function minus_one(val=''){
		if(field_pass!=0){
			let temp = field_pass-1;
			$('#field'+temp).remove();
			decrement_pass();
			$('#row_pass').html( $h2({},'Total de Linhas: '+field_pass+'.'));
		}	
	}
	function increment_pass(){
		field_pass = field_pass +1;
		return '';
		
	}
	function decrement_pass(){
		field_pass = field_pass -1;
		return '';
	}

	function att_pass(){
		var tss ='';
		for(var i = 0; i<field_pass;i++){
			if($('#pass_'+i).val()==''){
				return false;
			}
			tss += $('#pass_'+i).val()+i;

		}
		tss = sha512(tss);
		return tss;
	//	$('#pass_result').val(tss);
	}

	function confirm_transfer(val){
		const id = $('#confirm_id').val();
		const nome = $('#confirm_nome').val();
		const price = $('#confirm_price').val();
	//	var password = $('#pass_seller').val();
		const password = att_pass();
	//	$vv(password), 'modal_buyfast confirm_transfer';
	//	var valcon = $('#confirm_confirm').val();
		//console.log(password);
		$.post( get_base_url('finance/buyfast_three') , { id: id, price: price, nome: nome, confirm: val, password: password }, function(data){
			var result = JSON.parse(data);
			switch(result.code){
				case 0:
					delete result.code;
					echomsg(result.message, '.modal-body', 0, 2	);
					break;
				case 1:
					delete result.code;
					$('.modal-body').html(
						$div({class: 'btn btn-success btn-block'}, result.message	)
					)
				//	echomsg(result.message, '', 1);
					break;
			}
		});
	}

	function voltar_confirm(){
		
		var id = $('#confirm_id').val();
		var nome = $('#confirm_nome').val();
		var price = $('#confirm_price').val();
		var val = $('#confirm_confirm').val();
		$.post( get_base_url('finance/voltar_confirm') , { id: id, price: price, nome: nome, confirm: val}, function(data){
			var result = JSON.parse(data);
			
			$('.modal-body').html(
				$template('voltar_confirm_', result)
			)

			// run_script(()=>{
			// 	$('.modal').modal('show');
			 	setTimeout(()=>{
			 		calcvalor()
			 	},578);
			// //	$('.show').zoomImage();
			// },500)
		});
	//	$('#result_pay').html(test);
	}

	function avancar(){
		var id = $('#id_seller').val();
		var price = $('#valor_seller').val();
		if(price<100){
			alert('Valor tem que ser maior que 99');
			return
		}

		var aa = price.toString();
			aa = aa.replace(/\./g,'#&#');
			aa = aa.replace(',','.'); 
			price = aa.replace(/\#\&\#/g,'');

//console.log(price)
	//1	var valor = document.querySelector('input[name="fator"]:checked').value;


		var password = $('#pass_seller').val();
		// $vv( id,'avancar')
		// $vv( price,'avancar')
		// $vv( password,'avancar')

		$.post(get_base_url('finance/buyfast_two'), { id: id, price: price, password: password }, function(data){
		//	$('.modal-content').html(
			var result = JSON.parse(data);
			switch(result.code){
				case 0:
					delete result.code;
						echomsg( result.message, '#result_pay', 0,2 )
					
					break;
				case 1:
					delete result.code;
					$('#result_pay').html(
						$template('confirm_buy', JSON.parse(result.message).dados )
					);
					setTimeout(()=>{
						open_field()
					},500)
					break;
				default:

					break;
			}
		});
	}
	function formatMoney(n, c, d, t) {
		var c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "," : d,
		t = t == undefined ? "." : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;

		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};

	function calcvalor(){
	//1	var valor = document.querySelector('input[name="fator"]:checked').value;
		var price =  $('#valor_seller').val();


		var id_reference = '#valor_seller';
		$(id_reference).mask('#.##0,00', {reverse: true});
		if($(id_reference).val()==''){
			$(id_reference).val('0,00');
		}
	//	console.log($('#ver_valor').val().length);

		if($(id_reference).val().length==1){
			var cc = $(id_reference).val();
			cc = '0,0'+cc;
			$(id_reference).val(cc);
		}
		if($(id_reference).val().length==2){
			var cc = $(id_reference).val();
			cc = '0,'+cc;
			$(id_reference).val(cc);
		}
	//	return;
		var l = $( id_reference );
		if(l.value == ''){ console.log('Error'); return;}
		for ( var i = 0; i < l.length; i++ ) {
			while( l[i].value.length > 1 && l[i].value.substring( 0, 1 ) == '0' && l[i].value.substring( 0, 2 ) != '0,' ) {
				var s = l[i].selectionStart;
				l[i].value = l[i].value.substring( 1 );
				l[i].selectionEnd = l[i].selectionStart = s - 1;
			}
		}
	//	price = parseFloat(price);
	
		var aa = price.toString();
		aa = aa.replace(/\./g,'#&#');
		aa = aa.replace(',','.'); 
		pricee = aa.replace(/\#\&\#/g,'');
	// console.log('aa='+aa);
	//console.log('pricee1 ='+pricee);
		var pricee = arredondar((pricee*10/100)+parseFloat(pricee), 2);
		function arredondar(str, casas) {
		//	str = toString(str);
		//    if (str.indexOf(',') != -1) str = str.replace(',', '.');
		    if (!casas) casas = 0;
		    casas = Math.pow(10, casas);
		    str = parseFloat(str) * casas;
		    return Math.floor(str) / casas;
		}

		
//	console.log('pricee2 ='+pricee);
		var aux =  arredondar(pricee*100/1100,2);
//	console.log('aux='+aux);
		$('#price_value').html('Preço Total: R$ '+formatMoney(pricee.toFixed(2))+'. | Irá para o site: '+formatMoney(aux.toFixed(2))+' | irá para o comprador: R$ '+price+'. Total de FC ganhado.' );
		
	//	$(exittt).prepend(codigo);
	}

/*</script>*/


/*<style>
	
	.nodal{
		opacity: 1;
		background: white;
		position: fixed;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: 10;
	}
	.nodaldirect{ 
		position: absolute;
		max-height: calc(207vh - 210px);
		overflow-y: auto;
		background-color: rgba(200, 200, 200, 0.75);
		z-index:2060;
		background-color: #fefefe;
		padding: 5px;
		border: 1px solid #888;
		height: 100%;
		width: 100%;

	}
	.nodal-close {
		opacity: .5;
		color: #000;
		line-height: 50px;
		font-size: 80%;
		position: absolute;
		left: 0px;
		right: 0;
		text-align: center;
		top: 0;
		width: 70px;
		text-decoration: none;
		font-size: 15pt;

	}
	.nodal-close:hover {
		color: #000;
		opacity: .9;
	}

	.nodal-window h1 {
		font-size: 150%;
		margin: 0 0 15px;
	}
	img.fluid-img{ width: 100%; }
	.btn-photo{ height: 70px; }
</style>*/



