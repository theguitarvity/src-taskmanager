// task-view.js
document.addEventListener('DOMContentLoaded', function () {
    const markCompletedButton = document.createElement('button');
    // Obtém o ID da tarefa da URL, por exemplo, /task/taskId
    const taskId = window.location.pathname.split('/').pop();


    /**
     * Marca a tarefa como concluída.
     * @returns {void}
     */
    const markAsCompleted = () => {
        fetch(`/api/task/${taskId}/complete`, {
            method: 'PUT', // Utilize o método PUT para atualizar a tarefa
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível marcar a tarefa como concluída');
                }
                return response.json();
            })
            .then(updatedTask => {
                // Atualiza a página com os detalhes da tarefa atualizados
                const taskDetailsDiv = document.getElementById('taskDetails');
                taskDetailsDiv.innerHTML = `
            <p><strong>Título:</strong> ${updatedTask.task["title"]}</p>
            <p><strong>Descrição:</strong> ${updatedTask.task["description"]}</p>
            <p><strong>Status:</strong> ${updatedTask.task["completed"] ? 'Concluída' : 'Pendente'}</p>
          `;
                alert('Tarefa marcada como concluída!');
                // Desabilita o botão após marcar como concluída
                markCompletedButton.hidden = true;
            })
            .catch(error => {
                console.error(error);
                // Em caso de erro, exiba uma mensagem adequada na página
                alert('Não foi possível marcar a tarefa como concluída.');
            });
    };

    // Realiza uma solicitação GET para obter os detalhes da tarefa
    fetch(`/api/task/${taskId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os detalhes da tarefa');
            }
            return response.json();
        })
        .then(task => {
            // Atualiza o conteúdo da div com os detalhes da tarefa
            const taskDetailsDiv = document.getElementById('taskDetails');
            taskDetailsDiv.innerHTML = `
      <p><strong>Título:</strong> ${task.title}</p>
      <p><strong>Descrição:</strong> ${task.description}</p>
      <p><strong>Status:</strong> ${task.completed ? 'Concluída' : 'Pendente'}</p>
    `;

            // Adiciona um botão para marcar como concluída apenas se a tarefa estiver pendente
            if (!task.completed) {
                // Cria o botão

                markCompletedButton.id = 'markCompleted';
                markCompletedButton.textContent = 'Marcar como Concluída';

                // Adiciona um ouvinte de evento para chamar a função ao clicar no botão
                markCompletedButton.addEventListener('click', markAsCompleted);

                // Adiciona o botão à página
                document.getElementById('taskDetails').appendChild(markCompletedButton);
            }
        })
        .catch(error => {
            console.error(error);
            // Em caso de erro, você pode exibir uma mensagem adequada na página
            const taskDetailsDiv = document.getElementById('taskDetails');
            taskDetailsDiv.innerHTML = '<p>Não foi possível obter os detalhes da tarefa.</p>';
        });
});