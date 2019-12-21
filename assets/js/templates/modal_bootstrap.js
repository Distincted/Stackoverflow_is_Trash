
 modal_bootstrap = function(data){ 
data.valor = (data.valor==undefined) ?  ('') : (data.valor);
 return ''+
	$div({ "class":"modal  ","id":"exampleModal","tabindex":"-1","role":"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",style: "top: -26px;" },
		$div({ "class":"modal-dialog modal-lg","role":"document" },
			''+
			$div({ "class":"modal-content" },
				''+
				$div({ "class":"modal-header" },
					''+
					$h5({ "class":"modal-title","id":"exampleModalLabel" },
						'Modal title'
					)+
					
					$button({ "type":"button","class":"close","data-dismiss":"modal","aria-label":"Close" },
						''+
		 
					$span({ "aria-hidden":"true",onclick: '$.when( $(".modal").hide() ).then(()=>{ $("#callmodal").html(""); delete modal_bootstrap; });  '  },'&times;'
					 
					)
				)
			)+
			$div({ "class":"modal-body" },
				''+
				data.valor
			 
			)+
			$div({ "class":"modal-footer" },''+
			 
				$button({ "type":"button","class":"btn btn-secondary","data-dismiss":"modal",onclick: '$.when( $(".modal").hide(1000)).then(()=>{$("#callmodal").html("");  }); delete modal_bootstrap; ' },'Close'
				 
				)+
				$button({ "type":"button","class":"btn btn-primary" },'Save changes'
		 
				)
			)
		)
	)
)

}
/*<script>*/
	
      //  $('.modal').show(1000)
      	$('.modal').modal('show', 1000)
      //  $('.exampleModal').modal('show');
	   


/*</script>*/

/*<style>


</style>*/
 