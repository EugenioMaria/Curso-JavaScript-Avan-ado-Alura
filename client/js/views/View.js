//Classe para outras usarem de Herança
class View{

    constructor(elemento){
        this._elemento = elemento;
    }

    //Metodos das classes filhas sobrescrevem as classes do pai quando tem o mesmo nome, logo nao tem
    //problema dar um throw error aqui
    template(){
        throw new Error('O metodo \'_template\' deve ser implementado');
    }

    update(model){
        //innerHTML no Jquery é html(conteudo), ele substitui o conteudo de dentro do elemento pelo novo conteudo
        $(this._elemento).html(this.template(model));
    }
}