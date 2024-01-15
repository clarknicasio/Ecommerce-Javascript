/* Array de categorías */
const categorias = ["Celulares", "Smartwatches", "Auriculares", "Memorias"]
//console.log('Categorias: ' + categorias.join('-') )

/* Array de medios de pago, por ahora no los uso */
const mediosDePago = ["transferencia", "contra entrega", "paypal", "rapipago"]
//console.log('Medios de pago: ' + mediosDePago.join('-') )

/* Array de formas de envío, por ahora no las uso */
const formasDeEnvio = ["retiro en local", "Oca", "Correo Argentino"]
//console.log('Formas de envío: ' + formasDeEnvio.join('-') )

/* Array carrito */
let carrito = []

window.addEventListener('load', function() {
    cargarCarrito()
    mostrarCarrito()
});

/* Catálogo de productos */
let catalogo = [
    {
        id: 1,
        nombre: "iPhone 13",
        descripcion: "Teléfono inteligente de última generación",
        precio: 999.99,
        stock: 20,
        destacado: true,
        categoria: "Celulares"
    },
    {
        id: 2,        
        nombre: "Samsung Galaxy Watch 4",
        descripcion: "Smartwatch con seguimiento avanzado de salud",
        precio: 249.99,
        stock: 15,
        destacado: false,
        categoria: "Smartwatches"
    },
    {
        id: 3,        
        nombre: "Sony WH-1000XM4",
        descripcion: "Auriculares con cancelación de ruido",
        precio: 349.99,
        stock: 25,
        destacado: true,
        categoria: "Auriculares"
    },
    {
        id: 4,        
        nombre: "SanDisk Ultra 128GB",
        descripcion: "Tarjeta de memoria microSDXC para almacenamiento",
        precio: 29.99,
        stock: 40,
        destacado: false,
        categoria: "Memorias"
    },
    {
        id: 5,        
        nombre: "Google Pixel 8",
        descripcion: "Teléfono con cámara avanzada y rendimiento excepcional",
        precio: 799.99,
        stock: 18,
        destacado: true,
        categoria: "Celulares"
    },
    {
        id: 6,        
        nombre: "Apple Watch Series 7",
        descripcion: "Reloj inteligente con pantalla siempre activa",
        precio: 349.99,
        stock: 22,
        destacado: true,
        categoria: "Smartwatches"
    },
    {
        id: 7,        
        nombre: "Bose QuietComfort Earbuds",
        descripcion: "Auriculares inalámbricos con sonido envolvente",
        precio: 279.99,
        stock: 20,
        destacado: false,
        categoria: "Auriculares"
    },
    {
        id: 8,        
        nombre: "Kingston 64GB USB 3.0",
        descripcion: "Memoria USB de alta velocidad",
        precio: 19.99,
        stock: 30,
        destacado: true,
        categoria: "Memorias"
    },
];



// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
        console.log('Encuentro carrito guardado')
        carrito = JSON.parse(carritoGuardado)
    }
}

function verProductos(categoria = '') {

    const containerItems = document.getElementById('containerItems')
    const itemDetalle = document.getElementById('itemDetalle')

    containerItems.innerHTML = ''
    containerItems.classList.remove('hidden')

    itemDetalle.style.display = 'none'

    if (categoria === '') {
        for (let i = 0; i < catalogo.length; i++) {
            agregarCard(catalogo[i])
        }

        var titleItems = document.getElementById('titleItems')
        titleItems.textContent = 'Catálogo de productos'   
    } else {
        const productosCategoria = catalogo.filter(producto => producto.categoria === categoria)
        for (let i = 0; i < productosCategoria.length; i++) {
            agregarCard(productosCategoria[i])
        }
        var titleItems = document.getElementById('titleItems')
        titleItems.textContent = categoria
    }
    titleItems.style.display = 'block' 
}

function mostrarDetalle(id) {
    const containerItems = document.getElementById('containerItems')
    const itemDetalle = document.getElementById('itemDetalle')

    const titleItems = document.getElementById('titleItems')   
    titleItems.style.display = 'none'

    containerItems.classList.add('hidden')
    itemDetalle.style.display = 'block'

    const cantidadInput = document.getElementById('cantidad')
    cantidadInput.value = 1

    const detalleTitle = document.getElementById('detalleTitle')
    const detalleDescripcion = document.getElementById('detalleDescripcion')
    const precioProducto = document.getElementById('precioProducto')
    const stockProducto = document.getElementById('stockProducto')
    const imgProducto = document.getElementById('imgProducto')

    const producto = catalogo.find(item => item.id === id)

    if (producto) {
        detalleTitle.textContent = producto.nombre
        detalleDescripcion.textContent = producto.descripcion
        precioProducto.textContent = '$ ' + producto.precio
        stockProducto.textContent = producto.stock + ' unidades disponibles'
        imgProducto.src = 'img/imagen-producto-' + producto.id + '.jpg'

        detalleButtons.innerHTML = ''
        const btnAgregarCarrito = document.createElement('button')
        btnAgregarCarrito.type = 'button'
        btnAgregarCarrito.classList.add('btn', 'btn-primary', 'btn-sm', 'mb-1')
        btnAgregarCarrito.textContent = 'Agregar al carrito'
        btnAgregarCarrito.addEventListener('click', function () {
            const cantidad = cantidadInput.value
            agregarProducto(producto, cantidad)
        })
        detalleButtons.appendChild(btnAgregarCarrito)
    }
}

