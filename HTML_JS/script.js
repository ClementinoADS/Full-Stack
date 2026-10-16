// Inicializa os ícones
lucide.createIcons();

// Elementos do DOM (Pegando os elementos que estão no HTML)
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Carrega as tarefas salvas no localStorage ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para salvar no localStorage e atualizar a tela
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

// Função para renderizar a lista na tela (manipulando o HTML via JS)
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="text-center py-8 text-slate-500 text-sm">
                Nenhuma tarefa cadastrada ainda. Vamos começar?
            </div>
        `;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3.5 rounded-xl border transition-all ${
            task.completed 
                ? 'bg-slate-900/40 border-slate-800 text-slate-500 line-through' 
                : 'bg-slate-900 border-slate-700 text-slate-200'
        }`;

        li.innerHTML = `
            <div class="flex items-center gap-3 cursor-pointer flex-1 select-none" onclick="toggleTask(${task.id})">
                <div class="w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    task.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-600'
                }">
                    ${task.completed ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                </div>
                <span class="text-sm break-all">${escapeHTML(task.text)}</span>
            </div>
            <button onclick="deleteTask(${task.id})" class="text-slate-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer" title="Excluir">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        `;

        taskList.appendChild(li);
    });

    // Atualiza ícones gerados dinamicamente
    lucide.createIcons();

    // Atualiza o contador de pendentes no rodapé do HTML
    const pendingCount = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${pendingCount} ${pendingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
}

// Previne injeção de HTML básica no input
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Event Listeners (Escutando ações do usuário)
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