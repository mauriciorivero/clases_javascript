// Manejo de eventos: 6 ejemplos integrados
const titulo  = document.getElementById("titulo");
const lista   = document.getElementById("lista");
const info    = document.getElementById("info-evento");
const campo   = document.getElementById("campo");
const botones = document.querySelectorAll(".btn");

let contador = 0;

// 1, 2 y 3: cambiar texto, agregar y remover hijos
botones.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        // 4: detener propagación para que el listener de window no registre el clic
        event.stopPropagation();

        const accion = btn.dataset.accion;

        if (accion === "texto") {
            titulo.textContent = "¡Texto actualizado!";
        }

        if (accion === "agregar") {
            contador++;
            const li = document.createElement("li");
            li.textContent = `Elemento #${contador}`;
            lista.appendChild(li);
        }

        if (accion === "remover") {
            const ultimo = lista.lastElementChild;
            if (ultimo) lista.removeChild(ultimo);
        }

        // 5: leer propiedades del evento
        info.textContent = `Evento: ${event.type} en (${event.clientX}, ${event.clientY})`;
    });
});

// 6: eventos de teclado
campo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && campo.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = campo.value;
        lista.appendChild(li);
        campo.value = "";
    }
});

window.addEventListener("click", () => {
    console.log("Clic global en window (sin botón)");
});
