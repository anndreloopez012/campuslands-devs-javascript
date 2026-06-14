
// Paso 1: Datos iniciales (Inventario de Ropa)

const inventarioPrendas = ["Camisa", "Pantalón Denim", "Chaqueta", "Sudadera"];
let stockDisponible = 5; // Cantidad total de prendas físicas en tienda
let ventasRealizadas = 0; // Contador de ventas

console.log("--- BIENVENIDO A LA TIENDA DE ROPA ---");
console.log(`Stock inicial en tienda: ${stockDisponible} unidades.\n`);



// Paso 2: Usar bucle 'for' para listar prendas

// El bucle 'for' es ideal porque conocemos el tamaño exacto del arreglo
console.log("--- Catálogo de Prendas Disponibles ---");
for (let i = 0; i < inventarioPrendas.length; i++) {
    console.log(`ID [${i + 1}]: ${inventarioPrendas[i]}`);
}
console.log("-----------------------------------------\n");



// Paso 3: Usar bucle 'while' para simular ventas

// El bucle 'while' corre mientras tengamos stock en la tienda (condición)
console.log("--- Simulador de Ventas de la Tarde ---");
while (stockDisponible > 0) {
    ventasRealizadas++; // Incrementamos el contador de ventas
    stockDisponible--;  // Reducimos el stock disponible
    
    console.log(`Venta #${ventasRealizadas} realizada con éxito.`);
    console.log(`Quedan ${stockDisponible} prendas en bodega.`);
    
    // Simulación intermedia para dar realismo al flujo
    if (stockDisponible === 2) {
        console.log("¡Alerta! El inventario está llegando a su límite crítico.");
    }
}

console.log("\n🛑 Simulación terminada: Nos hemos quedado sin stock.");
console.log(`📊 Balance final: Se realizaron ${ventasRealizadas} ventas totales.\n`);



// 🟪 Reto extra: Validación y dato extra de ropa

// Creamos un objeto de prenda con talla para validar si es apta para despacho
const nuevaPrendaParaDespacho = {
    tipo: "Chaqueta de Cuero",
    talla: "XL",
    tallasPermitidas: ["S", "M", "L"] // La tienda no maneja XL en este modelo
};

function validarDespachoRopa(prenda) {
    console.log(`--- Validando Envío: ${prenda.tipo} ---`);
    
    // Validación: Verificar si la talla de la prenda está incluida en las tallas permitidas
    let tallaValida = false;
    for (let i = 0; i < prenda.tallasPermitidas.length; i++) {
        if (prenda.talla === prenda.tallasPermitidas[i]) {
            tallaValida = true;
            break; // Si la encuentra, rompe el ciclo porque ya sabemos que es válida
        }
    }

    // Condición final basada en la revisión del bucle
    if (tallaValida) {
        console.log(`Despacho aprobado. La talla [${prenda.talla}] está disponible.`);
    } else {
        console.log(`Despacho rechazado: La talla [${prenda.talla}] está agotada o no se fabrica para este modelo.`);
        console.log(`Tallas disponibles para este diseño: ${prenda.tallasPermitidas.join(", ")}`);
    }
}

// Ejecutamos la validación del reto extra
validarDespachoRopa(nuevaPrendaParaDespacho);