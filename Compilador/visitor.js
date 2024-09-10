
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').Primitivo} Primitivo


 * @typedef {import('./nodos').OperacioneLogica} OperacioneLogica


 * @typedef {import('./nodos').Ternario} Ternario


 * @typedef {import('./nodos').OperacionAritmetica} OperacionAritmetica


 * @typedef {import('./nodos').OperacionRelacional} OperacionRelacional


 * @typedef {import('./nodos').OperacionIgualdades} OperacionIgualdades


 * @typedef {import('./nodos').OperacionUnaria} OperacionUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Numero} Numero


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionStmt} ExpresionStmt

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {Primitivo} node
     * @returns {any}
     */
    visitPrimitivo(node) {
        throw new Error('Metodo visitPrimitivo no implementado');
    }
    

    /**
     * @param {OperacioneLogica} node
     * @returns {any}
     */
    visitOperacioneLogica(node) {
        throw new Error('Metodo visitOperacioneLogica no implementado');
    }
    

    /**
     * @param {Ternario} node
     * @returns {any}
     */
    visitTernario(node) {
        throw new Error('Metodo visitTernario no implementado');
    }
    

    /**
     * @param {OperacionAritmetica} node
     * @returns {any}
     */
    visitOperacionAritmetica(node) {
        throw new Error('Metodo visitOperacionAritmetica no implementado');
    }
    

    /**
     * @param {OperacionRelacional} node
     * @returns {any}
     */
    visitOperacionRelacional(node) {
        throw new Error('Metodo visitOperacionRelacional no implementado');
    }
    

    /**
     * @param {OperacionIgualdades} node
     * @returns {any}
     */
    visitOperacionIgualdades(node) {
        throw new Error('Metodo visitOperacionIgualdades no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    
}
