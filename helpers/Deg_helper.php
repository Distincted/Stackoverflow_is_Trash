<?php
defined('BASEPATH') OR exit('No direct script access allowed');



if (! function_exists('set_msg')){

	function set_msg($msg = '',$uu=4,$script=''){
		if(empty($msg)){
			return;
		
		}
		switch ($uu) {
			case 1:	$msg2 ="danger"; break;
			case 2:	$msg2 ="success"; break;
			case 3:	$msg2 ="info";	break;
			case 4:	$msg2 ="warning";	break;
			default:		break;
		}
		$msg = '<script>
				function sleep (time) {
			 		return new Promise((resolve) => setTimeout(resolve, time));
				}
				$(".showmsg").delay(700).show(700).delay(2500).hide(1000); 
				sleep(1444).then(() => {
					'.$script.'
				//	document.getElementsByClassName("showmsg")[0].remove();
				//	sleep = undefined;
				//	window.hasOwnProperty("sleep");
				});
			</script>
			<div class="btn-block alert-'.$msg2.' showmsg" >
				<p><strong>'.$msg.'</strong></p>
			</div>
			
		';
		$ci = & get_instance();
		$ci->session->set_userdata('aviso', $msg);
	}
}

if ( ! function_exists('get_msg')){

	function get_msg($destroy = TRUE){
		$ci = & get_instance();
		$retorno = $ci->session->userdata('aviso');
		if($destroy){ $ci->session->unset_userdata('aviso'); }
		return $retorno;
	}
}


if(!function_exists('to_bd')):
	//codificação html para salvar no banco de dados
	function to_bd($string=NULL){
	//	return htmlentities($string);
		return htmlspecialchars(strip_tags ($string));
	}

endif;

if(!function_exists('to_html')):
	//Decodifica o html e remove invertidas do conteudo
	function to_html($string=NULL){
	//	return html_entity_decode($string);
		return utf8_decode($string);
	}
endif;

if (! function_exists('echo_msg')){

	function echo_msg($msg = '',$uu=1,$script=''){
		if(empty($msg)){
			$wv = '';
		}else{
			switch ($uu) {
				case 1:	$msg2 ="danger"; break;
				case 2:	$msg2 ="success"; break;
				case 3:	$msg2 ="info";	break;
				case 4:	$msg2 ="warning";	break;
				default: $msg2 ='';		break;
			}
			$wv = '<div class="btn-block alert-'.$msg2.' showmsg" style="position: fixed; bottom: 0%;z-index: 10; opacity: 0.7" >
				<p><strong>'.$msg.'</strong></p>
			</div>';
		}
		//$msg = "<script> echomsg('".$msg."', "
		$msg = "<script>
					/* function() */
					var script = '".$script."';
					echomsg('','.showmsg',script);
				</script>".$wv;

		echo $msg;

	}
}
if(!function_exists('get_logged')){

	function get_logged($page='start'){
	//	$key = (isset($_SESSION['key_me']) ? ($_SESSION['key_me']) : (''));
	//	$user = intval($_SESSION['logged'.$key]);

	}
}


if(!function_exists('verifica_login')){
	function verifica_login($page='start'){
	//	setlocale(LC_TIME, 'portuguese');
	//	date_default_timezone_set('America/Sao_Paulo');
		$ci = & get_instance();
	//	sleep( rand(0,1));
		if($page=='start'){
			if(!$ci->session->has_userdata('logged') ) {
				redirect('base');

			}else{
				if(intval($ci->session->get_userdata('logged')['logged'])!=0){
					return  intval($ci->session->get_userdata('logged')['logged']);
				//	return $res;
				}else{
					sleep(rand(10,20));
					exit;
				}
			}
		}elseif($page=='login'){
			if($ci->session->has_userdata('logged') ){
				redirect('finance');
			}
		}
		return true;
	}
}

