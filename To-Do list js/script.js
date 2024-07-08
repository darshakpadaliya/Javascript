document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = '';
            taskInput.focus();
        }
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    clearAllBtn.addEventListener('click', () => {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.className = 'task-text';
        taskSpan.addEventListener('dblclick', () => editTask(taskSpan));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function editTask(taskSpan) {
        const originalText = taskSpan.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'edit-input';

        input.addEventListener('blur', () => {
            taskSpan.textContent = input.value.trim() || originalText;
            taskSpan.style.display = '';
            taskSpan.parentNode.removeChild(input);
        });

        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                input.blur();
            }
        });

        taskSpan.style.display = 'none';
        taskSpan.parentNode.insertBefore(input, taskSpan);
        input.focus();
    }
});
