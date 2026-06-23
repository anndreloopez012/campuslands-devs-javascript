const EquipoRojo = 100;
const EquipoAzul = 90;

let promedio = (EquipoRojo + EquipoAzul)/2
let diferencia = EquipoRojo - EquipoAzul
let porcentaje = (EquipoAzul / EquipoRojo) * 100;

console.log(`Promedio: ${promedio}`);
console.log(`Diferencia: ${diferencia}`);
console.log(`El Equipo Azul representa el ${porcentaje}% del Equipo Rojo`);