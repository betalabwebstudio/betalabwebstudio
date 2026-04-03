// ==========================================
// TIENDA DE JUEGOS PS2
// ==========================================

// Esperamos a que todo el HTML esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Página de PS2 lista');
    iniciarTiendaPS2();
});

// Variables específicas para PS2 (evitamos variables globales)
let juegosPS2 = [];
let busquedaActualPS2 = '';

function iniciarTiendaPS2() {
    console.log('🚀 Iniciando tienda de PS2...');
    cargarJuegosPS2();
}

async function cargarJuegosPS2() {
    try {
        // Cargar el JSON de juegos PS2
        const respuesta = await fetch('./json/play2.json');
        
        // Verificar si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        
        console.log('📦 Juegos de PS2 cargados:', datos);
        
        // Guardamos los juegos en la variable específica
        juegosPS2 = datos.productos;
        
        // Configurar los eventos de los botones
        configurarEventosPS2();
        
        // Mostrar los juegos en la página
        mostrarJuegosPS2(juegosPS2);
        
    } catch(error) {
        console.error('❌ Error al cargar juegos:', error);
        const contenedor = document.getElementById('productosps2-container');
        if(contenedor) {
            contenedor.innerHTML = `
                <div class="error-mensaje">
                    ❌ Error al cargar los juegos: ${error.message}<br>
                    Verifica que el archivo play2.json exista en la carpeta json/
                </div>
            `;
        }
    }
}

function mostrarJuegosPS2(juegos) {
    const contenedor = document.getElementById('productosps2-container');
    
    if (!contenedor) {
        console.error('❌ No se encontró el contenedor productosps2-container');
        return;
    }
    
    // Verificar si hay juegos
    if (!juegos || juegos.length === 0) {
        contenedor.innerHTML = '<div class="sin-resultados">🎮 No se encontraron juegos que coincidan con tu búsqueda</div>';
        return;
    }
    
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Recorrer cada juego y crear su tarjeta
    for(let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];
        
        // Crear tarjeta para cada juego
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-juego-ps2';
        
        // Crear el contenido de la tarjeta
        tarjeta.innerHTML = `
            <div class="juego-imagen">
                <img src="${juego.imagen}" alt="${juego.nombre}">
                ${juego.stock < 5 ? '<span class="stock-bajo">¡Últimas unidades!</span>' : ''}
            </div>
            <div class="juego-info">
                <h3 class="juego-nombre">${juego.nombre}</h3>
                <span class="juego-genero">${juego.genero}</span>
                <p class="juego-descripcion">${juego.descripcion}</p>
                <div class="juego-precio-stock">
                    <span class="juego-precio">$${juego.precio}</span>
                    <span class="juego-stock ${juego.stock < 5 ? 'stock-limitado' : ''}">
                        📦 Stock: ${juego.stock} unidades
                    </span>
                </div>
                <button class="btn-comprar-ps2" data-id="${juego.id}">
                    🛒 Comprar Juego
                </button>
            </div>
        `;
        
        // Agregar la tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    }
    
    // Agregar eventos a los botones de compra
    const botonesComprar = document.querySelectorAll('.btn-comprar-ps2');
    for(let i = 0; i < botonesComprar.length; i++) {
        botonesComprar[i].addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            agregarAlCarritoPS2(id);
        });
    }
}

function filtrarJuegosPorCategoria(categoria) {
    categoriaActivaPS2 = categoria;
    aplicarFiltrosPS2();
}

function buscarJuegosPS2(texto) {
    busquedaActualPS2 = texto.toLowerCase();
    aplicarFiltrosPS2();
}

function aplicarFiltrosPS2() {
    let juegosFiltrados = [...juegosPS2]; // Copiar el array original
    
    // Filtrar por categoría
    if(categoriaActivaPS2 !== 'todos') {
        juegosFiltrados = juegosFiltrados.filter(function(juego) {
            return juego.categoria === categoriaActivaPS2;
        });
    }
    
    // Filtrar por búsqueda
    if(busquedaActualPS2 !== '') {
        juegosFiltrados = juegosFiltrados.filter(function(juego) {
            return juego.nombre.toLowerCase().includes(busquedaActualPS2) ||
                   juego.descripcion.toLowerCase().includes(busquedaActualPS2) ||
                   juego.genero.toLowerCase().includes(busquedaActualPS2);
        });
    }
    
    mostrarJuegosPS2(juegosFiltrados);
}

function configurarEventosPS2() {
    // Configurar botones de categoría
    const botonesCategoria = document.querySelectorAll('.btn-categoria-ps2');
    
    for(let i = 0; i < botonesCategoria.length; i++) {
        const boton = botonesCategoria[i];
        
        boton.addEventListener('click', function() {
            // Obtener la categoría del botón
            const categoria = this.getAttribute('data-categoria');
            
            // Filtrar juegos
            filtrarJuegosPorCategoria(categoria);
            
            // Cambiar estilo del botón activo
            for(let j = 0; j < botonesCategoria.length; j++) {
                botonesCategoria[j].classList.remove('active');
            }
            this.classList.add('active');
        });
    }
    
    // Configurar buscador
    const buscador = document.getElementById('buscador-ps2');
    if(buscador) {
        buscador.addEventListener('input', function() {
            buscarJuegosPS2(this.value);
        });
    }
}

function agregarAlCarritoPS2(id) {
    // Buscar el juego por su ID
    const juego = juegosPS2.find(function(j) {
        return j.id === id;
    });
    
    if(juego) {
        // Mostrar mensaje de confirmación
        console.log(`✅ ${juego.nombre} agregado al carrito`);
        
        // Crear notificación flotante
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.innerHTML = `
            🎮 ${juego.nombre} agregado al carrito por $${juego.precio}
        `;
        document.body.appendChild(notificacion);
        
        // Eliminar notificación después de 2 segundos
        setTimeout(function() {
            notificacion.remove();
        }, 2000);
        
        // Aquí puedes agregar la lógica para guardar en el carrito real
        // Por ejemplo, guardar en localStorage o en una variable
        let carrito = JSON.parse(localStorage.getItem('carritoPS2')) || [];
        carrito.push(juego);
        localStorage.setItem('carritoPS2', JSON.stringify(carrito));
        
        // Actualizar contador del carrito si existe
        actualizarContadorCarritoPS2();
    }
}

function actualizarContadorCarritoPS2() {
    const carrito = JSON.parse(localStorage.getItem('carritoPS2')) || [];
    const contador = document.getElementById('contador-carrito');
    if(contador) {
        contador.textContent = carrito.length;
    }
}