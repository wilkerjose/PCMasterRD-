let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(producto);
    }

    // Actualizar el contador del carrito
    document.getElementById('cart-count').textContent = carrito.length;

    // Mostrar los productos en el modal
    mostrarCarrito();

    // Mostrar mensaje de producto agregado ✅
    mostrarMensaje("¡Producto agregado al carrito!");
}

// Función para mostrar mensaje
function mostrarMensaje(texto) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-carrito';
    mensaje.textContent = texto;
    document.body.appendChild(mensaje);

    // Animación: desaparece después de 2.5 segundos
    setTimeout(() => {
        mensaje.remove();
    }, 2500);
}

// Función para mostrar los productos en el modal
function mostrarCarrito() {
    const carritoContainer = document.getElementById('cart-details');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto-carrito');
            productoElemento.innerHTML = `
                <p><strong>${producto.nombre}</strong></p>
                <p>Precio: RD$${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            carritoContainer.appendChild(productoElemento);
        });

        // Mostrar la sumatoria y el botón de comprar
        mostrarTotal();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const producto = carrito[index];
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    // Actualizar el contador del carrito
    document.getElementById('cart-count').textContent = carrito.length;
    mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    document.getElementById('cart-count').textContent = 0;
    mostrarCarrito();
    cerrarModal();
}

// Función para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

// Función para mostrar el total y el botón de "Comprar"
function mostrarTotal() {
    const totalContainer = document.getElementById('cart-total');
    const total = calcularTotal();
    totalContainer.innerHTML = `
        <p>Total: RD$${total.toFixed(2)}</p>
        <button onclick="comprar()">Comprar</button>
    `;
}

// Función para simular la compra
function comprar() {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Vaciar el carrito después de la compra
}

// Función para abrir el modal
function abrirModal() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = 'none';
}

// 👇 AQUÍ añadí lo que faltaba (abajo del todo)

// Cerrar el modal cuando el usuario haga clic en la X
document.getElementById('close-modal').onclick = cerrarModal;

// 👉 Esta línea es nueva: ahora tu carrito se puede abrir
document.getElementById('cart').onclick = abrirModal;

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-carrito');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
