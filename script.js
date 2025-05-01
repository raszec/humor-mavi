// Função para mudar o humor e ajustar os elementos
function mudarHumor(humor) {
    const nivel = document.getElementById('nivel');
    const mensagem = document.getElementById('mensagem');
    const ultimaResposta = document.getElementById('ultima-resposta');
    const fotoTopo = document.getElementById('foto-topo');
    const historico = document.getElementById('historico');
    
    let altura = '0%';
    let msg = '';
    let posicaoFoto = 0;

    switch(humor) {
        case 'muito-feliz':
            altura = '100%';
            msg = 'Hoje o dia está maravilhoso! 😁';
            posicaoFoto = 100;
            break;
        case 'feliz':
            altura = '80%';
            msg = 'Tudo está indo bem, estou feliz! 😊';
            posicaoFoto = 80;
            break;
        case 'normal':
            altura = '60%';
            msg = 'Um dia tranquilo... 😊';
            posicaoFoto = 60;
            break;
        case 'cansado':
            altura = '40%';
            msg = 'Preciso de uma pausa... 😅';
            posicaoFoto = 40;
            break;
        case 'triste':
            altura = '20%';
            msg = 'Hoje não estou tão bem... 😔';
            posicaoFoto = 20;
            break;
    }

    nivel.style.height = altura;
    nivel.className = 'nivel ' + humor;
    mensagem.innerHTML = msg;

    // Foto se move com a barrinha (com transição suave para o movimento)
    fotoTopo.style.transition = 'bottom 0.5s ease';  // Faz a transição suave na posição da foto
    fotoTopo.style.bottom = `calc(${altura} - 20px)`;  // Foto vai para a posição do nível

    // Atualizar última resposta com a data e hora
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    ultimaResposta.innerHTML = `Última resposta: ${humor} em ${dataFormatada} às ${horaFormatada}`;

    // Salvar no histórico
    salvarHistorico(humor, msg, dataFormatada, horaFormatada);
}

// Função para salvar no histórico
function salvarHistorico(humor, msg, data, hora) {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    
    // Adiciona o novo humor ao histórico
    historico.push({ humor, msg, data, hora });
    
    // Limita o histórico a 5 entradas
    if (historico.length > 5) {
        historico.shift();  // Remove o primeiro item
    }

    // Salva o histórico no localStorage
    localStorage.setItem('historico', JSON.stringify(historico));

    // Atualiza a exibição do histórico
    exibirHistorico();
}

// Função para exibir o histórico
function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const historicoDiv = document.getElementById('historico');
    historicoDiv.innerHTML = '';
    
    historico.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.data} às ${item.hora} - ${item.msg}`;
        historicoDiv.appendChild(div);
    });
}

// Exibe o histórico ao carregar a página
window.onload = exibirHistorico;
