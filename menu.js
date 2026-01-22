// formulario.js - Envía formulario a Gmail
document.addEventListener('DOMContentLoaded', function() {
    // Año actual en footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Formulario de contacto
    const formulario = document.getElementById('formulario-contacto');
    const btnEnviar = document.getElementById('btn-enviar');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const mensajeDiv = document.getElementById('mensaje-formulario');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            const proyecto = document.getElementById('proyecto').value.trim();
            
            // Validar
            if (!nombre || !email || !proyecto) {
                mostrarMensaje('Por favor, complete los campos obligatorios (*)', 'error');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensaje('Por favor, ingrese un email válido', 'error');
                return;
            }
            
            // Mostrar cargando
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            btnEnviar.disabled = true;
            
            // Mostrar mensaje de preparación
            mostrarMensaje('Preparando tu propuesta...', 'info');
            
            // Esperar 1 segundo
            setTimeout(function() {
                // Crear contenido del email
                const fecha = new Date().toLocaleString('es-ES');
                const cuerpoEmail = `NUEVA PROPUESTA DE PROYECTO - BETALAB

📋 INFORMACIÓN DEL CLIENTE:
• Nombre: ${nombre}
• Email: ${email}
• Empresa: ${empresa || 'No especificada'}
• Fecha: ${fecha}

📝 DESCRIPCIÓN DEL PROYECTO:
${proyecto}

---
Enviado desde BetaLab Web Studio`;
                
                // Codificar para URL
                const asunto = `Nueva propuesta de ${nombre} - BetaLab`;
                const asuntoCodificado = encodeURIComponent(asunto);
                const cuerpoCodificado = encodeURIComponent(cuerpoEmail);
                
                // Crear enlace mailto
                const mailtoLink = `mailto:betalab.web.studio@gmail.com?subject=${asuntoCodificado}&body=${cuerpoCodificado}`;
                
                // Mostrar instrucciones
                mostrarMensaje('Se abrirá tu cliente de email. Solo haz clic en <strong>"Enviar"</strong>.', 'exito');
                
                // Abrir cliente de email
                window.open(mailtoLink, '_blank');
                
                // Resetear después de 2 segundos
                setTimeout(function() {
                    formulario.reset();
                    mostrarMensaje('✅ ¡Propuesta enviada! Te contactaremos pronto.', 'exito');
                    
                    // Restaurar botón
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    btnEnviar.disabled = false;
                }, 2000);
                
            }, 1000);
        });
        
        // Validación de email en tiempo real
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validarEmail(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
    
    // Función para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Función para mostrar mensajes
    function mostrarMensaje(texto, tipo) {
        if (!mensajeDiv) return;
        
        mensajeDiv.innerHTML = texto;
        mensajeDiv.className = 'mensaje-formulario';
        
        if (tipo === 'error') {
            mensajeDiv.classList.add('mensaje-error');
        } else if (tipo === 'exito') {
            mensajeDiv.classList.add('mensaje-exito');
        } else {
            mensajeDiv.classList.add('mensaje-info');
        }
        
        mensajeDiv.style.display = 'block';
        
        // Auto-ocultar después de 8 segundos
        if (tipo !== 'error') {
            setTimeout(function() {
                mensajeDiv.style.display = 'none';
            }, 8000);
        }
    }
});