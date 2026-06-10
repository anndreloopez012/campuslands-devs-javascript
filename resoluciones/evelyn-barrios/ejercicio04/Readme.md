# Resolución Ejercicio 04 - Estructuras de Control (if/else)

**Autor:** Evelyn Barrios  
**Materia:** Programación con JavaScript

## Descripción
Esta entrega se enfoca en la implementación de lógica de toma de decisiones en JavaScript mediante el uso de condicionales, aplicada a la determinación de resultados en un encuentro de fútbol.

## Justificación Técnica

En la solución se han aplicado las estructuras de control fundamentales para gestionar el flujo de información:

1.  **Condicionales Anidados (`if`, `else if`, `else`)**: Se utilizaron para evaluar las tres posibilidades de un marcador deportivo: victoria local, victoria visitante o empate.
2.  **Operadores de Comparación**: Se emplearon los operadores mayor que (`>`) y menor que (`<`) para comparar las variables numéricas de goles y determinar el flujo lógico correcto.
3.  **Operadores Lógicos y de Igualdad**: En el reto extra, se implementó el operador lógico **AND (`&&`)** junto con el operador de igualdad (`==`) para validar dos condiciones simultáneas: que el marcador sea empate y que el partido se encuentre en una fase final.

## Decisiones de Diseño

*   **Semántica Clara**: Las variables `golesLocal` y `golesVisita` permiten una lectura intuitiva del código, facilitando su mantenimiento.
*   **Lógica de Desempate**: Se incluyó una validación booleana (`esFinal`) para demostrar cómo el código puede adaptarse a reglas de negocio específicas, como la definición por penales en torneos de eliminación directa.
*   **Salida Informativa**: El sistema no solo procesa los datos, sino que informa el estado actual del marcador antes de emitir un veredicto, emulando el comportamiento de una aplicación real.

Este ejercicio consolida el aprendizaje sobre el control de flujo, permitiendo que los programas reaccionen de manera inteligente ante diferentes entradas de datos.