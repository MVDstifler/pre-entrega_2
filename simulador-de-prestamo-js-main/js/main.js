let prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];

document.getElementById('prestamoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const creditoSolicitado = parseFloat(document.getElementById('monto').value);
    const interesAnual = parseFloat(document.getElementById('interes').value);
    const plazoDeMeses = parseInt(document.getElementById('plazo').value);

    if (!validarValores(creditoSolicitado, interesAnual, plazoDeMeses)) {
        alert("Por favor, ingrese valores válidos y positivos.");
        return;
    }

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
    prestamosAltosInteresesDiv.innerHTML = prestamosAltosIntereses.map(prestamo => `
        <p>
            Monto del Préstamo: $${prestamo.monto.toFixed(2)}<br>
            Tasa de Interés Anual: ${prestamo.interes.toFixed(2)}%<br>
            Plazo del Préstamo: ${prestamo.plazo} meses<br>
            Pago Mensual: $${prestamo.pagoMensual.toFixed(2)}<br>
            Total de Intereses: $${prestamo.totalIntereses.toFixed(2)}<br>
            Monto Total a Pagar: $${prestamo.montoTotal.toFixed(2)}
        </p>
    `).join('');
}

function actualizarMontosPrestamos() {
    const montosPrestamosDiv = document.getElementById('montosPrestamos');
    const montosPrestamos = prestamos.map(prestamo => prestamo.monto);
    montosPrestamosDiv.innerHTML = `<p>${montosPrestamos.join(', ')}</p>`;
}

function validarValores(monto, interes, meses) {
    return monto > 0 && interes > 0 && meses > 0;
}

// Actualizar los elementos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarPrestamosAltosIntereses();
    actualizarMontosPrestamos();
});
