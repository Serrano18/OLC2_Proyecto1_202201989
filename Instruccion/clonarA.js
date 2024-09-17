
import { Primitivo } from "../Compilador/nodos.js";
import { InstanciaA } from "./InstanciaA.js";


export function ClonarA(dato) {
    if (!(dato instanceof Primitivo)) {
        throw new Error ("El dato no es primitivo")
    }

    let valor;

    if (Array.isArray(dato.valor)) {
        valor = dato.valor.map(x => ClonarV(x));
    } else {
        valor = ClonarV(dato.valor);
    }
    return new Primitivo({ valor: valor, tipo: dato.tipo });
}


function ClonarV(valor) {
    if (valor instanceof Primitivo) {
        return ClonarA(valor);
    } else if (valor instanceof InstanciaA) {
        return ClonarInstancia(valor);
    } else if (Array.isArray(valor)) {
        return valor.map(x => ClonarV(x));
    } else {
        return JSON.parse(JSON.stringify(valor));
    }
}


function ClonarInstancia(instncia) {
    if (!(instncia instanceof InstanciaA)) {
        throw new Error('EL valor no es una matriz');
    }

    const propiedades = instncia.propiedades.map(x => ClonarV(x));

    return new InstanciaA(instncia.clase, propiedades);
}