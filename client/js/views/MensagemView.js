class MensagemView extends View{
    
    constructor(elemento){
        //super(elemento) passa o elemento ao construtor da classe pai
        super(elemento);
    }

    template(model){

        /*Em JS uma string em branco é FALSE, logo podemos fazer esse if abaixo: expresao ? se verdadeiro : se falso;
        Assim podemos deixar sem caixa de alerta se a o model estiver vazio*/
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`
    }
}