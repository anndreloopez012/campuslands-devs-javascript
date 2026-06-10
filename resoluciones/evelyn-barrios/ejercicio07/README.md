# Resolución Ejercicio 07 - Bucles (for/while)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en la automatización de tareas repetitivas mediante el uso de bucles `for` y `while`, aplicados a la gestión de inventario y visualización de precios en una tienda de ropa.

## Justificación Técnica

En la solución se han implementado las estructuras de repetición fundamentales para resolver diferentes necesidades de flujo:

1.  **Bucle `for`**: Se utilizó para recorrer de manera eficiente arreglos paralelos (`ropa` y `precios`). Este ciclo es ideal cuando se conoce de antemano la cantidad de elementos a procesar mediante la propiedad `.length`.
2.  **Bucle `while`**: Se implementó para simular un proceso de salida de mercancía. Su uso es adecuado en este contexto ya que la repetición depende de una condición lógica (existencia de inventario) que se evalúa antes de cada iteración.
3.  **Reto Extra (Validación)**: Se incluyó una estructura condicional al final del proceso para detectar el agotamiento total de la bodega, demostrando la integración entre bucles y lógica de control.

## Decisiones de Diseño

*   **Sincronización de Datos**: El diseño del bucle `for` permite vincular el nombre de la prenda con su precio respectivo usando el mismo índice, optimizando la presentación de la información.
*   **Contexto Local**: Se mantiene la coherencia con el entorno de Guatemala utilizando el símbolo de moneda "Q" (Quetzales) y terminología comercial común.
*   **Simplicidad y Claridad**: Se optó por una lógica incremental y decremental sencilla, facilitando la comprensión de cómo cambian los valores de las variables en cada vuelta de los ciclos.

Este ejercicio consolida el dominio sobre los flujos iterativos, permitiendo procesar colecciones de datos y gestionar estados dinámicos de forma automática.