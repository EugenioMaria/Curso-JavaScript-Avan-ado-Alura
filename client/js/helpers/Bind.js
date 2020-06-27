class Bind{

    //... é o REST OPERATOR, isso quer dizer que podemos passar parametros apartir do 3 e eles serao trabalhados como itens do array props
    constructor(model, view, ...props){

        let proxy = ProxyFactory.create(model, props, (model) => {
            view.update(model);
        });

        return proxy;
    }
}