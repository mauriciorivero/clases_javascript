// --- CÓDIGO CON ERRORES PARA RESOLVER ---

//
function mostrarStatus() {
    console.log("Revisando: " + tanqueID); 
    const tanqueID = "T-400";
}

//
let nivelOxigeno = 100;
let nivelOxigeno = 85; 

//
function iniciarProceso() {
    if (true) {
        let mensajeInterno = "OXÍGENO OK";
    }
    // 
    document.getElementById('log-display').innerText = mensajeInterno;
}

//
function sistemaDeControl() {
    let revisiones = 0;
    // Un closure debe retornar la función para mantener el vínculo permanente con su scope [9, 10].
    function incrementar() {
        revisiones = revisiones + 1;
        return "Revisiones totales: " + revisiones;
    }
}

// --- INTERACCIÓN ---
const control = sistemaDeControl();

document.getElementById('btn-iniciar').onclick = function() {
    iniciarProceso();
};

document.getElementById('btn-tanque').onclick = function() {
    // 
    document.getElementById('log-display').innerText = control();
};