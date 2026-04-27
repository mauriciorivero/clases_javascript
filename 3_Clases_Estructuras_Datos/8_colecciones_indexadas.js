const lista = ["A", "B", "🫁", "C", "D", "E", 230, false, {}];

console.log(lista[3]); 
console.log(lista[4+1]); 

// Iterar con forEach
lista.forEach((v, i) => {
    console.log(i, v);
});