class ErrorHelper{
    
    constructor(){
		//'throw' lanca algo, nesse caso lanca um novo erro
		//Error(texto) -> texto que se quer mostrar no erro
		ErrorHelper.cannotBeInstantiatedError(this);
	}

    static cannotBeInstantiatedError(object){
        throw new Error(object.constructor.name + ' não pode ser instanciada');
    }
}