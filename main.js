
const API_URL = "http://localhost:8080/api/carrito";
document.addEventListener("DOMContentLoaded", () => {
    //Si estamos en la página de PRODUCTOS, cargamos la lista
    if (document.getElementById("tabla-productos")) {
        cargarProductos();
    }

    //Si estamos en la página de PEDIDO, configuramos el formulario
    const formularioPedido = document.getElementById("form-pedido");
    if (formularioPedido) {
        formularioPedido.addEventListener("submit", enviarPedido);
    }
});

// FUNCIÓN PARA OBTENER DATOS (GET)
async function cargarProductos() {
    try {
        const response = await fetch(API_URL);
        const productos = await response.json();
        const tbody = document.getElementById("tabla-productos");

        tbody.innerHTML = ""; // Limpiamos lo que haya

        productos.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td>${item.descripcion}</td>
                    <td>ID: ${item.idArticulo}</td>
                    <td>${item.precioFinal}€ (Unidades: ${item.unidades})</td>
                </tr>`;
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// FUNCIÓN PARA ENVIAR DATOS (POST)
async function enviarPedido(event) {
    event.preventDefault();

    // Creamos el objeto
    const nuevoPedido = {
        idArticulo: Math.floor(Math.random() * 500), 
        descripcion: document.getElementById("producto").value,
        unidades: 1,
        precioFinal: 99.99 // Precio simulado
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPedido)
        });

        if (response.ok) {
            alert("¡Pedido realizado con éxito!");
            window.location.href = "productos.html"; // Redirigir para ver el cambio
        }
    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
}
