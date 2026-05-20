function determinarPrecio(fruta){
    let precio = 0;

    switch (fruta) {
    case "naranja":
        precio = 0.59; 
        return precio;
    break;
    case "mango":
        precio = 1.32; 
        return precio;
    break;
    case "mandarina":
        precio=0.8;
        return precio;
    break;
    default: precio = 0.5;
    return precio;
    }
}

console.log(determinarPrecio("naranja"));