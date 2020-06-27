class NegociacaoController{

	constructor(){
		/*
			Podiamos copiar o Jquery e fazer algo como:

			let $ = document.querySelector.bind(document);

			Se colocassemos somente document.querySelector então seria salva o metodo querySelector no $ e assim
			viraria uma função solta, logo qualquer this dentro da função não se referenciaria a nada, colocando
			o bind(document) eu digo ao compilador para deixar o 'document' ainda como objeto do metodo
		*/

		//split('-') divide a string por - e cria um array com isso
		this._inputData = $("#data");
		this._inputQuantidade = $("#quantidade");
		this._inputValor = $("#valor");

		

		/*Esse seria um jeito de chamar a funcao com o this desse objeto no objeto ListaNegociacao
		Outra parte do codigo esta nesse objeto, e seria necessario usar 
			Reflect.apply(this._armadilha, this._contexto, [this]);
		para mostrar o contexo que a funcao deve ser executada

		this._listaNegociacoes = new ListaNegociacoes(this, function(model){
			this._negociacoesView.update(this._listaNegociacoes);
		});*/

		/*Outra forma de fazer isso seria somente usar Arrow Function, essas funcoes nao sao dinamicas,
		logo mantem o this do objeto onde foi chamado*/
		/*this._listaNegociacoes = new ListaNegociacoes(
			model => this._negociacoesView.update(model)
		);*/

		//Proxy que cria uma negociacao deixando colocarmos uma funcao para interceptar comandos
		//Nesse caso ao chamarmos as funcoes setNegociacoes ou apagaTudo em this._listaNegociacoes entao ja iremos junto fazer um update da View
		//this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['setNegociacoes', 'apagaTudo'], (model) => {
		//	this._negociacoesView.update(model);
		//});

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'setNegociacoes', 'apagaTudo');

		/*Proxy é um padrao de projeto, ele copia exatamente um objeto, se vc manda um proxy fazer algo
		ele manda para o objeto, ou seja, o objeto fica dentro do proxy. Assim podemos colocar armadilhas 
		no proxy*/


		//this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], (model) => {
		//	this._mensagemView.update(model);
		//});
		this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
	}

	adiciona(event){
		event.preventDefault();

		//'typeof' retorna o tipo da variavel
		console.log(typeof(this._inputData));	

		this._listaNegociacoes.setNegociacoes(this._criaNegociacao());

		this._mensagem.texto = 'Negociação adicionada com sucesso';

		console.log(this._mensagem.texto);
		this._limpaFormulario();
	}

	apaga(){
		this._listaNegociacoes.apagaTudo();

		this._mensagem.texto = 'Negociações apagadas com sucesso';
	}

	_criaNegociacao(){
		return new Negociacao(
			/*Explicacao do por que colocar /-/g no replace(/-/g, ',') (/-/ substitui todo - por ,)
			
			//Replace the first lowercase t we find with X
			//'This is sparta!'.replace(/t/,'X');
			//result: 'This is sparXa!'

			//Replace the first letter t (upper or lower) with X
			//'This is sparta!'.replace(/t/i, 'X');
			//result: 'Xhis is sparta!'

			//Replace all the Ts in the text (upper or lower) with X
			//'This is sparta!'.replace(/t/gi, 'X' );
			//result: 'Xhis is sparXa!'
			*/

			DateHelper.textoParaData($(this._inputData).val()),
			this._inputQuantidade.val(),
			this._inputValor.val(),

			/*
			Poderiamos tambem fazer a data dessa forma:

				new Date(...this._inputData.val().split('-')) 

				-> Os '...' dizem que o primeiro item do array deve ser passado como primeiro item do 
				construtor Date, o segundo como segundo e assim por diante ate acabar

			Para poder mexer com apenas um item do array podemos fazer assim:

				new Date(...this._inputData.val().split('-')).
						//Arrow Function -> Em vez de usar function(){} podemos usar () => {} ou ate () => line, se
						//o codigo for in line, logo o codigo abaixo ficaria:
						//.map((item, indice) => item - indice % 2)
						.map((item, indice) => {
							//Podemos ate substituir o codigo abaixo por return item - indice % 2, tem o mesmo
							//valor logico
							if(indice == 1){
								return item - 1;
							}
							return item;
						})
					);

				-> Com .map podemos colocar uma funcao onde pode ser trabalhado cada item do array individualmente,
				assim podemos criar um novo array baseado em um ja existente

			*/
		);
	}

	_limpaFormulario(){
		$(this._inputData).val('');
		$(this._inputQuantidade).val(1);
		$(this._inputValor).val(0);

		this._inputQuantidade.focus();
	}

	importaNegociacoes(){
		let service = new NegociacaoService();

		/*//Como as requisicoes sao assincronas elas sao executadas em tempos diferentes, por isso precisamos executalas uma dentro da outra
		//Mas essa não é uma boa maneira de lidar com isso, logo vamos ver outra abaixo
		service.obterNegociacoesDaSemana((err, negociacoes) => {
			if(err){
				this._mensagem.texto = err;
				return;
			}
			
			negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));

			service.obterNegociacoesDaSemanaAnterior((err, negociacoes) => {
				if(err){
					this._mensagem.texto = err;
					return;
				}
				
				negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));

				service.obterNegociacoesDaSemanaRetrasada((err, negociacoes) => {
					if(err){
						this._mensagem.texto = err;
						return;
					}
					
					negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));
					this._mensagem.texto = 'Negociações importadas com sucesso';
				});
			});
		});
		*/

		/*
		//Isso retorna uma promessa de retorno dos dados, mas nao os dados, pois é assincrono
		service.obterNegociacoesDaSemana()
		//'then()' -> se essa promessa for comprida, ou seja, retornar os dados, entao executamos a funcao
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
			})
			//se a promessa deu erro entao é executada o 'catch()'
			.catch(erro => this._mensagem.texto = erro);

		service.obterNegociacoesDaSemanaAnterior()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
			})
			.catch(erro => this._mensagem.texto = erro);

		service.obterNegociacoesDaSemanaRetrasada()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
			})
			.catch(erro => this._mensagem.texto = erro);
		*/

		//Mas ainda sim esta assincrono fazendo em ordem aleatorio, para deixar as promises em ordem faz-se assim:
		Promise.all([
			service.obterNegociacoesDaSemana(),
			service.obterNegociacoesDaSemanaAnterior(),
			service.obterNegociacoesDaSemanaRetrasada()
		])
		.then(negociacoes => {
			negociacoes
			//A reposta é um array de arrays, para transforma-lo em 1 so usamos o reduce
			.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
			.forEach(negociacao => this._listaNegociacoes.setNegociacoes(negociacao));
			this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
		})
		.catch(erro => this._mensagem.texto = erro);
	}	
}