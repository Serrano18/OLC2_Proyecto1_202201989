class enviroment {
  constructor(padre = null) {
    this.name = "";
    this.prev = padre;
    this.variables = {};
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
            this.prev.assign(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

}