const guardarDatos = {
    nombreUsuario: "",
    emailUsuario: "",
    mensajeUsuario: "",
};


const datosUsuario = []; // creo un array donde se van a guardar los  datos del formulario 

$("#boton").click(function (e) {
    let nombre = $("#nombre").val();
    let email = $("#email").val();
    let mensaje = $("#mensaje").val();

    e.preventDefault();
    if (nombre != "" || email != "" || mensaje != "") {
        guardarDatos.nombreUsuario = nombre;
        guardarDatos.emailUsuario = email;
        guardarDatos.mensajeUsuario = mensaje;
        datosUsuario.push(guardarDatos)
        // guardo los datos en local storage 
        localStorage.setItem("usuario", JSON.stringify(datosUsuario))
        ConfirmarEnvio();
        // console.log(datosUsuario);
    }
});
// 

// si los datos no estan completos entonces se ejecuta la siguiente funcion 
$("#boton").click(function (e) {
    let nombre = $("#nombre").val();
    let email = $("#email").val();
    let mensaje = $("#mensaje").val();
    e.preventDefault();

    if ((nombre === "" || email === "" || mensaje === "") || nombre.length < 2 && mensaje.length < 3) {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: `Nombre o mensaje no valido , por favor intente nuevamente `,
            showConfirmButton: false,
            timer: 3000,
        });
    }
});
function ConfirmarEnvio() {
    // hago la peticion con post
    const URLPOST = "https://jsonplaceholder.typicode.com/posts"
    const data = { datosFormulario: JSON.parse(localStorage.getItem('usuario'))}

    //  console.log(data);
    $.post(URLPOST, data, function (respuesta,estado) {
        console.log(estado);
        if(estado=="success"){
            Swal.fire({
        position: "center",
          icon: "success",
          title: `Formulario enviado correctamente, su comprobante de es el numero : ${respuesta.id}`,
          showConfirmButton: false,
          timer: 3000,
      });

     }
        
    })

}


