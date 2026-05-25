var produtosPadrao = [
    { codigo: '001', nome: 'Coca-Cola 2L', categoria: 'Bebidas', valor: 8.99, quantidade: 20, unidade: 'UN' },
    { codigo: '002', nome: 'Cerveja Heineken 600ML', categoria: 'Bebidas', valor: 12.00, quantidade: 15, unidade: 'UN' },
    { codigo: '003', nome: 'Gin Gordons 900ML', categoria: 'Bebidas', valor: 78.00, quantidade: 10, unidade: 'UN' }
];

function carregaProdutos(dados) {
    let tab = document.querySelector('#tabela');
    let html = `<thead class="table-light">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Unidade</th>
                    </tr>
                </thead>
                <tbody>`;

for(let prod of dados) {
    html += `< tr >
                <td>${prod.codigo}</td>
                <td>${prod.nome}</td>
                <td>${prod.categoria}</td>
                <td>${prod.valor}</td>
                <td>${prod.quantidade}</td>
                <td>${prod.unidade}</td>
            </tr > `;
}

html += '</tbody>';
tab.innerHTML = html;
}

function capturaUrlProduto() {
    let urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('codigo')) {
        let novoProd = {
            codigo: urlParams.get('codigo'),
            nome: urlParams.get('nome'),
            categoria: urlParams.get('categoria'),
            valor: urlParams.get('valor'),
            quantidade: urlParams.get('quantidade'),
            unidade: urlParams.get('unidade')
        };
        
        
        vetProdutos.push(novoProd);
    }
}

capturaUrlProduto();
carregaProdutos(vetProdutos);