// querySelectorAll: devuelve una NodeList con todos los elementos coincidentes
const items = document.querySelectorAll(".item-lista");
const boton = document.getElementById("resaltar-todos");

boton.addEventListener("click", () => {
    items.forEach((item, idx) => {
        item.style.background = "#bbf7d0";
        item.textContent = `${idx + 1}. ${item.textContent}`;
    });
});
