// ==============================
// CARRITO VÉRA
// ==============================

let carrito = JSON.parse(localStorage.getItem("carritoVera")) || [];


// ==============================
// GUARDAR CARRITO
// ==============================

function guardarCarrito() {
    localStorage.setItem("carritoVera", JSON.stringify(carrito));
}


// ==============================
// AGREGAR PRODUCTO
// ==============================

function agregarAlCarrito(nombre, precio, imagen) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });

    }

    guardarCarrito();
    actualizarContadorCarrito();

    alert(nombre + " se agregó al carrito 🛍️");
}


// ==============================
// CONTADOR DEL CARRITO
// ==============================

function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) return;

    const cantidadTotal = carrito.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    contador.textContent = cantidadTotal;
}


// ==============================
// MOSTRAR CARRITO
// ==============================

function mostrarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");

    if (!lista || !totalElemento) return;

    lista.innerHTML = "";

    // CARRITO VACÍO

    if (carrito.length === 0) {

        lista.innerHTML = `
            <div class="carrito-vacio">

                <p>Tu carrito está vacío.</p>

                <a href="index.html">
                    <button>Explorar VÉRA</button>
                </a>

            </div>
        `;

        totalElemento.textContent = "0";

        return;
    }


    // CARRITO CON PRODUCTOS

    let total = 0;

    carrito.forEach((producto, indice) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;


        const productoHTML = document.createElement("div");

        productoHTML.classList.add("producto-carrito");


        productoHTML.innerHTML = `

            <!-- FOTO -->

            <div class="foto-carrito">

                <img 
                    src="${producto.imagen}" 
                    alt="${producto.nombre}"
                >

            </div>


            <!-- INFORMACIÓN -->

            <div>

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio}</p>

            </div>


            <!-- CANTIDAD -->

            <div class="cantidad">

                <button onclick="cambiarCantidad(${indice}, -1)">
                    −
                </button>

                <span>
                    ${producto.cantidad}
                </span>

                <button onclick="cambiarCantidad(${indice}, 1)">
                    +
                </button>

            </div>


            <!-- SUBTOTAL -->

            <div>

                <strong>
                    $${subtotal}
                </strong>

            </div>


            <!-- ELIMINAR -->

            <button onclick="eliminarProducto(${indice})">

                Eliminar

            </button>

        `;


        lista.appendChild(productoHTML);

    });


    // TOTAL

    totalElemento.textContent = total;

}


// ==============================
// CAMBIAR CANTIDAD
// ==============================

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;


    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }


    guardarCarrito();

    actualizarContadorCarrito();

    mostrarCarrito();

}


// ==============================
// ELIMINAR PRODUCTO
// ==============================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    actualizarContadorCarrito();

    mostrarCarrito();

}


// ==============================
// AL CARGAR LA PÁGINA
// ==============================

document.addEventListener("DOMContentLoaded", function() {

    actualizarContadorCarrito();

    mostrarCarrito();

});