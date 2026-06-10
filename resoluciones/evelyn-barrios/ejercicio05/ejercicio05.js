// Ejercicio 05: Arrays - comida
// Completa el codigo siguiendo las instrucciones del README.md.


console.log("Ejercicio 05: Arrays");


// Escribe tu solucion aqui.


//solucion Evelyn
const misComidas = ["Pizza", "papas doradas", "Tacos"];
misComidas.push("Hamburguesa");


console.log("Mi comida favorita es: " + misComidas[0]);
console.log("Tengo " + misComidas.length + " platos en mi lista");


console.log("--- Menu Completo ---");
misComidas.forEach(function(comida) {
   console.log("Plato: " + comida);
});


if (misComidas.length > 3) {
   console.log("Tienes un menu muy variado hoy.");
}
