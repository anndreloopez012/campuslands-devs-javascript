# Contribuyendo

## Flujo correcto de trabajo

1. Actualiza `dev`: `git checkout dev && git pull origin dev`.
2. Crea una rama personal: `git checkout -b nombre-apellido`.
3. Resuelve el ejercicio asignado.
4. Prueba el resultado.
5. Haz commit y push de tu rama.
6. Abre un Pull Request hacia `dev`.
7. Espera revision antes de mezclar cambios.

## Nombres de ramas

Usa el formato `nombre-apellido` en minusculas y sin espacios. Si necesitas varias entregas, agrega el numero del ejercicio: `nombre-apellido-ejercicio-05`.

## Formato recomendado de commits

- `feat: solve exercise 01`
- `fix: correct exercise 04 condition`
- `docs: add exercise notes`

## Como pedir revision

En el Pull Request indica el ejercicio realizado, archivos modificados, pruebas hechas y dudas pendientes.

## Que no deben hacer

- No hacer push directo a `dev` ni a `main`.
- No trabajar sobre la rama `respuestas`; esa rama es solo de consulta del profesor.
- No copiar soluciones oficiales en los enunciados.
- No modificar archivos de otros estudiantes sin permiso.
- No mezclar varios ejercicios sin indicarlo.
- No subir `node_modules/`, archivos `.env` o builds generados.

## Como entregar ejercicios

Sube tu rama personal y abre Pull Request hacia `dev`. El administrador/owner revisara, comentara cambios si hace falta y aprobara la integracion.

## Permisos

Las ramas `main` y `dev` estan protegidas. Los estudiantes trabajan en ramas propias. Solo el administrador/owner puede subir directo a `main` y `dev` sin revision cuando sea necesario.

## Rama de respuestas

La rama `respuestas` contiene las soluciones oficiales para consulta posterior. No es una rama de entrega ni de trabajo para estudiantes.
