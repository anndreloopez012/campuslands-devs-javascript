// Ejercicio 05: Arrays - comida
console.log("Ejercicio 05: Arrays");

//  ARREGLO 
const menu = ["Tacos", "Pizza", "Pepián"];
// push agrega elementos al final de una lista
menu.push("Hamburguesa"); 

console.log(`\n--- INFORMACIÓN DEL MENÚ ---`);
console.log(`Total de platillos disponibles: ${menu.length}`); // .length nos da el tamaño
console.log(`El primer platillo del menú es: ${menu[0]}`);    
console.log(`El último platillo agregado es: ${menu[3]}`);   

// forEach recorre el arreglo
console.log(`\n --- MENÚ COMPLETO ---`);
menu.forEach((comida, i) => console.log(`${i + 1}. ${comida}`));

// Revisamos si un platillo existe en nuestro menú usando .includes() que devuelve true/false
console.log(`\n--- ESPECIALES---`);
const buscarPlatillo = "Pepián";
const existePlatillo = menu.includes(buscarPlatillo);

console.log(`¿Tenemos el platillo "${buscarPlatillo}" en el menú?: ${existePlatillo}`);
