// AQUI FICA A LISTA DE DOCUMENTOS (OS DADOS)
// TAMBEM GRAVA NO NAVEGADOR PRA NAO PERDER QUANDO DER F5

var STORAGE_CHAVE = 'safeduc_documentos';

var documentos = [];
var proximoId = 1;

// essa funcao pega a lista documentos e transforma em texto
// ai guarda no localStorage com uma chave (nome) fixa
function salvarDocumentosNoStorage() {
    var texto = JSON.stringify(documentos);
    localStorage.setItem(STORAGE_CHAVE, texto);
}

// essa funcao le o que ta salvo no navegador
// monta de novo a lista documentos e arruma o proximo id pra nao repetir numero
function carregarDocumentosDoStorage() {
    var salvo = localStorage.getItem(STORAGE_CHAVE);
    if (salvo == null || salvo === '') {
        return;
    }

    try {
        var lista = JSON.parse(salvo);
        if (lista == null) {
            return;
        }

        // se nao tiver length nao e lista entao sai
        if (lista.length === undefined) {
            return;
        }

        documentos = [];
        var maior = 0;

        var i;
        for (i = 0; i < lista.length; i = i + 1) {
            var item = lista[i];
            if (item == null) {
                continue;
            }
            if (typeof item.id !== 'number') {
                continue;
            }

            var nome = item.nome;
            if (typeof nome !== 'string') {
                nome = 'Documento ' + item.id;
            }

            var status = 'Pendente';
            if (item.status === 'Assinado') {
                status = 'Assinado';
            }

            documentos.push({
                id: item.id,
                nome: nome,
                status: status,
            });

            if (item.id > maior) {
                maior = item.id;
            }
        }

        proximoId = maior + 1;
    } catch (e) {
        // se o json tiver ruim nao faz nada (lista fica vazia mesmo)
    }
}

// devolve a lista inteira (pra outra parte do codigo usar)
function obterDocumentos() {
    return documentos;
}

// cria um documento novo com nome e status Pendente
// aumenta o id e ja salva no localStorage
function registrarDocumento(nome) {
    var id = proximoId;
    proximoId = proximoId + 1;

    var doc = {
        id: id,
        nome: nome.trim(),
        status: 'Pendente',
    };

    documentos.push(doc);
    salvarDocumentosNoStorage();
    return doc;
}

// passa um id e ela procura na lista qual documento tem esse id
// se nao achar devolve undefined
function obterDocumentoPorId(id) {
    var i;
    for (i = 0; i < documentos.length; i = i + 1) {
        if (documentos[i].id === id) {
            return documentos[i];
        }
    }
    return undefined;
}

// acha o documento pelo id e muda o status (Pendente ou Assinado)
// depois salva de novo no localStorage
function definirStatusDocumento(id, status) {
    var doc = obterDocumentoPorId(id);
    if (doc != null) {
        doc.status = status;
        salvarDocumentosNoStorage();
    }
    return doc;
}

// acha o documento pelo id e tira da lista
// retorna true se removeu e false se nao achou
function excluirDocumento(id) {
    var i;
    for (i = 0; i < documentos.length; i = i + 1) {
        if (documentos[i].id === id) {
            documentos.splice(i, 1);
            salvarDocumentosNoStorage();
            return true;
        }
    }
    return false;
}

// quando o arquivo carrega ja tenta puxar o que tava salvo antes
carregarDocumentosDoStorage();
