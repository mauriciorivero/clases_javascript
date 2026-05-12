let nombre="Mauricio";
let apellido="Rivero";

//esto seria un procedimiento (ejecucion de varias instrucciones)
function mostrarNombre(){
    console.log("El nombre es: "+nombre);
    console.log("El apellido es: "+apellido);
}

mostrarNombre();

//esta es una function, retorna un resultado
function sumarNumeros(num1, num2){
    return num1+num2;
}

console.log(sumarNumeros(4,8));
