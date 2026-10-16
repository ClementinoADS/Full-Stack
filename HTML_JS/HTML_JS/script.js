// Inicializa os ícones do Lucide
lucide.createIcons();

// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Carrega as tarefas salvas no localStorage ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar no localStorage e renderizar
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Função para adicionar nova tarefa
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    saveAndRender();
}

// Função para alternar o status de concluído
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
}

// Função para remover uma tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// Função para renderizar a lista na tela
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                Nenhuma tarefa cadastrada ainda. Vamos começar?
            </div>
        `;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="task-content" onclick="toggleTask(${task.id})">
                <div class="task-checkbox">
                    ${task.completed ? '<i data-lucide="check" style="width: 12px; height: 12px;"></i>' : ''}
                </div>
                <span class="task-text">${escapeHTML(task.text)}</span>
            </div>
            <button onclick="deleteTask(${task.id})" class="delete-btn" title="Excluir">
                <i data-lucide="trash-2" class="delete-icon"></i>
            </button>
        `;

        taskList.appendChild(li);
    });

    // Atualiza ícones gerados dinamicamente
    lucide.createIcons();

    // Atualiza o contador de pendentes
    const pendingCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${pendingCount} ${pendingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
}

// Previne injeção de HTML básica no input
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearAllBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
});

// Executa a primeira renderização ao carregar a página
renderTasks();