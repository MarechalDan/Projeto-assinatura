// ESSA PARTE E DA TELA (HTML)
// ELA CHAMA O MODEL PRA PEGAR OS DADOS E MOSTRA NA TABELA

// passa um texto e ela devolve um texto "seguro" pra colocar no html
// assim se alguem digitar coisa estranha nao quebra a pagina
function escapeHtml(texto) {
    var div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// quando clica em Adicionar Documento essa funcao roda
// abre um prompt pro nome, nao deixa vazio, chama o model pra salvar
// e cria uma linha nova na tabela
function adicionarDocumento() {
    var nome = window.prompt('Nome do documento:', '');
    if (nome === null) {
        return;
    }

    if (nome.trim() === '') {
        window.alert('O nome do documento está vazio. Digite um nome para adicionar.');
        return;
    }

    var doc = registrarDocumento(nome);
    var tbody = document.getElementById('tabela');
    if (tbody == null) {
        return;
    }

    var tr = document.createElement('tr');
    tr.setAttribute('data-id', String(doc.id));
    tr.innerHTML = linhaDocumentoHtml(doc);
    tbody.appendChild(tr);
}

// monta o html de uma linha (td e botoes) de um documento
// se tiver Assinado o botao fala Desfazer, senao fala Assinar
function linhaDocumentoHtml(doc) {
    var textoBotao = 'Assinar';
    if (doc.status === 'Assinado') {
        textoBotao = 'Desfazer';
    }

    var html = '';
    html = html + '<td>' + escapeHtml(String(doc.id)) + '</td>';
    html = html + '<td>' + escapeHtml(doc.nome) + '</td>';
    html = html + '<td>' + escapeHtml(doc.status) + '</td>';
    html =
        html +
        '<td><button type="button" class="btn btn-sm btn-outline-primary" onclick="assinarDocumento(' +
        doc.id +
        ')">' +
        textoBotao +
        '</button></td>';
    html =
        html +
        '<td><button type="button" class="btn btn-sm btn-outline-danger" onclick="removerDocumento(' +
        doc.id +
        ')">Remover</button></td>';

    return html;
}

// quando clica em Assinar ou Desfazer essa funcao roda
// ela ve o status atual e troca (Pendente vira Assinado e o contrario)
// atualiza no model e redesenha a linha
function assinarDocumento(id) {
    var docAtual = obterDocumentoPorId(id);
    if (docAtual == null) {
        return;
    }

    var novoStatus = 'Assinado';
    if (docAtual.status === 'Assinado') {
        novoStatus = 'Pendente';
    }

    definirStatusDocumento(id, novoStatus);
    atualizarLinhaTabela(id);
}

// quando clica em Remover essa funcao roda
// apaga do model e tira a linha da tabela na tela
function removerDocumento(id) {
    var ok = excluirDocumento(id);
    if (ok === false) {
        return;
    }

    var tbody = document.getElementById('tabela');
    if (tbody == null) {
        return;
    }

    var tr = tbody.querySelector('tr[data-id="' + id + '"]');
    if (tr != null) {
        tr.remove();
    }
}

// acha a linha certa pelo id e coloca o html de novo (quando muda status)
function atualizarLinhaTabela(id) {
    var doc = obterDocumentoPorId(id);
    if (doc == null) {
        return;
    }

    var tbody = document.getElementById('tabela');
    if (tbody == null) {
        return;
    }

    var tr = tbody.querySelector('tr[data-id="' + id + '"]');
    if (tr == null) {
        return;
    }

    tr.innerHTML = linhaDocumentoHtml(doc);
}

// quando a pagina termina de carregar essa funcao roda uma vez
// ela limpa o tbody e desenha de novo todas as linhas que tem no model
function renderizarTabelaInicial() {
    var tbody = document.getElementById('tabela');
    if (tbody == null) {
        return;
    }

    tbody.innerHTML = '';

    var docs = obterDocumentos();
    var i;
    for (i = 0; i < docs.length; i = i + 1) {
        var doc = docs[i];
        var tr = document.createElement('tr');
        tr.setAttribute('data-id', String(doc.id));
        tr.innerHTML = linhaDocumentoHtml(doc);
        tbody.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', renderizarTabelaInicial);
