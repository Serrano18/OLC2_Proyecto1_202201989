import { enviroment } from "../Symbol/enviroment.js";
import { Invocable } from "./invocable.js";
import { DeclaFuncion } from "../Compilador/nodos.js";
import { ReturnException } from "../Instruccion/transferencias.js";
export class dfuncion extends Invocable {
    constructor(nodo, clousure) {
        super();
        /**
         * @type {DeclaFuncion}
         */
        this.nodo = nodo;

        /**
         * @type {enviroment}
         */
        this.clousure = clousure;
    }
    aridad() {
        return this.nodo.params.length;
    }
    /**
    * @type {Invocable['invocar']}
    */
    invocar(interprete, args) {
        const entornoNuevo = new enviroment(this.clousure);

        this.nodo.params.forEach((param, i) => {
            entornoNuevo.setVariable(param, args[i]);
        });

        const entornoAntesDeLaLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;

        try {
            this.nodo.bloque.accept(interprete);
        } catch (error) {
            interprete.entornoActual = entornoAntesDeLaLlamada;
            if (error instanceof ReturnException) {
                if (this.nodo.tipo == error.tipo){
                    return error;
                }
            }
            throw error;
        }
        interprete.entornoActual = entornoAntesDeLaLlamada;
        return null
    }
/*
    atar(instancia) {
        const entornoOculto = new enviroment(this.clousure);
        entornoOculto.set('this', instancia);
        return new dfuncion(this.nodo, entornoOculto);
    }
        */
}