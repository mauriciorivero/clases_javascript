// =============================================================================
//  ⚙️  INDUSTECH — INVENTARIO INDUSTRIAL
//  Estilo Visual : Esqueuomorfismo (textura metálica, paneles físicos)
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//                  (Arrays, Objetos, Map, typeof, null, coerción)
//
//  🐛 ESTE ARCHIVO CONTIENE 3 ERRORES INTENCIONALES.
//     Abre la consola del navegador (F12 → Console) para ver los errores.
//     Busca los comentarios marcados con 🐛 para encontrar cada problema.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  📦  DATOS: INVENTARIO DE PRODUCTOS INDUSTRIALES
//  Array de objetos. Cada objeto representa un producto con:
//  codigo, nombre, categoria, stock, precioUnitario (number), activo (boolean)
// ─────────────────────────────────────────────────────────────────────────────

var inventario = [
    // ── Mecánica ────────────────────────────────────────────────────────────────
    {
        codigo: "MCN-001", nombre: "Rodamiento SKF 6205",
        categoria: "mecanica",
        // 🐛 ERROR 1 — Stock guardado como STRING en lugar de NUMBER
        //    Prueba en consola: typeof inventario[0].stock
        //    Debería ser "number", pero es "string".

        stock: "150",
        precioUnitario: 28500,
        activo: true
    },
    {
        codigo: "MCN-002", nombre: "Correa Dentada HTD 3M",
        categoria: "mecanica",
        stock: "80",
        precioUnitario: 42000,
        activo: true
    },
    {
        codigo: "MCN-003", nombre: "Eje de Transmisión Ø 25mm",
        categoria: "mecanica",
        stock: 45,
        precioUnitario: 185000,
        activo: true
    },
    // ── Eléctrica ───────────────────────────────────────────────────────────────
    {
        codigo: "ELC-001", nombre: "Variador de Frecuencia 7.5kW",
        categoria: "electrica",
        stock: 12,
        precioUnitario: 1850000,
        activo: true
    },
    {
        codigo: "ELC-002", nombre: "Cable Apantallado 4x2.5mm²",
        categoria: "electrica",
        stock: "200",
        precioUnitario: 8900,
        activo: true
    },
    {
        codigo: "ELC-003", nombre: "Contactor Siemens 3RT2 25A",
        categoria: "electrica",
        stock: 38,
        precioUnitario: 95000,
        activo: true
    },
    // ── Hidráulica ──────────────────────────────────────────────────────────────
    {
        codigo: "HID-001", nombre: "Cilindro Hidráulico Ø63mm",
        categoria: "hidraulica",
        stock: 8,
        precioUnitario: 620000,
        activo: true
    },
    {
        codigo: "HID-002", nombre: "Válvula Direccional 4/3",
        categoria: "hidraulica",
        stock: 15,
        precioUnitario: 380000,
        activo: true
    },
    // ── Seguridad ───────────────────────────────────────────────────────────────
    {
        codigo: "SEG-001", nombre: "Sensor de Presencia Sick",
        categoria: "seguridad",
        stock: 25,
        precioUnitario: 480000,
        activo: true
    },
    {
        codigo: "SEG-002", nombre: "Relé de Seguridad Pilz",
        categoria: "seguridad",
        stock: 6,
        precioUnitario: 950000,
        activo: true
    }
];


// ─────────────────────────────────────────────────────────────────────────────
//  🗺️  MAPA DE CATEGORÍAS
//  Usamos Map para asociar códigos de categoría con nombres legibles.
//  Map permite cualquier tipo como clave, a diferencia de los objetos.
// ─────────────────────────────────────────────────────────────────────────────

var categorias = new Map();
categorias.set("mecanica", "⚙ Mecánica");
categorias.set("electrica", "⚡ Eléctrica");
categorias.set("hidraulica", "💧 Hidráulica");
categorias.set("seguridad", "🛡 Seguridad");
categorias.set("todas", "Todas");


// ─────────────────────────────────────────────────────────────────────────────
//  🔧  FUNCIÓN: obtenerNombreCategoria(codigo)
//  Busca el nombre legible de una categoría usando el Map `categorias`.
//  Retorna el texto formateado o un mensaje por defecto si no se encuentra.
// ─────────────────────────────────────────────────────────────────────────────

