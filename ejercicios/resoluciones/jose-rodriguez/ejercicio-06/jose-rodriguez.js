
// Paso 1: Crear el Objeto y Propiedades

// Definimos el objeto 'viaje' con sus datos básicos (propiedades)
const viaje = {
    destino: "Monterrico, Guatemala",
    dias: 3,
    presupuesto: 2500, // Presupuesto estimado en moneda local
    transporte: "Auto propio",

    
    // Paso 2: Crear el Método y uso de 'this'
    
    // Un método es una función que vive dentro de un objeto.
    // Usamos 'this' para acceder a las propiedades del mismo objeto.
    obtenerResumen: function() {
        return `Resumen del Viaje:\n• Destino: ${this.destino}\n• Duración: ${this.dias} días\n• Presupuesto: Q${this.presupuesto}\n• Transporte: ${this.transporte}`;
    },

    
    // 🟪 Reto extra: Validación y dato extra
    
    // Método extra para calcular el presupuesto diario con una validación
    calcularPresupuestoDiario: function() {
        // Validación: Evitar división por cero o números negativos si los días están mal configurados
        if (this.dias <= 0) {
            return "Error: Los días de viaje deben ser mayores a 0 para calcular el gasto diario.";
        }
        
        // Operación matemática simple
        const gastoDiario = this.presupuesto / this.dias;
        
        // .toFixed(2) para que solo muestre dos decimales
        return `💰 Gasto estimado por día: Q${gastoDiario.toFixed(2)}`;
    },

    // Método extra para actualizar el presupuesto con validación de seguridad
    ajustarPresupuesto: function(nuevoMonto) {
        if (typeof nuevoMonto !== 'number' || nuevoMonto < 0) {
            console.log("Ajuste denegado: El presupuesto debe ser un número positivo.");
            return;
        }
        
        console.log(`🔄 Presupuesto actualizado de Q${this.presupuesto} a Q${nuevoMonto}`);
        this.presupuesto = nuevoMonto;
    }
};


// Paso 3: Ejecución y Pruebas en Consola


console.log("--- 1. Consultando Propiedades Directas ---");
// Podemos acceder a las propiedades usando la notación de punto (.)
console.log(`Destino seleccionado: ${viaje.destino}`);
console.log(`Presupuesto inicial: Q${viaje.presupuesto}`);
console.log("------------------------------------------\n");

console.log("--- 2. Ejecutando el Método Resumen ---");
// Llamamos al método usando paréntesis () al final
console.log(viaje.obtenerResumen());
console.log("---------------------------------------\n");

console.log("--- 3. Ejecutando el Reto Extra (Cálculos y Validación) ---");
// Probamos el cálculo del presupuesto diario
console.log(viaje.calcularPresupuestoDiario());

console.log("\n--- 4. Modificando los datos del Objeto ---");
// Intentamos un ajuste de presupuesto inválido
viaje.ajustarPresupuesto("mil quinientos"); // Esto disparará la validación

// Ajustamos el presupuesto correctamente
viaje.ajustarPresupuesto(3000);

// Cambiamos los días para ver cómo afecta al reto extra
viaje.dias = 4; 

console.log("\n--- 5. Resultado Final tras los cambios ---");
console.log(viaje.obtenerResumen());
console.log(viaje.calcularPresupuestoDiario());
console.log("-------------------------------------------");