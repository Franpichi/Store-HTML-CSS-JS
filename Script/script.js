let carrito = []

const contenedor = document.querySelector("#contenedor")
const carritoContenedor =document.querySelector("#carritoContenedor")
const precioTotal = document.querySelector("#precioTotal")
const procesarCompra = document.querySelector("#procesarCompra")
const activarFuncion = document.querySelector("#activarFuncion")
const totalProceso = document.querySelector("#totalProceso")
const finalizarCompra = document.querySelector("#finalizarCompra")

if (activarFuncion){
    activarFuncion.addEventListener('click', procesarPedido)
}
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []

    mostrarCarrito()
    if(activarFuncion){
    document.querySelector("#activarFuncion").click(procesarPedido);
    }
})

if (procesarCompra){
    procesarCompra.addEventListener('click', () => {
        if (carrito.length === 0){
            Swal.fire({
                title: "Tu carrito está vacio",
                icon: "error",
                confirmButtonText: "Aceptar",
            })
        } else {
            location.href ="compras.html"
            procesarPedido()
        }
    })
    }

stockProductos.forEach((producto) => {
    const {id, nombre, precio, cantidad, img} = producto
    if (contenedor){
    contenedor.innerHTML += `
    <div class="card mt-3" id="tarjeta" style="width: 18rem; margin-left:70px;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p> Cantidad:" ${cantidad}"</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar Producto</button>
    </div>
  </div>
    `
}
})


function agregarProducto (id) {

    const existe = carrito.some(producto => producto.id === id)
    if (existe) {
        const productoEnCarrito = carrito.map(producto => {
            if (producto.id === id ) {
                producto.cantidad++
            }
        })
    }else {
        const item = stockProductos.find((producto) => producto.id === id)
        carrito.push(item)
    }


    mostrarCarrito()
}

const mostrarCarrito = () => {
    const modalBody = document.querySelector('.modal .modal-body')
    if (modalBody){
    modalBody.innerHTML = ''
    carrito.forEach((producto) => {
        const {id, nombre, precio, cantidad, img} = producto
        modalBody.innerHTML += `
        <div class="modal-contenedor">
        <div> 
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <p> Producto: "${nombre}"</p>
        <p> Precio:" ${precio}"</p>
        <p> Cantidad:" ${cantidad}"</p>
        <button onclick="eliminarProducto(${id})" class="btn btn-danger"> Eliminar </button>
        </div>
        `
    })
} 
    if (carrito.length === 0){
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo"> El carrito está vacio! </p>
        `
    } 
    carritoContenedor.textContent = carrito.length
    if (precioTotal){
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.precio, 0)
}
    guardarStorage()
}

function eliminarProducto(id){
    const almacenId = id
    carrito = carrito.filter ((almacen) => almacen.id !== almacenId)
    mostrarCarrito()
}

//LocalStorage

function guardarStorage () {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function procesarPedido () {
    carrito.forEach((producto) =>  {
        const listaCompra = document.querySelector("#lista-compra tbody")
        const {id, nombre, precio, cantidad, img} = producto
        const row = document.createElement('tr')
        row.innerHTML+=`
        <td>
            <img class="img-fluid img-carrito" id="imagenAtras" src="${img}"></img>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${precio*cantidad}</td>
        `
        listaCompra.appendChild(row)
    })
    totalProceso.innerText = carrito.reduce((acc, producto) => acc + producto.precio, 0)
}
/////////////////////////
if (finalizarCompra) {
    finalizarCompra.addEventListener('click', () => {
        if (carrito.length === 0){
            Swal.fire({
                title: "No pudimos procesarlo",
                text: 'Tu compra no se realizó, intenta nuevamente!',
                icon: "error",
                confirmButtonText: "Aceptar",
            })
        } else {
            function eliminarProducto(id){
                const almacenId = id
                carrito = carrito.filter ((almacen) => almacen.id !== almacenId)
                mostrarCarrito()
            }
            Swal.fire({
                title: "Felicidades",
                text: 'Tu compra se realizó de manera correcta!!',
                icon: "success",
                confirmButtonText: "Aceptar",
            })
            localStorage.clear() 
        }
    })
}


    fetch('./Script/stock.js')
    /* .then(respuesta => respuesta.JSON()) */
    .then(data => console.log(data))
    .catch(error => console.log(error))