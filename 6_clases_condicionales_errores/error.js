const err = new Error("Algo salió mal");
console.log(err.name); // 'Error'
console.log(err.message); // 'Algo salió mal'
if (err instanceof TypeError) { 
        
}