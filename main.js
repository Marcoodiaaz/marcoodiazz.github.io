// La dirección de tu API REST de la Práctica 2
const URL = "http://localhost:8080/api/carrito"; 

window.onload = () => {

    //LÓGICA PARA PRODUCTOS.HTML (MOSTRAR DATOS)
    const tabla = document.getElementById("tabla-productos");
    if (tabla) {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                tabla.innerHTML = ""; // Limpiar tabla antes de cargar
                
                // Recorremos los carritos y sus líneas de artículos
                data.forEach(carrito => {
                    if (carrito.lineas) {
                        carrito.lineas.forEach(l => {
                            tabla.innerHTML += `
                                <tr>
                                    <td>${l.descripcion}</td>
                                    <td>ID Art: ${l.idArticulo}</td>
                                    <td>${l.precioFinal}€ (Cant: ${l.unidades})</td>
                                </tr>`;
                        });
                    }
                });
            })
            .catch(err => console.error("Error cargando productos:", err));
    }

    // LÓGICA PARA PEDIDO.HTML (ENVIAR DATOS)
    const formulario = document.getElementById("form-pedido");
    if (formulario) {
        formulario.onsubmit = (e) => {
            e.preventDefault();
            const nuevoPedido = {
                idUsuario: 1,
                correoUsuario: document.getElementById("email") ? document.getElementById("email").value : "usuario@test.com",
                lineas: [{
                    descripcion: document.getElementById("producto").value,
                    idArticulo: Math.floor(Math.random() * 100),
                    unidades: 1,
                    precioFinal: 50.0 // Precio de ejemplo
                }]
            };

            fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoPedido)
            })
            .then(res => {
                if (res.ok) {
                    alert("¡Pedido realizado con éxito!");
                    window.location.href = "productos.html";
                }
            })
            .catch(err => alert("Error: ¿Está el backend encendido?"));
        };
    }
    const btnVaciar = document.getElementById("vaciar-btn");
if (btnVaciar) {
    btnVaciar.onclick = async () => {
        // Aquí tendrías que iterar y borrar o tener un endpoint que borre todo
        // Por ahora, lo más sencillo es reiniciar el backend de la P2.
        alert("Reinicia tu aplicación de Spring Boot para limpiar la base de datos.");
    };
}
};
