let marca = "Honda";
let modelo = "CB500F";
let año = 2020;
let Electrica = false;
let dueño  = null;
let seguro = undefined;
let colores = ["rojo","negra","azul","blanca"]

console.log(typeof marca, typeof modelo, typeof año, typeof Electrica, typeof dueño, typeof seguro);
console.log(Array.isArray(colores));
if (dueño === null) {
  console.log("El valor es null");
}