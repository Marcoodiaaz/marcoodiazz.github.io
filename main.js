// URL de mi API de la P2
const urlApi = "http://localhost:8080/api/carrito";

window.onload = () => {
    // Detectar si estamos en la página de productos (tiene la tabla)
    const tabla = document.getElementById("tabla-productos");
    if (tabla) {
        pintarProductos();
    }

    // Detectar si estamos en la de pedidos (tiene el formulario)
    const form = document.getElementById("form-pedido");
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            enviarAlCarrito();
        };
    }

    // Botón opcional para resetear la vista de la tabla
    const btnReset = document.getElementById("vaciar-btn");
    if (btnReset) {
        btnReset.onclick = () => {
            if (tabla) tabla.innerHTML = "";
            alert("Vista reseteada");
        };
    }
};

// Función para traer los datos del Java (GET)
function pintarProductos() {
    const tabla = document.getElementById("tabla-productos");

    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            tabla.innerHTML = ""; // Limpiamos para que no se acumulen

            data.forEach(carrito => {
                // Entramos en la lista de lineas del objeto Carrito
                if (carrito.lineas && carrito.lineas.length > 0) {
                    carrito.lineas.forEach(l => {
                        let fila = `<tr>
                            <td>${l.descripcion}</td>
                            <td>${l.idArticulo}</td>
                            <td>${l.precioFinal}€ (x${l.unidades})</td>
                        </tr>`;
                        tabla.innerHTML += fila;
                    });
                }
            });
        })
        .catch(err => {
            console.log("Error:", err);
            tabla.innerHTML = "<tr><td colspan='3'>Error al conectar con el servidor</td></tr>";
        });
}

// Función para guardar (POST)
function enviarAlCarrito() {
    // Montamos el objeto como lo pide la Práctica 2
    const pedido = {
        idUsuario: 1,
        correoUsuario: document.getElementById("email") ? document.getElementById("email").value : "alumno@comillas.edu",
        lineas: [{
            descripcion: document.getElementById("producto").value,
            idArticulo: Math.floor(Math.random() * 500),
            unidades: 1,
            precioFinal: 49.95
        }]
    };

    fetch(urlApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    })
    .then(res => {
        if (res.ok) {
            alert("¡Pedido guardado!");
            window.location.href = "productos.html"; // Nos vamos a la lista
        }
    })
    .catch(err => alert("No se pudo guardar. ¿Está el backend encendido?"));

    // Buscamos el botón naranja de la imagen
const btnVaciar = document.getElementById("vaciar-carrito"); 

if (btnVaciar) {
    btnVaciar.onclick = () => {
        if (confirm("¿Quieres borrar todos los productos del carrito?")) {
            // Enviamos petición DELETE al servidor 
            fetch(urlApi + "/1", { 
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    alert("Carrito vaciado");
                    location.reload(); // Recarga la página para que la tabla salga vacía
                } else {
                    alert("No se pudo borrar. Revisa si el ID existe en tu Java.");
                }
            })
            .catch(err => alert("Error de conexión con el backend"));
        }
    };
}
}
