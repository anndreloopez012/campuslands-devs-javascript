// 17. Pedidos de food truck - Resolucion Maria Montepeque

function validarItemPedido(item) {
  return (
    item &&
    typeof item.nombre === 'string' &&
    typeof item.precio === 'number' &&
    item.precio > 0 &&
    typeof item.cantidad === 'number' &&
    item.cantidad > 0
  );
}

function calcularSubtotalItem(item) {
  const precioToppings = (item.toppings ?? []).reduce((total, topping) => total + topping.precio, 0);
  return (item.precio + precioToppings) * item.cantidad;
}

function calcularSubtotalPedido(items) {
  return items.reduce((total, item) => total + calcularSubtotalItem(item), 0);
}

function calcularDescuento(subtotal, minimoParaDescuento, porcentajeDescuento) {
  return subtotal >= minimoParaDescuento ? subtotal * porcentajeDescuento : 0;
}

function calcularPropina(total, porcentajePropina) {
  return total * porcentajePropina;
}

function formatearMoneda(valor) {
  return `$${valor.toFixed(2)}`;
}

function generarTicket(pedido, opciones = {}) {
  const { minimoParaDescuento = 30, porcentajeDescuento = 0.1, porcentajePropina = 0.1 } = opciones;

  const itemsValidos = pedido.filter(validarItemPedido);
  const subtotal = calcularSubtotalPedido(itemsValidos);
  const descuento = calcularDescuento(subtotal, minimoParaDescuento, porcentajeDescuento);
  const subtotalConDescuento = subtotal - descuento;
  const propina = calcularPropina(subtotalConDescuento, porcentajePropina);
  const total = subtotalConDescuento + propina;

  return {
    items: itemsValidos.map((item) => ({
      nombre: item.nombre,
      subtotal: formatearMoneda(calcularSubtotalItem(item))
    })),
    subtotal: formatearMoneda(subtotal),
    descuento: formatearMoneda(descuento),
    propina: formatearMoneda(propina),
    total: formatearMoneda(total),
    itemsInvalidos: pedido.length - itemsValidos.length
  };
}

const pedidoConDescuento = [
  { nombre: 'Combo Clasico', precio: 12, cantidad: 2, toppings: [{ nombre: 'queso extra', precio: 1.5 }] },
  { nombre: 'Papas', precio: 5, cantidad: 1 }
];

console.log('Caso 1: pedido que supera el minimo para descuento');
console.log(generarTicket(pedidoConDescuento));

const pedidoSinDescuento = [{ nombre: 'Hot dog', precio: 6, cantidad: 1 }];

console.log('\nCaso 2: pedido bajo el minimo, sin descuento');
console.log(generarTicket(pedidoSinDescuento));

const pedidoConInvalido = [...pedidoConDescuento, { nombre: 'Item invalido', precio: -5, cantidad: 1 }];

console.log('\nCaso 3: incluye un item invalido (precio negativo)');
console.log(generarTicket(pedidoConInvalido));
