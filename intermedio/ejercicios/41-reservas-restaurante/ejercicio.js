// 41. Reservas de restaurante
// Nivel: Intermedio
// Tematica: comida
//
// Instrucciones:
// 1. Lee el README.md de este ejercicio.
// 2. No modifiques este archivo base si estas entregando como estudiante.
// 3. Copia la idea de solucion a tu carpeta personal en resoluciones/nombre-apellido/.
// 4. Implementa funciones pequenas y prueba con varios casos.

const contexto = {
  "ejercicio": 41,
  "titulo": "Reservas de restaurante",
  "tematica": "comida",
  "enfoque": "agenda y capacidad"
};

const datosBase = [
  { id: 1, nombre: 'Alpha', valor: 120, categoria: 'pro', activo: true },
  { id: 2, nombre: 'Bravo', valor: 85, categoria: 'standard', activo: true },
  { id: 3, nombre: 'Charlie', valor: 60, categoria: 'rookie', activo: false }
];

function resolverEjercicio(datos = datosBase) {
  // TODO: implementa la solucion siguiendo el README.md.
  // Recomendacion: separa validaciones, calculos y salida en funciones pequenas.
  return {
    contexto,
    totalRegistros: datos.length,
    mensaje: 'Implementa tu solucion en la carpeta resoluciones/nombre-apellido/'
  };
}

console.log(resolverEjercicio());
