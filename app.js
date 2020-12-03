// $(function(){
//     console.log('JQUERY IS WORKING');
// })}

// $(function(){
//     $("#search").keyup(function () 
//     {
//         let search = $("#search").val();
//         console.log(search);
//       })
// })

$(document).ready(function () {

    //creamos una variable editar y la asignamos false.
    let edit = false;

    // Ocultamos el div
    $("#task-result").hide();
    //Para que ejecute la funcion al toque. linea 71
    fetchTask();

    //Este search se ejecuta solo cuando un usuario tipea algo
    $("#search").keyup(function (e) {
        // e.preventDefault();
        if ($("#search").val()) {
            let search = $("#search").val();
            $.ajax({
                type: "POST",
                url: "task-search.php",
                data: { search },
                //dataType: "json",
                success: function (response) {
                    // console.log(response);
                    /*Tomar un objeto json convertido a string y lo vuelve
                    a convertir en json */
                    let tasks = JSON.parse(response);
                    let template = '';
                    tasks.forEach(task => {
                        template += `
                  <li>
                  ${task.name}
                  </li>
                 `
                    });
                    $("#container").html(template);
                    // Una vez llenado el container lo mostramos
                    $("#task-result").show();
                }
            });
        }
    });

    // Se ejecuta cuando una tarea es agregada solamente.
    $("#task-form").submit(function (e) {
        const postData = {
            name: $("#name").val(),
            description: $("#description").val(),
            id : $('#taskId').val()
        };

      

        //Validacion de edit;
        //Si nuestro formulario no se esta editando
        // envia los datos a task-addEventListener.php
        // si no envia los datos a 
        let url = edit === false ? 'task-add.php': 'task-edit.php';

            // con esto vemos por consola a donde esta enviando los datos
        //   console.log(url);  

        $.post(url, postData, function (response) {

            console.log(response);

            //aqui colocamos de nuevo la funcion para que una vez
            // agregada una nueva tarea llame a la funcion y esta recargue el listado
            // de tareas + la tarea agregada recien
            fetchTask(); //la funcion de la linea 71
            // console.log(response);

            // Reseteo del formulario con jquery
            $("#task-form").trigger('reset');
        });
        e.preventDefault();
    });

//Creamos la funcion para que se ejecute cuando queramos
  function fetchTask() {
    $.ajax({
        type: "GET",
        url: "task-list.php",
        // data: "data",
        // dataType: "dataType",
        success: function (response) {
            //con json.parse transformamos a string
            let tasks = JSON.parse(response);
            let template = '';
            //recorreremos las tareas una a una
            tasks.forEach(task => {
                template +=`
                <tr taskId ="${task.id}">
                    <td>${task.id}</td>
                    <td>
                        <a href="#" class="task-item">${task.name}</a>
                    </td>
                    <td>${task.description}</td>
                        <td>
                       
                            <button class="task-delete btn btn-danger btn-sm">
                                Borrar
                            </button>
                        </td>
                </tr>
            `
            });
            //Aqui seleccionamos donde ira metido el template o plantilla
            //tasks es el id del tbody
            $("#tasks").html(template);
        }
    });
    }


    $(document).on('click','.task-delete',function(){
        //confirmacion
        if(confirm('¿Estas seguro de querer eleminar esta tarea?')){
                 // //A traves de esto sabemos si nos esta pescando el evento click
        // console.log('clicked');
        
        // con esto podemos ver lo eventos del boton
        // console.log($(this));

        /*
            Tenemos que tener en cuenta que el elemento 0
            es el boton , el boton tiene un padre que es el td
            el td tiene un padre que es el tr  que es el row(fila)
        */
    //    //Accedemos al elemento 0 boton
    //    let element = $(this)[0];
       
    //Accedemos al elemento padre del elemento 0 al td
    // let element = $(this)[0].parentElement;

    //Accedemos al elemento padre del elemento td al elemento tr
        let element = $(this)[0].parentElement.parentElement;
        // le asignamos una clase al elemento id (linea84)
    //    seleccionamos el elemento o el attr(atributo) que tenga
    //    el elemento taskId
     let id =  $(element).attr('taskId');
        // console.log(id);

        $.post("task-delete.php",{id},
            function (response) {
                // console.log(response);
                fetchTask();

            })
        }
    });
    //Importante estamos escuchando
    // al elemento con la clase task-item 
    // al ser una clase debe anteponerse el punto si fuera
    // un id seria un #
    $(document).on('click','.task-item',function(){
        // console.log('editando');

        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        // console.log(id);
        $.post('task-single.php',{id},function(response){
            // console.log(response);
        
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            //Aqui le decimos que edit = true;

        
            edit = true;
        })

    })
});