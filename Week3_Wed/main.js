// 로컬 스토리지 저장에 관한 함수들
let todoList = [];

function loadToDo() {
  const loadToDos = localStorage.getItem('My ToDoList');

  if (loadToDos !== null) {
    const parsedTodos = JSON.parse(loadToDos);

    parsedTodos.forEach((todo) => {
      addList(todo.text)
    })
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
  const checked = item.lastChild.dataset.check
  const todoObj = {
    text: inputText,
    id: addId,
    check: checked,
  }

  return todoList.push(todoObj);
}

function createItem(inputValue) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'todo_item');
  newItem.setAttribute('data-check', false);
  newItem.innerHTML = `
  <button class="item_checkBtn">
  <i class="far fa-square checkIcon"></i>
  </button>
  <span class="item_text">${inputValue}</span> 
  <button class="item_deleteBtn">
  <i class="fas fa-minus-circle deleteIcon"></i>
  </button>
  `;

  return newItem
}

function checkBtnOnOff(e) {
  e.classList.toggle('fa-square');
  e.classList.toggle('fa-check-square');

  const itemText = e.parentElement.nextElementSibling;
  itemText.classList.toggle('checked');

  // localStorage의 check 값을 덮어쓰기할 방법 생각중.. 함수 분리 해야할듯
  itemText.classList.contains('checked')
  ? e.closest('.todo_item').dataset.check = true
  : e.closest('.todo_item').dataset.check = false
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

// 페이지 실행시 가장 먼저 실행되는 함수
(function init() {
  loadToDo()

  const todoForm = document.querySelector('#todo_form');
  todoForm.addEventListener('submit', submitHandle);

  btnClickHandler();
})();
