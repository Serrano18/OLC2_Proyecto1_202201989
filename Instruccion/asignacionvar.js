import { Primitivo } from "../Compilador/nodos.js";
export function asignav (valorn,valoractual,op){
    if(valoractual.valor == null || valorn.valor == null){
        throw new Error('Variable no definida o valor null')
    }
    switch (op){
        case '=':
            if(valorn.tipo == valoractual.tipo){
                return new Primitivo({valor:valorn.valor , tipo: valorn.tipo});
            }else{
                throw new Error('Tipos no compatibles')
            }
        case '+=':
            if(valorn.tipo == valoractual.tipo){
                return new Primitivo({valor:valoractual.valor+=valorn.valor , tipo: valorn.tipo});
            }else{
                throw new Error('Tipos no compatibles')
            }
        case '-=':
            if(valorn.tipo == valoractual.tipo){
                return new Primitivo({valor:valoractual.valor-=valorn.valor , tipo: valorn.tipo});
            }else{
                throw new Error('Tipos no compatibles')
            }
        default:
            throw new Error('Operador no valido')
    }
}