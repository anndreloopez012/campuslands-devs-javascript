// Ejercicio 11: Eventos - autos de lujo

console.log("Ejercicio 11: Eventos");

// Escribe tu solucion aqui.

const descripcion = document.querySelector("#descripcion");
const boton = document.querySelector("#accion");
const panel = document.querySelector(".panel");
document.querySelector("#titulo").textContent = "Ficha de auto de lujo";

const modelo = document.createElement("select");
["Ferrari", "Lamborghini", "Bugatti"].forEach((m) =>
  modelo.add(new Option(m, m)),
);
const velocidad = Object.assign(document.createElement("input"), {
  type: "range",
  min: 0,
  max: 350,
  value: 120,
});
const color = Object.assign(document.createElement("input"), {
  type: "color",
  value: "#1463ff",
});
panel.append(modelo, velocidad, color);

const actualizar = () => {
  const v = Number(velocidad.value);
  descripcion.textContent = `${modelo.value} | ${v} km/h${v > 300 ? " (velocidad extrema!)" : ""}`;
  descripcion.style.color = color.value;
};

[modelo, velocidad, color].forEach((el) =>
  el.addEventListener("input", actualizar),
);
boton.addEventListener("click", actualizar);
actualizar();