function volverAProductos() {
    const containerItems = document.getElementById('containerItems')
    const itemDetalle = document.getElementById('itemDetalle')
    const titleItems = document.getElementById('titleItems')
    
    containerItems.classList.remove('hidden')
    itemDetalle.style.display = 'none'
    titleItems.style.display = 'block'
}


function agregarCard(producto) {
    const containerItems = document.getElementById('containerItems')

    const cardDiv = document.createElement('div')
    cardDiv.classList.add('col-md-3', 'mb-4')

    const card = document.createElement('div')
    card.classList.add('card', 'text-center')

    const img = document.createElement('img')
    img.src = 'img/imagen-producto-' + producto.id + '.jpg'
    img.classList.add('card-img-top')
    img.alt = producto.nombre

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    const title = document.createElement('h5')
    title.classList.add('card-title')
    title.textContent = producto.nombre

    const precio = document.createElement('p')
    precio.textContent = '$' + producto.precio

    const btnVerMas = document.createElement('button')
    btnVerMas.type = 'button'
    btnVerMas.classList.add('btn', 'btn-primary', 'btn-sm')
    btnVerMas.textContent = 'Ver más'
    btnVerMas.addEventListener('click', function () {
        mostrarDetalle(producto.id)
    })

    const btnAgregarCarrito = document.createElement('button')
    btnAgregarCarrito.type = 'button'
    btnAgregarCarrito.classList.add('btn', 'btn-primary', 'btn-sm', 'ml-1')
    btnAgregarCarrito.textContent = 'Agregar'
    btnAgregarCarrito.addEventListener('click', function () {
        agregarProducto(producto)
    })

    cardBody.appendChild(title)
    cardBody.appendChild(precio)
    cardBody.appendChild(btnVerMas)
    cardBody.appendChild(btnAgregarCarrito)

    card.appendChild(img)
    card.appendChild(cardBody)

    cardDiv.appendChild(card)

    containerItems.appendChild(cardDiv)
}


// Agregar producto al carrito:
function agregarProducto(producto, cantidad = 1) {

    const index = carrito.findIndex(item => item.nombre === producto.nombre)

    if (index === -1) {

        carrito.push({
            id: producto.id,        
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        })

        //console.log('Se agrega ' + producto.nombre + ' Cant: ' + cantidad)

    } else {
        alert('Ese producto ya está en tu carrito, por lo tanto no se puede agregar.')
        //console.log('El producto ya está en el carrito, no se agrega.')
    }

    guardarCarrito()
    mostrarCarrito()
}

function mostrarCarrito() {
    const containerCarrito = document.getElementById('containerCarrito')
    const lblTotal = document.getElementById('lblTotal')

    containerCarrito.innerHTML = ''

    if (carrito.length === 0) {
        containerCarrito.innerHTML = '<p>Tu carrito está vacío.</p>'
        lblTotal.innerHTML = ''
    } else {
        carrito.forEach(item => {
            const itemCarrito = document.createElement('div')
            const idProducto = item.id

            const btnQuitar = document.createElement('button')
            btnQuitar.textContent = 'x'
            btnQuitar.classList.add('btn', 'btn-sm' ,'btn-eliminar')
            btnQuitar.addEventListener('click', function() {
                quitarProducto(idProducto)
            });            

            itemCarrito.innerHTML = `<p class="small">${item.nombre} - $${item.precio} - Cant. ${item.cantidad} </p>`
            itemCarrito.appendChild(btnQuitar)

            itemCarrito.style.display = 'flex'

            containerCarrito.appendChild(itemCarrito)
        });

        lblTotal.innerHTML = `<p><strong>Total: $${totalCarrito()}</strong></p>`
    }
}


function vaciarCarrito() {
    carrito = []
    mostrarCarrito()

    if (carrito.length > 0) {
        guardarCarrito()
    } else {
        // Si el carrito está vacío, elimina la entrada del localStorage
        localStorage.removeItem('carrito')
    }

}

function verCarrito() {
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i])
    }   
}

function quitarProducto(id) {
    const index = carrito.findIndex(producto => producto.id === id)
    const elemento = carrito.splice(index, 1)
    //console.log('Se quita ' + elemento[0].nombre + ' del carrito.')
    mostrarCarrito()
    guardarCarrito()
}

function totalCarrito() {
    $total = 0    
    for (let i = 0; i < carrito.length; i++) {
        $total = $total + (carrito[i].cantidad * carrito[i].precio)
    }   
    return $total.toFixed(2)
}

function generarOrden() {
    let nombre = ''
    let email = ''
    let domicilio = ''

    while (nombre === null || nombre ==='') {
        nombre = prompt('Ingrese su nombre:')
    }
    while (email === null || email ==='') {
        email = prompt('Ingrese su email:')
    }
    while (domicilio === null || domicilio ==='') {
        domicilio = prompt('Ingrese su domicilio:')
    }


    if (!nombre || !email || !domicilio) {
        alert('Los campos son obligatorios.') 
        console.log('Debe ingresar sus datos.')
        return
    }

    console.log('Orden de compra generada:')       
    console.log('Nombre: ' + nombre)
    console.log('Email: ' + email)
    console.log('Domicilio: ' + domicilio)

    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i])
    }   
    console.log('Total compra: $' + totalCarrito())
}

