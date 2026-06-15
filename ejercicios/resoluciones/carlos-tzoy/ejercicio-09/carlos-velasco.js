const sumarPunto = (marcador) => marcador + 1;
const obtenerGanador = (puntosA, puntosB) => {
    if (puntosA >= 11 && puntosA - puntosB >= 2) {
        return "Jugador A";
    } else if (puntosB >= 11 && puntosB - puntosA >= 2) {
        return "Jugador B";
    }
    return null;
};
const generarMensaje = (nombreGanador) => `El ganador del partido es: ${nombreGanador}`;
let a = sumarPunto(4);
let b = sumarPunto(7);
const resultadoGanador = obtenerGanador(a, b);
if (resultadoGanador) {
    console.log(generarMensaje(resultadoGanador));
} else {
    console.log("El partido aún no tiene ganador");
}