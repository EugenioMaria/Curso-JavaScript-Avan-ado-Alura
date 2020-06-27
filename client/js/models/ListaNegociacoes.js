class ListaNegociacoes{

    constructor(/*contexto,*/armadilha){
        this._negociacoes = [];
        //this._contexto = contexto;
    }

    setNegociacoes(negociacao){
        //push adiciona um item em um array
        //push não é identificado no proxy, logo vamos modificar um pouco para funcionar
        //this._negociacoes.push(negociacao);
        //Mas essa forma abaixo tambem nao é ideal, pois da uma perda de performance grande
        //this._negociacoes = [].concat(this._negociacoes , negociacao);
        //Entao vamos voltar a anterior
        this._negociacoes.push(negociacao);
        
        //Roda a funcao armadilha, no contexto indicado para que o this da funcao seja outro objeto
        //e entao passamos a entrada da funcao por ultimo
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

    get negociacoes(){
        //Esse é um jeito de blindar o codigo, retornando somente this._negociacoes a pessoa poderia usar metodos para
        //alterar nossos dados, com o concat em um array vazio eu crio um novo array com os mesmos dados de 
        //this._negociacoes, uma copia com outro local de memoria, fazer assim que qualquer alteracao nesse retorno
        //nao altera o real this._negociacoes
        return [].concat(this._negociacoes);
    }

    apagaTudo(){
        this._negociacoes = [];
        //Roda a funcao armadilha, no contexto indicado para que o this da funcao seja outro objeto
        //e entao passamos a entrada da funcao por ultimo
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }
}