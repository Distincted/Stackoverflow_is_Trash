/*
*	versao 2.0.58
* novo impor_func adicionado $import_func adicionado $if	update $for()	
* since 20/09/2019
*
*
*/




var base_url_be=null;
const src = 'assets/js/templates/';
const integrity_actived = false;

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

const $br_n = "  \n ";
const $br_r = " \r \t";
const $br_tab = " \t ";

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
/*
	var r = new XMLHttpRequest();
	r.open("GET", get_base_url(srcc)+"?_="+Math.floor(Date.now() ) , true);
	r.onreadystatechange = function (data) {
	if (r.readyState != 4 || r.status != 200) return;
	//	alert("Success: " + r.responseText);


	};
	r.send();
*/


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
					saida = '<'+'style> '+saida+'</'+'style>';
					$("head").append(  saida );
				}
				if(condicao.scripttwo==1){
					anon = '<script> '+anon+'</'+'script>';
					$("head").append( anon  );
					sleep(700).then(()=>{
						//window[script]()
						script = '<script> '+script+'</'+'script>';
						$("head").append( script  );
					//	console.log('alertaa')
					});
				}else{
					anon = '<script> '+data+'</'+'script>';
					$("head").append( anon  );
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



const $body = function(into="", arrai={} ){
	const domReady = function(ready) {
		if (document.readyState != 'loading') return ready();
		document.addEventListener('DOMContentLoaded', ready);
		function _ready() {
			document.removeEventListener('DOMContentLoaded', ready);
			ready();
		}
	}
//	$(document).ready(function(){
	//	window.onload = function() {
	domReady(function(){
	//	(function(){
			document.body.innerHTML = $br_n+into;
	//	})();
	});
	//	};
//	});

};

const $for = function( $val,  arrai={} , classi='', param='' ){
	var aux = '';
	if(typeof $val=='function'){

		for(var key in arrai){
			aux += $val( arrai[key], classi,  param, key);
		}
		return aux;

	}
};

const $forin = function( $val,  arrai={} , classi='', param='' ){
	var aux = '';
	if(typeof $val=='function'){

		for(var key in arrai){
			aux += $val( arrai[key], classi,  param, key);
		}
		return aux;

	}
};


const $if = function( $val, $then=function(){}, $else=function(){} ){
	if($val){
		return $then.call();
	}else{
		return $else.call();
	}
	return '';
};


var $import_func =  function(srcc='', name_func='',callback=function(){} ){
	var result = '';
	
	$.ajax({
		url: srcc,
		type: 'GET',
		async: false,
		cache: false,
		timeout: 3000,
		dataType: 'text',
		error: function(){
			return true;
		},
		success: function(data){
		//	console.log(data);
			var exp = data.indexOf('export '+name_func);
			var limp;
			if(exp!=-1){
				if(exp!=0){
					data = data.replace( data.substring(0, exp),''  );
					var exp_end = data.indexOf('endexport');
				}else{
					var exp_end = data.indexOf('endexport');
				}
				if(exp_end!=-1){
					if(exp_end!=data.length){
						data = data.substring(0, exp_end);
					}
					limp = data.replace( data.substring(exp_end, exp_end+9), '');
					limp = data.replace( 'export '+name_func,  '' );
					var attr = limp.indexOf("(");
					if(attr!=-1){
						var fim = limp.indexOf(")");
						attr = limp.substring( attr, fim+1 );
						limp = limp.replace( attr, '' )
						attr = attr.split("(").join("");
						attr = attr.split(")").join("");
						var tt = attr.split(",");
					}else{
						console.log('Função sem Atributos Definido'); return 'error';
					}
					var adder = new Function(...tt, ' '+limp);
					result = adder;
					return adder;
				}else{ return 'error';}
			}else{ return 'error';}
		}
	});
	return result;
};

var $import_deferred = function(srcc='', name_func='',callback='' ){
	var temp;
	var script = document.createElement("script");
	script.type = "module";
	if(name_func.indexOf(",")!=-1){
		var aux = name_func.split(",");
		var txt = '';
		for(var i = 0; i<aux.length;i++){
			txt += 'window.'+aux[i].trim()+' = '+aux[i].trim()+"; \n";
		}
		script.innerHTML = "import { "+name_func+" } from '"+srcc+"'; \n"+txt;
	}else{
	//	console.log(name_func)
		if(name_func.trim()=='*' || name_func.indexOf("*")!=-1){
		//	var txt = '';
		//	txt += "import  "+name_func+"  from '"+srcc+"'; ";
			
			 import(srcc).then(function(data){
     				var temp =  data;
     				for(mod in data){
     					window[''+mod] = data[mod]
     			//	console.log(data[mod]);
     				//5	eval("window."+mod+" =  "+data[mod]+"; ")
     				//	txt += "\nwindow."+mod+" = "+mod+"; "
     				}
     			//	console.log(abc);
     			//	script.innerHTML = txt;
       			//	module.loadPageInto(main);
       		//	console.log(temp);
 			})
 			

 			return;
		}else{
			if(window.window[name_func]!=undefined){
				return true;
			}
			script.innerHTML = "import { "+name_func+" } from '"+srcc+"'; \nwindow."+name_func+" = "+name_func+"; " +callback;
		}
	}
//	$("head").append( script );
	document.head.appendChild(script)
	return '';
};


const $other = function(tag, arrai={}, into="" ){
	return "<"+tag+faa(arrai)+">"+$br_r+into+"</"+tag+">"+$br_r;
};

const $container = function(  into="", arrai={}){
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
	return "<div"+faa(arrai)+" >"+$br_n+into+"</div>"+$br_n;
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

const $label = function(arrai={}, into="", forr="" ){
	if(forr!=''){
		var aux = ""+forr;
	}else{ var aux = '';}
	return "<label "+aux+" "+faa(arrai)+" >"+into+"</label>"+$br_n;
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

const $b = function( arrai={}, into=""){
	return "<b"+faa(arrai)+" >"+$br_n+into+"</b>"+$br_n;
};