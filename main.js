
const URL = "http://localhost:8080/api/carrito"; // La dirección de tu Java

// AL CARGAR LA PÁGINA
window.onload = () => {
    // Si estamos en la página de PRODUCTOS, pedimos la lista al Java
    if (document.getElementById("tabla-datos")) {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                let tabla = document.getElementById("tabla-datos");
                tabla.innerHTML = ""; // Limpiar "undefined"
                
                // Recorremos los carritos y sus líneas
                data.forEach(c => {
                    c.lineas.forEach(l => {
                        tabla.innerHTML += `<tr><td>${l.descripcion}</td><td>${l.idArticulo}</td><td>${l.precioFinal}€</td></tr>`;
                    });
                });
            });
    }

    // Si estamos en la página de PEDIDO, enviamos los datos al Java
    if (document.getElementById("mi-formulario")) {
        document.getElementById("mi-formulario").onsubmit = (e) => {
            e.preventDefault();
            const nuevo = {
                idUsuario: 1,
                lineas: [{
                    descripcion: document.getElementById("prod").value,
                    idArticulo: 101,
                    unidades: 1,
                    precioFinal: 50.0
                }]
            };

            fetch(URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(nuevo)
            }).then(() => {
                alert("¡Guardado!");
                window.location.href = "productos.html";
            });
        };
    }
};
}
