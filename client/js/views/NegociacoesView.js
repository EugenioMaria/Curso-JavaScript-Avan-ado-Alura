class NegociacoesView extends View{

    constructor(elemento){
        //super(elemento) passa o elemento ao construtor da classe pai
        super(elemento);
    }

    template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map((item) => {

                    return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(item.data)}</td>
                            <td>${item.quantidade}</td>
                            <td>${item.valor}</td>
                            <td>${item.volume}</td>
                        </tr>
                    `
                
                }).join('')}
            </tbody>
            
            <tfoot>
                <!-- colspan faz uma cedula preencher o espaco de 3 -->
                <td colspan="3">Total</td>
                <td>
                    ${/* Primeiro modo de somar o total:

                        //Colocando a funcao dentro de (function(){})() estamos instanciando e ja envocando ela, isso é necessario
                        //pois ${} aceita 1 unico resultado
                        (function(){
                            let total = 0;
                            model.negociacoes.forEach(item => total += item.volume)
                            return total;
                        })()
                        */
                        
                        //reduce executa para todos itens e retorna um unico valor, resultado de total
                        model.negociacoes.reduce(function(total, item){
                            return total + item.volume;
                        }, 0)
                    }
                </td>
            </tfoot>
        </table>
        `;
    }
}