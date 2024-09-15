import { Invocable } from "./invocable.js";
import { Primitivo } from "../Compilador/nodos.js";

class Nativa extends Invocable {
    constructor(aridad, func) {
        super();
        this.aridad = aridad;
        this.invocar = func;
    }
}


export const fnativas = {
    'parseInt': new Nativa(() => 1, (interprete,args) => {
        
        if(args[0].tipo != 'string'){  
            return new Primitivo({valor: null, tipo: 'int'})
            //throw new Error('Error en la conversion a string')
          }
        return new Primitivo({valor: parseInt(args[0].valor), tipo: 'int'})
    }),
    'parsefloat': new Nativa(() => 1, (interprete,args) => {
            
            if(args[0].tipo != 'string'){  
                
                return new Primitivo({valor: null, tipo: 'float'})
                //throw new Error('Error en la conversion a string')
            }
            return new Primitivo({valor: parseFloat(args[0].valor), tipo: 'float'})
        }
    ),
    'toString': new Nativa(() => 1, (interprete,args) => {
        return new Primitivo({valor: args[0].valor.toString(), tipo: 'string'})
    }),
    'toLowerCase': new Nativa(() => 1, (interprete,args) => {
        if(args[0].tipo != 'string'){  
            
             return new Primitivo({valor: null, tipo: 'string'})
            //throw new Error('Error en la conversion a string')
        }
        return new Primitivo({valor: args[0].valor.toLowerCase(), tipo: 'string'})
    }),
    'toUpperCase': new Nativa(() => 1, (interprete,args) => {
        if(args[0].tipo != 'string'){  
            return new Primitivo({valor: null, tipo: 'string'})
            //throw new Error('Error en la conversion a string')
        }
        return new Primitivo({valor: args[0].valor.toUpperCase(), tipo: 'string'})
    }),
    
}