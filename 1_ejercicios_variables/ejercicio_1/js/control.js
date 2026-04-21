// --- CÓDIGO CON ERRORES PARA RESOLVER ---

// ERROR 1: Hoisting y TDZ (Temporal Dead Zone)
// Se intenta usar la variable antes de su declaración con 'let' [1].
console.log("Iniciando sistema versión: " + version); 
let version = "1.0.4";

// ERROR 2: Const y Reasignación
// Una constante no puede cambiar su referencia tras ser inicializada [2, 3].
const SISTEMA_ID = "AX-88";
SISTEMA_ID = "HACKED-00"; 

// ERROR 3: Scope de Bloque
// 'let' solo es visible dentro de las llaves donde se declara [4, 5].
if (true) {
    let claveSecreta = "998877";
}
document.getElementById('status-display').innerText = "Cargando: " + claveSecreta;

// ERROR 4: Diferencia Var vs Let en Scope
// Al usar 'var', la variable se escapa del bloque y puede causar colisiones [6].
// Intentar redelcarar 'let' en el mismo ámbito dará error [7, 8].
let usuario = "Admin";
let usuario = "Guest"; 

// ERROR 5: Closure (Clausura)
// El objetivo es que cada vez que se presione "LOG", el contador suba.
// Pero la variable 'conteo' debe persistir en memoria gracias al closure [9, 10].
function crearRegistrador() {
    
    return function() {
        let conteo = 0;
        conteo++;
        return "Entradas: " + conteo;
    };
}
const registrar = crearRegistrador();
console.log(registrar());
console.log(registrar());
console.log(registrar());
console.log(registrar());

// Este botón debería usar la clausura correctamente
const registrar = crearRegistrador();
document.getElementById('btn-registro').onclick = function() {
    alert(registrar());
};

document.getElementById('btn-activar').onclick = function() {
    document.getElementById('status-display').innerText = "SISTEMA ONLINE";
};