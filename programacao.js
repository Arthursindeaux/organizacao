function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addTask() {
    const taskName = document.querySelector('input[placeholder="Nome da Tarefa"]').value;
    const priority = document.querySelector('input[name="prioridade"]:checked');
    const time = document.querySelector('input[name="tempo"]:checked');

    // Evita criar task sem nome
    if (!taskName.trim()) {
        alert('Por favor, insira um nome para a tarefa.');
        return;
    }

    const priorityValue = priority ? priority.value : 'Sem prioridade';
    let timeText = '';
    if (time) {
        if (time.value === 'quinze') timeText = '15 minutos';
        else if (time.value === 'trinta') timeText = '30 minutos';
        else if (time.value === 'sessenta') timeText = '60 minutos';
    } else {
        timeText = 'Não definido';
    }

    // Definindo a classe CSS de acordo com a prioridade
    let priorityClass = '';
    if (priorityValue === 'Normal') {
        priorityClass = 'priority-normal';
    } else if (priorityValue === 'Importante') {
        priorityClass = 'priority-importante';
    } else if (priorityValue === 'Urgente') {
        priorityClass = 'priority-crucial';
    } else {
        priorityClass = 'priority-none';  // Caso não defina prioridade
    }

    const taskBoard = document.getElementById('task-board');
    const postIt = document.createElement('div');
    postIt.className = `post-it ${priorityClass}`;
    postIt.innerHTML = `
        <strong>Tarefa:</strong> ${taskName}<br>
        <strong>Prioridade:</strong> ${priorityValue}<br>
        <strong>Tempo:</strong> ${timeText}
    `;

    taskBoard.appendChild(postIt);

    // Limpa os campos depois
    document.querySelector('input[placeholder="Nome da Tarefa"]').value = '';
    if (priority) priority.checked = false;
    if (time) time.checked = false;

    closeModal();
}

