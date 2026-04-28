// =============================================================================
//  ⚡  PEOPLE POWER — DASHBOARD DE RECURSOS HUMANOS
//  Estilo Visual : Neobrutalismo
//  Conceptos JS  : Variables · Tipos de Datos · Estructuras de Datos
//                  (Arrays, Objetos, null, JSON, var/let/const, hoisting)
//
//  🐛 ESTE ARCHIVO CONTIENE 3 ERRORES INTENCIONALES.
//     Usa F12 → Console para ver los mensajes de error.
//     Cada error está marcado con un comentario 🐛.
// =============================================================================


// ─────────────────────────────────────────────────────────────────────────────
//  👥  DATOS: ARRAY DE EMPLEADOS
//  Cada empleado es un objeto con: id, nombre, cargo, departamento,
//  salario (number), asistencia (%), activo (boolean)
// ─────────────────────────────────────────────────────────────────────────────

var empleados = [
    { id: 1, nombre: "Ana Sofía Torres", cargo: "Desarrolladora Senior", departamento: "Tecnología", salario: 4800000, asistencia: 98, activo: true, avatar: "AT", color: "#3D6FFF" },
    { id: 2, nombre: "Carlos Mendoza", cargo: "Gerente Comercial", departamento: "Ventas", salario: 6200000, asistencia: 95, activo: true, avatar: "CM", color: "#FF5F3D" },
    { id: 3, nombre: "Luisa Fernanda Gil", cargo: "Diseñadora UX", departamento: "Tecnología", salario: 3900000, asistencia: 100, activo: true, avatar: "LG", color: "#3DCC82" },

    // 🐛 ERROR 1 — Valor `null` en el array de empleados
    //    Al renderizar la lista, el código intenta acceder a `empleado.nombre`,
    //    `empleado.cargo`, etc. Si el elemento es null, JavaScript lanza:
    //    TypeError: Cannot read properties of null (reading 'nombre')
    //
    //    Corrección: El bucle de renderizado debe verificar si el elemento es null
    //    antes de acceder a sus propiedades. Usa:
    //      if (empleado === null) return;  (dentro de forEach)
    //    o filtra antes: empleados.filter(function(e) { return e !== null; })
    //
    //    Lección relacionada: 7_null.js (Unidad 2).
    null,

    { id: 5, nombre: "María Camila Ruiz", cargo: "Analista de RRHH", departamento: "RRHH", salario: 3200000, asistencia: 92, activo: true, avatar: "MR", color: "#FF3DA6" },
    { id: 6, nombre: "Julián Ospina", cargo: "Contador Senior", departamento: "Finanzas", salario: 4100000, asistencia: 97, activo: true, avatar: "JO", color: "#FFE44D" },
    { id: 7, nombre: "Valentina Castro", cargo: "Desarrolladora Junior", departamento: "Tecnología", salario: 2800000, asistencia: 90, activo: true, avatar: "VC", color: "#3D6FFF" },
    { id: 8, nombre: "Diego Ramírez", cargo: "Ejecutivo de Ventas", departamento: "Ventas", salario: 2900000, asistencia: 88, activo: true, avatar: "DR", color: "#FF5F3D" },
    { id: 9, nombre: "Paola Suárez", cargo: "Gerente de Finanzas", departamento: "Finanzas", salario: 7500000, asistencia: 99, activo: true, avatar: "PS", color: "#3DCC82" },
    { id: 10, nombre: "Andrés Felipe Mora", cargo: "DevOps Engineer", departamento: "Tecnología", salario: 5200000, asistencia: 94, activo: true, avatar: "AM", color: "#9B59B6" }
];


// ─────────────────────────────────────────────────────────────────────────────
//  📦  CONJUNTO DE DEPARTAMENTOS (usando Set)
//  Set garantiza valores únicos — no hay departamentos repetidos.
//  Se alimenta del array `empleados` en la inicialización.
// ─────────────────────────────────────────────────────────────────────────────

var departamentos = new Set();


