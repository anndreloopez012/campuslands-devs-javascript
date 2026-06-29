# Resolución Ejercicio 01 - Variables y Constantes

## evelyn barrios 
Este documento detalla la solución implementada para el ejercicio de gestión de datos de un videojuego tipo shooter, cumpliendo con los requerimientos de estructura y buenas prácticas de programación en JavaScript.

## Descripción del Proyecto
Se ha desarrollado un sistema de estado para un operativo en campo, donde se gestionan tanto parámetros estáticos del entorno como variables dinámicas del jugador.

## Justificación Técnica de los Cambios

1. **Gestión de Mutabilidad**:
   - Se han utilizado **constantes (`const`)** para valores de configuración que deben permanecer íntegros durante toda la ejecución, tales como `MAPA_ACTUAL` y `MUNICION_CARGADOR`.
   - Se han utilizado **variables (`let`)** para el estado dinámico del operativo (salud, munición restante, experiencia), permitiendo su actualización conforme progresa la simulación.

2. **Tipado de Datos**:
   - El código integra diversos tipos de datos fundamentales: *Strings* (nombres), *Numbers* (estadísticas) y *Booleans* (estados lógicos), demostrando un manejo integral de los tipos básicos.

3. **Sintaxis  (ES6+)**:
   - Se ha implementado el uso de **Template Literals** (comillas invertidas) para la salida de datos por consola. Esta técnica permite una interpolación de variables más limpia, legible y eficiente en comparación con la concatenación tradicional.

4. **Semántica y Nomenclatura**:
   - Se han aplicado nombres descriptivos y coherentes al contexto de un videojuego profesional, facilitando la lectura del código y su posterior mantenimiento.

Este ejercicio demuestra la correcta aplicación de los conceptos de declaración de variables y organización de la lógica inicial en un entorno de desarrollo.