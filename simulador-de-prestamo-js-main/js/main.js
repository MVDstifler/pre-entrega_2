let prestamos = []; // Array para almacenar múltiples préstamos

function calcularCredito() {
    let creditoSolicitado, interesAnual, plazoDeMeses;

    do {
        do {
            creditoSolicitado = parseFloat(prompt("Ingrese el monto del préstamo:"));
            interesAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
            plazoDeMeses = parseInt(prompt("Ingrese el plazo del préstamo (meses):"));
            
            if (!valores(creditoSolicitado, interesAnual, plazoDeMeses)) {
                alert("Por favor, ingrese valores válidos y positivos.");
            }
        } while (!valores(creditoSolicitado, interesAnual, plazoDeMeses));

        const interesMensual = interesAnual / 12 / 100;
        const pagoMensual = (creditoSolicitado * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazoDeMeses));
        const montoTotal = pagoMensual * plazoDeMeses;
        const totalIntereses = montoTotal - creditoSolicitado;

        const nuevoPrestamo = {
            monto: creditoSolicitado,
            interes: interesAnual,
            plazo: plazoDeMeses,
            pagoMensual: pagoMensual,
            totalIntereses: totalIntereses,
            montoTotal: montoTotal
        };

        prestamos.push(nuevoPrestamo);

        mostrarResultados(nuevoPrestamo);

        // Preguntar al usuario si quiere realizar otro préstamo
        const continuar = confirm("¿Desea realizar otro préstamo?");
        if (!continuar) {
            break; // Salir del bucle si no desea continuar
        }

    } while (true); // Repetir el proceso mientras el usuario quiera realizar más préstamos
    alert("Gracias por utilizar nuestro servicio de cálculo de préstamos. ¡Hasta luego!");
}

function mostrarResultados(prestamo) {
    const mensaje = `
    Monto del Préstamo: $${prestamo.monto.toFixed(2)}
    Tasa de Interés Anual: ${prestamo.interes.toFixed(2)}%
    Plazo del Préstamo: ${prestamo.plazo} meses
    Pago Mensual: $${prestamo.pagoMensual.toFixed(2)}
    Total de Intereses: $${prestamo.totalIntereses.toFixed(2)}
    Monto Total a Pagar: $${prestamo.montoTotal.toFixed(2)}
    `;

    console.log(mensaje); 
    alert(mensaje); 
}

function valores(monto, interes, meses) {
    return monto > 0 && interes > 0 && meses > 0;
}

calcularCredito();
