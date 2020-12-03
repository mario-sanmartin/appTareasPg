<?php

include('database.php');

$query = "SELECT * FROM task ";
$result = pg_query($conexion,$query);

if(!$result){
    //Concatenamos con mysqli_error + la conexion para saber que tipo de error fue
    die("La query se fue a la chucha" . mysqli_error($conexion));

}

$json = array();

//Una fila por cada dato que obtengo
while($row = pg_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

//codificamos con json_encode
$jsontring = json_encode($json);
echo $jsontring;




?>