

var search_go = function(data){
//	$vv(data, 'seach_gojs')
	return ''+
		$div({class: 'box_search'},
			$a({href: ''+get_base_url('start/perfil_ext/?r='+data.id_user)},
				$div({class: 'name_search'},
					''+data.name_user
				)
			)
		)
}
/*<style>
	.box_search{margin: 10px; padding: 10px; background: aliceblue; box-shadow: 0px 3px 1px cadetblue;}
	.name_search{font-weight: lighter;}
</style>*/