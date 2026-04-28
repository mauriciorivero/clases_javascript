// =============================================================================
//  🚀  SPACEX — CENTRO DE MONITOREO DE MISIONES
//  Estilo Visual : Glassmorfismo
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//                  (Arrays, Objetos, null, undefined, typeof, scope/closures)
//
//  🐛 ESTE ARCHIVO CONTIENE 3 ERRORES INTENCIONALES.
//     Usa F12 → Console y F12 → Sources para investigar.
//     Cada error tiene comentarios 🐛 que señalan la zona del problema.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  🛸  DATOS: ARRAY DE MISIONES
//  Cada misión es un objeto con propiedades de telemetría.
//  Propiedades: id, nombre, tipo, estado, altitud (km), combustible (0–100),
//               velocidad (km/s), tripulacion (boolean)
// ─────────────────────────────────────────────────────────────────────────────

const misiones = [
    {
        id: "SX-2024-001",
        nombre: "Falcon 9 — Starlink 6.21",
        tipo: "Satélites de telecomunicaciones",
        estado: "activa",
        altitud: 550,
        combustible: 78,
        velocidad: 7.9,
        tripulacion: false
    },
    {
        id: "SX-2024-002",
        nombre: "Dragon Crew-9",
        tipo: "Misión tripulada a la ISS",
        estado: "en-curso",
        altitud: 420,
        combustible: 45,
        velocidad: 7.65,
        tripulacion: true
    },

    // 🐛 ERROR 1 — Valor `null` en el array de misiones
    //    Este elemento representa una misión cuya telemetría se perdió.
    //    Cuando renderizarMisiones() intente acceder a `.id`, `.nombre`,
    //    etc., JavaScript lanzará:
    //    TypeError: Cannot read properties of null (reading 'id')
    //
    //    Opción A: Eliminar el null del array.
    //    Opción B: Agregar una verificación antes de usar cada elemento.
    //              Pista: if (mision !== null) { ... }
    //              o usa: if (mision == null) continue;
    //    Revisa la lección 7_null.js de la Unidad 2.
    null,

    {
        id: "SX-2024-004",
        nombre: "Starship Test Flight 5",
        tipo: "Prueba de vehículo pesado",
        estado: "alerta",
        altitud: 180,
        combustible: 12,
        velocidad: 3.2,
        tripulacion: false
    },
    {
        id: "SX-2024-005",
        nombre: "Transporter-9",
        tipo: "Cargas rideshare",
        estado: "activa",
        altitud: 525,
        combustible: 91,
        velocidad: 7.8,
        tripulacion: false
    },
    {
        id: "SX-2024-006",
        nombre: "GPS III SV-07",
        tipo: "Satélite gubernamental",
        estado: "en-curso",
        altitud: 20200,
        combustible: 67,
        velocidad: 3.87,
        tripulacion: false
    }
];


// ─────────────────────────────────────────────────────────────────────────────
//  🗒️  FUNCIÓN: agregarLog(mensaje, esError)
//  Agrega una línea al panel de log del sistema.
//  esError (boolean) cambia el color a rojo.
// ─────────────────────────────────────────────────────────────────────────────

