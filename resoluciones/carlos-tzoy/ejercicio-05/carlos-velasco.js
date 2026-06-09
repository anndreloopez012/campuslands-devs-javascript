
const menu = [
    "Hamburguesa Clásica",
    "Ensalada César",
    "Taco al Pastor",
    "Limonada Natural",
    "Pizza Margarita",
    "Sopa de Tomate"
  ];
  
  console.log("Menú inicial:", menu);
  menu.push("Sopa de brócoli");
  console.log("Menú actualizado tras el push:", menu);
  console.log("Cantidad de elementos en el menú:", menu.length);
  console.log("Plato en el índice 2 (Taco al Pastor):", menu[2]);
  console.log("Listado completo del menú:");
  menu.forEach((platillo, index) => {
    console.log(`${index + 1}. ${platillo}`);
  });