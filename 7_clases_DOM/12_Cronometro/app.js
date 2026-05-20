// Cronómetro usando setInterval para actualizar el DOM
const display = document.getElementById("tiempo");
const btnIniciar   = document.getElementById("iniciar");
const btnPausar    = document.getElementById("pausar");
const btnReiniciar = document.getElementById("reiniciar");

let segundos = 0;
let intervalo = null;

function formatear(num) {
    return String(num).padStart(2, "0");
}

function pintar() {
    const h = Math.floor(segundos / 3600);
    const m = Math.floor((segundos % 3600) / 60);
    const s = segundos % 60;
    display.textContent = `${formatear(h)}:${formatear(m)}:${formatear(s)}`;
}

btnIniciar.addEventListener("click", () => {
    if (intervalo) return;
    intervalo = setInterval(() => {
        segundos++;
        pintar();
    }, 1000);
});

btnPausar.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = null;
});

btnReiniciar.addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = null;
    segundos = 0;
    pintar();
});