function agregarLog(mensaje, esError) {
    var log = document.getElementById("logBox");
    var p = document.createElement("p");
    if (esError) p.classList.add("log-error");
    p.textContent = "[" + new Date().toLocaleTimeString() + "] " + mensaje;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: calcularMetricas()
//  Recorre el array de misiones y actualiza las tarjetas de resumen.
//  Usa reduce() para acumular el combustible y luego calcular el promedio.
// ─────────────────────────────────────────────────────────────────────────────

function calcularMetricas() {
    // Filtramos los null antes de calcular métricas
    var validas = misiones.filter(function (m) { return m !== null; });

    var totalActivas = validas.filter(function (m) { return m.estado === "activa"; }).length;
    var totalAlerta = validas.filter(function (m) { return m.estado === "alerta"; }).length;

    // reduce() suma todos los valores de combustible
    var sumaComb = validas.reduce(function (acc, m) { return acc + m.combustible; }, 0);
    var promComb = Math.round(sumaComb / validas.length);

    document.getElementById("metTotal").textContent = validas.length;
    document.getElementById("metActivas").textContent = totalActivas;
    document.getElementById("metAlerta").textContent = totalAlerta;
    document.getElementById("metCombPromedio").textContent = promComb + "%";
}


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarMisiones()
//  Itera el array `misiones` y genera una tarjeta por misión en el DOM.
//  Cada tarjeta incluye telemetría y un botón de detalle.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarMisiones() {
    var grid = document.getElementById("gridMisiones");
    grid.innerHTML = "";

    // ─────────────────────────────────────────────────────────────────
    // 🐛 ERROR 2 — Uso de `var` en el bucle for: problema de CLOSURE
    //
    //    Con `var i`, la variable i es COMPARTIDA por todas las funciones
    //    que se crean dentro del bucle (los event listeners de cada botón).
    //    Cuando el usuario hace clic en cualquier botón, el bucle ya terminó
    //    y `i` vale misiones.length (6). Por eso siempre se muestra
    //    "misiones[6]" que es undefined.
    //
    //    Corrección: cambiar `var i` → `let i`
    //    Con `let`, cada iteración crea su PROPIO ámbito de bloque con su
    //    propia copia de `i`.
    //
    //    Prueba: haz clic en "Ver Telemetría" de cualquier misión y observa
    //    el log (siempre dice "índice 6 — undefined").
    //    Lección relacionada: 8_closure.js y 9_scope_bloque.js (Unidad 1).
    // ─────────────────────────────────────────────────────────────────

    for (var i = 0; i < misiones.length; i++) {
        var mision = misiones[i];

        // Manejamos null individualmente para no romper el loop completo
        if (mision === null) {
            agregarLog("Misión #" + (i + 1) + ": sin telemetría (dato nulo)", true);
            continue;
        }

        // Determinamos la clase y badge según el estado
        var claseCard = "mision-card glass " + mision.estado;
        var classBadge = mision.estado === "activa" ? "badge-activa"
            : mision.estado === "en-curso" ? "badge-curso" : "badge-alerta";
        var textoEstado = mision.estado === "activa" ? "Activa"
            : mision.estado === "en-curso" ? "En Curso" : "⚠ Alerta";

        var card = document.createElement("div");
        card.className = claseCard;
        card.innerHTML = `
      <div class="mision-id">MISIÓN ${mision.id}</div>
      <div class="mision-nombre">${mision.nombre}</div>
      <div class="mision-tipo">${mision.tipo}</div>
      <span class="badge-estado ${classBadge}">${textoEstado}</span>

      <div class="dato-row">
        <span class="dato-label">Altitud</span>
        <span class="dato-valor" style="color:var(--acento)">${mision.altitud} km</span>
      </div>
      <div class="dato-row">
        <span class="dato-label">Velocidad</span>
        <span class="dato-valor">${mision.velocidad} km/s</span>
      </div>
      <div class="dato-row">
        <span class="dato-label">Combustible</span>
        <span class="dato-valor" style="color:${mision.combustible < 20 ? 'var(--rojo)' : 'var(--verde)'}">${mision.combustible}%</span>
      </div>
      <div class="barra-container">
        <div class="barra-fill" style="width:${mision.combustible}%"></div>
      </div>
      <button class="btn-glass" id="btn-detalle-${i}">📡 Ver Telemetría</button>
    `;

        // Evento del botón de detalle
        // 🐛 MANIFESTACIÓN DEL ERROR 2:
        //    Al hacer clic, `i` ya tiene el valor final del bucle (misiones.length).
        //    Por eso misiones[i] es undefined → el log muestra datos incorrectos.
        card.querySelector("#btn-detalle-" + i).addEventListener("click", function () {
            var misionSeleccionada = misiones[i]; // ← `i` es siempre misiones.length al hacer clic
            if (misionSeleccionada) {
                mostrarTelemetria(misionSeleccionada);
            } else {
                agregarLog("ERROR: índice " + i + " → misiones[" + i + "] es undefined", true);
            }
        });

        grid.appendChild(card);
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  📡  FUNCIÓN: mostrarTelemetria(mision)
//  Muestra información detallada de una misión en el log del sistema.
//  Accede a propiedades del objeto para construir el reporte.
// ─────────────────────────────────────────────────────────────────────────────

function mostrarTelemetria(mision) {
    // 🐛 ERROR 3 — Propiedad inexistente → valor `undefined`
    //    La propiedad que se intenta leer es `mision.nivelCombustible`,
    //    pero en los objetos del array `misiones` la propiedad correcta
    //    es `mision.combustible`.
    //
    //    typeof mision.nivelCombustible → "undefined"
    //    Resultado visible: el log muestra "Nivel de combustible: undefined%"
    //
    //    Corrección: cambiar `mision.nivelCombustible` → `mision.combustible`
    //    Lección relacionada: 6_undefined.js (Unidad 2) y 8_objetos.js.
    var nivelActual = mision.nivelCombustible; // ← propiedad incorrecta (no existe)

    agregarLog("══ TELEMETRÍA: " + mision.nombre + " ══");
    agregarLog("Altitud actual: " + mision.altitud + " km");
    agregarLog("Velocidad: " + mision.velocidad + " km/s");
    agregarLog("Nivel de combustible: " + nivelActual + "%"); // ← mostrará "undefined%"
    agregarLog("Tripulación a bordo: " + (mision.tripulacion ? "SÍ" : "NO"));
    agregarLog("Estado: " + mision.estado.toUpperCase());
}


// ─────────────────────────────────────────────────────────────────────────────
//  🕐  FUNCIÓN: iniciarReloj()
//  Actualiza el reloj en tiempo real en la cabecera.
//  Usa setInterval() para ejecutarse cada segundo.
// ─────────────────────────────────────────────────────────────────────────────

function iniciarReloj() {
    setInterval(function () {
        var ahora = new Date();
        document.getElementById("relojHeader").textContent = ahora.toLocaleTimeString();
    }, 1000);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚨  FUNCIÓN: verificarAlertas()
//  Recorre las misiones y genera alertas automáticas en el log
//  cuando el combustible está por debajo del umbral crítico.
// ─────────────────────────────────────────────────────────────────────────────

function verificarAlertas() {
    var UMBRAL_CRITICO = 20; // porcentaje mínimo de combustible

    misiones.forEach(function (mision) {
        if (mision === null) return; // ignoramos los valores nulos

        if (mision.combustible < UMBRAL_CRITICO) {
            agregarLog(
                "⚠ ALERTA: " + mision.nombre + " — Combustible crítico: " + mision.combustible + "%",
                true
            );
        }
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
//  Secuencia de arranque del sistema de monitoreo.
// ─────────────────────────────────────────────────────────────────────────────

iniciarReloj();
renderizarMisiones();
calcularMetricas();
verificarAlertas();
agregarLog("Monitoreo activo. " + misiones.filter(function (m) { return m !== null; }).length + " misiones en seguimiento.");