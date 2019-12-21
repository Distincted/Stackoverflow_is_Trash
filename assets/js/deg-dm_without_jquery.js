/*
*	versao 2.0.52
*	adicionado  integrity
* since 20/09/2019
*
*
*/




var base_url_be=null;
const src = 'assets/js/templates/';
const integrity_actived = false;

const get_base_url = function(param=''){
	var getUrl = window.location;
//	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/"+param ; // para php puro
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/"+ getUrl.pathname.split('/')[2] + "/"+param ; // para codeigniter
	return base_url_be || baseUrl;
}

const $br_n = "  \n ";
const $br_r = " \r \t";
const $br_tab = " \t ";

const sleep = function (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

const faa = function(arrai={} ){
	// private function array assoc of atrribute
	let aux = "";
	if(Object.keys(arrai).length>0){
		for (var key in arrai) {
		  aux +=" "+key +"='"+ arrai[key] +"'";
		}
	}
	return aux;
};
const $foreach_template = function( $val, param1, order='asc' , param3='' ){
	let aux_temp = '';
	//	console.log( param1 );
	if(typeof $val=='object'){
	//	aux_temp = $template( $val, param1 )
		for(var key in arrai){
			aux_temp += $template( $val, arrai[key], arrai )
		}
		return aux_temp;
	}else if(typeof $val=='string'){
		var $i = 0;
		if(order.trim()=='asc' || order.trim() =='ASC'){
			for(var key in param1){
				aux_temp += $template( $val, param1[key], key  )
			}
		}else if(order.trim()=='desc' || order.trim()=='DESC'){
			var temp = Object.keys(param1).sort(function(a,b){
	 			return b-a
	 		});
			for(var i = 0; i<temp.length; i++){
			//	console.log(param1[temp[i]]);
				aux_temp += $template( $val, param1[temp[i]], temp[i])
			}
		}
		return aux_temp;
	}

}


const $for_template = function( $val, param1, arrai={} , classi='' ){
	var aux_temp = '';;
	if(typeof $val=='object'){
	//	aux_temp = $template( $val, param1 )
		for(var key in arrai){
				aux_temp += $template( $val, arrai[key], arrai )
			//	classi[0]
			
		}
	//	console.log( aux_temp );
		return aux_temp;
	}else if(typeof $val=='string'){
		var $i = 0;
		for(var key in param1){
		//	console.log(param1[key])
			aux_temp += $template( $val, param1[$i] )
			$i++;
		//	aux += $val(arrai[key], classi);
		}
		//console.log( aux_temp );
		return aux_temp;
	}
};

const $integrity = function(val=''){

	const integrity = {

		"nav_template": "29d80427c37727f842f282afdd7a6d4715bef943a47c464e631b7cefc51f393ffb14471005f7dcde9d3c6462d70fea9e",
		"fancy_sidebar": "ea62834e7a70c5acb6f3f2af35eba59e1911279dd14484a4e8b81b632a1f8791d7d25926410868da3cbbefdc1e0213f0",
		"timeline_template": "7762842a1e176a836bd7c2b0ba198907d05435ec139e992d51d34540cf0441a4ccbf764dae050d9fdba2e35abb85e0ba",
		"coment_feed_template": "405daf9902fe0d3b2c18b48077138bebf8e719bb53f72348475be7d1595f1c45c64832f127b68c8e12ff73ecee2d504e",
		"footer": "6f86f50447968cba4a126b10b57bf8f387ed40d9bf3862b7890fe1dce31471a0d19b741dd7c7eae9d0852735f00e3ea2"

	}
	try{
		const temp = integrity[val];
		return temp;
	}catch(e){
		return undefined;
	}
}

const $template = function(name, params='', args){
//	const src = 'assets/js/templates/'+name+'.js';
	const srcc = src+name+'.js';
	var result = '';

	function import_files(src, name){
		result = 0;
		$.ajax({
			url: get_base_url(srcc),
			type: 'GET',
			async: false,
			cache: false,
			timeout: 3000,
			dataType: 'text',
			error: function(){
				return true;
			},
			success: function(data){ 
			//	console.log(sha384(data));
				if(integrity_actived==true){
					const integrity = $integrity(name);
					if( integrity!=undefined ){
						if( integrity!=sha384(data) ){
							console.log('Falha de Integridade '+integrity)
							return false;
						}
					}
				}
			
				var aux = data.indexOf('/*<style>');
			//	console.log(aux);
				var saida = '';
				var condicao = { style: 0, scripttwo: 0};
				if(aux!=-1){
					var aux2 = data.indexOf('</style>*/');
					saida = data.substring(aux+9, aux2);
					
				//	console.log('saida'+saida)
					result = result + 1;
					condicao.style = 1;
				}
				var aux = data.indexOf('/*<script>*/');
				result = result + 1;

				var script = '';
				if(aux!=-1){
					var aux2 = data.indexOf('/*</'+'script>*/');
					script = data.substring(aux+12, aux2);
					data = data.replace(script,'')
					script = script.trim();
					const tt = script.indexOf('$(document).ready');
					if(tt==-1){
					//	script = ' $(document).ready(function(){ '+script+' }); ';
					//	script = 'docReady(function(){ '+script+' }) ';
					}
					if(script!=''){

						condicao.scripttwo = 1;
						
					}else{

					}
					result = result + 1;
				}
		
				let anon = '';
				if(condicao.scripttwo==0){
					anon = data.substring(0, data.length-1);
				}else{
					anon = data.substring(0, aux);
				}
			//	console.log('Funcao anonima ='+anon);
				result = result + 1;
				if(condicao.style==1){
				//2	saida = '<'+'style> '+saida+'</'+'style>';
				//2	$("head").append(  saida );
					var s = document.createElement('style');
					s.appendChild(document.createTextNode(saida));
					document.head.appendChild(s);
				}
				if(condicao.scripttwo==1){
					anon = '<script> '+anon+'</'+'script>';
					$("head").append( anon  );
					sleep(700).then(()=>{
						//window[script]()
					//2	script = '<script> '+script+'</'+'script>';
					//2	$("head").append( script  );
						var s = document.createElement('script');
						s.appendChild(document.createTextNode(script));
						document.head.appendChild(s);
					//	console.log('alertaa')
					});
				}else{
				//2	anon = '<script> '+data+'</'+'script>';
				//2	$("head").append( anon  );
					var s = document.createElement('script');
						s.appendChild(document.createTextNode(anon));
						document.head.appendChild(s);
				}
		//	anon = ' $(document).ready(function(){ '+anon+' }); ';
				result = condicao.scripttwo + condicao.style;
			}
		});
		return result;
			
	}

	try{

		if(window.window[name]==undefined){
			import_files(srcc, name);

			 return window[ name ](params, arguments[2]);
		}else{
			return window[ name ](params, arguments[2]);
		//	echomsg('','', name+'()' )
		}
	}catch(e){
		console.log(e); console.log(name);
	}
};

var $vv = function(val,msg=''){
	try{
		if(msg!=''){
			console.log(msg+" \\/ ")
		}
		console.log(val);
		return '';
	}catch(e){
		console.log("Error  "+br_n+"  "+e);
	}
		
};

const $body = function(into="", type=1, arrai={} ){
	if(type==1){
		
	//2	$(document).ready(function(){
	//	window.onload = (function(){
			document.body.innerHTML = $br_n+into;
		
	//2	});
			
		// return $("body").html( $br_n+into );
	}else if(type==2){
		console.log( into );
	}
};

const $for = function( $val,  arrai={} , classi='' ){
	var aux = '';
	if(typeof $val=='object'){
	//	return; 
		var aux_temp;
	//	$vv( Object.keys($val).length)
		/*
		for(var i=0; i< Object.keys($val).length; i++ ){		
		}
		*/
		for(var key in arrai){
			aux_temp += $val[0]( 
				$val[1]( 
					arrai[key],
					classi[1]
					
				),
				classi[0]
			);
		}

		return aux_temp;
	}else if(typeof $val=='function'){
		for(var key in arrai){
			aux += $val( classi, arrai[key]);
		}
		return aux;

	}
};


const $other = function(tag, arrai={}, into="" ){
	return "<"+tag+" "+faa(arrai)+" >"+$br_r+into+"</"+tag+">"+$br_r;
};

const $container = function( arrai={}, into=""){
	return "<div class='container' "+faa(arrai)+" >"+$br_r+into+"</div>"+$br_r;
};

const $row = function( into="",arrai={} ){
	return "<div class='row' "+$br_n+faa(arrai)+" >"+into+"</div>"+$br_r;
};


const $col_sm_ = function( into="", colum=12){
	return "<div class='col-md-"+colum+"' >"+$br_n+into+"</div>"+$br_n;
};

const $col_md_ = function(  into="", colum=12){
	return "<div class='col-md-"+colum+"' >"+$br_n+into+"</div>"+$br_n;
};

const $col_lg_ = function(  into="", colum=12){
	return "<div class='col-lg-"+colum+"' >"+$br_n+into+"</div>"+$br_n;
};

const $col_xl_ = function(  into="", colum=12){
	return "<div class='col-xl-"+colum+"' >"+$br_n+into+"</div>"+$br_n;
};

const $form = function( arrai={}, into=""){
	return "<form"+faa(arrai)+" >"+$br_n+into+"</form>"+$br_n;
};

const $input = function( arrai={}, into=""){
	return into+"<input"+faa(arrai)+" />"+$br_n;
};

const $textarea = function( arrai={}, into=""){
	return "<textarea"+faa(arrai)+" >"+into+"</textarea>"+$br_n;
};

const $select = function( arrai={}, into=""){
	return "<select"+faa(arrai)+" >"+$br_n+into+"</select>"+$br_n;
};

const $option = function( arrai={}, into=""){
	return "<option"+faa(arrai)+" >"+into+"</option>"+$br_n;
};

const $button = function( arrai={}, into=""){
	return "<button"+faa(arrai)+" >"+into+"</button>"+$br_n;
};

const $div = function( arrai={}, into=""){
//	$vv(typeof(arrai), 'degdm')
/*
	if(typeof(arrai)=='string' && arrai.trim()!=''){
		return "<div"+faa(into)+" >"+$br_n+arrai+"</div>"+$br_n;

	}else{
*/
		return "<div"+faa(arrai)+" >"+$br_n+into+"</div>"+$br_n;
/*		
	}
*/
};

const $anchor = function(arrai={}, into="", href=""){
	return "<a href='"+href+"' "+faa(arrai)+" >"+into+"</a>"+$br_n;
};

const $a = function(arrai={}, into="" ){
	return "<a"+faa(arrai)+" >"+into+"</a>"+$br_n;
};

const $span = function( arrai={}, into=""){
	return "<span"+faa(arrai)+" >"+into+"</span>"+$br_n;
};

const $label = function(arrai={}, into="", forr="", ){
	return "<label for='"+forr+"' "+faa(arrai)+" >"+into+"</label>"+$br_n;
};

const $table = function( arrai={}, into=""){
	return "<table"+faa(arrai)+" >"+$br_r+into+"</table>"+$br_n;
};

const $thead = function( arrai={}, into=""){
	return "<thead"+faa(arrai)+" >"+$br_n+$br_tab+into+"</thead>"+$br_n;
};

const $tbody = function( arrai={}, into=""){
	return "<tbody"+faa(arrai)+" >"+$br_n+$br_tab+into+"</tbody>"+$br_n;
};

const $tr = function( arrai={}, into=""){
	return "<tr"+faa(arrai)+" >"+$br_n+into+"</tr>"+$br_n;
};

const $th = function( arrai={}, into=""){
	return "<th"+faa(arrai)+" >"+into+"</th>"+$br_n+$br_tab;
};


const $td = function( arrai={}, into=""){
	return "<td"+faa(arrai)+" >"+into+"</td>"+$br_n;
};

const $ul = function( arrai={}, into=""){
	return "<ul"+faa(arrai)+" >"+into+"</ul>"+$br_n;
};

const $ol = function( arrai={}, into=""){
	return "<ol"+faa(arrai)+" >"+into+"</ol>"+$br_n;
};

const $li = function( arrai={}, into=""){
	return "<li"+faa(arrai)+" >"+$br_n+$br_tab+into+"</li>"+$br_n;
};

const $h1 = function( arrai={}, into=""){
	return "<h1"+faa(arrai)+" >"+into+"</h1>"+$br_n;
};

const $h2 = function( arrai={}, into=""){
	return "<h2"+faa(arrai)+" >"+into+"</h2>"+$br_n;
};

const $h3 = function( arrai={}, into=""){
	return "<h3"+faa(arrai)+" >"+into+"</h3>"+$br_n;
};

const $h4 = function( arrai={}, into=""){
	return "<h4"+faa(arrai)+" >"+into+"</h4>"+$br_n;
};

const $h5 = function( arrai={}, into=""){
	return "<h5"+faa(arrai)+" >"+into+"</h5>"+$br_n;
};

const $h6 = function( arrai={}, into=""){
	return "<h6"+faa(arrai)+" >"+into+"</h6>"+$br_n;
};

const $p = function( arrai={}, into=""){
	return "<p"+faa(arrai)+" >"+into+"</p>"+$br_n;
};

const $header = function( arrai={}, into=""){
	return "<header"+faa(arrai)+" >"+into+"</header>"+$br_n;
};

const $nav = function( arrai={}, into=""){
	return "<nav"+faa(arrai)+" >"+into+"</nav>"+$br_n;
};

const $main = function( arrai={}, into=""){
	return "<main"+faa(arrai)+" >"+into+"</main>"+$br_n;
};

const $aside = function( arrai={}, into=""){
	return "<aside"+faa(arrai)+" >"+into+"</aside>"+$br_n;
};

const $article = function( arrai={}, into=""){
	return "<article"+faa(arrai)+" >"+into+"</article>"+$br_n;
};

const $section = function( arrai={}, into=""){
	return "<section"+faa(arrai)+" >"+into+"</section>"+$br_n;
};


const $footer = function( arrai={}, into=""){
	return "<footer"+faa(arrai)+" >"+into+"</footer>"+$br_n;
};

// Diferentes
const $img = function( arrai={}, into=""){
	return "<img"+faa(arrai)+" src='"+into+"' />"+$br_n;
};

const $br = function(total=1, arrai={}){
	let aux = " ";
	let i = 0;
	do{
		aux += "<br"+"> ";
		i++;
	}while(i<total);
	return aux;
};

const $hr = function(total=1, arrai={}){
	let aux = "";
	let i = 0;
	do{
		aux += "<hr"+aux+"/>"+$br_n;
		i++;
	}while(i<total);
	return aux;
};

const $figcaption = function( arrai={}, into=""){
	return "<figcaption"+faa(arrai)+" >"+into+"</figcaption>"+$br_n;
};

const $i = function( arrai={}, into=""){
	return "<i"+faa(arrai)+" >"+into+"</i>"+$br_n;
};

const $pre = function( arrai={}, into=""){
	return "<pre"+faa(arrai)+" >"+into+"</pre>"+$br_n;
};

const $code = function( arrai={}, into=""){
	return "<code"+faa(arrai)+" >"+into+"</code>"+$br_n;
};

const $small = function( arrai={}, into=""){
	return "<small"+faa(arrai)+" >"+into+"</small>"+$br_n;
};

const $abbr = function( arrai={}, into=""){
	return "<abbr"+faa(arrai)+" >"+$br_n+into+"</abbr>"+$br_n;
};