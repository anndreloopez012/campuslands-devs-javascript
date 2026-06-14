
// Paso 1: Crear el arreglo (arrays)

// Iniciamos con una lista base de comidas favoritas
const menuComidas = ["Pizza", "Hamburguesa", "Tacos"];

console.log("--- Menú Inicial ---");
console.log(menuComidas); 
console.log(`Total de platillos al inicio: ${menuComidas.length}`); // Uso de length
console.log("--------------------\n");



// Paso 2: Agregar elementos (push)

// Añadimos un par de opciones más al menú
menuComidas.push("Ramen");
menuComidas.push("Sushi");

console.log("--- Menú Actualizado ---");
console.log("Se agregaron nuevos platillos...");
console.log(`Nuevo total de platillos: ${menuComidas.length}`);
console.log("------------------------\n");



// Paso 3: Consultar posiciones (índices)

// Recordando que los índices de los arreglos empiezan en 0
const primerPlatillo = menuComidas[0];
const tercerPlatillo = menuComidas[2];
const ultimoPlatillo = menuComidas[menuComidas.length - 1]; // Truco dinámico usando length

console.log("--- Consulta de Posiciones ---");
console.log(`El primer platillo (Índice 0) es: ${primerPlatillo}`);
console.log(`El tercer platillo (Índice 2) es: ${tercerPlatillo}`);
console.log(`El último platillo de la lista es: ${ultimoPlatillo}`);
console.log("------------------------------\n");



// Paso 4: Recorrer el menú (forEach)

console.log("--- Mostrando la Carta del Menú ---");
menuComidas.forEach((platillo, indice) => {
    // Sumamos 1 al índice para que la vista al usuario sea más natural (1, 2, 3...)
    console.log(`${indice + 1}. ${platillo}`);
});
console.log("-----------------------------------\n");



// 🟪 Reto extra: Validación y dato extra

// Función para agregar comida con validación de duplicados y longitud
function agregarNuevoPlatillo(nuevoPlatillo) {
    // Validación 1: Que no sea un texto vacío o un espacio en blanco
    if (!nuevoPlatillo || nuevoPlatillo.trim() === "") {
        console.log("❌ Error: El nombre del platillo no puede estar vacío.");
        return;
    }

    // Validación 2: Evitar que se repita la comida (Ignorando mayúsculas/minúsculas)
    const existe = menuComidas.some(
        (comida) => comida.toLowerCase() === nuevoPlatillo.toLowerCase()
    );

    if (existe) {
        console.log(`⚠️ Alerta: "${nuevoPlatillo}" ya está en tu menú de favoritos.`);
    } else {
        menuComidas.push(nuevoPlatillo);
        console.log(`✅ ¡Éxito! Se ha agregado "${nuevoPlatillo}" a tus favoritos.`);
    }
}

console.log("--- Probando el Reto Extra ---");
// Intento 1: Agregar algo que ya existe
agregarNuevoPlatillo("pizza"); 

// Intento 2: Agregar algo completamente nuevo
agregarNuevoPlatillo("Ceviche");

// Mostrar el resultado final del menú
console.log("\n📋 Menú Final Completo:");
menuComidas.forEach((platillo, i) => console.log(` -> [${i}]: ${platillo}`));