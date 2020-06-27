//Orientacao a Objeto com JS
class Negociacao {
	constructor(data, quantidade, valor){
		//Usando new Date criamos um novo objeto para o valor recebido, ja que o valor pode ser um objeto,
		//se esse objeto for alterado fora da classe ele seria alterado aqui tambem, mas com essa blindagem
		//isso nao acontece
		this._data = new Date(data.getTime());
		//_data, o '_' é uma convensao para que nao seja alterado esse dado
		this._quantidade = quantidade;
		this._valor = valor;
		//Congela o objeto para que o dev não consiga alterar os valores sem usar 'set', mas não funciona para campos
		//dentro de um objeto, como dia dentro da data
		Object.freeze(this.Negociacao);
		console.log(this._data);
	}

	//get faz com que vc possa chamar o metodo usando só ".volume", isso impede que o programador use
	//.volume e consiga alterar o volume, mas ele ainda consegue usando _volume
	get volume(){
		return this._quantidade * this._valor;
	}

	get data(){
		//Com esse codigo não retornamos o objeto, criamos um novo objeto, logo não é possivel
		//alterar os campos dentro do objeto data, já que não é ele que é retornado
		return new Date(this._data.getTime());
	}
	get quantidade(){
		return this._quantidade;
	}
	get valor(){
		return this._valor;
	}
}