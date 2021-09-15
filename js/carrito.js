if (localStorage.getItem("carrito")) {
  //console.log(localStorage.getItem("carrito"))
  let carritoTraido = JSON.parse(localStorage.getItem("carrito"));
  // console.log(carritoTraido)
  let divResumen = document.createElement('div')

  carritoTraido.forEach(item => {
    let p = document.createElement('p')
    p.innerHTML = `<span> el producto es  :${item.nombre} </span>`;
    divResumen.appendChild(p)

    // creo los botones + , - y x  para aumentar , disminuir  o quitar un producto del carrito 
    
    crearBoton( "+","botonSumar",divResumen,()=>{
       // aumento la cantidad del producto por cada click que se haga en el boton +
      item.cantidad++
      if(item.cantidad >1)
      
      sumaPrecioCantidad()

      // si el contador llego a 10 entonces que no siga agregando mas productos 
      localStorage.setItem("carrito", JSON.stringify(carritoTraido))
    });
    crearBoton("-","botonDisminuir",divResumen,()=>{
     // accedo al item y que empiece a disminuir la cantidad y por cada click setea el nuevo valor en localStorage
     item.cantidad--
     localStorage.setItem("carrito", JSON.stringify(carritoTraido))
     if (item.cantidad <= 0) {
       // si el contador llego a 0 entonces que no siga decrementando el contador 
       item.cantidad++
       minimoProductos();

     };
     
  }) 
  
  crearBoton("x","botonEliminar",divResumen,()=>{
    let botonQuitar = document.createElement('button')
   botonQuitar.id =item.id
    // console.log(botonQuitar);
    const productosCarrito = carritoTraido.filter((producto) => botonQuitar.id != producto.id)
     console.log(productosCarrito);
     localStorage.setItem("carrito", JSON.stringify(productosCarrito))
     const misProductos = localStorage.getItem('carrito');
     console.log(misProductos)
     pintarCarrito(misProductos);
    
    }

  )

  document.querySelector('#contenedorResumen').appendChild(divResumen)
 
})
 
function crearBoton(contenido,clase,divResumen, evento) {
  let boton = document.createElement("button")
  boton.textContent = contenido
  boton.classList.add(clase);
  divResumen.appendChild(boton)
  boton.addEventListener("click", evento)

}
function sumaPrecioProducto() {
  if (localStorage.getItem("carrito")) {
    // guardo todos los datos de carrito
    const productos = JSON.parse(localStorage.getItem("carrito"))
    // creo un nuevo arreglo de los precios de carrito 
   
    var acumuladorPrecio = productos.map(producto => producto.precio)
    // sumo todos los precios del local storage 
    const subTotal = acumuladorPrecio.reduce((acc, el) => acc + el, 0)
    // creo un div para guardar los precios y mostrarlos en pantalla 
    const divContenedor = document.createElement('div')
    let p = document.createElement('p')
    p.innerHTML = `<span> el precio final es : $ ${subTotal} </span>`;
    divContenedor.classList.add('PrecioFinal')
    divContenedor.appendChild(p)
    document.querySelector('#contenedorResumen').appendChild(divContenedor)
    // console.log(subTotal);
    
    

  }


}
sumaPrecioProducto()

 function sumaPrecioCantidad(){
  if (localStorage.getItem("carrito")) {
    // guardo todos los datos de carrito
    const productos = JSON.parse(localStorage.getItem("carrito"))
    // creo un nuevo arreglo de los precios de carrito
   productos.forEach(producto=>{
     const {cantidad,precio} = producto 
     let cantidadProductos = cantidad
     let precioProducto =precio 
    // calculo el valor total x cantidad 
    let total = cantidadProductos*precioProducto
    
   
    const divContenedor = document.createElement('div')
    let p = document.createElement('p')
    p.innerHTML = `<span> el precio es  $ ${total} y su cantidad es  ${cantidadProductos}</span>`;
    console.log(p.lastChild);
    divContenedor.classList.add('PrecioFinal')
    divContenedor.appendChild(p)
    document.querySelector('#contenedorResumen').appendChild(divContenedor)
  
   })
     
  
 
  }
 }

// -----ALERTAS ---
function carritoLLeno() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: `Por el momento solo se pueden agregar hasta 10 productos `,
    showConfirmButton: false,
    timer: 3000,
  });
}
function minimoProductos() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: `Por lo menos 1 producto tiene que haber en el carrito `,
    showConfirmButton: false,
    timer: 3000,
  });
}

}
