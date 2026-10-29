<?php
header("Acces-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facturaprueba";
$conn = mysqli_connect($servername, $username, $password, $dbname);


// Check connection
try {
    $conexion = new PDO(
        "mysql:host=$servername;dbname=$dbname;charset=utf8",
        $username,
        $password
    );

    $conexion->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

?>