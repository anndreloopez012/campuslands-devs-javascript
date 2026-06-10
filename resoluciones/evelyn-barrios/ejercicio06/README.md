# Resolución Ejercicio 06 - Objetos

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en la implementación y manipulación de objetos en JavaScript, utilizando como ejemplo la estructuración de un plan de viaje con sus características y funcionalidades asociadas.

## Justificación Técnica

En la solución se han aplicado los conceptos fundamentales de los objetos para organizar datos relacionados:

1.  **Declaración de Objeto (`const`)**: Se definió un objeto `viaje` utilizando `const`, lo que asegura que la referencia al objeto no cambiará, aunque sus propiedades internas sí puedan ser modificadas.
2.  **Propiedades**: Se utilizaron propiedades para almacenar atributos específicos del viaje, como `destino` (String), `dias` (Number), `presupuesto` (Number) y `transporte` (String), demostrando cómo los objetos agrupan diferentes tipos de datos.
3.  **Métodos**: Se incluyó un método `resumen()` dentro del objeto. Este método encapsula una funcionalidad específica (generar un resumen del viaje) y hace uso de la palabra clave `this` para acceder a las propiedades del propio objeto.
4.  **Acceso a Propiedades y Métodos**: Se demostró el acceso a las propiedades y la invocación de métodos del objeto mediante la notación de punto (`.`).
5.  **Operador `typeof`**: Se utilizó para verificar el tipo de dato del objeto `viaje`, confirmando que es reconocido como un 'object' en JavaScript.
6.  **Estructura de Control (`if`)**: Se implementó una condición `if` para evaluar una propiedad del objeto (`viaje.presupuesto`) y ejecutar una lógica específica basada en su valor, demostrando la interacción entre objetos y el control de flujo.

## Decisiones de Diseño

*   **Modelado de Entidad**: El objeto `viaje` modela una entidad del mundo real, agrupando sus características y comportamientos de manera lógica.
*   **Encapsulamiento**: El método `resumen()` encapsula la lógica de presentación de la información del viaje, manteniendo el código más organizado.
*   **Mensajes Contextuales**: Se generaron mensajes por consola que reflejan el estado y las características del viaje, incluyendo una categorización basada en el presupuesto.

Este ejercicio consolida el conocimiento sobre la creación y manipulación de objetos, una estructura de datos fundamental para el desarrollo de aplicaciones complejas en JavaScript.