function permitirAcceso(edad, nacionalidad){
    let pais = nacionalidad.toLowerCase();

    if((edad >= 18)&&(nacionalidad === "colombia")){
        return true;
    } else 
    if((edad >= 17)&&(pais === "usa" || pais === "estados unidos" || pais === "united states")){
        return true;
    } else
    if((edad >= 19)&&(nacionalidad === "suecia")){
        return true;
    }

    return false;

}

console.log(permitirAcceso(18, "ESTADOS UNIDOS"));