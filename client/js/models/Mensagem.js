class Mensagem{
    
    //Se nada for passado quando criada uma nova mensagem entao ela é criada sem texto pelo padrao texto=''
    constructor(texto=''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}