//Este es el flujo normal
const date = new Date();
try {
    let mes = date.toLocaleDateString('en-EN', { month: 'long' });
    console.log(mes)
}catch (e) {
    mes = "desconocido";
}

