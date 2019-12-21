<?php
defined('BASEPATH') OR exit('No direct script access allowed');


Class Rec_model extends CI_Model {
	
	public function __construct(){
		parent::__construct();
		//$this->load->helpers('form');
	}


	public function rec_all($dados, $name_db, $insert=''){
		if($this->db->insert($name_db, $dados)){
			return $this->db->insert_id($insert);
		}else{
			return false;
		}
		
	}
	public function rec_update($name_db, $dados,  $dados_where){
		$this->db->where($dados_where);
		if($this->db->update($name_db, $dados)){
			return true;
		}else{
			return false;
		}
	}
	public function rec_del($where, $name_db){
		$this->db->where($where);

		return $this->db->delete($name_db);
	}
	public function rec_select($where, $name_db,$limit='',$select=''){
		if($select!='' && gettype($limit)=='string'){
			$this->db->select($limit);
		}
		$this->db->where($where);

		if($limit!=''){
			if(gettype($limit)=='integer'){
				$this->db->limit($limit);
			}else if(gettype($limit)=='array'){
				$this->db->limit($limit[1], $limit[0]);
			}
		}
		$query=$this->db->get($name_db);
		return $query->result_array();

	}
	public function rec_count($where, $name_db){
		$this->db->where($where);
		return $this->db->count_all_results($name_db);
	}

	public function rec_join($table, $fields, $data) {
	    //não testei
	    foreach($fields as $coll => $value){
	        $this->db->select($value);
	    }
	    //pega a tabela
	    $this->db->from($table);
	    //pega os campos do join
	    foreach($data as $coll => $value){
	        $this->db->join($coll, $value);
	    }
	    //obtem os valores
	    $query = $this->db->get();
	    //retorna o resultado
	    return $query->result();

	}


}