//Este es el flujo normal
const date = new Date();
try {
    let mes = date.toLocaleDateString('es-ES', { month: 'long' });
    console.log(mes)
}catch (e) {
    mes = "desconocido";
}

