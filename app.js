/* Array de categorías */
const categorias = ["Celulares", "Smartwatches", "Auriculares", "Memorias"]
console.log('Categorias: ' + categorias.join('-') )

/* Array de medios de pago, por ahora no los uso */
const mediosDePago = ["transferencia", "contra entrega", "paypal", "rapipago"]
console.log('Medios de pago: ' + mediosDePago.join('-') )

/* Array de formas de envío, por ahora no las uso */
const formasDeEnvio = ["retiro en local", "Oca", "Correo Argentino"]
console.log('Formas de envío: ' + formasDeEnvio.join('-') )

/* Array carrito */
let carrito = []

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
        nombre: "Google Pixel 6",
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

function verProductos(categoria = '') {
    if (categoria === '') {
        console.log('Catálogo completo');        
        for (let i = 0; i < catalogo.length; i++) {
            console.log(catalogo[i]);
        }        
    } else {
        const productosCategoria = catalogo.filter(producto => producto.categoria === categoria);
        if (productosCategoria.length > 0) {
            console.log('Productos en la categoría ' + categoria);
            for (let i = 0; i < productosCategoria.length; i++) {
                console.log(productosCategoria[i]);
            }        
        } else {
            console.log(`No hay productos en la categoría "${categoria}".`);
        }
    }
}

// Catálogo completo:
verProductos()

// Filtro por categoria:
verProductos('Auriculares')


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

        console.log('Se agrega ' + producto.nombre + ' Cant: ' + cantidad)

    } else {
        alert('Ese producto ya está en tu carrito, por lo tanto no se puede agregar.')
        console.log('El producto ya está en el carrito, no se agrega.')
    }

}


function vaciarCarrito() {
    let confirma = confirm('Desea vaciar el carrito?')
    if (confirma) {
        carrito = []
        console.log('Se vacía carrito')
    } else {
        console.log('No se vacía carrito')
    }
}

function verCarrito() {
    console.log('Carrito de compra: ')     
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i])
    }   
    console.log('Total: $' + totalCarrito())
}

function quitarProducto(id) {
    const index = carrito.findIndex(producto => producto.id === id)
    const elemento = carrito.splice(index, 1)
    console.log('Se quita ' + elemento[0].nombre + ' del carrito.')
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

