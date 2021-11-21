// 로컬 스토리지 저장에 관한 함수들
let todoList = [];

function loadToDo() {
  const loadToDos = localStorage.getItem('My ToDoList');

  if (loadToDos !== null) {
    const parsedTodos = JSON.parse(loadToDos);
    parsedTodos.forEach(todo => addList(todo.text))
  }
}

function saveToDos() {
  localStorage.setItem('My ToDoList', JSON.stringify(todoList))
}

// 버튼 동작에 관한 함수들
function submitHandle(e) {
  e.preventDefault();

  const input = document.querySelector('#form_input');
  addList(input.value);
  input.value = "";
}

function addList(inputValue) {
  const itemList = document.querySelector('#todo_contents');

  if (inputValue  === '') return alert('입력하세요');

  const addNewItem = createItem(inputValue);
  itemList.appendChild(addNewItem);

  newToDoObj(itemList, inputValue)
  saveToDos();
}

function newToDoObj(item, inputText) {
  const addId = item.lastChild.id = todoList.length + 1;
  const todoObj = {
    text: inputText,
    id: addId,
    done: false,
  }

  return todoList.push(todoObj);
}

function createItem(inputValue) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'todo_item');
  newItem.innerHTML = `
  <button class="item_checkBtn">
  <i class="far fa-square checkIcon"></i>
  </button>
  <span class="item_text" data-done=false>${inputValue}</span> 
  <button class="item_deleteBtn">
  <i class="fas fa-minus-circle deleteIcon"></i>
  </button>
  `;

  return newItem
}

function checkBtnOnOff(e) {
  e.classList.toggle('fa-square');
  e.classList.toggle('fa-check-square');

  doneTodos(e);
}

// 아직 localStorage에 영구적으로 저장은 안됨
function doneToDos(e) {
  const findTodoIndex = todoList.findIndex((todo) => todo.id == e.closest('.todo_item').id);
  
  const itemText = e.parentElement.nextElementSibling;
  
  // 수정 필요
  if (e.classList.contains('fa-check-square')) {
    todoList[findTodoIndex].done = true;
    itemText.dataset.done = true;
  } else {
    todoList[findTodoIndex].done = false;
    itemText.dataset.done = false;
  }
  
  saveToDos();
}

function removeList(e) {
  e.closest('.todo_item').remove();

  // localStorage에서 삭제
  const removeToDos = todoList.filter((todo) => {
    return todo.id !== parseInt(e.closest('.todo_item').id)
  })

  todoList = removeToDos;

  saveToDos();
}


function btnClickHandler() {
  const itemLists = document.querySelector('#todo_contents');
  itemLists.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkIcon')) checkBtnOnOff(e.target);
    if (e.target.classList.contains('deleteIcon')) removeList(e.target);
  });
}

function formSubmitHandler() {
  const todoForm = document.querySelector('#todo_form');
  todoForm.addEventListener('submit', submitHandle);
}

// 페이지 실행시 가장 먼저 실행되는 함수
(function init() {
  loadToDo();
  formSubmitHandler();
  btnClickHandler();
})();
