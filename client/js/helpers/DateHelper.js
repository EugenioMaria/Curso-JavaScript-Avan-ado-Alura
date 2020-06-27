class DateHelper{

	constructor(){
		//'throw' lanca algo, nesse caso lanca um novo erro
		//Error(texto) -> texto que se quer mostrar no erro
		ErrorHelper.cannotBeInstantiatedError(this);
	}

	//Metodos static podem ser envocados sem criar um nova variavel, usando diretamente a class, como:
	//DataHelper.textoParaData(texto);
	static textoParaData(texto){
		//O codigo diz que é necessario uma string com 4 numeros - 2 numeros - 2 numeros, se fosse D
		//maiunculo entao seria algo diferente de numero
		
		if(!(/\d{4}-\d{2}-\d{2}/.test(texto)))
            throw new Error('O texto esperado é no padrão aaaa-mm-dd');
		
		return new Date(texto.replace(/-/g, ','));
	}

	static dataParaTexto(data){
		//getDate() retorna o dia da data
		//O mes é gravado em um array de 0 a 11, logo é necessario fazer (negociacao.data.getMonth() + 1)
		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
	}
}