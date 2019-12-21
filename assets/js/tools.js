/*
*	version 1.0.1
*/
const get_base_url = function(param=''){
	var getUrl = window.location;
//	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/"+param ; // para php puro
	var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1] + "/"+ getUrl.pathname.split('/')[2] + "/"+param ; // para codeigniter
	return base_url_be || baseUrl;
}

const sleep = function (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

var debounce = function(func, wait, inmediate){
	var timeout;
	return function(){
		var context = this, args = arguments;
		var later = function(){
			timeout=null;
			if(!inmediate) func.apply(context, args);
		};
		var callNow = inmediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later,wait);
		if(callNow) func.apply(context, args);
	}
}


var $vv = function(val,msg='',param=''){
	function JSONstringify(json) {
	    if (typeof json != 'string') {
	        json = JSON.stringify(json, undefined, '\t');
	    }

	    var 
	        arr = [],
	        _string = 'color:green',
	        _number = 'color:darkorange',
	        _boolean = 'color:blue',
	        _null = 'color:magenta',
	        _key = 'color:red';

	    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	        var style = _number;
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                style = _key;
	            } else {
	                style = _string;
	            }
	        } else if (/true|false/.test(match)) {
	            style = _boolean;
	        } else if (/null/.test(match)) {
	            style = _null;
	        }
	        arr.push(style);
	        arr.push('');
	        return '%c' + match + '%c';
	    });

	    arr.unshift(json);

	    console.log.apply(console, arr);
	}
	try{
		if(msg!=''){
			console.log(msg+" \\/ ")
		}
		if(param=='json' || param=='JSON'){
			JSONstringify(val);
		}else{
			console.log(val);
		}
		return '';
	}catch(e){
		console.log("Error  "+br_n+"  "+e);
	}
		
};




function deleteCookie(name) {
	if (getCookie(name)) {
		document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

function setCookie(name, value, duration) {
	var cookie = name + "=" + escape(value) +
	((duration) ? "; duration=" + duration.toUTCString : "");
	document.cookie = cookie;
}
function getCookie(name) {
	var cookies = document.cookie;
	var prefix = name + "=";
	var begin = cookies.indexOf("; " + prefix);
	if (begin == -1) {
		begin = cookies.indexOf(prefix);
		if (begin != 0) {
			return null;
		}
	}else{
		begin += 2;
	}
	var end = cookies.indexOf(";", begin);
	if (end == -1) {
		end = cookies.length;                        
	}
	return unescape(cookies.substring(begin + prefix.length, end));
}
var run_script = function(script='', timefor=4000){

	if(typeof script=='function'){
		sleep(timefor).then(() => {
			script.apply();
		});
		
	}else if(typeof script=='string'){
		if(script!=''){
			sleep(timefor).then(() => {
				var s = document.createElement('script');
				s.appendChild(document.createTextNode(script));
				document.head.appendChild(s);
			});
		}
		
	}
}

var echomsg = function(txt='',exitt='.showmsg', type=1, mode=1){
	var pp = exitt.substring(0,1);
	
	var classi;
	switch(type){
		case 0: classi = "danger";    break;
		case 1:	classi = "success";   break;
		case 2:	classi = "primary";	  break;
		case 3:	classi = "warning";	  break;
		case 4:	classi = "info";	  break;
		case 5:	classi = "secondary"; break;
		case 6:	classi = "dark";	  break;
		case 7:	classi = "light";	  break;
		default:	
	}
	if(txt!=''){
		var texto = '<div class="btn-block alert-'+classi+' showmsg" id="twerr_temp" >'+
						'<p><strong>'+txt+'</strong></p>'+
					'</div>';

		if(mode==1){
			$(exitt).html(texto);
		}else if(mode==2){
			$(exitt).append(texto);
		}else{
			$(exitt).html(texto);
		}
		$.when( $("#twerr_temp").fadeIn(777).delay(3000).fadeOut(4000) ).done(function(){
			$('#twerr_temp').remove();	
		}); 
	}
	
}