function obtenerNombreCategoria(codigo) {
    // 🐛 ERROR 2 — Clave incorrecta en Map.get()
    //    Se llama a categorias.get() con la clave `codigo + "s"`,
    //    agregando una "s" extra al código de categoría.
    //    Map.get() retorna `undefined` si la clave no existe,
    //    lo que hace que todas las celdas de "Categoría" muestren "undefined".
    //
    //    Prueba en consola:
    //      categorias.get("mecanicas")   → undefined
    //      categorias.get("mecanica")    → "⚙ Mecánica"    (correcto)
    //
    //    Corrección: eliminar la concatenación `+ "s"` → usar solo `codigo`.
    //    Lección relacionada: 6_maps.js (Unidad 3).
    var nombre = categorias.get(codigo + "s"); // ← clave incorrecta (tiene "s" de más)

    if (nombre === undefined) {
        return "Sin categoría";
    }
    return nombre;
}


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarTabla(lista)
//  Dibuja las filas de la tabla con los productos del array recibido.
//  Calcula el color del stock según el nivel (bajo/medio/alto).
// ─────────────────────────────────────────────────────────────────────────────

function renderizarTabla(lista) {
    var tbody = document.getElementById("tbodyInventario");
    tbody.innerHTML = "";

    lista.forEach(function (producto) {
        // Verificamos que el producto sea válido antes de procesar
        if (!validarProducto(producto)) return;

        var stockNum = Number(producto.stock);
        var claseStock = stockNum <= 10 ? "stock-bajo" : stockNum <= 40 ? "stock-medio" : "stock-alto";

        // El valor total de stock usa Number() para evitar la coerción del error 1
        var valorTotalFila = (stockNum * producto.precioUnitario).toLocaleString("es-CO");

        var tr = document.createElement("tr");
        tr.innerHTML = `
      <td style="font-family:'Roboto Mono',monospace; font-size:.8rem;">${producto.codigo}</td>
      <td style="font-weight:600;">${producto.nombre}</td>
      <td><span class="badge-cat">${obtenerNombreCategoria(producto.categoria)}</span></td>
      <td><span class="stock-valor ${claseStock}">${producto.stock}</span></td>
      <td style="font-family:'Roboto Mono',monospace;">$${producto.precioUnitario.toLocaleString("es-CO")}</td>
      <td style="font-family:'Roboto Mono',monospace; font-weight:600;">$${valorTotalFila}</td>
      <td>
        <div class="td-acciones">
          <button class="btn-sm mas"   onclick="ajustarStock('${producto.codigo}', 10, 'suma')">+10</button>
          <button class="btn-sm menos" onclick="ajustarStock('${producto.codigo}', 10, 'resta')">-10</button>
        </div>
      </td>
    `;
        tbody.appendChild(tr);
    });

    actualizarEstadisticas(lista);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  FUNCIÓN: validarProducto(producto)
//  Verifica que el producto sea un objeto válido (no null, no undefined).
//  Retorna true si es válido, false si no.
// ─────────────────────────────────────────────────────────────────────────────

function validarProducto(producto) {
    // 🐛 ERROR 3 — typeof null devuelve "object": la verificación falla
    //    En JavaScript, typeof null === "object" (comportamiento histórico).
    //    Si un elemento del array es null, esta condición es TRUE (pasa)
    //    y el código posterior lanza TypeError al acceder a producto.nombre.
    //
    //    Prueba en consola: typeof null → "object"
    //
    //    Corrección: agregar una condición adicional
    //
    //    Lección relacionada: 7_null.js y 9_typeOf.js (Unidad 2).
    if (typeof producto === "object") {  // ← null también pasa esta condición
        return true;  // ← con null, retorna true y el código posterior falla
    }
    return false;
}

// Para demostrar el error 3, agregamos un null al inventario temporalmente:
// (Descomenta la siguiente línea para ver el TypeError en acción)
// inventario.push(null);


// ─────────────────────────────────────────────────────────────────────────────
//  🔧  FUNCIÓN: ajustarStock(codigo, cantidad, operacion)
//  Modifica el stock de un producto por código.
//  Suma o resta la cantidad indicada.
//  ⚠ Con Error 1 activo: la suma concatena strings ("150" + 10 = "15010")
// ─────────────────────────────────────────────────────────────────────────────

function ajustarStock(codigo, cantidad, operacion) {
    var producto = inventario.find(function (p) { return p && p.codigo === codigo; });
    if (!producto) { agregarLog("ERROR: Producto " + codigo + " no encontrado", "error"); return; }

    var stockAntes = producto.stock;

    if (operacion === "suma") {
        // 🐛 MANIFESTACIÓN DEL ERROR 1:
        //    Si producto.stock es "150" (string), entonces:
        //    "150" + 10 = "15010" en lugar de 160.
        //    La RESTA funciona: "150" - 10 = 140 (JavaScript convierte a número).
        //    Pero la SUMA concatena porque el operador + también concatena strings.
        producto.stock = producto.stock + cantidad;
    } else {
        // La resta SÍ funciona con strings por coerción implícita (convierte a number)
        producto.stock = producto.stock - cantidad;
        if (producto.stock < 0) producto.stock = 0;
    }

    var msg = "[" + codigo + "] Stock: " + stockAntes + " → " + producto.stock
        + " (" + (operacion === "suma" ? "+" : "-") + cantidad + ")";
    agregarLog(msg, operacion === "suma" ? "ok" : "warn");

    renderizarTabla(obtenerListaActual());
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  FUNCIÓN: filtrarCategoria(cat)
//  Filtra el inventario por categoría usando Array.filter()
// ─────────────────────────────────────────────────────────────────────────────

function filtrarCategoria(cat) {
    var lista = cat === "todas"
        ? inventario
        : inventario.filter(function (p) { return p && p.categoria === cat; });
    renderizarTabla(lista);
    agregarLog("Filtro aplicado: " + categorias.get(cat || "todas"), "ok");
}

function obtenerListaActual() { return inventario; }


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: actualizarEstadisticas(lista)
//  Calcula y muestra resúmenes en el sidebar.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarEstadisticas(lista) {
    var total = lista.filter(function (p) { return p != null; }).length;
    var bajo = lista.filter(function (p) { return p != null && Number(p.stock) <= 10; }).length;
    var valor = lista.filter(function (p) { return p != null; }).reduce(function (acc, p) {
        return acc + (Number(p.stock) * p.precioUnitario);
    }, 0);

    document.getElementById("statTotal").textContent = total;
    document.getElementById("statBajo").textContent = bajo;
    document.getElementById("statValor").textContent = "$" + valor.toLocaleString("es-CO");
}


// ─────────────────────────────────────────────────────────────────────────────
//  📝  FUNCIÓN: agregarLog(mensaje, nivel)
//  Agrega una línea al log de operaciones con clase de color según nivel.
// ─────────────────────────────────────────────────────────────────────────────

function agregarLog(mensaje, nivel) {
    var log = document.getElementById("logOperaciones");
    var div = document.createElement("div");
    div.className = "log-linea log-" + (nivel || "ok");
    div.textContent = "[" + new Date().toLocaleTimeString() + "] " + mensaje;
    log.insertBefore(div, log.firstChild);
    if (log.children.length > 12) log.removeChild(log.lastChild);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔲  FUNCIÓN: agregarStock() / retirarStock()
//  Leen los inputs del sidebar y llaman a ajustarStock() con el código y monto.
// ─────────────────────────────────────────────────────────────────────────────

function agregarStock() {
    var codigo = document.getElementById("inputCodigo").value.trim().toUpperCase();
    var cantidad = parseInt(document.getElementById("inputCantidad").value, 10);
    if (!codigo) { agregarLog("ERROR: Ingresa un código de producto", "error"); return; }
    if (isNaN(cantidad) || cantidad <= 0) { agregarLog("ERROR: Cantidad inválida", "error"); return; }
    ajustarStock(codigo, cantidad, "suma");
}

function retirarStock() {
    var codigo = document.getElementById("inputCodigo").value.trim().toUpperCase();
    var cantidad = parseInt(document.getElementById("inputCantidad").value, 10);
    if (!codigo) { agregarLog("ERROR: Ingresa un código de producto", "error"); return; }
    if (isNaN(cantidad) || cantidad <= 0) { agregarLog("ERROR: Cantidad inválida", "error"); return; }
    ajustarStock(codigo, cantidad, "resta");
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

document.getElementById("lblFecha").textContent =
    new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

renderizarTabla(inventario);
agregarLog(inventario.length + " productos cargados en inventario.", "ok");