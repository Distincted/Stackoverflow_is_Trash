<?php
class GrumpyPdo extends \PDO
{
    /**
     * @var array
     * Default attributes set for database connection.
     */
    private $pdo;

    protected $default_attributes = array(
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
    );
    public function __construct($hostname='localhost', $username='root', $password='', $database='fatoc_new', $attributes = array(), $charset = "utf8")
    {
        $active_attrs = $this->default_attributes;
        if(!empty($attributes)) {
            array_replace($active_attrs, $attributes);
        }
        parent::__construct("mysql:host={$hostname};dbname={$database};charset={$charset}", $username, $password, $active_attrs);
    }
    public function run($query, $values = array())
    {
     //   var_dump($values);
        if(!$values) {
            return $this->query($query);
        }

        /*
        if(is_array($values[0])) {
           return $this->multi($query, $values); 
        }
        */
        
        $stmt = $this->prepare($query);
        $stmt->execute($values);
        return $stmt;
    }
    private function multi($query, $values = array()){
        $stmt = $this->prepare($query);
        foreach($values as $value){

            $stmt->execute($value);
        }
        return $stmt;
    }
    /**
     * Quick queries
     * Allows you to run a query without chaining the return type manually. This allows for slightly shorter syntax.
     */
    public function row($query, $values = array()){
        return $this->run($query, $values)->fetch();
    }
    public function cell($query, $values = array()){
        return $this->run($query, $values)->fetchColumn();
    }
    public function all($query, $values = array()){
        return $this->run($query, $values)->fetchAll();
    }
    public function inserting($query, $values = array()){
        $this->run($query, $values);
        return $this->lastInsertId();
    }
    public function updating($query, $values = array()){
        $this->run($query, $values);
        return true;
    }
     public function deleting($query, $values = array()){
        return $this->run($query, $values)->rowCount();
        return true;
    }

}
