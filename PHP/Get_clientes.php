<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');
// llamo al archivo para conectarme a la db
include 'conexion2.php';
//Asigno a $Row los valores obtenido en la consulta SQL

//Get_Clientes()
$Row = consultaSQL("ID_cliente,nombre,apellido,situacion_fiscal,dni", "cliente", "");

$cli = array(array());
for ($m = 0; $m < count($Row); $m++) {
  for ($s = 0; $s < 4; $s++) {
    $cli[$m][$s] = $Row[$m][$s];
  }
}

echo json_encode($Row);
