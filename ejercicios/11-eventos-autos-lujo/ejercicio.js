// Ejercicio 11: Eventos - autos de lujo
// Completa el codigo siguiendo las instrucciones del README.md.

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

var selectModelo     = document.getElementById("select-modelo");
var sliderVelocidad  = document.getElementById("slider-velocidad");
var pickerColor      = document.getElementById("picker-color");

var textoModelo      = document.getElementById("texto-modelo");
var textoVelocidad   = document.getElementById("texto-velocidad");
var valorVelocidad   = document.getElementById("valor-velocidad");
var badgeVel         = document.getElementById("badge-vel");
var textoColor       = document.getElementById("texto-color");
var muestraColor     = document.getElementById("muestra-color");


// 2. Función para actualizar el modelo
function actualizarModelo() {
  var modelo = selectModelo.value;
  textoModelo.textContent = modelo;
  console.log("Modelo seleccionado:", modelo);
}

// 3. Función para actualizar la velocidad
function actualizarVelocidad() {
  var velocidad = sliderVelocidad.value;

  // Actualizamos el número junto al label y en el resultado
  valorVelocidad.textContent = velocidad;
  textoVelocidad.textContent = velocidad + " km/h";

  // 🟪 Reto extra: badge según rango de velocidad
  if (velocidad < 200) {
    badgeVel.textContent = "Normal";
    badgeVel.style.background = "#4caf50";
  } else if (velocidad < 300) {
    badgeVel.textContent = "Rápido";
    badgeVel.style.background = "#ff9800";
  } else {
    badgeVel.textContent = "Extremo 🔥";
    badgeVel.style.background = "#e53935";
  }

  console.log("Velocidad:", velocidad, "km/h");
}

// 4. Función para actualizar el color
function actualizarColor() {
  var color = pickerColor.value;

  textoColor.textContent = color;
  muestraColor.style.background = color;

  console.log("Color elegido:", color);
}


// 5. Escuchamos los eventos
selectModelo.addEventListener("change", actualizarModelo);   // click / change en select
sliderVelocidad.addEventListener("input", actualizarVelocidad); // se mueve el slider
pickerColor.addEventListener("input", actualizarColor);         // cambia el color