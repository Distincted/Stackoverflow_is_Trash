
var modal_img = function(data){
//	$vv(data)
	return(
		$div({ "class":"nodal" },''+
			$div({ "class":"nodaldirect" },''+
				$div({ "class":"btn btn-danger nodal-close btn-photo" },
					''+
					$button({ "class":"btn btn-danger nodal-close","style":"color: #fff;","onclick": '$(".nodal").remove()' },'X '
					)
				)+
				$img({ "class":"fluid-img","src": data,"alt":"" },''
				)
			)
		)
	)
}

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



