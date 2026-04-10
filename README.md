# Projeto-assinatura
Crud assinatura
Projeto Safeduc

Linguagens: Javascript + bootstrap

O que isso faz

E uma pagina com uma tabela de documentos.
Voce pode adicionar linha, mudar status entre Pendente e Assinado, e remover linha.
Os dados ficam no navegador (localStorage), entao se atualizar a pagina normalmente continua la.

Como abrir

Abra o arquivo view/view.html no navegador.

Se os arquivos model e controller nao carregarem, use um servidor simples ou Live Server no VSCode.

Pastas

view
view.html e a pagina.
style.css e o visual.

model
model.js guarda a lista em memoria e salva/carrega no localStorage.

controller
controller.js liga os botoes com o model e monta a tabela na tela.

Funcoes do model (model.js)

salvarDocumentosNoStorage
Grava a lista atual no localStorage.

carregarDocumentosDoStorage
Le o que tava salvo e monta a lista de novo. Tambem arruma o proximo id.

obterDocumentos
Devolve a lista pra outras funcoes usarem.

registrarDocumento
Cria documento novo com status Pendente e salva.

obterDocumentoPorId
Acha um documento pelo numero do id.

definirStatusDocumento
Muda Pendente ou Assinado e salva.

excluirDocumento
Apaga um documento da lista e salva.

Funcoes do controller (controller.js)

escapeHtml
Deixa texto seguro pra colocar no HTML.

adicionarDocumento
Pede o nome, nao deixa vazio, chama o model e coloca linha na tabela.

linhaDocumentoHtml
Monta o HTML de uma linha com id nome status e botoes.

assinarDocumento
Troca o status e atualiza a linha.

removerDocumento
Apaga no model e remove a linha da tela.

atualizarLinhaTabela
So redesenha uma linha quando o status muda.

renderizarTabelaInicial
Quando abre a pagina, desenha todas as linhas que ja existem salvas.

localStorage

A chave usada e safeduc_documentos.
Se quiser zerar tudo pode apagar essa chave nas ferramentas do navegador (F12, parte de Application ou Armazenamento).
