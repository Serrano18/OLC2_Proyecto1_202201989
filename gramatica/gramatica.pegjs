{
    const nuevoNodo = (tipo, props) => {
        const tipos = {
            'Primitivo': nodos.Primitivo,
            'Print': nodos.Print,
            'OpAritmetica': nodos.OperacionAritmetica,
            'OpRelacional': nodos.OperacionRelacional,
            'OpIgualdades': nodos.OperacionIgualdades,
            'OpLogica': nodos.OperacionLogica,
            'OpTernario': nodos.Ternario,
            'Unaria': nodos.OperacionUnaria,
            'Agrupacion': nodos.Agrupacion,
            'DeclaracionVar': nodos.DeclaracionVariable,
            'ReferenciaVariable': nodos.ReferenciaVariable,
            'Negacion': nodos.Negacion,
            'Asignacionvar': nodos.Asignacionvar,
            'Bloque': nodos.Bloque,
            'If': nodos.If,
            'Switch': nodos.Switch,
            'Case': nodos.Case,
            'Break': nodos.Break,
            'Continue': nodos.Continue,
            'Return': nodos.Return,
            'For': nodos.For,
            'While': nodos.While,
            'DeclaFuncion' : nodos.DeclaFuncion,
            'Llamada' : nodos.Llamada,
            'Get' : nodos.Get,
            'Sprint' : nodos.Sprint,
            'ParseInt' : nodos.ParseInt,
            'ParseFloat' : nodos.ParseFloat,
            'ToString' : nodos.ToString,
            'ToLowerCase' : nodos.ToLowerCase,
            'ToUpperCase' : nodos.ToUpperCase,
            'TypeOf' : nodos.TypeOf,
            'DeclaracionStruct' : nodos.DeclaracionStruct,
            'Instancia' : nodos.Instancia,


        }

        const nodo = new tipos[tipo](props)
        nodo.location = location()
        return nodo
    }
}

programa 
    = _ dcl:instucciones* _ { return dcl }

instucciones 
    = _ dcl:declaraciones _{ return dcl }
        
declaraciones 
    = _ dclv:declaracionvariables _ ";" _ { return dclv }
    / _ asig:asignatura _ ";" _ { return asig }
    / _ stmt:Stmt _ { return stmt }
    / dclf:declaracionfunciones _ { return dclf }
    / _ dcls:declaracionstrucuts _ { return dcls }
             // / declaracionfunciones
        

declaracionstrucuts
    = "struct" _ id:id _ "{" _ vars:(campos:declaracionvariables _ ";" {return campos})+ _ "}" _ ";" 
        { return nuevoNodo('DeclaracionStruct', { id, vars }) }

instancia
    = _ id:id _ "{" _ args:params  _ "}" _
        { return nuevoNodo('Instancia', { id, args }) }

params = _ p:param _  ps:("," _ pr:param {return pr})*
        { return [p, ...ps] }

param
    = _ id:id _ ":" _ valor:expresion _ 
        { return  nuevoNodo('Asignacionvar', { id,op:"=",valor }) }

declaracionfunciones 
    = tipo:(tipo / "void"/ id) _ id:id _ "(" _ params:Parametros? _ ")" _ bloque:bloque 
        { return nuevoNodo('DeclaFuncion', {tipo, id, params: params || [], bloque }) }

Parametros 
    = d:declarafunc _ params:("," _ ds:declarafunc { return ds})* 
        { return [d, ...params] }

//Llamadas de funciones

declarafunc
    = declaracionvariables

declaracionvariables 
    =_ tipo:  (tipo / "var"/ id) _ id:id _ valor:( "=" _ valor:expresion { return valor}) ? 
            { return  nuevoNodo('DeclaracionVar', { tipo, id, exp:valor }) }

// -------------------Sentencias-------------------
Stmt 
    = print 
    /sprint
    /if
    /switch
    /break
    /conti
    /ret
    /for
    /while


print 
    = "print" _ "(" _ exp:expresion _ ")" _ ";" 
        { return  nuevoNodo('Print', { exp }) }

bloque 
    = "{" _ ins:instucciones* _ "}" 
        { return nuevoNodo('Bloque',{ins}) }

if                                                                                      //se vuelve a llamar a ella misma
    = "if" _ "(" _ cond:expresion _ ")" _ stmtTrue:bloque _ stmtFalse:(_ "else" _ stmtFalse:(bloque/if) { return stmtFalse } )? 
      { return nuevoNodo('If', { cond, stmtTrue, stmtFalse }) }

switch
    = "switch" _ "(" _ cond:expresion _ ")" _ "{" _ cases:case* _ def:default? _ "}" 
        { return nuevoNodo('Switch', { cond, cases, def }) }
       
case
    = _ tipo:("case") _ exp:expresion _ ":" _ stmt:instucciones* _
        { return nuevoNodo('Case', { tipo, exp, stmt }) }
default
    = _ tipo:"default" _ ":" _ stmt:instucciones* _
        {return nuevoNodo('Case', { tipo, exp: null, stmt })  }

for
    = "for" _ "(" _ init:ForInit _ cond:expresion _ ";" _ inc:asignatura _ ")" _ stmt:bloque
     {return nuevoNodo('For', { init, cond, inc, stmt })}

ForInit
    = dcl:declaracionvariables _ ";" { return dcl }
    / exp:expresion _ ";" { return exp }
    / ";" { return null }

while
    = "while" _ "(" _ cond:expresion _ ")" _ stmt:bloque 
        { return nuevoNodo('While', { cond, stmt }) }
   

//----------------Transferencia----------------
break
    = _ "break" _ ";" 
        { return nuevoNodo('Break',{}) }

conti 
    = "continue" _ ";" 
        { return nuevoNodo('Continue',{}) }

