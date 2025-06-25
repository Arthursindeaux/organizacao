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
function criando_Postit(priorityClass,taskName,tempo_Text_Final,priorityValue){
    const taskBoard = document.getElementById('task-board');
    const postIt = document.createElement('div');
    postIt.className = `post-it ${priorityClass}`;
    postIt.innerHTML = `
        <strong>Tarefa:</strong> ${taskName}<br>
        <strong>Prioridade:</strong> ${priorityValue}<br>
        <strong>Tempo:</strong> ${tempo_Text_Final}`;
    taskBoard.appendChild(postIt);

    }
function addTask() {
    let { taskName, priority, tempo } = recebendo_dados_da_task();

    if (!task_sem_nome(taskName)) return;
    if (!priority_sem_opcao_marcada(priority)) return;
    if (!time_sem_opcao_marcada(tempo)) return;

    let tempo_Text_Final = filtrando_nome_do_tempo(tempo);
    let priorityValue = priority.value;
    let priorityClass = definindo_Cor_Postit(priorityValue);

    PostIt_Final = criando_Postit(priorityClass,taskName,tempo_Text_Final,priorityValue)

    // Limpa os campos depois
    document.querySelector('input[placeholder="Nome da Tarefa"]').value = '';
    if (priority) priority.checked = false;
    if (tempo) tempo.checked = false;

    closeModal();
}

