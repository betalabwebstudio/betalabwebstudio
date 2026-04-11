// Función para enviar mensaje a WhatsApp
// Función principal para enviar WhatsApp
function enviarMensajeWhatsApp(plan) {
    const numeroWhatsApp = "595993574822";
    const mensaje = `Hola, me interesa el *${plan}* de sus servicios.%0A%0A`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
}

// Función para el Plan Básico
function planBasico() {
    enviarMensajeWhatsApp("Plan Básico - Presencia Online");
}

// Función para el Plan Tienda Online
function planTiendaOnline() {
    enviarMensajeWhatsApp("Plan Tienda Online - Negocio Digital");
}

// Función para el Plan Tienda Premium
function planTiendaPremium() {
    enviarMensajeWhatsApp("Plan Tienda Premium - Ventas Automatizadas");
}

// Función para el Plan Control Inicial
function planControlInicial() {
    enviarMensajeWhatsApp("Plan Control Inicial");
}

// Función para el Plan Negocio Organizado
function planNegocioOrganizado() {
    enviarMensajeWhatsApp("Plan Negocio Organizado");
}