// ─────────────────────────────────────────────────────────────────────────────
//  💰  FUNCIÓN: calcularSalarioPromedio()
//  Suma todos los salarios y divide entre el número de empleados válidos.
//  Retorna el promedio como número redondeado.
// ─────────────────────────────────────────────────────────────────────────────

// 🐛 ERROR 2 — HOISTING: función expresión llamada antes de su declaración
//    La función `calcularSalarioPromedio` se declara como expresión de variable
//    con `var`. Las expresiones de variable NO se elevan con su valor —
//    solo la declaración se eleva, dejando la variable como `undefined`.
//
//    Por tanto, cuando se llama a `calcularSalarioPromedio()` durante la
//    inicialización (al final del archivo), la variable ya existe por
//    hoisting pero su valor es `undefined` (aún no se le asignó la función).
//    Resultado: TypeError: calcularSalarioPromedio is not a function
//
//    Corrección A: Mover la LLAMADA a la función DEBAJO de su declaración.
//    Corrección B: Cambiar `var calcularSalarioPromedio = function() {...}`
//                  por una declaración normal: `function calcularSalarioPromedio() {...}`
//                  Las funciones declaradas SÍ se elevan completamente (hoisting).
//
//    Lección relacionada: 6_hoisting.js (Unidad 1).

var calcularSalarioPromedio = function () {
    var validos = empleados.filter(function (e) { return e !== null; });
    if (validos.length === 0) return 0;
    var suma = validos.reduce(function (acc, e) { return acc + e.salario; }, 0);
    return Math.round(suma / validos.length);
};


// ─────────────────────────────────────────────────────────────────────────────
//  🖼️  FUNCIÓN: renderizarEmpleados(lista)
//  Dibuja las filas de la lista de empleados en el DOM.
//  Cada fila muestra avatar, nombre, cargo, departamento y salario.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarEmpleados(lista) {
    var contenedor = document.getElementById("listaEmpleados");
    contenedor.innerHTML = "";

    lista.forEach(function (empleado) {
        // 🐛 PUNTO DE FALLA DEL ERROR 1:
        //    Si `empleado` es null, esta línea lanza un TypeError.
        //    La corrección debe hacerse AQUÍ (o filtrando la lista antes de entrar).
        var fila = document.createElement("div");
        fila.className = "empleado-row";
        fila.innerHTML = `
      <div class="avatar" style="background:${empleado.color}20; border-color:${empleado.color};">${empleado.avatar}</div>
      <div>
        <div class="emp-nombre">${empleado.nombre}</div>
        <div class="emp-cargo">${empleado.cargo}</div>
        <span class="dept-badge" style="border-color:${empleado.color}; color:${empleado.color};">${empleado.departamento}</span>
      </div>
      <div class="emp-sal">$${empleado.salario.toLocaleString("es-CO")}</div>
    `;
        contenedor.appendChild(fila);

        // Aprovechamos para poblar el Set de departamentos
        departamentos.add(empleado.departamento);
    });

    document.getElementById("contadorEmpleados").textContent = lista.length + " empleados";
}


// ─────────────────────────────────────────────────────────────────────────────
//  🏢  FUNCIÓN: renderizarDepartamentos()
//  Muestra barras proporcionales por departamento usando el Set `departamentos`.
// ─────────────────────────────────────────────────────────────────────────────

function renderizarDepartamentos() {
    var contenedor = document.getElementById("deptList");
    contenedor.innerHTML = "";
    var validos = empleados.filter(function (e) { return e !== null; });
    var coloresDept = ["#3D6FFF", "#FF5F3D", "#3DCC82", "#FF3DA6", "#FFE44D", "#9B59B6"];
    var idx = 0;

    // Array.from() convierte el Set en array para poder recorrerlo con forEach
    Array.from(departamentos).forEach(function (dept) {
        var count = validos.filter(function (e) { return e.departamento === dept; }).length;
        var pct = Math.round((count / validos.length) * 100);
        var color = coloresDept[idx++ % coloresDept.length];

        var div = document.createElement("div");
        div.className = "dept-item";
        div.innerHTML = `
      <div class="dept-nombre">
        <span>${dept}</span>
        <span>${count} personas (${pct}%)</span>
      </div>
      <div class="barra-outer">
        <div class="barra-inner" style="width:${pct}%; background:${color};"></div>
      </div>
    `;
        contenedor.appendChild(div);
    });
}


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: ejecutarAnalisis()
//  Calcula estadísticas salariales y las muestra en el panel de resumen.
//  Usa reduce() para mínimo, máximo y suma.
// ─────────────────────────────────────────────────────────────────────────────

