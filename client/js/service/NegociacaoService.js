class NegociacaoService{

	constructor(){
		this._http = new HttpService();
	}

    obterNegociacoesDaSemana(){



		//'resolve' funcao ao qual passamos o retorno de sucesso, e 'reject' passamos o erro
		return new Promise((resolve, reject) => {
			
			this._http
				.get('negociacoes/semana')
				.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(erro => {
					console.log(erro)
					reject('Não foi possivel obter as negociacoes da semana');
				});
		});
	}

	obterNegociacoesDaSemanaAnterior(){
		
		return new Promise((resolve, reject) => {
			this._http
				.get('negociacoes/anterior')
				.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(erro => {
					console.log(erro)
					reject('Não foi possivel obter as negociacoes da semana');
				});
		});
    }
	
	obterNegociacoesDaSemanaRetrasada(){
		
		return new Promise((resolve, reject) => {
			this._http
				.get('negociacoes/retrasada')
				.then(negociacoes => {
						resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(erro => {
					console.log(erro)
					reject('Não foi possivel obter as negociacoes da semana');
				});
		});
    }

    static logicaImportacao(listaNegociacao, mensagem, resolve, reject, xhr){
		/* Estados possiveis da requisicao:
			0: Requisicao ainda nao iniciada
			1: Conexao com o servidor estabelecida
			2: Requisicao recebida
			3: Processando requisicao
			4: Requisicao concluida e resposta pronta
		*/

		//Mesmo com estado 4 a resposta pode ser um ERRO, pois um erro ainda é uma resposta valida
		if(xhr.readyState == 4){
			//Logo precisamos ver se o status é 200 tambem
			if(xhr.status == 200){
				console.log('Obteve as negociacoes do servidor');
				//xhr.responseText é a resposta do servidor, tanto para erro quanto para retornar o pedido
				//JSON.parse() muda todo texto para array de objetos
				resolve(JSON.parse(xhr.responseText)
					//Muda todo objeto para uma negociacao
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                );	
			}
			else{
				console.log('Erro ao obter as negociacoes do servidor');
				console.log(JSON.parse(xhr.responseText));
				reject('Não foi possível obter as negociações');
			}
		}
	}
}