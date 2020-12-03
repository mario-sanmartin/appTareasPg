<?php

    include('database.php');

    $id = $_POST['id'];

    $consulta = "SELECT * FROM task WHERE id=$id";

   $resultado =  pg_query($conexion,$consulta);

   if(!$resultado){
       die('La consulta a muerto señores');
   }

   $json = array();
   while($fila = pg_fetch_array($resultado)){
       $json []= array(
           'name' => $fila['name'],
           'description' => $fila['description'],
           'id' => $fila['id']
       );
   }

  $jacksonstrig = json_encode($json[0]);

  echo $jacksonstrig;
?>