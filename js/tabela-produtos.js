var produtosPadrao = [

    {
        codigo: '001',
        nome: 'Coca-Cola 2L',
        categoria: 'Bebidas',
        valor: 8.99,
        quantidade: 20,
        unidade: 'UN'
    },

    {
        codigo: '002',
        nome: 'Cerveja Heineken 600ML',
        categoria: 'Bebidas',
        valor: 12.00,
        quantidade: 15,
        unidade: 'UN'
    },

    {
        codigo: '003',
        nome: 'Gin Gordons 900ML',
        categoria: 'Bebidas',
        valor: 78.00,
        quantidade: 10,
        unidade: 'UN'
    }

];

let vetProdutos = JSON.parse(localStorage.getItem("produtos"));


if (vetProdutos == null) {

    vetProdutos = produtosPadrao;

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtosPadrao)
    );
}

let form = document.querySelector("#formProduto");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let produto = {

            codigo: document.querySelector('[name="codigo"]').value,

            nome: document.querySelector('[name="nome"]').value,

            categoria: document.querySelector('[name="categoria"]').value,

            valor: document.querySelector('[name="valor"]').value,

            quantidade: document.querySelector('[name="quantidade"]').value,

            unidade: document.querySelector('[name="unidade"]').value,

            obs: document.querySelector('[name="obs"]').value

        };

        vetProdutos.push(produto);

        localStorage.setItem(
            "produtos",
            JSON.stringify(vetProdutos)
        );

        window.location.href = "listadeprod.html";

    });

}

function carregaProdutos(dados) {

    let tab = document.querySelector('#tabela');

    if (!tab) {
        return;
    }

    let html = `
        <thead class="table-light">
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Unidade</th>
                <th>Observações</th>
            </tr>
        </thead>

        <tbody>
    `;

    for (let prod of dados) {

        html += `
            <tr>
                <td>${prod.codigo}</td>
                <td>${prod.nome}</td>
                <td>${prod.categoria}</td>
                <td>R$ ${prod.valor}</td>
                <td>${prod.quantidade}</td>
                <td>${prod.unidade}</td>
                <td>${prod.obs ? prod.obs : ''}</td>
            </tr>
        `;
    }

    html += `</tbody>`;

    tab.innerHTML = html;
}

carregaProdutos(vetProdutos);