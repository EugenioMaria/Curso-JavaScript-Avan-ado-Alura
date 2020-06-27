class ProxyFactory{

    static create(objeto, props, acao){
        
        return new Proxy(objeto, {

			/*'get' é chamado sempre que acessamos uma propriedade em um objeto, trazendo target, que é o objeto alvo do acesso,
			prop, que a propriedade que esta sendo acessada e receiver que é uma referencia ao proprio proxy
			
			Ou seja, podemos interceptar propriedades e alteralas*/
			get(target, prop, receiver){

				//Retorna o valor da propriedade interceptada
				//Mas desse jeito não pegamos quando um metodo é utilizado e nao da get nem set, logo temos que fazer de outro jeito
				//return Reflect.get(target, prop, receiver);

				/*Assim temos que fazer assim, pedimos para verificar se os arrays includes prop e temos que testar se o target[prop] é uma funcao
				assim saberemos que é um metodo que tem o prop e poderemos trabalhar com isso*/
				if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
					
					return function(){
						
						//Assim estamos passando a funcao do objeto original target[prop], no contexto dela mesma target, e argments da acesso
						//todos argumentos passados para a funcao
						Reflect.apply(target[prop], target, arguments);
						return acao(target);
					}
				}

				return Reflect.get(target, prop, receiver);
            },
            
            set(target, prop, value, receiver){
                
                if(props.includes(prop)){
                    acao(target);
                }

                return Reflect.set(target, prop, value, receiver);
           }

			/*'set' pegaria as propriedades que estao sendo alteradas. Para pegarmos o valor antigo usamos
			target[prop], pois estamos pegando o objeto(target) que ainda nao foi modificado e a propriedade
			[prop]*
			
			set: recebe target, prop, value, receiver, value é o valor que queremos colocar*/
		});
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}