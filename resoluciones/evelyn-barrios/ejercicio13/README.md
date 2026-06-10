# Resolución Ejercicio 13 - JSON (Libros y Películas)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en el manejo de JSON (JavaScript Object Notation) para la serialización y parseo de colecciones de datos, utilizando una lista de libros y películas favoritas como caso de estudio.

## Justificación Técnica

En la solución se han implementado los métodos fundamentales del objeto global `JSON` para la manipulación de datos:

1.  **Serialización (`JSON.stringify`)**: Se utilizó para convertir un arreglo de objetos de JavaScript en una cadena de texto JSON. Se aplicaron parámetros de indentación (`null, 2`) para garantizar que el resultado sea legible para humanos.
2.  **Parseo (`JSON.parse`)**: Se empleó para transformar una cadena JSON de vuelta a un objeto nativo de JavaScript, permitiendo nuevamente la manipulación de sus propiedades de forma programática.
3.  **Manejo de Colecciones**: Se demostró la capacidad de trabajar con arreglos de objetos complejos, manteniendo la integridad de los tipos de datos (Strings y Numbers) durante el proceso de conversión.

## Decisiones de Diseño

*   **Contenido Curado**: Se seleccionaron obras representativas ("El resplandor" e "Interstellar") para poblar la colección inicial, utilizando propiedades claras como `titulo`, `creador`, `tipo` y `anio`.
*   **Reto Extra (Validación)**: Se integró una validación lógica utilizando `Array.isArray()` y la propiedad `.length` para confirmar que los datos parseados mantienen el formato de lista esperado y no están vacíos.
*   **Visualización Comparativa**: La consola muestra claramente la diferencia visual entre el texto plano (JSON) y la estructura de objeto de JavaScript, facilitando la comprensión del flujo de datos.

Este ejercicio consolida el conocimiento sobre el formato de intercambio de datos más utilizado en el desarrollo web moderno, fundamental para la comunicación con APIs y bases de datos.