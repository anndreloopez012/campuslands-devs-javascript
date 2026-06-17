const viaje = {
  destino: "Zuisa",
  dias: 3,
  presupuesto: "Q1500",
  
  mostrarDetalles: function() {
  console.log("Viajaré a " + this.destino + " por " + this.dias + " días.");
    }
}

//propiedas
console.log(viaje.destino)
console.log(viaje.dias)
console.log(viaje.presupuesto)

//metodos
//ver las llaves del objeto
console.log(Object.keys(viaje))

//Ver los valores
console.log(Object.values(viaje))

//Devuelve el arreglo con llave y valor por objetos separados
console.log(Object.entries(viaje))

//Congelar el objecto
console.log(Object.freeze(viaje))

//uso del this 
viaje.mostrarDetalles()