function ejecutarAnalisis() {
    var validos = empleados.filter(function (e) { return e !== null; });
    if (validos.length === 0) { agregarAlerta("No hay datos válidos para analizar.", "warn"); return; }

    var salarios = validos.map(function (e) { return e.salario; });
    var minSal = Math.min.apply(null, salarios);
    var maxSal = Math.max.apply(null, salarios);
    var promSal = Math.round(salarios.reduce(function (a, b) { return a + b; }, 0) / salarios.length);
    var masaPagas = salarios.reduce(function (a, b) { return a + b; }, 0);

    var baja = validos.filter(function (e) { return e.asistencia < 90; }).length;

    var contenedor = document.getElementById("resumenSalarial");
    contenedor.innerHTML = `
    <div class="resumen-item"><span>Salario mínimo</span>   <span class="resumen-valor">$${minSal.toLocaleString("es-CO")}</span></div>
    <div class="resumen-item"><span>Salario máximo</span>   <span class="resumen-valor">$${maxSal.toLocaleString("es-CO")}</span></div>
    <div class="resumen-item"><span>Salario promedio</span> <span class="resumen-valor">$${promSal.toLocaleString("es-CO")}</span></div>
    <div class="resumen-item"><span>Masa salarial total</span><span class="resumen-valor">$${masaPagas.toLocaleString("es-CO")}</span></div>
    <div class="resumen-item"><span>Asistencia baja (&lt;90%)</span><span class="resumen-valor" style="color:var(--naranja)">${baja} personas</span></div>
  `;

    agregarAlerta("Análisis salarial completado para " + validos.length + " empleados.", "ok");
}


// ─────────────────────────────────────────────────────────────────────────────
//  📥  FUNCIÓN: importarDatosJSON()
//  Simula la importación de datos externos en formato JSON.
//  Parsea el JSON y agrega los nuevos empleados al array `empleados`.
// ─────────────────────────────────────────────────────────────────────────────

function importarDatosJSON() {
    // 🐛 ERROR 3 — JSON.parse con cadena malformada (comillas simples)
    //    JSON REQUIERE comillas dobles ("") para claves y valores string.
    //    El estándar JSON NO acepta comillas simples ('').
    //    JSON.parse lanzará un SyntaxError en la consola.
    //
    //    Resultado visible: el botón "IMPORTAR DATOS JSON" no hace nada
    //    y la consola muestra: SyntaxError: Unexpected token ' in JSON at position 1
    //
    //    Corrección: reemplazar todas las comillas simples por dobles:
    //      {'nombre': 'Pedro'}  →  {"nombre": "Pedro"}
    //
    //    Lección relacionada: 3_estructura_datos_json.json (Unidad 3)
    //    y 2_conversion_explicita.js.

    var jsonMalformado = "{'id': 11, 'nombre': 'Roberto Niño', 'cargo': 'Scrum Master', 'departamento': 'Tecnología', 'salario': 5100000, 'asistencia': 96, 'activo': true, 'avatar': 'RN', 'color': '#9B59B6'}";

    try {
        var nuevoEmpleado = JSON.parse(jsonMalformado); // ← SyntaxError aquí
        empleados.push(nuevoEmpleado);
        renderizarEmpleados(empleados.filter(function (e) { return e !== null; }));
        renderizarDepartamentos();
        actualizarKPIs();
        agregarAlerta("Empleado importado: " + nuevoEmpleado.nombre, "ok");
    } catch (error) {
        // El catch captura el SyntaxError
        agregarAlerta("ERROR al importar JSON: " + error.message, "err");
        console.error("🐛 JSON malformado:", error);
    }
}


