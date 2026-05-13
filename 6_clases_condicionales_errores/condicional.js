function mayorDeEdad(edad, nacionalidad){
    let nacion = nacionalidad.toLowerCase();
    if((edad>=18)&&(nacionalidad==="Colombia")){
        return "es mayor de edad en colombia";
    }else if((nacionalidad==="usa")||(nacionalidad==="us")||(nacionalidad==="united states")||(nacionalidad==="estados unidos")){
        if(edad>=17){
            return "es mayor de edad en USA";
        }else{
            return " no es mayor de edad en USA";
        }
        
        
    }else if((edad>=19)&&(nacionalidad===("Suecia"))){
        return "es mayor de edad en suecia";
    }else{
        return "No se puede determinar edad o nacionalidad"
    }
    return false;
}

let respuesta = mayorDeEdad(15, "Estados Unidos");
console.log(respuesta);