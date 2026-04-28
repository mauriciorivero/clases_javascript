// =============================================================================
//  🛍️  MODA URBANA — TIENDA DE ROPA
//  Estilo Visual : Neumorfismo
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos (Arrays)
//
//  🐛 ESTE ARCHIVO CONTIENE 5 ERRORES INTENCIONALES.
//     Tu misión es encontrarlos y corregirlos.
//     Usa la consola del navegador (F12 → Console) para ver los mensajes.
//     Cada error tiene un comentario 🐛 que te guía hacia la zona del problema.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  📦  CATÁLOGO DE PRODUCTOS
//  Array de objetos. Cada objeto representa una prenda con sus propiedades.
//  Propiedades: id (number), nombre (string), categoria (string),
//               precio (?), emoji (string), tallas (array), stock (number)
// ─────────────────────────────────────────────────────────────────────────────

const catalogo = [
    // ── Camisetas ──────────────────────────────────────────────────────────────
    {
        id: 1,
        nombre: "Camiseta Oversize Básica",
        categoria: "camisetas",
        // 🐛 ERROR 1 — Tipo de dato incorrecto en `precio`
        //    El precio está guardado como STRING ("59900") en lugar de NUMBER (59900).
        //    Las multiplicaciones funcionan por coerción implícita, PERO la suma
        //    acumulada en actualizarCarrito() concatena strings en vez de sumar.
        //
        //    Prueba en consola: typeof catalogo[0].precio
        //    Resultado esperado: "number" | Resultado actual: "string"
        //
        //    Pista: revisa la lección sobre typeof y tipos de datos primitivos.
        precio: "59900",
        emoji: "👕",
        tallas: ["XS", "S", "M", "L", "XL"],
        stock: 15
    },
    {
        id: 2,
        nombre: "Hoodie Premium Unisex",
        categoria: "camisetas",
        precio: "119900",  // ← mismo problema que id:1
        emoji: "🧥",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 8
    },
    // ── Pantalones ─────────────────────────────────────────────────────────────
    {
        id: 3,
        nombre: "Jean Skinny Clásico",
        categoria: "pantalones",
        precio: "99900",
        emoji: "👖",
        tallas: ["28", "30", "32", "34", "36"],
        stock: 12
    },
    {
        id: 4,
        nombre: "Jogger Urbano",
        categoria: "pantalones",
        precio: "79900",
        emoji: "🩱",
        tallas: ["S", "M", "L", "XL"],
        stock: 20
    },
    // ── Accesorios ─────────────────────────────────────────────────────────────
    {
        id: 5,
        nombre: "Gorra Snapback Retro",
        categoria: "accesorios",
        precio: "39900",
        emoji: "🧢",
        tallas: ["Única"],
        stock: 30
    },
    {
        id: 6,
        nombre: "Bolso Crossbody",
        categoria: "accesorios",
        precio: "69900",
        emoji: "👜",
        tallas: ["Único"],
        stock: 10
    },
    // ── Calzado ────────────────────────────────────────────────────────────────
    {
        id: 7,
        nombre: "Tenis Urbanos Pro",
        categoria: "calzado",
        precio: "149900",
        emoji: "👟",
        tallas: ["38", "39", "40", "41", "42", "43"],
        stock: 6
    },
    {
        id: 8,
        nombre: "Sandalias de Verano",
        categoria: "calzado",
        precio: "49900",
        emoji: "🩴",
        tallas: ["36", "37", "38", "39", "40"],
        stock: 18
    }
];


// ─────────────────────────────────────────────────────────────────────────────
//  🗃️  ESTADO DE LA APLICACIÓN
//  Variables que almacenan el estado actual: carrito y categoría seleccionada.
// ─────────────────────────────────────────────────────────────────────────────

// 🐛 ERROR 2 — Declaración incorrecta de `carrito` con `const`
//    Más adelante, en agregarAlCarrito(), se intenta REASIGNAR esta variable
//    con el operador `=`. Sin embargo, `const` prohíbe la reasignación.
//    Esto lanza un TypeError en la consola al agregar el primer producto nuevo.
//
//    Pista: ¿qué palabra clave permite reasignar variables?
//           Revisa la diferencia entre const, let y var (Unidad 1).
const carrito = [];

