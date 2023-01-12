let cupones = [{
    nombre: "CUPON30",
    descuento: 30
},
{
    nombre: "CUPON20",
    descuento: 20
}

];

let productos = [
    {
        id: 1,
        nombre: "FUNKO POP MONSTERS INC - BOO",
        precio: "11990",
        imagen: "assets/img/boo.jpg"
    },
    {
        id: 2,
        nombre: "FUNKO POP HARRY POTTER - DOBBY",
        precio: "13990",
        imagen: "assets/img/dobby.jpg"
    },
    {
        id: 3,
        nombre: "FUNKO POP DISNEY - QUEEN GRIMHILDE",
        precio: "14990",
        imagen: "assets/img/evil-queen.jpg"
    },
    {
        id: 4,
        nombre: "FUNKO POP HARRY POTTER - HARRY",
        precio: "13990",
        imagen: "assets/img/harry-potter.jpg"
    },
    {
        id: 5,
        nombre: "FUNKO POP TOY STORY - REX",
        precio: "16990",
        imagen: "assets/img/rex.jpg"
    },
    {
        id: 6,
        nombre: "FUNKO POP KISS - SPACEMAN",
        precio: "15990",
        imagen: "assets/img/the-spaceman.jpg"
    }
];

let productosCarro = [];
if (localStorage.getItem("productos")) {
    productosCarro = JSON.parse(localStorage.getItem("productos"));
    console.log(productosCarro);
    actualizarCarro(productosCarro);
}


function cargarProductos(listadoProductos) {
    let acumulador = "";
    listadoProductos.forEach((producto) => {
        let template = `
      <div class="col-md-4">
                <div class="card">
                    <a href="producto.html">
                       <img src="${producto.imagen}"  class="card-img-top" > 
                    </a>
                    <div class="card-body d-grid mx-auto">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class="btn btn-dark data-id="${producto.id}"
                          onclick="addToCart('${producto.id}')">Agregar al carro</button>
                    </div>
                </div>
      </div>
          `;
        acumulador += template;
    });

    document.querySelector("#productos .row").innerHTML = acumulador;
}

function addToCart(id) {
    let objProducto = {
        id,
        cantidad: 1
    };

    let productoEncontrado = productosCarro.find(
        (producto) => producto.id == id
    );
    if (productoEncontrado) {
        productoEncontrado.cantidad = productoEncontrado.cantidad + 1;
    } else {
        productosCarro.push(objProducto);
    }

    actualizarCarro(productosCarro);
};

function actualizarCarro(listadoProductos) {
    localStorage.setItem("productos", JSON.stringify(listadoProductos));

    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
        (accumulator, producto) => accumulator + producto.cantidad,
        valorInicial
    );

    document.querySelector("#cantidad-productos").innerText = sumaProductos;
}

let precioTotalCompra = 0;


function cargarTablaProductos() {
    let acumuladorFilas = "";

    precioTotalCompra = 0;
    productosCarro.forEach((producto) => {
        let productoEncontrado = encontrarProducto(producto.id);
        let totalProducto = producto.cantidad * productoEncontrado.precio;
        precioTotalCompra += totalProducto;

        let template = `
              <tr>
                  <td>${productoEncontrado.id}</td>
                  <td>${productoEncontrado.nombre}</td>
                  <td>${productoEncontrado.precio}</td>
                  <td>${producto.cantidad}</td>
                  <td>${totalProducto}</td>
              </tr>
      `;
        acumuladorFilas += template;
    });

    document.querySelector("#productos-carrito tbody").innerHTML =
        acumuladorFilas;
    document.querySelector(
        "#precio-total"
    ).innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`;
}

function encontrarProducto(id) {
    let encontrado = productos.find((producto) => producto.id == id);
    return encontrado;
}

  document.getElementById("btn-vaciar").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("productos", "[]");
    location.reload();
  });

  document.getElementById("btn-descuento").addEventListener("click", function (event) {
    let cuponIngresado = document.getElementById("input-cupon").value;
    console.log(cuponIngresado);
    let cuponEncontrado = cupones.find(
      (cupon) => cupon.nombre == cuponIngresado

    );
   
    if (cuponEncontrado.nombre == cuponIngresado) {
      alert("cupón encontrado.");
      precioTotalCompra =
        precioTotalCompra -
        (precioTotalCompra * cuponEncontrado.descuento) / 100;
      document.querySelector(
        "#precio-total"
      ).innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`;
    } 
    else{
      alert("Cupón no encontrado.");
    }
  });