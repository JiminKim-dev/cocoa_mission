// UI 관련 (DOM)
export default class TodoViewManager {
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

    this.model.doneTodo(itemText);
  }

  removeTodo(e) {
    e.closest('.todo_item').remove();

    this.model.removeTodoData(e.closest('.todo_item'));
  }
}