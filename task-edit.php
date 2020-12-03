<?php

    include('database.php');

    $id = $_POST['id'];
    $name =$_POST['name'];
    $description = $_POST['description'];

    $consulta = "UPDATE task set name = '$name', description = '$description'
    WHERE id = '$id'";

    $resultadito = pg_query($conexion,$consulta);

    if(!$resultadito){
        die('la query se fue a la rechucha'.mysqli_error($conexion));
    }
    echo 'La tarea se a actualizado de lolo';
?>