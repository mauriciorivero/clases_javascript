let wm = new WeakMap();
let usuario = { name: 'Juan' };
let usuario2 = {name: "Maria"}

wm.set(usuario, "Hombre");
wm.set(usuario2, "Mujer");

console.log(wm.get(usuario2)); // "privado"