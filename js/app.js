document.addEventListener("DOMContentLoaded", function () {
  iniciarFunciones();
});

let cart = [];
let carrito = []; // aca se guardan todos los productos pickeados por el usuario

async function iniciarFunciones() {
  const productos = await obtenerProductos();
  crearProducto(productos);
}

//creo todos los elementos html y con fetch api leo y pinto las imagenes en el navegador
async function obtenerProductos() {
  try {
    const resultado = await fetch("./productos.json");
    const data = await resultado.json();
    // agrego la cantidad a cada producto 
    for (const producto of data.productos) {
      producto.cantidad = 1
      // console.log(producto);
      
    }
    return data.productos;
  } catch (error) {
    console.log(error);
  }
}
function crearProducto(productos) {
  productos.forEach((producto) => {
    const { nombre, precio, imagen } = producto;
    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = nombre;
    nombreProducto.classList.add("nombreProducto");

    // crear boton agregar al carrito
    const boton = document.createElement("button");
    boton.textContent = "agregar al carrito ";
    boton.classList.add("boton");
    boton.id = producto.id;
    boton.addEventListener("click", () => {
      alertaProducto(producto);
    });
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);
      sumaPrecioProducto(producto) ;
      cantidadProductos(producto)
  
     
    });

    const precioProducto = document.createElement("p");
    precioProducto.textContent = `$ ${precio}`;
    precioProducto.classList.add("precioProducto");

    const imagenProducto = document.createElement("IMG");
    imagenProducto.src = imagen;

    imagenProducto.classList.add("imagenProducto");

    // genero un div para guardar toda la informacion del json
    const divImagenes = document.createElement("DIV");
    divImagenes.classList.add("divProductos");
    const divProductos = document.createElement("DIV");
    divProductos.classList.add("divProductos");

    //inyectar imagen,nombre y precio al html
    divProductos.appendChild(imagenProducto);
    divProductos.appendChild(nombreProducto);
    divProductos.appendChild(precioProducto);
    divProductos.appendChild(boton);
    if (document.querySelector("#productos")) {
      document.querySelector("#productos").appendChild(divProductos);
    }
  });
}

function agregarAlCarrito(producto) {
  const { nombre} = producto;

  if (Object.keys(carrito).length === 20 ) {
    carritoLLeno();
    localStorage.clear()
   
  } else {
    //creo un objeto para guardar toda la info del carrito
    cart = JSON.parse(localStorage.getItem("carrito"))|| [] 
    cart.push({
      id: producto.id,
      nombre: nombre,
      precio: producto.precio,
      cantidad : 1
    });
 
    localStorage.setItem("carrito", JSON.stringify(cart));

    pintarCarrito(cart)
  }
}
function pintarCarrito(cart){
  //crear un div para guardar toda la info del carrito y mostrarla en pantalla
  const divCarrito = document.createElement("div");
  divCarrito.classList.add("carrito");
  divCarrito.innerHTML = '';
  console.log(producto.cantidad);
  cart.forEach(producto => {   
    divCarrito.innerHTML += `<span> el producto es  :${producto.nombre}   </span>`;
    let selecctor = $("#contenedorResumen");
    selecctor.html(carrito.length)
    selecctor.append(divCarrito);
  })
}

function alertaProducto(producto) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `producto cargado al carrito al carrito  ${producto.nombre}`,
    showConfirmButton: false,
    timer: 3000,
  });
}
 