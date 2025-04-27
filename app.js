const express = require('express');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json'); // Adicionado para acessar informações do package.json
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const tasks = [
    {
        id: "1",
        title: "Fazer Compras",
        description: "Comprar itens essenciais no mercado",
        completed: false
    },
    {
        id: "2",
        title: "Estudar Node.js",
        description: "Aprender sobre Node.js e construir aplicativos",
        completed: true
    },
    {
        id: "3",
        title: "Fazer Exercícios",
        description: "Realizar exercícios físicos diários",
        completed: false
    }
];

/**
 * Rota para exibir a página inicial.
 * @name GET /
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Rota para exibir a página de tarefas.
 * @name GET /tasks
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'tasks.html'));
});

/**
 * Rota para obter todas as tarefas.
 * @name GET /api/tasks
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

/**
 * Rota para adicionar uma nova tarefa.
 * @name POST /api/tasks
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    const newId = tasks.length + 1;
    newTask.id = newId.toString();
    newTask.completed = false;
    tasks.push(newTask);
    console.log('Nova tarefa adicionada:', newTask);
    res.json({ message: 'Tarefa adicionada com sucesso!', task: newTask });
});

/**
 * Rota para exibir a página de adicionar tarefas.
 * @name GET /tasks/add
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/tasks/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages', 'add-task.html'));
});

/**
 * Rota para exibir os detalhes de uma tarefa específica.
 * @name GET /task/:taskId
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/task/:taskId', (req, res) => {
    // Recupere o ID da tarefa da solicitação
    const taskId = req.params.taskId;

    // Aqui você pode buscar os detalhes da tarefa com base no ID, por exemplo, em seu array `tasks`
    // Supondo que `tasks` seja um array de objetos que tem um campo `id` correspondente ao taskId
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        // Se a tarefa não for encontrada, retorne um status 404 (Not Found)
        res.status(404).send('Tarefa não encontrada');
        return;
    }

    // Renderize uma página (por exemplo, task-view.html) com os detalhes da tarefa
    res.sendFile(path.join(__dirname, 'public/pages', 'task-view.html'));
});

/**
 * Rota para obter os detalhes de uma tarefa com base no ID.
 * @name GET /api/task/:taskId
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.get('/api/task/:taskId', (req, res) => {
    // Recupere o ID da tarefa da solicitação
    const taskId = req.params.taskId;

    // Aqui você pode buscar os detalhes da tarefa com base no ID, por exemplo, em seu array `tasks`
    // Supondo que `tasks` seja um array de objetos que tem um campo `id` correspondente ao taskId
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        // Se a tarefa não for encontrada, retorne um status 404 (Not Found)
        res.status(404).json({ error: 'Tarefa não encontrada' });
        return;
    }

    // Retorne os detalhes da tarefa em formato JSON
    res.json(task);
});

/**
 * Rota para marcar uma tarefa como concluída.
 * @name PUT /api/task/:taskId/complete
 * @function
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
app.put('/api/task/:taskId/complete', (req, res) => {
    const taskId = req.params.taskId;
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;

        res.json({ message: 'Tarefa marcada como concluída!', task: tasks[taskIndex] });

    } else {
        res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
});

/**
 * Inicia o servidor Express.
 * @name listen
 * @function
 * @param {number} port - O número da porta em que o servidor será executado.
 * @param {Function} callback - Função de retorno de chamada para ser executada quando o servidor estiver pronto para aceitar conexões.
 */
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Versão do ${packageInfo.name}: ${packageInfo.version}`); // Adicionado para exibir informações do pacote
});