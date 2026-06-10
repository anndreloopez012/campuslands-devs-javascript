# Resolución Ejercicio 02 - Tipos de Datos

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Este ejercicio consiste en la definición y manipulación de los tipos de datos primitivos en JavaScript, aplicados a la gestión de información técnica de una motocicleta.

## Justificación Técnica

La solución implementada utiliza los siguientes tipos de datos para representar la realidad de un inventario de vehículos:

1.  **String (Cadenas de Texto)**: Se utilizaron para definir la marca y la línea del vehículo (`marcaMoto`, `linea`), permitiendo el almacenamiento de caracteres alfanuméricos.
2.  **Number (Numéricos)**: Se aplicaron para valores cuantificables. Se incluyó un número entero para el `cilindraje` y un valor decimal (punto flotante) para el `precioQuetzales`, demostrando la versatilidad del tipo *Number* en JavaScript.
3.  **Boolean (Lógicos)**: Se utilizó la variable `esDeAgencia` para representar estados binarios (verdadero/falso), facilitando la toma de decisiones lógica en la interfaz.
4.  **Null (Nulo)**: Se asignó a `multasPendientes` para representar la ausencia intencional de un valor, indicando que el registro existe pero actualmente no contiene deudas.

## Decisiones de Diseño

*   **Localización**: Se utilizó terminología propia del contexto guatemalteco (como "cilindraje", "línea" y moneda en "Quetzales") para que la solución sea clara y funcional en el entorno local.
*   **Sintaxis Modernas**: Se implementó el uso de **Template Literals** para la concatenación de mensajes, mejorando la legibilidad del código.
*   **Operador de Coalescencia Nula (`??`)**: Se incluyó para manejar de forma elegante la visualización de valores nulos, asegurando que el usuario final reciba una respuesta comprensible ("Solvente") en lugar de un valor técnico.

Este ejercicio cumple con los objetivos de aprendizaje sobre la declaración de variables y la identificación de tipos de datos fundamentales en el lenguaje.