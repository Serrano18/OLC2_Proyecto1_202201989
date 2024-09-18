# Manual Técnico del Compilador OakLand

## Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ingeniería en Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2
**Primer semestre 2024**

**Catedráticos:** Ing. Bayron López, Ing. Edgar Saban, Ing. Luis Espino  
**Tutores Académicos:** Henry Mendoza, Daniel Santos, Damián Peña  
**Estudiante:** Maria Patricia Serrano Ramírez 202201989
---

## Introduccion
Este manual técnico proporciona uan vision generar de un proyecto de interpretación de lenguaje de programacion que utiliza JavaScript. El proyecto tiene como objetivo implementar un interprete para un lenguaje de programacion simple que permite a los usuarios escribir código , ejecutarlo y ver los resultados en el tiempo real a través de una interfaz de usuario web.

## 1. Tecnologías Utilizadas

### 1.1. PEG.js
Se utilizó PEG.js (Parsing Expression Grammar for JavaScript) para definir la gramática del lenguaje OakLand. PEG.js convierte las reglas de gramática en un analizador sintáctico que puede ser integrado en JavaScript.

### 1.2. HTML y CSS
La interfaz de usuario se construyó utilizando HTML para la estructura y CSS para el diseño y la presentación. Estas tecnologías permiten crear una plataforma accesible y funcional para la edición e interpretación del código.

### 1.3. JavaScript (vanilla)
El intérprete y las funcionalidades de análisis se implementaron en JavaScript puro. Se utilizó el patrón Visitor para la interpretación del código, facilitando la adición de nuevas operaciones sin modificar la estructura del árbol de análisis.


### 2.1. Componentes de la Aplicación

#### 2.1.1. Editor
El editor permitirá la creación, apertura, edición e interpretación de código en OakLand. Deberá mostrar la línea actual y admitir la apertura de múltiples archivos.

#### 2.1.2. Funcionalidades
- **Crear archivos:** Capacidad de crear archivos en blanco.
- **Abrir archivos:** Abrir archivos con extensión `.oak`.
- **Guardar archivo:** Guardar los archivos con extensión `.oak`.

#### 2.1.3. Herramientas
- **Ejecutar:** Permite realizar análisis léxico, sintáctico, semántico y ejecutar el código fuente.

#### 2.1.4. Reportes
- **Reporte de Errores:** Muestra los errores encontrados en el análisis.
- **Reporte de Tabla de Símbolos:** Lista todas las variables, métodos y funciones declaradas.


### 3. Estructura y Clases

### 3.1.1  Clase `Environment`

La clase `Environment` se utiliza para gestionar un entorno de variables, permitiendo la declaración, asignación y recuperación de variables en un contexto jerárquico. Esto es útil en situaciones donde se maneja un ámbito de variables anidado, como en un intérprete de lenguajes de programación.

## Función `getVariable`

**Descripción:**

- **Propósito:** Recupera el valor de una variable dada por su nombre.
- **Parámetros:**
  - `name` (string): El nombre de la variable que se desea recuperar.

**Funcionamiento:**

1. Verifica si la variable existe en el contexto actual (`this.variables`).
2. Si existe, retorna su valor.
3. Si no existe y hay un contexto anterior (`this.prev`), delega la búsqueda al contexto anterior llamando recursivamente a `getVariable` en `this.prev`.
4. Si la variable no se encuentra en ningún contexto, lanza un error indicando que la variable no ha sido declarada.

## Función `assignVariables`

**Descripción:**

- **Propósito:** Asigna un nuevo valor a una variable existente.
- **Parámetros:**
  - `name` (string): El nombre de la variable a la que se desea asignar un nuevo valor.
  - `value` (any): El nuevo valor que se desea asignar a la variable.

**Funcionamiento:**

1. Verifica si la variable existe en el contexto actual (`this.variables`).
2. Si existe, asigna el nuevo valor a la variable y termina la ejecución.
3. Si no existe y hay un contexto anterior (`this.prev`), delega la asignación al contexto anterior llamando recursivamente a `assignVariables` en `this.prev`.
4. Si la variable no se encuentra en ningún contexto, lanza un error indicando que la variable no está definida.