let categoriaActual = "todos";


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarProductos(lista)
//  Recibe un array de objetos-producto y dibuja las tarjetas en el DOM.
//  Limpia el grid antes de volver a pintar para evitar duplicados.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarProductos(lista) {
    const grid = document.getElementById("productosGrid");
    grid.innerHTML = ""; // limpiamos antes de renderizar

    if (lista.length === 0) {
        grid.innerHTML = '<p class="vacio">😕 No hay productos en esta categoría.</p>';
        return;
    }

    // Usamos forEach para recorrer el array y crear una tarjeta por producto
    lista.forEach(function (producto) {
        // 🐛 ERROR 5 — Uso incorrecto de typeof para Arrays
        //    Se intenta verificar si `producto.tallas` es un Array antes de iterar.
        //    Sin embargo, typeof en JS devuelve "object" para los arreglos.
        //    Al comparar con "array", la condición es falsa y se asigna un arreglo vacío.
        //    Resultado: ¡Los botones de tallas no aparecen en la interfaz!
        //
        //    Pista: Revisa la lección sobre Arrays. El método correcto es Array.isArray()
        const tallasValidas = (typeof producto.tallas === "array") ? producto.tallas : [];

        // map() genera los botones de talla como array de strings HTML
        const tallasHTML = tallasValidas
            .map(function (t) {
                return `<button class="talla-pill" onclick="elegirTalla(this)">${t}</button>`;
            })
            .join("");

        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.id = producto.id;

        // Usamos Number() para mostrar el precio formateado aunque sea string
        card.innerHTML = `
      <span class="p-emoji">${producto.emoji}</span>
      <p class="p-nombre">${producto.nombre}</p>
      <p class="p-cat">${producto.categoria}</p>
      <p class="p-precio">$${Number(producto.precio).toLocaleString("es-CO")}</p>
      <!-- 🐛 ERROR 4 — Propiedad de objeto inexistente (undefined)
           Se intenta acceder a \`producto.stok\` (con falta de ortografía).
           Como la propiedad no existe en el objeto, JS no lanza error, sino que
           devuelve \`undefined\`. Se verá en pantalla "Stock: undefined unidades".
           
           Pista: revisa los nombres exactos de las propiedades en el catálogo. -->
      <p class="p-stock">Stock: ${producto.stok} unidades</p>
      <div class="tallas-row">${tallasHTML}</div>
      <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">+ Agregar al carrito</button>
    `;

        grid.appendChild(card);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  FUNCIÓN: filtrarPorCategoria(categoria)
//  Filtra el array `catalogo` según la categoría recibida y re-renderiza.
//  También actualiza el estilo visual de los botones del filtro.
// ─────────────────────────────────────────────────────────────────────────────

function filtrarPorCategoria(categoria) {
    categoriaActual = categoria;

    // Quitamos la clase activo a todos y se la damos solo al botón clicado
    document.querySelectorAll("#filtrosBar .neu-btn").forEach(function (btn) {
        btn.classList.toggle("activo", btn.dataset.cat === categoria);
    });

    // filter() retorna un nuevo array con los productos que cumplan la condición
    const resultado =
        categoria === "todos"
            ? catalogo
            : catalogo.filter(function (p) { return p.categoria === categoria; });

    renderizarProductos(resultado);
}


// ─────────────────────────────────────────────────────────────────────────────
//  👗  FUNCIÓN: elegirTalla(boton)
//  Marca visualmente la talla seleccionada dentro de la misma tarjeta.
//  Usa closest() para encontrar el contenedor padre sin hardcodear IDs.
// ─────────────────────────────────────────────────────────────────────────────

function elegirTalla(boton) {
    const grupo = boton.closest(".tallas-row").querySelectorAll(".talla-pill");
    grupo.forEach(function (b) { b.classList.remove("sel"); });
    boton.classList.add("sel");
}


// ─────────────────────────────────────────────────────────────────────────────
//  💰  FUNCIÓN: calcularDescuento(precio)
//  Aplica un 10 % de descuento fidelidad al precio recibido.
//  Retorna el precio final después del descuento.
// ─────────────────────────────────────────────────────────────────────────────

function calcularDescuento(precio) {
    // 🐛 ERROR 3 — Problema de HOISTING con `var`
    //    La variable `porcentaje` se declara con `var` DESPUÉS de ser usada.
    //    Con `var`, la declaración sube (hoisting) al tope de la función,
    //    pero su VALOR (10) NO sube → en la línea de cálculo, `porcentaje` es undefined.
    //    Resultado: precio * undefined = NaN → descuento nunca funciona.
    //
    //    Consola: escribe calcularDescuento(100000) → verás NaN o el resultado incorrecto.
    //
    //    Pista: ¿qué diferencia hay entre `var` y `let`/`const` respecto al hoisting?
    //           Revisa la lección 6_hoisting.js de la Unidad 1.

    var precioFinal = precio - (precio * porcentaje / 100);
    var porcentaje = 10;

    return precioFinal;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🛒  FUNCIÓN: agregarAlCarrito(id)
//  Busca el producto por ID en el catálogo y lo agrega al arreglo carrito.
//  Si el producto ya existe, incrementa su cantidad.
// ─────────────────────────────────────────────────────────────────────────────

function agregarAlCarrito(id) {
    // find() devuelve el primer elemento que cumple la condición, o undefined
    var producto = catalogo.find(function (p) { return p.id === id; });
    if (!producto) return;

    // Verificamos si el producto ya está en el carrito
    var existente = carrito.find(function (item) { return item.id === id; });

    if (existente) {
        existente.cantidad++;   // solo actualiza la cantidad
    } else {
        // 🐛 RELACIONADO CON ERROR 2 — Aquí se intenta REASIGNAR `carrito`
        //    El operador spread [...carrito, nuevoItem] crea un NUEVO array
        //    y se intenta asignar a `carrito` con `=`.
        //    Eso falla porque `carrito` fue declarado con `const`.
        //    ¿Qué método de Array agrega un elemento SIN reasignar la variable?
        carrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    actualizarCarrito();
    mostrarToast();
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔄  FUNCIÓN: actualizarCarrito()
//  Lee el array `carrito` y actualiza el panel lateral del DOM.
//  Calcula el total sumando precio × cantidad de cada ítem.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarCarrito() {
    var contenedor = document.getElementById("cartItems");
    var totalEl = document.getElementById("cartTotal");
    var countEl = document.getElementById("cartCount");
    contenedor.innerHTML = "";

    var total = 0;  // acumulador numérico

    carrito.forEach(function (item) {
        // 🐛 MANIFESTACIÓN DEL ERROR 1
        //    Cuando precio es STRING: 0 + "59900" = "059900" (concatenación).
        //    La siguiente suma agrega otro string: "059900" + "89900" = "05990089900".
        //    ¡El total muestra texto en lugar de un número correcto!
        //
        //    Posible corrección:   total = total + Number(item.precio) * item.cantidad;
        //    O arreglando la raíz: cambiar precio: "59900" → precio: 59900 en el catálogo.
        total = total + item.precio;   // ← suma string directamente sin convertir

        var div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
      <div>
        <strong>${item.emoji} ${item.nombre}</strong>
        <br><small>Talla seleccionada · Cant: ${item.cantidad}</small>
      </div>
      <div class="cart-item-precio">
        $${(Number(item.precio) * item.cantidad).toLocaleString("es-CO")}
      </div>
    `;
        contenedor.appendChild(div);
    });

    // Conteo total de ítems (suma de todas las cantidades)
    var totalItems = carrito.reduce(function (acc, item) { return acc + item.cantidad; }, 0);
    countEl.textContent = totalItems;

    // Mostramos el total — si precio era string, esto muestra texto concatenado
    totalEl.textContent = "$" + (typeof total === "number"
        ? total.toLocaleString("es-CO")
        : total   // ← muestra el string concatenado defectuoso
    );
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔔  FUNCIÓN: mostrarToast()
//  Muestra una notificación animada brevemente cuando se agrega un producto.
// ─────────────────────────────────────────────────────────────────────────────

function mostrarToast() {
    var toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 2000);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔓  EVENTOS: Abrir / cerrar el panel del carrito
// ─────────────────────────────────────────────────────────────────────────────

document.getElementById("btnAbrirCarrito").addEventListener("click", function () {
    document.getElementById("cartPanel").classList.add("show");
    document.getElementById("cartOverlay").classList.add("show");
});

function cerrarCarrito() {
    document.getElementById("cartPanel").classList.remove("show");
    document.getElementById("cartOverlay").classList.remove("show");
}

document.getElementById("btnCerrarCarrito").addEventListener("click", cerrarCarrito);
document.getElementById("cartOverlay").addEventListener("click", cerrarCarrito);


// ─────────────────────────────────────────────────────────────────────────────
//  🎯  EVENTOS: Botones de filtro
//  Cada botón del filtro delega la acción a filtrarPorCategoria()
// ─────────────────────────────────────────────────────────────────────────────

document.querySelectorAll("#filtrosBar .neu-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        filtrarPorCategoria(btn.dataset.cat);
    });
});


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
//  Al cargar la página, pintamos todos los productos del catálogo.
// ─────────────────────────────────────────────────────────────────────────────

renderizarProductos(catalogo);