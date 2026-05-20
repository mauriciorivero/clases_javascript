// HTML DOM: extensión del DOM con características específicas para HTML
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("cambiar");

boton.addEventListener("click", () => {
    document.body.style.backgroundColor = "lightblue";
    mensaje.textContent = "El HTML DOM permite cambiar estilos y contenido en tiempo real.";
});
