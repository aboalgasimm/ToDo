let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(filter = '') {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    const filtered = todos.filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()));

filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onclick = () => {
      todo.completed = checkbox.checked;
      saveTodos();
    };

    const span = document.createElement('span');
    span.textContent = todo.text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTodo(index);
    editBtn.className = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(index);
    deleteBtn.className = 'delete-btn';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });

  document.getElementById('counter').textContent = `Total: ${filtered.length}`;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (text === '') return;

  todos.push({ text, completed: false });
  input.value = '';
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function editTodo(index) {
  const list = document.getElementById('todoList');
  const li = list.children[index];
  const span = li.querySelector('span');

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todos[index].text;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.onclick = () => {
    todos[index].text = input.value.trim();
    saveTodos();
    renderTodos();
  };

  li.innerHTML = '';
  li.classList.add('editing');
  li.appendChild(input);
  li.appendChild(saveBtn);
}

function searchTodos() {
  const query = document.getElementById('searchInput').value;
  renderTodos(query);
}

renderTodos();

document.getElementById('toggle-night').onclick = function() {
    document.body.classList.toggle('night');
    localStorage.setItem('nightMode', document.body.classList.contains('night'));
};

if (localStorage.getItem('nightMode') === 'true') {
     document.body.classList.add('night');
}  