function sumar(num1, num2){
    return num1+num2;
}

function concatenar(sep) {
    let result = "";
    for (let i = 1; i < arguments.length; i++)
    {
        result += arguments[i] + sep;
    }
    return result;
}

let resultado = concatenar(5, 4, 8, 1, 10);
console.log(resultado)