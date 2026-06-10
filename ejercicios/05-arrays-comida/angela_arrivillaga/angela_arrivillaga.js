
// Ejercicio 05: Menu de comidas favotiras
// arreglo
let menuComidas = ["Pizza", "Ravioles de mozzarella", "Lasagña"];

// Agregar elementos
menuComidas.push("Sushi");

// Consultar cantidad y elemento especifico
console.log(`Total de platos en el menú: ${menuComidas.length}`);
console.log(`El segundo plato es: ${menuComidas[1]}`);

// Recorrer el menu (forEach)
console.log("--- Menú Completo ---");
menuComidas.forEach((plato, index) => {
    console.log(`${index + 1}. ${plato}`);
});

// Reto extra
let platoBuscado = "Pizza";
if (menuComidas.includes(platoBuscado)) {
    console.log(`¡Sí! Tenemos ${platoBuscado} disponible.`);
} else {
    console.log(`Lo sentimos, no tenemos ${platoBuscado}.`);
}