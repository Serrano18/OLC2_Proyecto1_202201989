# Manual Técnico del Compilador OakLand

## Universidad de San Carlos de Guatemala
### Facultad de Ingeniería
### Escuela de Ingeniería en Ciencias y Sistemas
### Organización de Lenguajes y Compiladores 2
**Primer semestre 2024**

**Catedráticos:** Ing. Bayron López, Ing. Edgar Saban, Ing. Luis Espino  
**Tutores Académicos:** Henry Mendoza, Daniel Santos, Damián Peña  

---

## 1. Competencias

### 1.1. Competencia General
El estudiante debe desarrollar un intérprete para el lenguaje de programación OakLand, comprendiendo la estructura del código fuente y utilizando herramientas para la generación de analizadores léxicos y sintácticos.

### 1.2. Competencias Específicas
- Utilización de herramientas léxicas y sintácticas para el análisis del lenguaje.
- Implementación de la traducción orientada por la sintaxis utilizando reglas semánticas con atributos sintetizados o heredados.
- Familiarización con estructuras de datos y herramientas para la creación de un intérprete.

## 2. Descripción
El objetivo es desarrollar un intérprete para el lenguaje de programación OakLand, inspirado en la sintaxis de Java. OakLand soporta múltiples paradigmas de programación, como orientación a objetos, programación funcional y procedimental. El intérprete debe estar desarrollado en JavaScript (vanilla) y desplegado en Github Pages, con analizadores construidos con la herramienta PeggyJS.

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

#### 2.1.5. Consola
La consola es un área dedicada a mostrar notificaciones, errores y advertencias durante el análisis.

### 2.2. Flujo del Proyecto
Explicar el flujo de trabajo y las etapas del proyecto: desde la creación del archivo hasta su ejecución.

### 2.3. Arquitectura Propuesta

#### 2.3.1. Aplicación Web
Descripción de cómo se organiza la aplicación web, incluyendo los componentes y el diseño general.

#### 2.3.2. Github Pages
Detalles sobre el despliegue en Github Pages.

## 3. Generalidades del Lenguaje OakLand

### 3.1. Expresiones en OakLand
Explicación de cómo se manejan las expresiones en el lenguaje.

### 3.2. Ejecución
Cómo se ejecuta el código.

### 3.3. Identificadores
Reglas para los identificadores en OakLand.

### 3.4. Case Sensitive
OakLand es sensible a mayúsculas y minúsculas.

### 3.5. Comentarios
Explicación del uso de comentarios.

### 3.6. Tipos Estáticos
OakLand emplea tipos de datos estáticos.

### 3.7. Tipos de Datos Primitivos
- Números
- Cadenas de texto
- Booleanos

### 3.8. Tipos Compuestos
Explicación sobre arrays y structs.

### 3.9. Valor Nulo (null)
Uso del valor `null` en OakLand.

### 3.10. Secuencias de Escape
Descripción de las secuencias de escape admitidas.

## 4. Sintaxis del Lenguaje OakLand

### 4.1. Bloques de Sentencias

### 4.2. Signos de Agrupación

### 4.3. Variables

### 4.4. Operadores Aritméticos
- Suma, Resta, Multiplicación, División, Módulo, Asignación, Negación unaria

### 4.5. Operaciones de Comparación
- Igualdad, Desigualdad, Relacionales

### 4.6. Operadores Lógicos

### 4.7. Precedencia y Asociatividad

### 4.8. Operador Ternario

### 4.9. Sentencias de Control de Flujo
- If Else, Switch-Case, While, For

### 4.10. Sentencias de Transferencia
- Break, Continue, Return

## 5. Estructuras de Datos

### 5.1. Array
- Creación, Acceso a elementos, Métodos como `indexOf()`, `join()`, y la propiedad `length`.

### 5.2. Matrices
- Creación y manipulación de matrices.

## 6. Structs

### 6.1. Definición

### 6.2. Uso de Atributos

### 6.3. Funciones Especiales
- Uso de `Object.keys()`.

## 7. Funciones

### 7.1. Declaración y Parámetros

### 7.2. Llamada a Funciones

### 7.3. Funciones Embebidas
- `System.out.println()`, `parseInt()`, `parseFloat()`, `toString()`, `toLowerCase()`, `toUpperCase()`, `typeof`.

## 8. Reportes Generales

### 8.1. Reporte de Errores
Lista de errores encontrados en la ejecución del código.

### 8.2. Reporte de Tabla de Símbolos
Lista de símbolos encontrados en el código.

## 9. Entregables
Enumerar los archivos y recursos entregables del proyecto.

## 10. Restricciones
Indicar restricciones técnicas o funcionales.

## 11. Consideraciones
Notas adicionales y sugerencias sobre el uso de la herramienta.

## 12. Entrega del Proyecto
Instrucciones finales sobre la entrega.

## 13. Implementación Técnica

### 13.1. Uso de PEG para la Gramática
En este proyecto, se utilizó PEG (Parsing Expression Grammar) para definir la gramática del lenguaje OakLand. PEG permite una definición precisa y concisa de la sintaxis del lenguaje, facilitando la construcción del analizador léxico y sintáctico. La gramática se escribió utilizando la herramienta PeggyJS, que convierte las reglas definidas en PEG en analizadores JavaScript.

#### Ejemplo de Gramática en PEG
```js
{
  // Código JavaScript para definiciones adicionales
}

Program = Statement+
Statement = VariableDeclaration / ExpressionStatement
VariableDeclaration = "let" _ Identifier _ "=" _ Expression
ExpressionStatement = Expression
Expression = Number / Identifier
Identifier = /[a-zA-Z_][a-zA-Z0-9_]*/
Number = /[0-9]+/
_ = /[ \t]*/  // Espacios en blanco
