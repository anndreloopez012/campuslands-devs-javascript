// Ejercicio 06: Objetos - viajes
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 06: Objetos");

// Escribe tu solucion aqui.

// Creación del objeto viaje con sus propiedades y métodos
const viajeDestino = {
  destino: "Taiwán",
  dias: 15,
  presupuestoTotal: 25000,

  // extra: presupuesto por dia
  calcularPresupuestoDiario: function() {
    return this.presupuestoTotal / this.dias;
  },

  mostrarResumen: function() {
    console.log("=== RESUMEN DEL VIAJE ===");
    console.log("Destino seleccionado:", this.destino);
    console.log("Duración de la estadía:", this.dias, "días");
    console.log("Presupuesto total asignado:", this.presupuestoTotal);

    const diario = this.calcularPresupuestoDiario();
    console.log("Presupuesto disponible por día:", diario.toFixed(2));
  }
};

// Ejecución del método del objeto
viajeDestino.mostrarResumen();