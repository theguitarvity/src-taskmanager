/**
 * Realiza uma requisição GET para obter a lista de tarefas do servidor e exibe as tarefas na página.
 * @function
 * @returns {void}
 */
// tasks.js
document.addEventListener('DOMContentLoaded', function () {
    // Realiza uma requisição GET para obter a lista de tarefas do servidor
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');

            // Limpa a lista de tarefas antes de adicionar as novas
            taskList.innerHTML = '';

            // Adiciona cada tarefa à lista
            tasks.forEach(task => {
                const listItem = document.createElement('li');

                // Cria um link para a visualização da tarefa
                const taskLink = document.createElement('a');
                taskLink.href = `/task/${task.id}`;
                taskLink.textContent = `${task.title} - ${task.completed ? 'Concluída' : 'Pendente'}`;

                listItem.appendChild(taskLink);
                taskList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao obter lista de tarefas:', error));
});