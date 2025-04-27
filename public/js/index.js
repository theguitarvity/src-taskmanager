document.addEventListener('DOMContentLoaded', () => {
    const tasksList = document.getElementById('taskList');
    fetch('api/tasks')
        .then(res => res.json())
        .then(tasks => {
            tasks.forEach(task => {
                const taskElement = document.createElement('p');
                taskElement.textContent = `${task.title} - ${task.completed ? 'Concluída' : 'Pendente'}`;
                tasksList.appendChild(taskElement);
            })
        })
        .catch(error => console.log(error));
})