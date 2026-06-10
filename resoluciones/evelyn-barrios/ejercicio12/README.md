# Resolución Ejercicio 12 - Fechas y Math (Paracaidismo)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega consiste en la generación de un registro de salto en paracaídas, utilizando objetos de fecha y métodos matemáticos para simular datos aleatorios de altura y tiempo de caída libre.

## Justificación Técnica

En la solución se han implementado las siguientes herramientas nativas de JavaScript:

1.  **Objeto `Date`**: Se utilizó para capturar el instante exacto del salto. Se emplearon los métodos `.toLocaleDateString()` y `.toLocaleTimeString()` para presentar la información de forma legible según el formato local.
2.  **Método `Math.random()`**: Implementado para generar valores aleatorios dentro de rangos específicos (altura entre 1000m y 4000m; tiempo entre 30s y 60s), simulando la variabilidad de un salto real.
3.  **Método `Math.floor()`**: Utilizado para redondear hacia abajo los resultados de los cálculos aleatorios, asegurando la obtención de números enteros limpios para la interfaz.
4.  **Estructura de Control (`if/else`)**: Se integró una validación lógica para emitir alertas de seguridad basadas en la altura generada, demostrando la interacción entre datos calculados y toma de decisiones.

## Decisiones de Diseño

*   **Contexto de Aventura**: Se seleccionó el tema de paracaidismo para dar un uso práctico a la generación de números aleatorios y el registro de tiempos.
*   **Formato de Salida**: Se diseñó un reporte visual mediante consola que incluye separadores y etiquetas claras, mejorando la presentación del registro técnico.
*   **Reto Extra**: Se incluyó la validación de oxígeno para saltos de gran altitud (superiores a 3500 metros), añadiendo una capa de realismo y lógica adicional al ejercicio.

Este ejercicio consolida el conocimiento sobre el manejo del tiempo y la generación de datos dinámicos mediante las librerías estándar de JavaScript.