Estas funciones permiten gestionar variables en un entorno jerárquico, facilitando la implementación de ámbitos en lenguajes de programación o sistemas similares.


# Funciones Clave del Intérprete

## 1. `setVariable(name, value)`

**Descripción:**

Esta función se encarga de establecer una nueva variable en el entorno actual. Si la variable ya existe, lanza un error.

**Funcionamiento:**

- **Verificación de existencia:** Comprueba si la variable ya existe en el entorno actual usando `hasOwnProperty`.
- **Lanzamiento de error:** Si la variable ya existe, lanza un error indicando que la variable ya ha sido declarada.
- **Asignación de valor:** Si la variable no existe, la agrega al objeto `variables` con el nombre y valor proporcionados.

## 2. `getVariable(name)`

**Descripción:**

Esta función obtiene el valor de una variable, buscando en el entorno actual y en los entornos padres si es necesario.

**Funcionamiento:**

- **Verificación de existencia:** Comprueba si la variable existe en el entorno actual.
- **Retorno de valor:** Si la variable existe, retorna su valor.
- **Búsqueda en entornos padres:** Si la variable no existe en el entorno actual, busca en los entornos padres recursivamente.
- **Lanzamiento de error:** Si la variable no se encuentra en ningún entorno, lanza un error indicando que la variable no ha sido declarada.

## 3. `invocar(interprete, args)`

**Descripción:**

Esta función invoca una función definida en el lenguaje interpretado, creando un nuevo entorno para la ejecución de la función.

**Funcionamiento:**

- **Creación de nuevo entorno:** Crea un nuevo entorno basado en el entorno de cierre (closure).
- **Cambio de entorno actual:** Guarda el entorno actual y lo reemplaza por el nuevo entorno.
- **Asignación de parámetros:** Asigna los argumentos proporcionados a los parámetros de la función.
- **Ejecución del bloque de la función:** Ejecuta el bloque de código de la función.
- **Manejo de excepciones:** Si ocurre una excepción, restaura el entorno anterior y maneja las excepciones de retorno.
- **Restauración del entorno:** Restaura el entorno anterior después de la ejecución de la función.
- **Retorno de valor:** Retorna el valor de retorno de la función, si existe.

## 4. `visitWhile(node)`

**Descripción:**

Esta función maneja la ejecución de un bucle `while` en el lenguaje interpretado.

**Funcionamiento:**

- **Guardar entorno inicial:** Guarda el entorno actual antes de la ejecución del bucle.
- **Evaluación de la condición:** Evalúa la condición del bucle.
- **Ejecución del cuerpo del bucle:** Si la condición es verdadera y de tipo booleano, ejecuta el cuerpo del bucle.
- **Manejo de excepciones:** Si ocurre una excepción, restaura el entorno inicial y maneja las excepciones de `break` y `continue`.
- **Reevaluación de la condición:** Si se encuentra una excepción de `continue`, vuelve a evaluar la condición del bucle.

## 5. `visitForeach(node)`

**Descripción:**

Esta función maneja la ejecución de un bucle `foreach` en el lenguaje interpretado.

**Funcionamiento:**

- **Verificación de variable:** Verifica que la variable del bucle sea una declaración válida.
- **Evaluación del array:** Evalúa el array sobre el cual se iterará.
- **Conversión de instancia:** Si el valor del array es una instancia, obtiene sus propiedades.
- **Guardar entorno inicial:** Guarda el entorno actual antes de la ejecución del bucle.
- **Iteración sobre el array:** Itera sobre los elementos del array, ejecutando el bloque de código para cada elemento.
- **Manejo de excepciones:** Si ocurre una excepción, restaura el entorno inicial y maneja las excepciones de `break` y `continue`.

Estas funciones son fundamentales para el funcionamiento del intérprete, ya que manejan la gestión de variables, la invocación de funciones y la ejecución de estructuras de control como bucles.
