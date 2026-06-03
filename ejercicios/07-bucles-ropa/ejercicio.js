// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 07: Bucles for/while");

// Escribe tu solucion aqui.

console.log("========== Bucles for/while - ropa ==========");

console.log("\nUsando un bucle for:");
const ropa = ["camisa", "pantalon", "zapatos", "sombrero", "calcetines"];

for(let i = 0; i < ropa.length; i++) {
    console.log(ropa[i]);
}

console.log("\nUsando un bucle while:");

while(ropa.length > 0) {
    const prenda = ropa.pop();
    console.log(prenda);
}