

export saldo(data)
	return(
		$div({class: '', style: 'text-align: center; margin: 7px;'},
			$span({ "href":"#","class":"list-group-item " },
				$label({ "for":"" },
					'Seu saldo:'
				)+
				$h2({ },
					'R$ '+parseFloat(data).toFixed(2)
				)+
				$label({ "for":"" },
					'CR: 0'
				)
			)

		)
	)
endexport

export formatMoney(num)
	
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

endexport