import { aritmeticas } from "../Expresiones/aritmeticas.js";
import { logicas } from "../Expresiones/logicas.js";
import { igualdades } from "../Expresiones/igualdades.js";
import { relacionales } from "../Expresiones/relacionales.js";
import { dvariable } from "../Instruccion/dvariables.js";
import { enviroment } from "../Symbol/enviroment.js";
import { BaseVisitor } from "../Compilador/visitor.js";
import nodos, { Primitivo } from "../Compilador/nodos.js";
import { asignav } from "../Instruccion/asignacionvar.js";

import {BreakException,ContinueException,ReturnException} from "../Instruccion/transferencias.js";

export class InterpreterVisitor extends BaseVisitor{
  constructor(){
    super()
    this.entornoActual = new enviroment();
    this.salida = '';
    this.prev = null;
    this.prevContinue = null;
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
      * @type {BaseVisitor['visitOperacionLogica']}
    */
    visitOperacionLogica(node){
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
        if(condicion.tipo === 'boolean'){
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
        return this.entornoActual.getVariable(node.id);
    }
   /**
      * @type {BaseVisitor['visitPrint']}
      */
   visitPrint(node) {
    const valor = node.exp.accept(this);
    this.salida += valor.valor + '\n';
  }
    /**
      * @type {BaseVisitor['visitNegacion']}
      */
  visitNegacion(node){
    const exp = node.exp.accept(this)
    if (exp.tipo == 'boolean'){
        return new Primitivo({valor: !exp.valor , tipo: exp.tipo});
    }else{
        throw new Error('Error en la operacion negacion tipos incorrectos');
    }
  }
    /**
      * @type {BaseVisitor['visitAsignacionvar']}
      */
  visitAsignacionvar(node){
    const valorn = node.valor.accept(this);
    let valoractual = this.entornoActual.getVariable(node.id)
    let valorfinal = asignav(valorn,valoractual,node.op)
    this.entornoActual.assignvariables(node.id,valorfinal)
  }
    /**
      * @type {BaseVisitor['visitBloque']}
      */
  visitBloque(node){

    const entornoAnterior = this.entornoActual;
        this.entornoActual = new enviroment(entornoAnterior);

        node.ins.forEach(ins => ins.accept(this));

        this.entornoActual = entornoAnterior;
  }
    /**
      * @type {BaseVisitor['visitIf']}
      */
  visitIf(node){
    const condicion = node.cond.accept(this)
    if(condicion.tipo !== 'boolean'){
      throw new Error('Error en la condicion del if');
    }
    if(condicion.valor){
      return node.stmtTrue.accept(this)
    }else if(node.stmtFalse != null){
      return node.stmtFalse.accept(this)
    }
    return null
  }
   /**
      * @type {BaseVisitor['visitSwitch']}
      */
  visitSwitch(node){
    let condicion = node.cond.accept(this)
    if(node.cases === null && node.def === null){
      throw new Error('No se ha definido ningun caso y default')
    }
    let estado = false
    const entornoAnterior = this.entornoActual;
    this.entornoActual = new enviroment(entornoAnterior);
    try{
      if(node.cases != null){
        for(const caso of node.cases){
          let con = caso.exp.accept(this);
          if (con.valor == condicion.valor && con.tipo == condicion.tipo && !estado) {
              caso.accept(this);
            estado = true;
          }
          else if (estado){
            caso.accept(this);
          }
        }
        if(node.def != null){
            node.def.accept(this);
        }
      }
      else if(node.def != null){
          node.def.accept(this);
      }
    }catch(error){
      if (error instanceof  BreakException){
        return
      }
      throw error
    }finally{
      this.entornoActual = entornoAnterior;
    }
  }
  
   /**
      * @type {BaseVisitor['visitCase']}
      */
  visitCase(node){
      for(let inst of node.stmt){
        inst.accept(this);
      } 
  }
     /**
      * @type {BaseVisitor['visitWhile']}
      */

  visitWhile(node){
    const entornoinicial = this.entornoActual;
    
    try {
      while (node.cond.accept(this).valor && node.cond.accept(this).tipo === 'boolean') {
          node.stmt.accept(this);
      }
    } catch (error) {
      this.entornoActual = entornoinicial;
        if (error instanceof BreakException) {
            return
        }
        if (error instanceof ContinueException) {
            return this.visitWhile(node);
        }
        throw error;
    }
  }
   /**
      * @type {BaseVisitor['visitFor']}
      */
  visitFor(node){
    const entornoinicial = this.entornoActual;
    const incrementoAnterior = this.prevContinue;
    this.prevContinue = node.inc;
        const forTraducido = new nodos.Bloque({
          ins: [
              node.init,
              new nodos.While({
                  cond: node.cond,
                  stmt: new nodos.Bloque({
                      ins: [
                          node.stmt,
                          node.inc
                      ]
                  })
              })
          ]
      })

      forTraducido.accept(this);

      this.prevContinue = incrementoAnterior;
  }

  
      
      
       
  
  /**
     * @type {BaseVisitor['visitBreak']}
     */
  visitBreak(node){
    throw new BreakException();
  }
  /**
     * @type {BaseVisitor['visitContinue']}
     */
  visitContinue(node){
      if (this.prevContinue) {
        this.prevContinue.accept(this);
    }
    throw new ContinueException();
  }
  /**
     * @type {BaseVisitor['visitReturn']}
     */
  visitReturn(node){
    let valor = null;
    if (node.exp) {
        valor = node.exp.accept(this);
    }
    throw new ReturnException(valor);
  }

}