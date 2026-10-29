

<?php
//<!-- EN ESTE ARCHIVO SE ENCUENTRA LA CONEXION A LA BASE DE DATOS Y LA CONSULTA SELECT -->

//DB USer id19746472_pruebassql
//DB: id19746472_sucursales
//Key:  DQLtesting9-

function db_connect()
{
	//Nombre de usuario
	$mysql_username = "root";
	//Contraseña 
	$mysql_password = "";
	//Nombre del servidor, si es local usar localhost
	$server_name = "localhost";
	//Nombre de la bd
	$basededatos = "facturaprueba";
	/*
	Verifica el usuario y la contraseña
	Es posible que este error no salte correctamente en mysql y que aparezca como [caching_sha2_password], si esto llega a suceder, la forma
	más sencilla de arreglarlo es ir a MySQL y ejecutar el siguiente código:
	CREATE USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
	GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
	cambiar el 'user' por el nuevo nombre de usuario, lo mismo con 'password'. Usar esos nuevos datos creados para conectar con la bd.
	*/
	$conn = mysqli_connect($server_name, $mysql_username, $mysql_password) or die("No se ha podido conectar al servidor de Base de datos");

	//Verifica la bd
	$db = mysqli_select_db($conn, $basededatos) or die("No se ha podidio conectar con la base de datos ' $basededatos '");

	//Retorna la conexion con la bd
	return $conn;
}



//Crea la consulta SQL
function consultaSQL($parametro1, $parametro2, $parametro3)
{
	$conn = db_connect();

	//En la variable campos, se guardan los campos que se desean mostrar en la consulta SQL
	$campos = $parametro1;

	//En la variable tabla, se guarda el nombre de la tabla a la cual se va a hacer la consulta SQL
	$tabla = $parametro2;

	//En la variable condicion, guardo la condicion para ponerle al where
	$condicion = $parametro3;

	//Verifico si la condicion SQL va a tener o no un WHILE
	if ($condicion == "") {
		//Asigno la variable campos y tabla, para tener el nombre de los campos a extraer y la tabla en la cual se hara
		$sql = "SELECT $campos FROM $tabla";
		$stmt = mysqli_query($conn, $sql);
		if ($stmt === false) {
			die(print_r(mysqli_error($conn), true));
		}
		//Guardo el resultado de la consulta SQL en el array $datos
		while ($fila = mysqli_fetch_array($stmt)) {
			$datos[] = $fila;
		}
		//Cierro la conexion con la bd
		mysqli_close($conn);

		//Retorno un array con el resultado de la consulta SQL
		return $datos;
	} else {
		//Asigno la variable campos y tabla, para tener el nombre de los campos a extraer y la tabla en la cual se hara
		$sql = "SELECT $campos FROM $tabla WHERE $parametro3";
		$stmt = mysqli_query($conn, $sql);
		if ($stmt === false) {
			die(print_r(mysqli_error($conn), true));
		}
		//Guardo el resultado de la consulta SQL en el array $datos
		while ($fila = mysqli_fetch_array($stmt)) {
			$datos[] = $fila;
		}
		//Cierro la conexion con la bd
		mysqli_close($conn);

		//Retorno un array con el resultado de la consulta SQL
		return $datos;
	}
}
?>