if(!function_exists('get_csrf')){

	function get_csrf(){
		if(!isset($_SESSION['csrf__pro'])){
			$_SESSION['csrf__pro'] = bin2hex( random_bytes(32) );
		}
		$csrf = hash_hmac('sha256', 'so many secrets or no right', $_SESSION['csrf__pro']);
		return $csrf;
	}

}
if(!function_exists('is_csrf_equal')){

	function is_csrf_equal($val){
		$csrf = hash_hmac('sha256', 'so many secrets or no right', $_SESSION['csrf__pro']);
		if(hash_equals($csrf, $val) ){
			return true;
		}else{
			return false;
		}
	}
}
if(!function_exists('regenerate_csrf')){

	function regenerate_csrf(){
		unset( $_SESSION['csrf__pro']);
		$_SESSION['csrf__pro'] = bin2hex( random_bytes(32) );
		$csrf = hash_hmac('sha256', 'so many secrets or no right', $_SESSION['csrf__pro']);
		return $csrf;
	}
}
if(!function_exists('test_csrf')){
	function test_csrf($value){
		try{
			if( !is_csrf_equal($value) ){
				exit; die();
			}else{
				return regenerate_csrf();
			}
		}catch(Exception $e){
			echo "error"; exit;			
		}
	}
}

if(!function_exists('get_name_by_id')){

	function get_name_by_id($aa){
		$ci = & get_instance();
	//	var_dump($aa);
		// return $aa;
		//$idd = $ci->session->get_userdata('logged')['logged'];
		// $ci->db->reset_query();
	//	$ci->db->query("SELECT name_user FROM users WHERE id = ".$aa);
		$queryy =	$ci->db->query("SELECT name_user FROM users WHERE id_user = ".$aa." LIMIT 1");
	//	$queryy = $ci->db->get("usuarios");
		$val =$queryy->result_array();

		return $val[0]['name_user'];

	}

}
if(!function_exists('pegar_al')){

	function pegar_al($aa){

		$ci = & get_instance();
		$user = $ci->session->get_userdata('logged')['logged'];

		$query = $ci->db->query("SELECT  m.*, um.*, u.nome FROM classes m LEFT JOIN usuarios u ON m.own=u.id LEFT OUTER JOIN user_merito as um ON m.idd=um.id_merito AND um.id_user= ".$user."  WHERE  m.local_two=".$aa."  ORDER BY m.idd ASC ");
	//	vv($query->result_array() );
		return $query->result_array();
		// var_dump($query->result_array());
		// m.local LIKE '|".$aa."%'
	}

}
if(!function_exists('vv')){
	function vv($aa, $cond=0, $excl=false ){
		echo "<style> .var_dump{ background: #ddd; color: brown; font-weight: bold; text-align: justify;}</style> ";
		echo "<pre class='var_dump'>"; 	var_dump( $aa ); echo "</pre>"; 
		echo "<hr>";
		if($cond!=0){
			/*
			$ci = & get_instance();
			$ci->db->select('*');
			$query = $ci->db->get('log_vv');
			if($query->num_rows()>$cond || $cond==1){
			//	$query = $query->result_array();
				$ci->db->query("TRUNCATE TABLE log_vv ");
				echo "<style> .var_dump{ background: #ddd; color: brown; font-weight: bold; text-align: justify;}</style> ";
				echo "<pre class='var_dump'>"; 	var_dump( $aa ); echo "</pre>"; 
				echo "<h1> #### END #### </h1>";
				exit;
			}else{
				if($query->num_rows()==0){
					$query = $query->result_array();
					$ci->db->insert('log_vv',array('n_log'=>1 ));
				}else{
					$query = $query->result_array();
					$ci->db->insert('log_vv',array('n_log'=>intval($query[0]['n_log'])+1 ));

				}
				if($excl==false){
					echo "<style> .var_dump{ background: #ddd; color: brown; font-weight: bold; text-align: justify;}</style> ";
					echo "<pre class='var_dump'>"; 	var_dump( $aa ); echo "</pre>"; 
					echo "<hr>";
				}
			}
			*/

		}else{
			exit;
		}
		
	}
}


if(!function_exists('escape_text')){
	function escape_text($msg){
		$msg =  htmlspecialchars($msg ,ENT_QUOTES, 'UTF-8');
		$msg = str_replace("\n","<br>", $msg);
		$msg = str_replace("\\","\\\\", $msg);
		return $msg;
	}
}