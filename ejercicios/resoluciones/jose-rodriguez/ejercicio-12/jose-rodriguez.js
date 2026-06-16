
// Paso 1: Configuración de la Fecha del Salto (Date)

// Capturamos el instante preciso en el que se ejecuta el programa (simulando el momento del salto)
const fechaSalto = new Date();

// Opciones de formato personalizado para mostrar la fecha de manera legible
const opcionesFecha = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
};
const fechaFormateada = fechaSalto.toLocaleDateString("es-GT", opcionesFecha);



// Paso 2: Generación de Datos Aleatorios (Math.random, Math.round)

// 1. Altura del salto en pies (Rango aleatorio común: entre 10,000 y 14,000 pies)
const alturaMinima = 10000;
const alturaMaxima = 14000;
const alturaAleatoria = Math.random() * (alturaMaxima - alturaMinima) + alturaMinima;
const alturaFinal = Math.round(alturaAleatoria); // Redondeamos al entero más cercano

// 2. Tiempo estimado de caída libre en segundos antes de abrir el paracaídas
// Regla física aproximada: ~5.5 segundos por cada 1,000 pies de caída libre.
// Simulamos una variación aleatoria en la apertura (entre 45 y 60 segundos)
const tiempoCaidaLibre = Math.round(Math.random() * (60 - 45) + 45);



// Paso 3: Mostrar bitácora de vuelo (Interpolación)

console.log("=================================================");
console.log("REGISTRO DE BITÁCORA - SALTO EN PARACAÍDAS ");
console.log("=================================================");

// Usamos plantillas literales (backticks ``) para interpolar las variables de forma limpia
console.log(`Fecha del evento : ${fechaFormateada}`);
console.log(`Altura de salida : ${alturaFinal.toLocaleString()} pies`);
console.log(`Caída libre      : ${tiempoCaidaLibre} segundos de pura adrenalina`);



// 🟪 Reto extra: Validación de seguridad física

/**
 * Calcula la velocidad terminal estimada alcanzada y valida si la altura del salto 
 * requiere oxígeno suplementario a bordo de la aeronave antes del despegue.
 * @param {number} alturaPies - Altura final del salto calculada.
 */
function evaluarSeguridadSalto(alturaPies) {
    console.log("\n--- EVALUACIÓN DE SEGURIDAD INTERNA ---");

    // Dato extra 1: Velocidad terminal promedio de un paracaidista en posición "boca abajo" (estable)
    // Es de aproximadamente 200 km/h. Añadimos una pequeña variación atmosférica matemática.
    const factorVariacion = Math.random() * (210 - 190) + 190;
    const velocidadTerminalEstimada = Math.round(factorVariacion);
    console.log(`Velocidad terminal estimada: ${velocidadTerminalEstimada} km/h`);

    // Validación de seguridad obligatoria:
    // Según regulaciones de aviación, saltos por encima de los 13,000 pies requieren oxígeno para la tripulación y paracaidistas.
    const LIMITE_OXIGENO = 13000;

    if (alturaPies > LIMITE_OXIGENO) {
        console.log(`ALERTA DE ALTURA CRÍTICA: ${alturaPies.toLocaleString()} pies supera el límite de seguridad.`);
        console.log("REQUISITO OBLIGATORIO: Todo el equipo debe utilizar mascarillas de oxígeno suplementario en el avión.");
    } else {
        console.log(`Altura de seguridad autorizada (${alturaPies.toLocaleString()} pies).`);
        console.log("No se requiere equipamiento de oxígeno suplementario para este vuelo.");
    }
}

// Ejecutamos la validación del reto extra pasando nuestra altura aleatoria redondeada
evaluarSeguridadSalto(alturaFinal);
console.log("=================================================");