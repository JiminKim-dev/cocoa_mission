// 로컬 스토리지 관련
class Model {
  constructor() {
    this.todoListName = 'My ToDoList'
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName)) || [];
  }

  saveToDos() {
    localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
  }

  addToDos(todoText) {
    const todo = {
      text: todoText,
      done: false,
    }

    this.todoList.push(todo);

    this.saveToDos();
  }

  doneToDos(e) {
    const checked = this.todoList.find((todo) => todo.text === e.innerText);
    if(checked) checked.done = !checked.done;

    this.saveToDos();
  }

  removeToDos(e) {
    this.todoList = this.todoList.filter(todo => todo.text !== e.children[1].innerText);
    
    this.saveToDos();
  }
}

// UI 관련 (DOM)
class View {
  constructor(model) {
    this.model = model;

    this.form = document.querySelector('#todo_form');
    this.input = document.querySelector('#form_input');
    this.itemLists = document.querySelector('#todo_contents');
  }

  getInputText() {
    return this.input.value;
  }

  resetInputText() {
    return this.input.value = '';
  }

  loadRenderTodos() {
    if (this.model.todoList !== null) {
      this.model.todoList.forEach(todo => {
        todo.done === true ? this.doneRenderTodo(todo.text) : this.renderTodo(todo.text);
      });
    } 
  }

  doneRenderTodo(inputValue) {
    const addNewItem = this.createTodo(inputValue);
    addNewItem.children[0].checked = true;
    addNewItem.children[1].dataset.done = true;
    this.itemLists.appendChild(addNewItem);
  }

  renderTodo(inputValue) {
    if (inputValue  === '') return alert('입력하세요');

    const addNewItem = this.createTodo(inputValue);
  
    this.itemLists.appendChild(addNewItem);
  }

  createTodo(inputValue) {
    const newItem = document.createElement('li');
    newItem.setAttribute('class', 'todo_item');
    newItem.innerHTML = `
      <input type="checkbox" class="checkbox"/>
      <span class="item_text" data-done=false>${inputValue}</span> 
      <button class="item_deleteBtn">
        <i class="fas fa-minus-circle deleteIcon"></i>
      </button>
    `;

    return newItem
  }

  checkBtnOnOff(e) {
    const itemText = e.nextElementSibling;
    e.checked ? itemText.dataset.done = true : itemText.dataset.done = false;

    this.model.doneToDos(itemText);
  }

  removeList(e) {
    e.closest('.todo_item').remove();

    this.model.removeToDos(e.closest('.todo_item'));
  }
}

// 이벤트 핸들러, init 
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.loadRenderTodos();
    this.formSubmitHandler();
    this.btnClickHandler();
  }

  formSubmitHandler() {
    this.view.form.addEventListener('submit', (e) => this.submitHandle(e));
  }

  submitHandle(e) {
    e.preventDefault();
    this.view.renderTodo(this.view.getInputText());
    this.model.addToDos(this.view.getInputText());
    this.view.resetInputText();
  }

  btnClickHandler() {
    this.view.itemLists.addEventListener('click', e => {
      if (e.target.classList.contains('checkbox')) this.view.checkBtnOnOff(e.target);

      if (e.target.classList.contains('deleteIcon')) this.view.removeList(e.target);
    })
  }
}


const model = new Model();
const view = new View(model);
const todoList = new Controller(model, view);
todoList.init();