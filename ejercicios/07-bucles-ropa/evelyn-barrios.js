// Ejercicio 07: Bucles for/while - ropa
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 07: Bucles for/while");


// Escribe tu solucion aqui.


//solucion Evelyn
const ropa = ["Camisa", "Jeans", "Sueter", "Zapatos"];
const precios = [125, 250, 175, 400];


for (let i = 0; i < ropa.length; i++) {
   console.log("Prenda disponible: " + ropa[i] + " - Precio: Q" + precios[i]);
}


let inventario = 5;
while (inventario > 0) {
   console.log("Venta procesada. Articulos en bodega: " + inventario);
   inventario = inventario - 1;
}


if (inventario == 0) {
   console.log("Reto Extra: Inventario agotado, es necesario reabastecer la tienda.");
}
