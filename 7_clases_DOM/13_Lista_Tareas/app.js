// Lista de tareas con classList.toggle y remove()
const form  = document.getElementById("formulario");
const input = document.getElementById("nueva");
const lista = document.getElementById("lista");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;

    const li = document.createElement("li");
    li.textContent = texto;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.className = "eliminar";
    li.appendChild(btn);

    li.addEventListener("click", () => li.classList.toggle("completada"));
    btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        li.remove();
    });

    lista.appendChild(li);
    input.value = "";
});
