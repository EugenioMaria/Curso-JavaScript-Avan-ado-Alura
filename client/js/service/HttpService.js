class HttpService{

    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

			xhr.open('GET', url);
			/* configuracoes para envio do request */
			//Chama uma funcao sempre que mudar o estado da requisicao
			xhr.onreadystatechange = () => HttpService.logicaImportacaoHttp(this._listaNegociacoes, this._mensagem, resolve, reject, xhr);
			
			xhr.send();
        });
    }

    static logicaImportacaoHttp(listaNegociacao, mensagem, resolve, reject, xhr){
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
				resolve(JSON.parse(xhr.responseText));	
			}
			else{
				console.log('Erro ao obter as negociacoes do servidor');
				console.log(JSON.parse(xhr.responseText));
				reject(xhr.responseText);
			}
		}
	}
}