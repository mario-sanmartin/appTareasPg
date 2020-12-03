<?php

    include('database.php');

    /*
    Si existe 
    a traves del metodo post una propiedad
    id , almcenadala y has la consulta.
    */
    if(isset($_POST['id'])){

        $id = $_POST['id'];

        $consulta = "DELETE FROM task WHERE id = $id";

        $resultado = pg_query($conexion,$consulta);

        //SI no obtengo un resultado envio un mensaje de error
        if(!$resultado){
            die('La consulta se fue a la porra');
        }

        echo "Tarea borrada a la perfeccción";
    }





?>