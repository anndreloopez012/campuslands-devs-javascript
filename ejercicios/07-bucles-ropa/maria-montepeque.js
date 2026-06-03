// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 07: Bucles for/while");

// Escribe tu solucion aqui.

const prendas = ["camisa", "pantalon", "chaqueta", "bufanda"];

console.log("Inventario:");
for (let i = 0; i < prendas.length; i++) {
    console.log(`${i + 1}. ${prendas[i]}`);
}

let stock = 5;
let vendidas = 0;
while (stock > 0) {
    stock--;
    vendidas++;
    console.log(`Venta ${vendidas}, quedan ${stock} camisas`);
}

console.log(`Total vendido: ${vendidas} | Stock final: ${stock}`);
console.log(stock === 0 ? "Agotado, hay que reabastecer." : "Todavia hay stock.");