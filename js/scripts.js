document.addEventListener("DOMContentLoaded", function() {
    var comprarTicketsButton1 = document.getElementById("btnComprar1");
    var comprarTicketsButton2 = document.getElementById("btnComprar2");

    if (comprarTicketsButton1) {
        comprarTicketsButton1.addEventListener("click", function (event) {
            event.preventDefault();
            cargarFormulario();
        });
    }

    if (comprarTicketsButton2) {
        comprarTicketsButton2.addEventListener("click", function (event) {
            event.preventDefault();
            cargarFormulario();
        });
    }

    function cargarFormulario() {
        fetch("formTicket.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("formComprarTickets").innerHTML = data;

                var modal = new bootstrap.Modal(document.getElementById("ticketModal"));
                modal.show();

                asignarEventosFormulario();
            })
            .catch(error => console.error("Error al cargar el formulario: " + error));
    }

    function asignarEventosFormulario() {
        var cantidad = document.getElementById("cantidad");
        var categoria = document.getElementById("categoria");
        var btnResumen = document.getElementById("btnResumen");
        var btnBorrar = document.getElementById("btnBorrar");
        var totalHtml = document.getElementById("total-amount");

        if (btnBorrar) {
            btnBorrar.addEventListener("click", function (event) {
                event.preventDefault();
                resetFormulario(totalHtml);
            });
        }

        if (btnResumen) {
            btnResumen.addEventListener("click", function (event) {
                event.preventDefault();
                calcularTotal(cantidad, categoria, totalHtml);
            });
        }
    }

    function calcularTotal(cantidad, categoria, totalHtml) {
        const valorTicket = 200;
        const descuentoEstudiante = 80;
        const descuentoTrainee = 50;
        const descuentoJunior = 15;

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const correo = document.getElementById("email").value;

        if (!nombre || !apellido || !correo || cantidad.value === "" || categoria.value === "-- Seleccionar categoría --") {
            totalHtml.textContent = "Por favor, complete todos los campos obligatorios.";
            return;
        }

        let total = cantidad.value * valorTicket;

        if (categoria.value.toLowerCase() === "estudiante") {
            total = total - (total * descuentoEstudiante / 100);
        } else if (categoria.value.toLowerCase() === "trainee") {
            total = total - (total * descuentoTrainee / 100);
        }else if (categoria.value.toLowerCase() === "junior") {
            total = total - (total * descuentoJunior / 100);
        }

        totalHtml.textContent = "Total a Pagar: $" + total;
    }

    function resetFormulario(totalHtml) {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("categoria").value = "-- Seleccionar categoría --";

        totalHtml.textContent = "Total a Pagar: $";
    }
});