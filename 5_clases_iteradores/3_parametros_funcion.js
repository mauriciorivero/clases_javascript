function mostrarNombre(nombre){
    return "El nombre es: "+nombre;
}

console.log(mostrarNombre("Mauro"));

function multiplicar(numero){

    for(let i=1; i<=10; i++){
        console.log(numero+" X "+i+" = "+(numero*i));
    }

}

multiplicar(5);

function multiplicarQuemado(numero, a=5){
    return numero*a;
}