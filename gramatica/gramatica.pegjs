
{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
        'primitivo': nodos.Primitivo,
        'OpAritmetica': nodos.OperacionAritmetica,
        'OpRelacional': nodos.OperacionRelacional,
        'OpIgualdades': nodos.OperacionIgualdades,
        'OpLogica': nodos.OperacionLogica,
        'OpTernario': nodos.Ternario,
        'unaria': nodos.OperacionUnaria,
        'Agrupacion': nodos.Agrupacion,
        'DeclaracionVar': nodos.DeclaracionVariable,
        'ReferenciaVariable': nodos.ReferenciaVariable,
        'print': nodos.Print
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}


programa = _ dcl:instucciones* _ { return dcl }
instucciones = _ dcl:declaraciones _{ return dcl }
         /p:_ Stmt _ {return p}
             // /
declaraciones = dclv:declaracionvariables _ ";" _ { return dclv }
             // / declaracionfunciones

declaracionvariables = 
        tipo:  (tipo / "var"/ id) _ id:id _ valor:( "=" _ valor:expresion { return valor}) ? 
            { return crearNodo('DeclaracionVar', { tipo, id, valor }) }


Stmt = "print(" _ exp:expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
//eXPRESION QUE PUEDE SER 
expresion = asignacion
asignacion = OR
ternario = condicion: OR _ "?" _ verdadero:ternario _ ":" _ falso:ternario _ { return crearNodo('OpTernario', { condicion, verdadero, falso }) }
        / OR
//-------------------------------------------------OPERACIONES LOGICAS ------------------------------------------------
OR = izq:AND expansion:( _ "||" _ der:AND { return { tipo: '||', der } })* { 
    return expansion.reduce(
        (Anterior, Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpLogica', { op:tipo, izq: Anterior, der })
        },
        izq
    )
    }

AND = izq:igualdad expansion:( _ "&&" _ der:igualdad { return { tipo: '&&', der } })* { 
    return expansion.reduce(
        (Anterior, Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpLogica', { op:tipo, izq: Anterior, der })
        },
        izq
    )
    }

igualdad = izq:relacional expansion:( _op:("==" / "!=") _ der:relacional { return { tipo: op, der } }
    )* { 
    return expansion.reduce(
        (Anterior, Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpIgualdades', { op:tipo, izq: Anterior, der })
        },
        izq
    )
    }
//-------------------------------------------------OPERACIONES RELACIONALES ------------------------------------------------
relacional = izq:Suma expansion:( _ op:("<" / ">"/"<=" /">=") _ der:Suma { return { tipo: op, der } }
    )* { 
    return expansion.reduce(
        (Anterior, Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpRelacional', { op:tipo, izq: Anterior, der })
        },
        izq
    )
    }
//-------------------------------------------------OPERACIONES ARITMETICAS ------------------------------------------------
Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
    )* { 
    return expansion.reduce(
        (Anterior,Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpAritmetica', { op:tipo, izq: Anterior, der })
        },
        izq
    )}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/"/"%") _ der:Unaria { return { tipo: op, der } }
    )* {
    return expansion.reduce(
      (Anterior, Actual) => {
        const { tipo, der } = Actual
        return crearNodo('OpAritmetica', { op:tipo, izq: Anterior, der })
      },
      izq
    )
    }

Unaria = "-" _ num:Unaria { return crearNodo('unaria', { op: '-', exp: num }) }
/"!" _ num:Unaria { return crearNodo('OpLogica', { op: '!', izq: num, der:-1}) }
/ datos

// ------------------------------Datos primitivos----------------------------------
datos = numeros
     / cadena 
    / booleano 
    / char 
    / decimal 
    / id
    /agrupacion
    /idvalue

agrupacion = "(" _ exp:expresion _ ")" 
        {return crearNodo('Agrupacion', { exp })}

numeros = entero _
        /decimal _

entero = [0-9]+ 
         {return crearNodo('primitivo', { tipo: 'int', valor: parseInt(text()) })}

decimal = [0-9]+ "." [0-9]+ 
        {return crearNodo('primitivo', { tipo: 'float', valor: parseFloat(text()) })}
        
booleano = "true" / "false" _
        {return crearNodo('primitivo', { tipo: 'booean', valor: text() === 'true' ? true : false })}

cadena = "\"" (!"\"" .)* "\""_ 
        {return crearNodo('primitivo', { tipo: 'string', valor: text().slice(1, -1) })}

char = "'" (!"'" .) "'" _
        {return crearNodo('primitivo', { tipo: 'char', valor: text().slice(1, -1) })}

idvalue = id:id _ 
        {return crearNodo('ReferenciaVariable', {id})}

id = [a-zA-Z_] [a-zA-Z0-9_]* {return text()}
tipo = "int" / "float" / "string" / "char" / "boolean"
//Comentarios
_ = ([ \t\n\r] / Comentarios)* 

Comentarios = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"