// JavaScript Logic
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    // Load todos from localStorage when the page loads
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save todos to localStorage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to render todos
    const renderTodos = () => {
        todoList.innerHTML = ''; // Clear current list

        if (todos.length === 0) {
            const noTasksMessage = document.createElement('li');
            noTasksMessage.className = 'list-group-item text-center text-muted';
            noTasksMessage.textContent = 'No tasks yet! Add one above.';
            todoList.appendChild(noTasksMessage);
            return;
        }

        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = `list-group-item d-flex justify-content-between align-items-center todo-item ${todo.completed ? 'completed' : ''}`;
            listItem.setAttribute('data-index', index);

            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            todoText.className = 'todo-text';

            const actionsDiv = document.createElement('div');

            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = todo.completed ? '<i class="bi bi-check-circle-fill"></i> Completed' : '<i class="bi bi-circle"></i> Mark Complete';
            completeBtn.className = `btn btn-sm me-2 ${todo.completed ? 'btn-success' : 'btn-outline-success'}`;
            completeBtn.addEventListener('click', () => toggleComplete(index));

            const incompleteBtn = document.createElement('button');
            incompleteBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i> Incomplete';
            incompleteBtn.className = 'btn btn-sm btn-warning me-2';
            incompleteBtn.style.display = todo.completed ? 'inline-block' : 'none';
            incompleteBtn.addEventListener('click', () => markIncomplete(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Delete';
            deleteBtn.className = 'btn btn-sm btn-danger';
            deleteBtn.addEventListener('click', () => deleteTodo(index));

            actionsDiv.appendChild(completeBtn);
            actionsDiv.appendChild(incompleteBtn);
            actionsDiv.appendChild(deleteBtn);

            listItem.appendChild(todoText);
            listItem.appendChild(actionsDiv);
            todoList.appendChild(listItem);
        });
    };

    // Function to add a new todo
    const addTodo = () => {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            todos.push({ text: taskText, completed: false });
            todoInput.value = ''; // Clear input
            saveTodos();
            renderTodos();
        } else {
            alert('Please enter a task!');
        }
    };

    // Function to toggle todo completion status
    const toggleComplete = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    // Function to mark todo as incomplete
    const markIncomplete = (index) => {
        todos[index].completed = false;
        saveTodos();
        renderTodos();
    };

    // Function to delete a todo
    const deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    // Event Listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Initial render
    renderTodos();
});
