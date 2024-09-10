import { Primitivo } from "../nodos.js";

export function dvariable (exp,tipo,id){
    if (id == null){
        //error de id no reconocido
        return;
    }
    //primitivo por defecto
    if (exp == null){
        // caso de tipo identificador
        if (tipo == 'int' || tipo == 'float' || tipo == 'char' || tipo == 'boolean' || tipo == 'string'){
            //agregar variable al entorno o actualizar
                return new Primitivo({valor:null , tipo: tipo});
        }else{
            //error de tipo no reconocido
        }
    }

    if (tipo == 'var'){
        //var id = exp
        if (exp.valor != null){
            return new Primitivo({valor:exp.valor , tipo: exp.tipo});
        }else{
            //ERROR POR QUE EN VAR DEBE DE TENER UN VALOR
        }
    }

    if (tipo == 'int' || tipo == 'float' || tipo == 'char' || tipo == 'boolean' || tipo == 'string'){
        if (exp.tipo == tipo){
            //agregar variable al entorno o actualizar
            return new Primitivo({valor:exp.valor , tipo: tipo});
        }else{
            return new Primitivo({valor:null , tipo: tipo});
        }
    }

    

}