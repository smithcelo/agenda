import 'core-js/stable';
import 'regenerator-runtime';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(taskForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = '/exibe';
        }
    });
});
