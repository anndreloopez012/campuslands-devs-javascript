let fecha = new Date
const altura = Math.round(Math.random() * (4000 - 1000) + 1000);
  const tiempoCaida = Math.round(Math.random() * (60 - 20) + 20); 
  console.log(`--- Reporte de Salto ---`);
  console.log(`Fecha y hora: ${fecha.toLocaleString()}`);
  console.log(`Altura del salto: ${altura} metros`);
  console.log(`Tiempo de caída libre: ${tiempoCaida} segundos`);