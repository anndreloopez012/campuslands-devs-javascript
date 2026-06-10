# Resolución Ejercicio 08 - Strings y Métodos

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se centra en la manipulación de cadenas de texto (Strings) mediante el uso de métodos nativos de JavaScript, aplicados al procesamiento de información de una pieza musical cristiana.

## Justificación Técnica

En la solución se han implementado diversos métodos de transformación y búsqueda para demostrar el manejo profesional de textos:

1.  **Limpieza de Datos (`.trim()`)**: Utilizado para eliminar espacios en blanco innecesarios al inicio y al final de la cadena, garantizando la integridad del dato.
2.  **Transformación (`.toUpperCase()`)**: Aplicado para normalizar el texto a mayúsculas, útil para estandarizar visualizaciones.
3.  **Búsqueda (`.includes()`)**: Empleado para validar la existencia de una subcadena específica, devolviendo un valor booleano según la coincidencia.
4.  **Sustitución (`.replace()`)**: Utilizado para intercambiar fragmentos de texto de forma dinámica sin alterar la cadena original directamente.
5.  **Extracción (`.slice()`)**: Implementado para obtener una porción específica de la cadena basándose en índices de posición.

## Decisiones de Diseño

*   **Reto Extra (`.length`)**: Se incluyó una validación lógica utilizando la propiedad de longitud para emitir un mensaje contextual, demostrando la interacción entre manipulación de strings y estructuras de control.
*   **Semántica**: Se eligió la canción "Alaba a Dios" para dar un contexto real y positivo a la aplicación de los métodos.
*   **Claridad en Consola**: La salida de datos se estructuró de forma comparativa (Original vs. Transformada) para facilitar la verificación de cada proceso aplicado.

Este ejercicio consolida el conocimiento sobre la inmutabilidad de los strings en JavaScript y la potencia de sus métodos integrados para el procesamiento de texto.