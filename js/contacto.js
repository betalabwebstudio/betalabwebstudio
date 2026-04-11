function enviarWhatsApp() {
    // Obtener los valores
    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const proyecto = document.getElementById('cmbproyecto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar campos - Mostrar errores en el mismo formulario (sin alerts)
    let tieneError = false;
    
    if (nombre === "") {
        mostrarError('nombre', 'Por favor ingresa tu nombre');
        tieneError = true;
    } else {
        limpiarError('nombre');
    }
    
    if (numero === "") {
        mostrarError('numero', 'Por favor ingresa tu número de celular');
        tieneError = true;
    } else {
        limpiarError('numero');
    }
    
    if (proyecto === "Elija una opción") {
        mostrarError('cmbproyecto', 'Por favor selecciona un tipo de proyecto');
        tieneError = true;
    } else {
        limpiarError('cmbproyecto');
    }
    
    if (mensaje === "") {
        mostrarError('mensaje', 'Por favor escribe tu mensaje');
        tieneError = true;
    } else {
        limpiarError('mensaje');
    }
    
    // Si hay error, no enviar
    if (tieneError) return;
    
    // Número de WhatsApp
    const numeroWhatsApp = "595993574822";
    
    // Construir mensaje
    const textoWhatsApp = `*NUEVO CONTACTO DESDE LA WEB*%0A%0A` +
                         `*Nombre:* ${nombre}%0A` +
                         `*Teléfono:* ${numero}%0A` +
                         `*Tipo de proyecto:* ${proyecto}%0A` +
                         `*Mensaje:* ${mensaje}%0A%0A`;
    
    // Abrir WhatsApp (sin alert)
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`, '_blank');
}

// Funciones para mostrar errores sin alert
function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    campo.style.border = "2px solid #ef4444";
    campo.style.backgroundColor = "#fef2f2";
    
    // Eliminar error anterior si existe
    limpiarError(campoId);
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.id = `error-${campoId}`;
    errorDiv.className = "error-mensaje";
    errorDiv.style.color = "#ef4444";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";
    errorDiv.style.marginBottom = "10px";
    errorDiv.innerText = mensaje;
    
    campo.parentNode.insertBefore(errorDiv, campo.nextSibling);
}

function limpiarError(campoId) {
    const campo = document.getElementById(campoId);
    if (campo) {
        campo.style.border = "2px solid #22C55E";
        campo.style.backgroundColor = "white";
    }
    
    const errorDiv = document.getElementById(`error-${campoId}`);
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Limpiar errores cuando el usuario empiece a escribir
document.addEventListener('DOMContentLoaded', function() {
    const campos = ['nombre', 'numero', 'cmbproyecto', 'mensaje'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', function() {
                limpiarError(campoId);
            });
        }
    });
});