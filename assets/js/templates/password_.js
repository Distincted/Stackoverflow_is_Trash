


var password_ = function(data, increment){
//	$vv(data, 'password_')
	let val = parseInt(data)+1;
	return ''+
	$div({style: 'display: flex;', id: 'field'+data},
		$abbr({title: 'A quantidade de colunas influência na senha'},
			$label({class: 'badge badge-secondary align-middle'},
				''+val+':',
				'btn_pass'
			)
		)+
		$input({type: 'password', class: 'form-control pass_field', id: 'pass_'+data, placeholder: 'Campo nº '+val},
			''

		)
	)
}


