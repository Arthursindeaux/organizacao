function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        closeModal();
    }
}

function task_sem_nome(taskName){
    if (!taskName.trim()) { 
        alert('Você esqueceu de adicionar um nome para sua task !');
        return false;
    }
    return true;
}

function priority_sem_opcao_marcada(priority){
    if (!priority) {
        alert("Você esqueceu de colocar a prioridade da sua task !")
        return false
    }
    return true;
}

function time_sem_opcao_marcada(tempo){
    if (!tempo) {
        alert("Você esqueceu de colocar um tempo estimado para sua task ! ")
        return false;
    }
    return true;
}

function recebendo_dados_da_task(){
    let taskName = document.querySelector('input[placeholder="Nome da Tarefa"]').value;
    let priority = document.querySelector('input[name="prioridade"]:checked');
    let tempo = document.querySelector('input[name="tempo"]:checked');

    return  {taskName,priority,tempo}
}

function filtrando_nome_do_tempo(tempo){
    if (tempo) {
        if (tempo.value === 'quinze') 
            return '15 minutos';
        else if (tempo.value === 'trinta') 
            return '30 minutos';
        else if (tempo.value === 'sessenta') 
            return '60 minutos';
    } 
}

function definindo_Cor_Postit(priorityValue){
    if (priorityValue === 'Normal') {
        return 'priority-normal';
    } else if (priorityValue === 'Importante') {
        return 'priority-importante';
    } else if (priorityValue === 'Urgente') {
        return 'priority-crucial';
    } 
}

function criando_elemento_visual(priorityClass) {
    const postIt = document.createElement('div');
    postIt.className = `post-it ${priorityClass}`;
    return postIt;
}

function extraindo_minutagem_task(tempo_Text_Final){
    const minutes = parseInt(tempo_Text_Final.split(" ")[0]);
    return minutes
}

function html_dinamico_postit(taskName, priorityValue, tempo_Text_Final, minutes) {
    return `
        <strong>Tarefa:</strong> ${taskName}<br>
        <strong>Prioridade:</strong> ${priorityValue}<br>
        <strong>Tempo:</strong> ${tempo_Text_Final}<br>
        <div class="timer">${minutes}:00</div>
        <button class="play-button">▶ Iniciar</button>
        <button class="complete-btn">✅ Concluido</button>
    `;
}

function inserir_postit_tela(taskBoard,postIt){
    taskBoard.appendChild(postIt);
}

function Iniciar_cronometro_quando_clicado(playButton, timerElement, minutes){
    let countdownStarted = false;
    playButton.addEventListener('click', () => {
        if (!countdownStarted) {
            startCountdown(timerElement, minutes);
            countdownStarted = true;
            playButton.disabled = true;
            playButton.textContent = 'Em andamento';
        }
    });
}

function botao_task_concluida(postIt){
    const completeBtn = postIt.querySelector('.complete-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            postIt.style.opacity = '0.5';
            postIt.style.textDecoration = 'line-through';
            completeBtn.disabled = true;
             });
    }
}


function criando_Postit(priorityClass, taskName, tempo_Text_Final, priorityValue) {
    const taskBoard = document.getElementById('task-board');
    const postIt = criando_elemento_visual(priorityClass)

    const minutes =  extraindo_minutagem_task(tempo_Text_Final)

    postIt.innerHTML = html_dinamico_postit(taskName, priorityValue, tempo_Text_Final, minutes)

    inserir_postit_tela(taskBoard,postIt)

    const timerElement = postIt.querySelector('.timer');
    const playButton = postIt.querySelector('.play-button');

    Iniciar_cronometro_quando_clicado(playButton, timerElement, minutes)

    botao_task_concluida(postIt);
}

function limpar_Dados_da_Task_Antiga(priority,tempo){
    document.querySelector('input[placeholder="Nome da Tarefa"]').value = '';
    if (priority) priority.checked = false;
    if (tempo) tempo.checked = false;
}

function addTask() {
    let { taskName, priority, tempo } = recebendo_dados_da_task();

    if (!task_sem_nome(taskName)) return;
    if (!priority_sem_opcao_marcada(priority)) return;
    if (!time_sem_opcao_marcada(tempo)) return;

    let tempo_Text_Final = filtrando_nome_do_tempo(tempo);
    let priorityValue = priority.value;
    let priorityClass = definindo_Cor_Postit(priorityValue);

    PostIt_Final = criando_Postit(priorityClass,taskName,tempo_Text_Final,priorityValue);

    limpar_Dados_da_Task_Antiga(priority, tempo);

    closeModal();
}

function tempo_em_segundos(minutes){
    return minutes * 60;
}

function quanto_tempo_falta_para_acabar(totalSeconds) {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return { min, sec };
}

function tempo_da_task_acabado(totalSeconds,interval,timerElement){
    if (totalSeconds <= 0) {
        clearInterval(interval);
        timerElement.textContent = 'Tempo esgotado!';
        timerElement.style.color = 'red';
    }
}

function startCountdown(timerElement, minutes) {
    let totalSeconds = tempo_em_segundos(minutes);

    const interval = setInterval(() => {
        let {min,sec} = quanto_tempo_falta_para_acabar(totalSeconds)

        timerElement.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;

        tempo_da_task_acabado(totalSeconds,interval,timerElement)

        totalSeconds--;
    }, 1000);
}