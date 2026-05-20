// Proyecto base: layout con contenedor de 600px
const citas = [
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Programs must be written for people to read." — Harold Abelson',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"First, solve the problem. Then, write the code." — John Johnson'
];

const area = document.getElementById("area");
const boton = document.getElementById("generar");

boton.addEventListener("click", () => {
    const random = Math.floor(Math.random() * citas.length);
    area.value = citas[random];
});
