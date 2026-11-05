
const perguntas = [
    {
        pergunta: "Qual é a minha cor favorita?",
        alternativas: ["Roxo", "Rosa", "Azul", "Amarelo"],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual país estranho eu conheceria?",
        alternativas: ["Afeganistão", "Egito", "Índia", "Turcomenistão"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual é a minha data de nascimento?",
        alternativas: ["15/05/2009", "20/06/2009", "17/04/2009", "20/05/2009"],
        respostaCorreta: 3
    },
    {
        pergunta: "Qual faculdade eu quero fazer?",
        alternativas: ["Zootecnia", "Agronomia", "Medicina Veterinária", "Agronomia"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual é o meu animal favorito?",
        alternativas: ["Cachorro", "Gato", "Papagaio", "Calopsita"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual tipo de homem eu gosto?",
        alternativas: ["Country", "Mandrake", "Old Money", "Rockeiro"],
        respostaCorreta: 0
    },
    {
        pergunta: "Onde eu moraria?",
        alternativas: ["Cidade grande", "Cidade pequena", "Interior", "Outro país"],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual comida de roça eu mais gosto?",
        alternativas: ["Galinha caipira", "Buchada", "Pé de frango", "Carneiro"],
        respostaCorreta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

function mostrarPergunta() {

    respondeu = false;

    document.getElementById("proxima").disabled = true;

    let pergunta = perguntas[perguntaAtual];

    document.getElementById("pergunta").textContent =
        (perguntaAtual + 1) + " - " + pergunta.pergunta;

    let alternativas = document.getElementById("alternativas");

    alternativas.innerHTML = "";

    pergunta.alternativas.forEach(function(alternativa, indice) {

        let botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.classList.add("alternativa");

        botao.onclick = function() {
            verificarResposta(indice);
        };

        alternativas.appendChild(botao);

    });

    document.getElementById("pontuacao").textContent =
        "Pontuação: " + pontuacao;
}


function verificarResposta(indice) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    let pergunta = perguntas[perguntaAtual];

    let botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(function(botao, posicao) {

        botao.disabled = true;

        if (posicao === pergunta.respostaCorreta) {
            botao.classList.add("correta");
        }

        if (posicao === indice && indice !== pergunta.respostaCorreta) {
            botao.classList.add("errada");
        }

    });

    if (indice === pergunta.respostaCorreta) {
        pontuacao++;
    }

    document.getElementById("pontuacao").textContent =
        "Pontuação: " + pontuacao;

    document.getElementById("proxima").disabled = false;
}

function proximaPergunta() {

    if (!respondeu) {
        return;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }
}


function mostrarResultado() {

    document.getElementById("quiz").style.display = "none";

    document.getElementById("resultado").style.display = "block";

    document.getElementById("mensagemResultado").textContent =
        "Você acertou " + pontuacao + " de " + perguntas.length + " perguntas!";
}


function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    respondeu = false;

    document.getElementById("resultado").style.display = "none";

    document.getElementById("quiz").style.display = "block";

    mostrarPergunta();
}


mostrarPergunta();
