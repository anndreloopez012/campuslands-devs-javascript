// Fecha
const fecha = new Date ();
//Extraer Fecha
const Fecha2 = {
    anio: fecha.getFullYear(),
    mes: fecha.getMonth() + 1,
    dia: fecha.getDate(),
    hora: fecha.getHours()
};

//Calculo altura
const alturaM = Math.round(Math.random() *(6000 - 3000) + 3000);
console.log(alturaM)

//Calculo tiempo caida
const tiempoCaidaSeg = Math.round(Math.random() * (60 - 45) + 45 );
console.log(tiempoCaidaSeg)

//Resultados de tiempo
console.log("Resultados")
console.log("Fecha de la caida: "+ Fecha2.anio + "/" + Fecha2.mes + "/" + Fecha2.dia)
console.log("Altura de la que se tiro", alturaM +"m");
console.log("Tiempo de la caida", tiempoCaidaSeg + "S");