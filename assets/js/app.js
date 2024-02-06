/* Array de categorías */
const categorias = ["Celulares", "Smartwatches", "Auriculares", "Memorias"]

/* Array carrito */
let carrito = []

window.addEventListener('load', function() {
    cargarCarrito()
    mostrarCarrito()
});




// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado)
    }
}


function verProductos(categoria = '') {
    const containerItems = document.getElementById('containerItems');
    const itemDetalle = document.getElementById('itemDetalle');

    containerItems.innerHTML = '';
    containerItems.classList.remove('hidden');

    itemDetalle.style.display = 'none';

    fetch('./assets/js/productos.json')
      .then(response => response.json())
      .then(data => {
        if (categoria === '') {
            for (let i = 0; i < data.length; i++) {
                agregarCard(data[i]);
            }

            let titleItems = document.getElementById('titleItems');
            titleItems.textContent = 'Catálogo de productos';   
        } else {
            const productosCategoria = data.filter(producto => producto.categoria === categoria);
            for (let i = 0; i < productosCategoria.length; i++) {
                agregarCard(productosCategoria[i]);
            }
            let titleItems = document.getElementById('titleItems');
            titleItems.textContent = categoria;
        }
        titleItems.style.display = 'block';
      })
}


function mostrarDetalle(id) {
    const containerItems = document.getElementById('containerItems');
    const itemDetalle = document.getElementById('itemDetalle');

    const titleItems = document.getElementById('titleItems');
    titleItems.style.display = 'none';

    containerItems.classList.add('hidden');
    itemDetalle.style.display = 'block';

    const cantidadInput = document.getElementById('cantidad');
    cantidadInput.value = 1;

    const detalleTitle = document.getElementById('detalleTitle');
    const detalleDescripcion = document.getElementById('detalleDescripcion');
    const precioProducto = document.getElementById('precioProducto');
    const stockProducto = document.getElementById('stockProducto');
    const imgProducto = document.getElementById('imgProducto');
    const detalleButtons = document.getElementById('detalleButtons');

    fetch('./assets/js/productos.json')
        .then(response => response.json())
        .then(data => {
            const producto = data.find(item => item.id === id);

            if (producto) {
                detalleTitle.textContent = producto.nombre;
                detalleDescripcion.textContent = producto.descripcion;
                precioProducto.textContent = '$ ' + producto.precio;
                stockProducto.textContent = producto.stock + ' unidades disponibles';
                imgProducto.src = 'assets/img/imagen-producto-' + producto.id + '.jpg';

                detalleButtons.innerHTML = '';
                const btnAgregarCarrito = document.createElement('button');
                btnAgregarCarrito.type = 'button';
                btnAgregarCarrito.classList.add('btn', 'btn-primary', 'btn-sm', 'mb-1');
                btnAgregarCarrito.textContent = 'Agregar al carrito';
                btnAgregarCarrito.addEventListener('click', function () {
                    const cantidad = cantidadInput.value;
                    agregarProducto(producto, cantidad);
                });
                detalleButtons.appendChild(btnAgregarCarrito);
            }
        });
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
    img.src = 'assets/img/imagen-producto-' + producto.id + '.jpg'
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
    btnAgregarCarrito.classList.add('ml-1', 'btn', 'btn-primary', 'btn-sm')
    btnAgregarCarrito.style.marginLeft = '2px'    
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


function agregarProducto(producto, cantidad = 1) {

    const index = carrito.findIndex(item => item.nombre === producto.nombre)

    if (index === -1) {

        carrito.push({
            id: producto.id,        
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        })

        Toastify({
            text: "El producto se agregó al carrito",
            duration: 3000,
            gravity: "bottom", 
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },            
            }).showToast();
            
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Este producto ya está en tu carrito",
          });
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

        const btnVaciar = document.getElementById('btnVaciar')            
        btnVaciar.style.display = 'none'    

        const btnConfirmar = document.getElementById('btnConfirmar')            
        btnConfirmar.style.display = 'none'    
    } else {
        carrito.forEach(item => {
            const itemCarrito = document.createElement('div')
            const idProducto = item.id

            const btnQuitar = document.createElement('button')
            btnQuitar.textContent = 'x'
            btnQuitar.classList.add('btn', 'btn-sm','btn-danger' ,'btn-carrito')
            btnQuitar.addEventListener('click', function() {
                quitarProducto(idProducto)
            });            

            const btnAumentar = document.createElement('button')
            btnAumentar.textContent = '+'
            btnAumentar.classList.add('btn', 'btn-sm' ,'btn-right' ,'btn-secondary','btn-carrito')
            btnAumentar.addEventListener('click', function() {
                aumentarCantidad(idProducto)
            });            

            const btnDisminuir = document.createElement('button')
            btnDisminuir.textContent = '-'
            btnDisminuir.classList.add('btn', 'btn-sm', 'btn-secondary' ,'btn-carrito')
            btnDisminuir.addEventListener('click', function() {
                disminuirCantidad(idProducto)
            });            

            itemCarrito.innerHTML = `<p class="small">${item.nombre} - $${item.precio} - Cant. ${item.cantidad} </p>`
            itemCarrito.appendChild(btnAumentar)
            itemCarrito.appendChild(btnDisminuir)
            itemCarrito.appendChild(btnQuitar)

            itemCarrito.style.display = 'flex'

            containerCarrito.appendChild(itemCarrito)
        });

        lblTotal.innerHTML = `<p><strong>Total: $${totalCarrito()}</strong></p>`

        const btnVaciar = document.getElementById('btnVaciar')            
        btnVaciar.style.display = 'inline-block'    

        const btnConfirmar = document.getElementById('btnConfirmar')            
        btnConfirmar.style.display = 'inline-block'    
    }
}


function vaciarCarrito() {
    carrito = []
    mostrarCarrito()
    Toastify({
        text: "Se vacia el carrito",
        duration: 3000,
        gravity: "bottom", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },            
        }).showToast();

    if (carrito.length > 0) {
        guardarCarrito()
    } else {
        // Si el carrito está vacío, elimina del localStorage
        localStorage.removeItem('carrito')
    }

}

function aumentarCantidad(id) {
    const index = carrito.findIndex(producto => producto.id === id)
    carrito[index].cantidad = parseInt(carrito[index].cantidad) + 1
    mostrarCarrito()
    guardarCarrito()
}

function disminuirCantidad(id) {
    const index = carrito.findIndex(producto => producto.id === id)
    if (carrito[index].cantidad>1) {
        carrito[index].cantidad = parseInt(carrito[index].cantidad) - 1
        mostrarCarrito()
        guardarCarrito()
    }
}

function quitarProducto(id) {
    const index = carrito.findIndex(producto => producto.id === id)
    const elemento = carrito.splice(index, 1)
    Toastify({
        text: "Producto eliminado correctamente",
        duration: 3000,
        gravity: "bottom", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },            
        }).showToast();
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

function confirmarPedido() {
    Swal.fire({
        title: "Pedido enviado",
        confirmButtonText: "Volver a la tienda",
      }).then((result) => {
        vaciarCarrito();
        verProductos();
      });

}
