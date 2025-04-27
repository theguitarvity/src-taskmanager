/**
 * Cria uma nova tarefa quando o formulário for submetido.
 * @param {Event} event - O evento de envio do formulário.
 */
document.addEventListener('DOMContentLoaded', function () {
    const addTaskForm = document.getElementById('addTaskForm');

    addTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        /**
         * Título da tarefa.
         * @type {string}
         */
        const title = document.getElementById('title').value;
        /**
         * Descrição da tarefa.
         * @type {string}
         */
        const description = document.getElementById('description').value;

        // Realiza uma requisição POST para adicionar uma nova tarefa
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                // Pode redirecionar para a página de listagem de tarefas ou realizar outras ações após adicionar a tarefa
                window.location.href = '/tasks';
            })
            .catch(error => console.error('Erro ao adicionar tarefa:', error));
    });
});