ret
    = "return" _ exp:expresion? _  ";" 
        { return nuevoNodo('Return', { exp }) }

asignatura
    = _ id:id _ op:("+="/"-="/"=") _ valor:expresion _ 
        { return  nuevoNodo('Asignacionvar', { id,op,valor }) }

//eXPRESION QUE PUEDE SER 
expresion = asignacion

asignacion = ternario

ternario 
    = _ condicion: OR _ "?" _ verdadero:ternario _ ":" _ falso:ternario _ 
        { return  nuevoNodo('OpTernario', { condicion, verdadero, falso }) }
    / OR 

//-------------------------------------------------OPERACIONES LOGICAS ------------------------------------------------
OR 
    = _ izq:AND expansion:( _ "||" _ der:AND { return { tipo: "||", der } })* { 
        return expansion.reduce(
        (Anterior, Actual) => {
        const { tipo, der } = Actual
        return  nuevoNodo('OpLogica', { op:tipo, izq: Anterior, der })},izq)}

AND 
    = _ izq:igualdad expansion:( _ "&&" _ der:igualdad { return { tipo: "&&", der } })* { 
        return expansion.reduce((Anterior, Actual) => {const { tipo, der } = Actual
        return  nuevoNodo('OpLogica', { op:tipo, izq: Anterior, der })},izq)}

igualdad 
    = izq:relacional expansion:( _ op:("==" / "!=") _ der:relacional { return { tipo: op, der } })* { 
        return expansion.reduce((Anterior, Actual) => {const { tipo, der } = Actual
        return  nuevoNodo('OpIgualdades', { op:tipo, izq: Anterior, der })},izq)}

//-------------------------------------------------OPERACIONES RELACIONALES ------------------------------------------------
relacional 
    = izq:Suma expansion:( _ op:("<=" /">="/"<" / ">") _ der:Suma { return { tipo: op, der } })* { 
        return expansion.reduce((Anterior, Actual) => {const { tipo, der } = Actual
        return  nuevoNodo('OpRelacional', { op:tipo, izq: Anterior, der })},izq)}

//-------------------------------------------------OPERACIONES ARITMETICAS ------------------------------------------------
Suma 
    = izq:Multiplicacion expansion:(_ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } })* { 
        return expansion.reduce((Anterior,Actual) => {const { tipo, der } = Actual
        return  nuevoNodo('OpAritmetica', { op:tipo, izq: Anterior, der })},izq)}

Multiplicacion = izq:Unarias expansion:(_ op:("*" / "/"/"%") _ der:Unarias { return { tipo: op, der } })* {
        return expansion.reduce((Anterior, Actual) => {const { tipo, der } = Actual
        return  nuevoNodo('OpAritmetica', { op:tipo, izq: Anterior, der })},izq)}

Unarias 
    = "-" _ num:Unarias { return  nuevoNodo('Unaria', { op: '-', exp: num }) }
    /"!" _ num:Unarias { return  nuevoNodo('Negacion', { op: '!', exp: num}) }
    /llamada
    / datos

llamada 
    =  objetivoInicial:datos operaciones:(
    ("(" _ args:Argumentos? _ ")" { return {args, tipo: 'funcCall' } })
    / ("." _ id:id _ { return { id, tipo: 'Get' } }))* 
  {
  const op =  operaciones.reduce(
    (objetivo, args) => {
      // return crearNodo('llamada', { callee, args: args || [] })
      const { tipo, id, args:argumentos } = args

      if (tipo === 'funcCall') {
        return nuevoNodo('Llamada', { callee: objetivo, args: argumentos || [] })
      }else if (tipo === 'Get') {
        return nuevoNodo('Get', { objetivo, propiedad: id })
      }
    },
    objetivoInicial
  )
   console.log('Llamada', {op}, {text: text()});

    return op
    }
//Esta no es expresion
sprint
    = "System.out.println" _ "(" _ args:Argumentos _ ")" _ ";" 
        { return  nuevoNodo('Sprint', { args }) }
//nativas expresiones 

typeof
    = "typeof" _  exp:expresion  _ 
        { return  nuevoNodo('TypeOf', { exp }) }

Argumentos 
    = arg:expresion _ args:("," _ exp:expresion { return exp })* 
        { return [arg, ...args] }


// ------------------------------Datos primitivos----------------------------------
datos 
    = numeros
    /agrupacion
    / decimal 
    / booleano 
    / cadena 
    /instancia
    / char 
    /typeof 
    /idvalue

agrupacion 
    = "(" _ exp:expresion _ ")" 
        {return  nuevoNodo('Agrupacion', { exp })}

numeros 
    = decimal 
    / entero 

entero 
    = [0-9]+    {return  nuevoNodo('Primitivo', { tipo: 'int', valor: parseInt(text()) })}

decimal 
    = [0-9]+("."[0-9]+)     {return  nuevoNodo('Primitivo', { tipo: 'float', valor: parseFloat(text()) })}
        
booleano 
    = ("true" / "false")  {return  nuevoNodo('Primitivo', { tipo: 'boolean', valor: text() === "true" ? true : false })}

cadena 
    = "\"" (!"\"" .)* "\""   {return  nuevoNodo('Primitivo', { tipo: 'string', valor: text().slice(1, -1) })}

char 
    = "'" (!"'" .) "'"     {return  nuevoNodo('Primitivo', { tipo: 'char', valor: text().slice(1, -1) })}

idvalue
     = id:id    {return  nuevoNodo('ReferenciaVariable', {id})}

id = ([a-zA-Z_])[a-zA-Z0-9_]* {return text()}
tipo = "int" / "float" / "string" / "char" / "boolean"
//Comentarios
_ = ([ \t\n\r] / Comentarios)* 

Comentarios = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"