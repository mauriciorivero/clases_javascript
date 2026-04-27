const mapa = new Map();
mapa.set("id", 1);
mapa.set("nombre", "Ana");
mapa.set("edad", 42);
mapa.set("Nacionalidad", "Colombiana")
console.log(mapa.get("id"));
console.log(mapa.get("Nacionalidad"));
console.log(mapa.get("nombre"));
// → 1
console.log(mapa.size); // 2