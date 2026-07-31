// 18. Drop de ropa streetwear - Resolucion Maria Montepeque

function validarProducto(producto) {
  return (
    producto &&
    typeof producto.nombre === 'string' &&
    producto.tallas &&
    typeof producto.tallas === 'object' &&
    Object.values(producto.tallas).every((stock) => typeof stock === 'number' && stock >= 0)
  );
}

function validarCompra(producto, talla, cantidad) {
  if (!producto) return { valido: false, motivo: 'Producto no existe' };
  if (!(talla in producto.tallas)) return { valido: false, motivo: `Talla ${talla} no disponible` };
  if (producto.tallas[talla] < cantidad) return { valido: false, motivo: `Stock insuficiente en talla ${talla}` };
  return { valido: true };
}

function comprarProducto(productos, nombreProducto, talla, cantidad) {
  const producto = productos.find((actual) => actual.nombre === nombreProducto);
  const validacion = validarCompra(producto, talla, cantidad);

  if (!validacion.valido) {
    return { exito: false, mensaje: validacion.motivo };
  }

  return {
    exito: true,
    productos: productos.map((actual) =>
      actual.nombre === nombreProducto
        ? { ...actual, tallas: { ...actual.tallas, [talla]: actual.tallas[talla] - cantidad } }
        : actual
    )
  };
}

function estaAgotado(producto) {
  return Object.values(producto.tallas).every((stock) => stock === 0);
}

function listarAgotados(productos) {
  return productos.filter(estaAgotado).map((producto) => producto.nombre);
}

function gestionarDrop(productos) {
  const validos = productos.filter(validarProducto);

  return {
    productos: validos.map((producto) => ({ nombre: producto.nombre, tallas: producto.tallas })),
    agotados: listarAgotados(validos),
    productosInvalidos: productos.length - validos.length
  };
}

const productos = [
  { nombre: 'Hoodie Oversize', color: 'negro', tallas: { S: 2, M: 0, L: 3 } },
  { nombre: 'Cargo Pants', color: 'verde', tallas: { S: 0, M: 0, L: 0 } }
];

console.log('Caso 1: estado inicial del drop');
console.log(JSON.stringify(gestionarDrop(productos), null, 2));

console.log('\nCaso 2: comprar 2 unidades de Hoodie Oversize talla S');
const compra = comprarProducto(productos, 'Hoodie Oversize', 'S', 2);
console.log(JSON.stringify(compra, null, 2));
if (compra.exito) {
  console.log(JSON.stringify(gestionarDrop(compra.productos), null, 2));
}

console.log('\nCaso 3: intentar comprar una talla sin stock suficiente');
console.log(comprarProducto(productos, 'Hoodie Oversize', 'M', 1));
