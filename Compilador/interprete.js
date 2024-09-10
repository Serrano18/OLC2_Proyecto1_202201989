import { aritmeticas } from "../Expresiones/aritmeticas.js";
import { logicas } from "../Expresiones/logicas.js";
import { igualdades } from "../Expresiones/igualdades.js";
import { relacionales } from "../Expresiones/relacionales.js";
import { dvariable } from "../Instruccion/dvariables.js";
import { enviroment } from "../Symbol/enviroment.js";
import { BaseVisitor } from "../Compilador/visitor.js";

export class InterpreterVisitor extends BaseVisitor{
  constructor(){
    super()
    this.entornoActual = new enviroment();
    this.salida = '';
    this.prev = null;
  }
    interpretar(nodo){
      return nodo.accept(this)
    }
    /**
      * @type {BaseVisitor['visitPrimitivo']}
    */
    visitPrimitivo(node){
        return node
    }
        /**
      * @type {BaseVisitor['visitOperacionAritmetica']}
    */

    visitOperacionAritmetica(node){
        const izq = node.izq.accept(this)
        const der = node.der.accept(this)
        return aritmeticas(node.op,izq,der)
    }
    /**
      * @type {BaseVisitor['visitOperacioneLogica']}
    */
    visitOperacioneLogica(node){
        const izq = node.izq.accept(this)
        const der = node.der.accept(this)

        return logicas(node.op,izq,der)
    }
    /**
      * @type {BaseVisitor['visitOperacionIgualdades']}
    */
    visitOperacionIgualdades(node){
        const izq = node.izq.accept(this)
        const der = node.der.accept(this)

        return igualdades(node.op,izq,der)
    }
    /**
      * @type {BaseVisitor['visitOperacionRelacional']}
    */
    visitOperacionRelacional(node){
        const izq = node.izq.accept(this)
        const der = node.der.accept(this)

        return relacionales(node.op,izq,der)
    }
    /**
      * @type {BaseVisitor['visitTernario']}
    */
    visitTernario(node){
        const condicion = node.condicion.accept(this)
        if(condicion.tipo !== 'boolean'){
            if(condicion.valor){
                return node.verdadero.accept(this)
            }else{
                return node.falso.accept(this)
            } 
        }else{
            throw new Error('Error en la operacion ternaria tipos incorrectos');
        }
      
    }
        /**
      * @type {BaseVisitor['visitOperacionUnaria']}
    */
    visitOperacionUnaria(node){
        const exp = node.exp.accept(this)
        if (exp.valor == null){
          //error valor nulo
            return new Primitivo({valor:null , tipo: exp.tipo});
        }
        if (exp.tipo == 'int' || exp.tipo == 'float'){
            return new Primitivo({valor: exp.valor * -1 , tipo: exp.tipo});
        }else{
            // return new Primitivo({valor:null , tipo: exp.tipo});
      
            throw new Error('Error en la operacion unaria tipos incorrectos');
        }

    }
    /**
      * @type {BaseVisitor['visitAgrupacion']}
    */
    visitAgrupacion(node){
        return node.exp.accept(this)
    }
    /**
      * @type {BaseVisitor['visitDeclaracionVariable']}
    */
    visitDeclaracionVariable(node){
      const exp = node.exp.accept(this)

      const result = dvariable(exp,node.tipo,node.id)
      this.entornoActual.setVariable(node.id,result)
    }
 /**
      * @type {BaseVisitor['visitReferenciaVariable']}
      */
    visitReferenciaVariable(node){
        return this.entornoActual.get(node.id);
    }
   /**
      * @type {BaseVisitor['visitPrint']}
      */
   visitPrint(node) {
    const valor = node.exp.accept(this);
    this.salida += valor.valor + '\n';
  }
}