let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
exibirMensagemInicial();
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`, {rate:1.2});
}

function exibirMensagemInicial() {
exibirTextoNaTela(`h1`, `Hora do Desafio!`);
exibirTextoNaTela(`p`, `Escolha um número entre 1 e ${numeroMaximo}.`);
}

function verificarChute() {
    let chute = document.querySelector(`input`).value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela(`h1`, `Acertou!`);
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela(`p`, mensagemTentativa);

        document.getElementById(`reiniciar`).removeAttribute(`disabled`);
    } else {
        
        if (chute > numeroSecreto) {
            exibirTextoNaTela(`p`, `O número secreto é menor`);
        } else {
            exibirTextoNaTela(`p`, `O número secreto é maior`);
        } 
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroMaximo +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector(`input`);
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById(`reiniciar`).setAttribute(`disabled`, true);
}