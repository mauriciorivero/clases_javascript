// Selector de color hexadecimal aleatorio
const codigo = document.getElementById("codigo");
const boton = document.getElementById("generar");

function colorAleatorio() {
    const letras = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

boton.addEventListener("click", () => {
    const nuevo = colorAleatorio();
    document.body.style.backgroundColor = nuevo;
    codigo.textContent = nuevo;
});
