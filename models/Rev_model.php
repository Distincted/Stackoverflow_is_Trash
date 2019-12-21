<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//	Myorm_model.php
Class Rev_model extends CI_Model {
	private $pdo;
	protected $prefix = '';
	protected $timestamp_writes = false;
	protected $dbh = null;

	public function __construct(){
	
		$this->load->library('grumpypdo');
		$pdo = new grumpypdo();
		$this->set_pdo($pdo);

	}
	public function index(){

	
	}

	private function Connect(){

	}

	public function get_pdo(){
		return $this->pdo;
	}
	public function set_pdo($val){
		$this->pdo = $val;
	}
	public function query($query, $values=array(),$type=null ){

        return $this->pdo->run($query, $values)->fetchAll($type);
    
	}


	public function lastInsertId()
	{
		return $this->dbh->lastInsertId();
	}

	public function rev_insert($dados, $name_db, $insert=''){



	}
	public function select($table, $where = [], $limit = null, $start = null, $order_by = [])
	{
		// building query string
		$sql_str = 'SELECT ';

		if (is_array($table))
		{
			if (is_array($table[1]))
			{
				$sql_str .= implode(', ', $table[1]) . ' FROM ';
			}
			else
			{
				$sql_str .= $table[1] . ' FROM ';
			}
			$sql_str .= $this->prefix . $table[0];
		}
		else
		{
			$sql_str .= ' * FROM ' . $this->prefix . $table;
		}

		$add_and = false;

		if (!empty($where) and is_array($where))
		{
			// append WHERE if necessary
			$sql_str .= ' WHERE ';
			// add each clause using parameter array
			foreach ($where as $key => $val)
			{
				// only add AND after the first clause item has been appended
				if ($add_and)
				{
					$sql_str .= ' AND ';
				}
				else
				{
					$add_and = true;
				}

				// append clause item
				$sql_str .= $key . ' = :' . $key;
			}
		}

		// add the order by clause if we have one
		if (!empty($order_by)){
			if( gettype($order_by)=='function' ){

				$sql_str   .= ' ORDER BY ';
				$add_comma = false;
				foreach ($order_by as $column => $order)
				{
					if ($add_comma)
					{
						$sql_str .= ', ';
					}
					else
					{
						$add_comma = true;
					}
					$sql_str .= $column . ' ' . $order;
				}
			}else if(gettype($order_by)=='string'){
				$sql_str   .= ' ORDER BY '.$order_by;

			}
		}


		try
		{
			// now we attempt to retrieve the row using the sql string
		//	$pdoDriver = $this->dbh->getAttribute(\PDO::ATTR_DRIVER_NAME);

			//@TODO MS SQL Server & Oracle handle LIMITs differently, for now its disabled but we should address it later.
			$disableLimit = ['sqlsrv', 'mssql', 'oci'];

			// add the limit clause if we have one
		//3	if (!empty($limit) and !in_array($pdoDriver, $disableLimit))
			if (!empty($limit))
			{
				$sql_str .= ' LIMIT ' . (!empty($start) ? $start . ', ' : '') . $limit;
			}
			
		//1	$this->query = $this->dbh->prepare($sql_str);
			$txt = '';
			if (!empty($where) and is_array($where))
			{
				// bind each parameter in the array
				foreach ($where as $key => $val)
				{
				//1	$this->query->bindValue(':' . $key, $val);
					$txt .= ':' . $key;
				}
			}else{
				$where = '';
			}
	//	var_dump($where); exit;
	//	var_dump($sql_str); exit;
			return	$this->pdo->run($sql_str, $where)->fetchAll();
		

		}
		catch (\PDOException $e)
		{
			error_log($e);

			return false;
		}
	}

	public function insert($table, $params, $timestamp_this = null){
		if (is_null($timestamp_this)){
			$timestamp_this = $this->timestamp_writes;
		}
		// first we build the sql query string
		$columns_str = ' (';
		$values_str  = ' VALUES (';
		$add_comma   = false;

		// add each parameter into the query string
		foreach ($params as $key => $val){
			// only add comma after the first parameter has been appended
			if ($add_comma){
				$columns_str .= ', ';
				$values_str  .= ', ';
			}
			else{
				$add_comma = true;
			}

			// now append the parameter
			$columns_str .= $key;
			$values_str  .= ':' . $key;
		}

		// add the timestamp columns if necessary
		if ($timestamp_this === true){
			$columns_str .= ($add_comma ? ', ' : '') . 'date_created, date_modified';
			$values_str  .= ($add_comma ? ', ' : '') . time() . ', ' . time();
		}

		// close the builder strings
		$columns_str .= ') ';
		$values_str  .= ')';

		// build final insert string
		$sql_str = 'INSERT INTO ' . $this->prefix . $table . $columns_str . $values_str;

		// now we attempt to write this row into the database
		try
		{
			return	$this->pdo->inserting($sql_str, $params);

		}
		catch (\PDOException $e)
		{
			error_log($e);

			return false;
		}

	}
	public function update($table, $params, $wheres = [], $timestamp_this = null){
		if (is_null($timestamp_this))	{
			$timestamp_this = $this->timestamp_writes;
		}

		
		// build the set part of the update query by
		// adding each parameter into the set query string
		$add_comma  = false;
		$set_string = '';
		foreach ($params as $key => $val){
			// only add comma after the first parameter has been appended
			if ($add_comma)	{
				$set_string .= ', ';
			}
			else{
				$add_comma = true;
			}

			// now append the parameter
		//	$set_string .= $key . '=:param_' . $key;
			$set_string .= $key . '=?';// . $key;
		}

		// add the timestamp columns if necessary
		if ($timestamp_this === true){
			$set_string .= ($add_comma ? ', ' : '') . 'date_modified=' . time();
		}

		// lets add our where clause if we have one
		$where_string = '';
		if (!empty($wheres)){
			// load each key value pair, and implode them with an AND
			$where_array = [];
			foreach ($wheres as $key => $val){
			//	$where_array[] = $key . '=:where_' . $key;
				$where_array[] = $key . '=?'; //. $key;
			}
			// build the final where string
			$where_string = ' WHERE ' . implode(' AND ', $where_array);
		}

		// build final update string
		$sql_str = 'UPDATE ' . $this->prefix . $table . ' SET ' . $set_string . $where_string;

		// now we attempt to write this row into the database
		try{
		//1	$this->query = $this->dbh->prepare($sql_str);
		//	vv($sql_str, 2); 
		//	echo "<br>";
		//	vv(array($params,$wheres),2);
		//	vv($wheres,2);
			
			$test = false;
			foreach ($params as $key => $value) {
				foreach ($wheres as $keyy => $valuee) {
					if($key==$keyy){
						$wheres[$keyy.'a'] = $wheres[$keyy];
						unset($wheres[$keyy]);
						$test = true;
						break;
					}
				}

			}
			


			/*
			if($test==true){
				echo "true";
				$param = array($params,$wheres);
			}else{
				echo "false";
				$param = array_merge($params,$wheres);
			}
			*/
				$new = array();
				$param = array_merge($params,$wheres);
				foreach ($param as $key => $value) {
					array_push($new, $value);

				}
				// vv($new, 2);
				// vv($sql_str);
			return	$this->pdo->updating($sql_str, $new);
			// bind each parameter in the array
		//	foreach ($params as $key => $val){
			//1	$this->query->bindValue(':param_' . $key, $val);
		//	}

			// bind each where item in the array
		//	foreach ($wheres as $key => $val){
			//1	$this->query->bindValue(':where_' . $key, $val);
		//	}

			// execute the update query
		//	$successful_update = $this->query->execute();

			// if we were successful, return the amount of rows updated, otherwise return false
		//	return ($successful_update == true) ? $this->query->rowCount() : false;
		}
		catch (\PDOException $e){
			error_log($e);

			return false;
		}
	}
		public function delete($table, $params = [])
	{
		// building query string
		$sql_str = 'DELETE FROM ' . $this->prefix . $table;
		// append WHERE if necessary
		$sql_str .= (count($params) > 0 ? ' WHERE ' : '');

		$add_and = false;
		// add each clause using parameter array
		foreach ($params as $key => $val)
		{
			// only add AND after the first clause item has been appended
			if ($add_and)
			{
				$sql_str .= ' AND ';
			}
			else
			{
				$add_and = true;
			}

			// append clause item
			$sql_str .= $key . ' = :' . $key;
		}

		// now we attempt to retrieve the row using the sql string
		try{
			return	$this->pdo->deleting($sql_str, $params );

		//	$this->query = $this->dbh->prepare($sql_str);

			// bind each parameter in the array
		//	foreach ($params as $key => $val){
			//	$this->query->bindValue(':' . $key, $val);
		//	}

			// execute the delete query
	//		$successful_delete = $this->query->execute();

			// if we were successful, return the amount of rows updated, otherwise return false
		//	return ($successful_delete == true) ? $this->query->rowCount() : false;
		}
		catch (\PDOException $e)
		{
			error_log($e);

			return false;
		}
	}
	public function rev_count( $name_db, $where){
		$query = $this->rev->select($name_db, $where);
		return count($query);
		
	}

}