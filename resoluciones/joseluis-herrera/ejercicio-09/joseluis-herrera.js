let equipoA = 5
let equipoB = 10 

function ganador (ganador1, ganador2){
  if(ganador1 > ganador2){
    return console.log("EL ganador es el equipo A");
  }else if (ganador2 > ganador1){
    return console.log("El ganador es el equipo B");
  }else{
    console.log("Ninguno de los 2 equipos gano es un empate")
  }
} 

ganador(equipoA, equipoB)