// ─────────────────────────────────────────────────────────────────────────────
//  🔍  FUNCIONES: filtrarDepartamento() / mostrarTodos()
//  Filtra la lista de empleados por departamento o muestra todos.
// ─────────────────────────────────────────────────────────────────────────────

function filtrarDepartamento(dept) {
    var validos = empleados.filter(function (e) { return e !== null; });
    var filtrados = validos.filter(function (e) { return e.departamento === dept; });
    renderizarEmpleados(filtrados);
    agregarAlerta("Mostrando " + filtrados.length + " empleados de " + dept, "ok");
}

function mostrarTodos() {
    var validos = empleados.filter(function (e) { return e !== null; });
    renderizarEmpleados(validos);
    agregarAlerta("Mostrando todos los empleados.", "ok");
}


// ─────────────────────────────────────────────────────────────────────────────
//  📊  FUNCIÓN: actualizarKPIs()
//  Lee el array de empleados y actualiza las tarjetas de métricas.
// ─────────────────────────────────────────────────────────────────────────────

function actualizarKPIs() {
    var validos = empleados.filter(function (e) { return e !== null; });
    var promAsis = Math.round(
        validos.reduce(function (acc, e) { return acc + e.asistencia; }, 0) / validos.length
    );

    document.getElementById("kpiEmpleados").textContent = validos.length;
    document.getElementById("kpiDepartamentos").textContent = departamentos.size;
    document.getElementById("kpiAsistencia").textContent = promAsis + "%";
    document.getElementById("lblTotalEmpleados").textContent = validos.length + " EMPLEADOS";

    // 🐛 LLAMADA AL ERROR 2:
    //    calcularSalarioPromedio() se declara con var (expresión de función)
    //    MÁS ABAJO en el código original, pero se llama AQUÍ durante la
    //    inicialización. Gracias al hoisting de var, la variable existe
    //    pero su valor es `undefined` → lanza TypeError.
    //
    //    Para ver el error: mueve esta función de regreso arriba de la
    //    declaración de calcularSalarioPromedio (línea ~150) y recarga la página.
    var promSal = calcularSalarioPromedio();
    document.getElementById("kpiSalarioPromedio").textContent = "$" + (promSal / 1000000).toFixed(1) + "M";
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚨  FUNCIÓN: agregarAlerta(texto, tipo)
//  Inserta una nueva alerta en el panel de alertas.
//  tipo: "ok" → verde | "warn" → amarillo | "err" → naranja
// ─────────────────────────────────────────────────────────────────────────────

function agregarAlerta(texto, tipo) {
    var box = document.getElementById("alertasBox");
    var div = document.createElement("div");
    div.className = "alerta-item alerta-" + (tipo || "ok");
    div.textContent = "[" + new Date().toLocaleTimeString() + "] " + texto;
    box.insertBefore(div, box.firstChild);
    if (box.children.length > 6) box.removeChild(box.lastChild);
}


// ─────────────────────────────────────────────────────────────────────────────
//  🚀  INICIALIZACIÓN
//  Secuencia de arranque del dashboard.
//  ⚠ El Error 2 (hoisting) puede manifestarse aquí si mueves la declaración
//    de calcularSalarioPromedio después de estas llamadas.
// ─────────────────────────────────────────────────────────────────────────────

// Primero filtramos los nulos para renderizar (mientras Error 1 no esté resuelto,
// el forEach en renderizarEmpleados fallará si no se agrega la verificación).
var validos = empleados.filter(function (e) { return e !== null; });

// Poblamos el Set de departamentos desde los datos válidos
validos.forEach(function (e) { departamentos.add(e.departamento); });

// Renderizamos las secciones
renderizarEmpleados(empleados);  // ← Error 1 se manifiesta aquí
renderizarDepartamentos();
actualizarKPIs();                 // ← Error 2 se puede manifestar aquí

agregarAlerta("Dashboard RRHH iniciado. " + validos.length + " empleados cargados.", "ok");