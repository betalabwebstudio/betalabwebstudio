
        // Formulario de contacto
        document.addEventListener('DOMContentLoaded', function() {
            // Año actual en footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
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
                    
                    // Esperar 1 segundo para que se vea el mensaje
                    setTimeout(function() {
                        // Crear contenido del email
                        const fecha = new Date().toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        
                        const cuerpoEmail = `
NUEVA PROPUESTA DE PROYECTO - BETALAB WEB STUDIO
=================================================

📋 INFORMACIÓN DEL CLIENTE:
• Nombre: ${nombre}
• Email: ${email}
• Empresa: ${empresa || 'No especificada'}
• Fecha: ${fecha}

📝 DESCRIPCIÓN DEL PROYECTO:
${proyecto}

=================================================
Enviado desde el formulario web de BetaLab Web Studio
                        `;
                        
                        // Codificar para URL
                        const asunto = `🚀 Nueva propuesta de ${nombre} - BetaLab Web Studio`;
                        const asuntoCodificado = encodeURIComponent(asunto);
                        const cuerpoCodificado = encodeURIComponent(cuerpoEmail);
                        
                        // Crear enlace mailto
                        const mailtoLink = `mailto:betalab.web.studio@gmail.com?subject=${asuntoCodificado}&body=${cuerpoCodificado}`;
                        
                        // Mostrar mensaje de éxito
                        mostrarMensaje('¡Listo! Se abrirá tu cliente de email. Solo tienes que hacer clic en <strong>"Enviar"</strong>.', 'exito');
                        
                        // Abrir cliente de email
                        window.open(mailtoLink, '_blank');
                        
                        // Resetear formulario después de 2 segundos
                        setTimeout(function() {
                            formulario.reset();
                            mostrarMensaje('✅ Propuesta preparada correctamente. ¡Gracias por contactarnos!', 'exito');
                            
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
                            mostrarMensaje('Email inválido', 'error');
                        } else {
                            this.style.borderColor = '';
                            mensajeDiv.style.display = 'none';
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
                
                // Auto-ocultar después de 8 segundos (solo éxito e info)
                if (tipo !== 'error') {
                    setTimeout(function() {
                        mensajeDiv.style.display = 'none';
                    }, 8000);
                }
            }
        });
        
        // Menú hamburguesa (simple)
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = hamburger.querySelector('i');
                    
                    if (navMenu.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
                
                // Cerrar menú al hacer clic en enlace
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        hamburger.querySelector('i').classList.remove('fa-times');
                        hamburger.querySelector('i').classList.add('fa-bars');
                    });
                });
            }
        });
