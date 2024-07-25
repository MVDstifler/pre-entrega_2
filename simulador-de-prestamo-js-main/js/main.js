let prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];

document.getElementById('prestamoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const creditoSolicitado = parseFloat(document.getElementById('monto').value);
    const interesAnual = parseFloat(document.getElementById('interes').value);
    const plazoDeMeses = parseInt(document.getElementById('plazo').value);

    // Validar valores utilizando operadores AND y OR
    const esValido = validarValores(creditoSolicitado, interesAnual, plazoDeMeses);
    if (!esValido) {
        alert("Por favor, ingrese valores válidos y positivos.");
        return;
    }

    const interesMensual = interesAnual / 12 / 100;
    const pagoMensual = (creditoSolicitado * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazoDeMeses));
    const montoTotal = pagoMensual * plazoDeMeses;
    const totalIntereses = montoTotal - creditoSolicitado;

    // Crear un nuevo préstamo utilizando el operador spread para replicar el objeto
    const nuevoPrestamo = {
        monto: creditoSolicitado,
        interes: interesAnual,
        plazo: plazoDeMeses,
        pagoMensual: pagoMensual,
        totalIntereses: totalIntereses,
        montoTotal: montoTotal
    };

    // Usar el operador spread para crear una copia de la lista de préstamos y agregar el nuevo préstamo
    prestamos = [...prestamos, {...nuevoPrestamo}];
    localStorage.setItem('prestamos', JSON.stringify(prestamos));

    mostrarResultados(nuevoPrestamo);
    actualizarPrestamosAltosIntereses();
    actualizarMontosPrestamos();

    document.getElementById('prestamoForm').reset();
});

function mostrarResultados(prestamo) {
    const resultadosDiv = document.getElementById('resultados');
    const mensaje = `
    <p>
        Monto del Préstamo: $${prestamo.monto.toFixed(2)}<br>
        Tasa de Interés Anual: ${prestamo.interes.toFixed(2)}%<br>
        Plazo del Préstamo: ${prestamo.plazo} meses<br>
        Pago Mensual: $${prestamo.pagoMensual.toFixed(2)}<br>
        Total de Intereses: $${prestamo.totalIntereses.toFixed(2)}<br>
        Monto Total a Pagar: $${prestamo.montoTotal.toFixed(2)}
    </p>`;
    resultadosDiv.innerHTML = mensaje;
}

function actualizarPrestamosAltosIntereses() {
    const prestamosAltosInteresesDiv = document.getElementById('prestamosAltosIntereses');
    const prestamosAltosIntereses = prestamos.filter(prestamo => prestamo.interes > 5);
    prestamosAltosInteresesDiv.innerHTML = prestamosAltosIntereses.length > 0
        ? prestamosAltosIntereses.map(prestamo => `
            <p>
                Monto del Préstamo: $${prestamo.monto.toFixed(2)}<br>
                Tasa de Interés Anual: ${prestamo.interes.toFixed(2)}%<br>
                Plazo del Préstamo: ${prestamo.plazo} meses<br>
                Pago Mensual: $${prestamo.pagoMensual.toFixed(2)}<br>
                Total de Intereses: $${prestamo.totalIntereses.toFixed(2)}<br>
                Monto Total a Pagar: $${prestamo.montoTotal.toFixed(2)}
            </p>
        `).join('')
        : '<p>No hay préstamos con tasa de interés mayor al 5%.</p>';
}

function actualizarMontosPrestamos() {
    const montosPrestamosDiv = document.getElementById('montosPrestamos');
    const montosPrestamos = prestamos.map(prestamo => prestamo.monto);
    montosPrestamosDiv.innerHTML = montosPrestamos.length > 0
        ? `<p>${montosPrestamos.join(', ')}</p>`
        : '<p>No hay préstamos registrados.</p>';
}

function validarValores(monto, interes, meses) {
    // Usar operador AND (&&) para validar que todos los valores sean mayores que 0
    return monto > 0 && interes > 0 && meses > 0;
}

// Actualizar los elementos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Usar operador OR (||) para mostrar mensajes predeterminados si no hay préstamos
    actualizarPrestamosAltosIntereses() || mostrarMensaje('No hay préstamos con tasa de interés mayor al 5%.');
    actualizarMontosPrestamos() || mostrarMensaje('No hay préstamos registrados.');
});

function mostrarMensaje(mensaje) {
    // Función para mostrar mensajes cuando no hay datos
    const div = document.getElementById('resultados');
    div.innerHTML = `<p>${mensaje}</p>`;
}
