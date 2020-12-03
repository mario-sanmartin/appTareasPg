<?php

include('database.php');

if(empty($_POST['name'] && $_POST['description'])){
    echo "Algo huele mal";

}else{

    if(isset($_POST['name'])){

    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "INSERT INTO task(name,description)
    VALUES ('$name','$description')";

    $result = pg_query($conexion,$query);
    //Si no existe resultado , la consulta a fallado.
    if(!$result){
        die('Query Failed.');
    }
    echo 'task Added Sussefully';
}

}




?>
