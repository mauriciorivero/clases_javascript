// getElementById: selecciona un único elemento por su atributo id
const contenedor = document.getElementById("contenedor-info");
const boton = document.getElementById("actualizar");

boton.addEventListener("click", () => {
    contenedor.innerHTML = `
        <h2>¡Contenedor actualizado!</h2>
        <p>El método getElementById nos devolvió el elemento exacto por su id único.</p>
    `;
    contenedor.style.borderColor = "#16a34a";
});
