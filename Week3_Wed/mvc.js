// 로컬 스토리지 관련
class Model {
  constructor() {
    this.todoList = [];
  }

  loadToDos() {

  }

  saveToDos() {

  }

  addToDos() {

  }

  doneToDos() {

  }

  removeToDos() {

  }
}

// UI 관련 (DOM)
class View {
  constructor() {
    this.form = document.querySelector('#todo_form');
    this.input = document.querySelector('#form_input');
    this.itemLists = document.querySelector('#todo_contents');
  }

  getInputText() {
    return this.input.value
  }

  resetInputText() {
    return this.input.value = '';
  }

  renderTodo(inputValue) {
    if (inputValue  === '') return alert('입력하세요');

    const addNewItem = this.createItem(inputValue);
    this.itemLists.appendChild(addNewItem);
  }

  createItem(inputValue) {
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

  checkBtnOnOff(e) {
    e.classList.toggle('fa-square');
    e.classList.toggle('fa-check-square');

    const itemText = e.parentElement.nextElementSibling;
  
    e.classList.contains('fa-check-square') 
    ? itemText.dataset.done = true
    : itemText.dataset.done = false;
  }

  removeList(e) {
    e.closest('.todo_item').remove();
  }
}

// 이벤트 핸들러, init 
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.formSubmitHandler();
    this.btnClickHandler();
  }

  formSubmitHandler() {
    this.view.form.addEventListener('submit', (e) => this.submitHandle(e));
  }

  submitHandle(e) {
    e.preventDefault();
    this.view.renderTodo(this.view.getInputText());
    this.view.resetInputText();
  }

  btnClickHandler() {
    this.view.itemLists.addEventListener('click', e => {
      if (e.target.classList.contains('checkIcon')) this.view.checkBtnOnOff(e.target);

      if (e.target.classList.contains('deleteIcon')) this.view.removeList(e.target);
    })
  }
}


const model = new Model();
const view = new View();
const todoList = new Controller(model, view);
todoList.init();