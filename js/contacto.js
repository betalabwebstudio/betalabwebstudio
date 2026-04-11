function enviarWhatsApp() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const proyecto = document.getElementById('cmbproyecto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validar campos
    if (nombre === "") {
        alert("Por favor, ingresa tu nombre y apellido");
        document.getElementById('nombre').focus();
        return;
    }
    
    if (numero === "") {
        alert("Por favor, ingresa tu número de celular");
        document.getElementById('numero').focus();
        return;
    }
    
    if (proyecto === "Elija una opción") {
        alert("Por favor, selecciona un tipo de proyecto");
        document.getElementById('cmbproyecto').focus();
        return;
    }
    
    if (mensaje === "") {
        alert("Por favor, escribe tu mensaje");
        document.getElementById('mensaje').focus();
        return;
    }
    
    // Número de WhatsApp
    const numeroWhatsApp = "595993574822";
    
    // Construir mensaje
    const textoWhatsApp = `*NUEVO CONTACTO DESDE LA WEB*%0A%0A` +
                         `*Nombre:* ${nombre}%0A` +
                         `*Teléfono:* ${numero}%0A` +
                         `*Tipo de proyecto:* ${proyecto}%0A` +
                         `*Mensaje:* ${mensaje}%0A%0A` +
                         `*Enviado desde el formulario de contacto*`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoWhatsApp}`, '_blank');
}