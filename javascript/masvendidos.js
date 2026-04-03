// ==============================================
// CARGAR PRODUCTOS DESDE JSON
// ==============================================

// Función para cargar los productos
async function cargarProductos() {
    try {
        // 1. Hacer la petición al archivo JSON
        const respuesta = await fetch('./json/mas_vendidos.json');
        
        // 2. Verificar si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        
        // 3. Convertir la respuesta a objeto JavaScript
        const datos = await respuesta.json();
        
        // 4. Mostrar los productos en el carrusel
        mostrarProductos(datos.productos);
        
        // 5. Iniciar el movimiento automático SOLO SI HAY SCROLL
        // Esperar un momento para que se rendericen los productos
        setTimeout(() => {
            verificarScrollYIniciar();
        }, 100);
        
    } catch (error) {
        console.error('Error:', error);
        // Si hay error, mostrar mensaje al usuario
        document.getElementById('carruselPista').innerHTML = `
            <div style="text-align: center; padding: 50px; color: red;">
                Error al cargar los productos. Por favor, recarga la página.
            </div>
        `;
    }
}

// ==============================================
// VERIFICAR SI NECESITA SCROLL Y INICIAR MOVIMIENTO
// ==============================================

function verificarScrollYIniciar() {
    const carruselPista = document.getElementById('carruselPista');
    
    // Calcular si hay desbordamiento (si los productos no caben)
    const hayScroll = carruselPista.scrollWidth > carruselPista.clientWidth;
    
    if (hayScroll) {
        // Solo iniciar movimiento automático si realmente hay scroll
        iniciarMovimientoAutomatico();
    }
}

// ==============================================
// MOSTRAR PRODUCTOS EN EL HTML
// ==============================================

function mostrarProductos(productos) {
    const carruselPista = document.getElementById('carruselPista');
    
    // Limpiar contenido anterior
    carruselPista.innerHTML = '';

    // Recorrer cada producto y crear su HTML
    productos.forEach(producto => {
        const precioGs = formatearAGs(producto.precio);
        
        const productoHTML = `
            <div class="producto-card" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <div class="producto-info">
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="descripcion">${producto.descripcion}</p>
                    <p class="producto-precio">${precioGs}</p>
                    <button class="btn-carrito" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
                        🛒 Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        
        // Agregar al carrusel
        carruselPista.innerHTML += productoHTML;
    });
}

// ✅ FUNCIÓN CORREGIDA: 850.000 Gs (primero número, luego Gs.)
function formatearAGs(precio) {
    return precio.toLocaleString('es-PY') + ' Gs.';
    // Resultado: 850.000 Gs.
}

let intervaloMovimiento;

// ==============================================
// INICIAR MOVIMIENTO AUTOMÁTICO MEJORADO
// ==============================================

function iniciarMovimientoAutomatico() {
    const carruselPista = document.getElementById('carruselPista');
    
    // Limpiar intervalo anterior si existe
    if (intervaloMovimiento) {
        clearInterval(intervaloMovimiento);
    }
    
    // Verificar nuevamente si hay scroll antes de iniciar
    if (carruselPista.scrollWidth <= carruselPista.clientWidth) {
        return; // No hay scroll, no iniciar movimiento
    }
    
    intervaloMovimiento = setInterval(() => {
        // Calcular máximo scroll
        const maxScroll = carruselPista.scrollWidth - carruselPista.clientWidth;
        const scrollActual = carruselPista.scrollLeft;
        
        // Obtener el ancho real del producto desde el DOM
        const primerProducto = document.querySelector('.producto-card');
        let anchoProducto = 220; // valor por defecto
        
        if (primerProducto) {
            // Obtener ancho real incluyendo gap
            const anchoCard = primerProducto.offsetWidth;
            const estilo = window.getComputedStyle(carruselPista);
            const gap = parseInt(estilo.gap) || 20;
            anchoProducto = anchoCard + gap;
        }
        
        // Si estamos al final, volver al principio
        if (scrollActual >= maxScroll - 10) {
            carruselPista.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Mover al siguiente producto
            const nuevoScroll = Math.min(scrollActual + anchoProducto, maxScroll);
            carruselPista.scrollTo({
                left: nuevoScroll,
                behavior: 'smooth'
            });
        }
    }, 4000); // Cambiado a 4 segundos para mejor experiencia
}

// ==============================================
// EVENTOS DEL CARRUSEL MEJORADOS
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    // Configurar eventos después de cargar los productos
    const carruselPista = document.getElementById('carruselPista');
    
    if (carruselPista) {
        // Pausar movimiento al pasar el mouse
        carruselPista.addEventListener('mouseenter', () => {
            if (intervaloMovimiento) {
                clearInterval(intervaloMovimiento);
                intervaloMovimiento = null;
            }
        });
        
        carruselPista.addEventListener('mouseleave', () => {
            // Solo reiniciar si hay scroll
            if (carruselPista.scrollWidth > carruselPista.clientWidth) {
                if (!intervaloMovimiento) {
                    iniciarMovimientoAutomatico();
                }
            }
        });
        
        // Detectar cambios de tamaño de pantalla
        window.addEventListener('resize', () => {
            // Detener movimiento actual
            if (intervaloMovimiento) {
                clearInterval(intervaloMovimiento);
                intervaloMovimiento = null;
            }
            
            // Verificar si aún necesita scroll después de redimensionar
            setTimeout(() => {
                if (carruselPista.scrollWidth > carruselPista.clientWidth) {
                    iniciarMovimientoAutomatico();
                }
            }, 200);
        });
    }
});