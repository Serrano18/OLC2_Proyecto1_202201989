export class enviroment {
  constructor(padre = null) {
    this.name = "";
    this.prev = padre;
    this.variables = {};
    this.funciones = {};
    }
    setFuncion(name,func){
        if (this.funciones.hasOwnProperty(name)) {
            throw new Error(`La Funcion ${name} ya ha sido declarada`);
        }
        this.funciones[name] = func;
        console.log("funcion guardada")
    }

    getFuncion(name){
        if (this.funciones.hasOwnProperty(name)) {
            return this.funciones[name];
        }
        if (this.prev) {
            return this.prev.getFuncion(name);
        }
        throw new Error(`La Funcion ${name} no ha sido declarada`);
    }

    setVariable(name, value) {
        if (this.variables.hasOwnProperty(name)) {
            throw new Error(`La variable ${name} ya ha sido declarada`);
        }
        this.variables[name] = value;
    }
    getVariable(name) {
        if (this.variables.hasOwnProperty(name)) {
            return this.variables[name];
        }
        if (this.prev) {
            return this.prev.getVariable(name);
        }
        throw new Error(`La variable ${name} no ha sido declarada`);
    }
    assignvariables(nombre, valor) {
        const valorActual = this.variables[nombre];

        if (valorActual !== undefined) {
            this.variables[nombre] = valor;
            return;
        }

        if (!valorActual && this.prev) {
            this.prev.assignvariables(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

}