// 로컬 스토리지 관련
export default class TodoDataManager {
  constructor() {
    this.todoListName = 'My ToDoList'
    this.todoList = JSON.parse(localStorage.getItem(this.todoListName)) || [];
  }

  saveTodos() {
    localStorage.setItem(this.todoListName, JSON.stringify(this.todoList));
  }

  addTodo(todoText) {
    const todo = {
      text: todoText,
      done: false,
    }

    this.todoList.push(todo);

    this.saveTodos();
  }

  doneTodo(e) {
    const checked = this.todoList.find((todo) => todo.text === e.innerText);
    if(checked) checked.done = !checked.done;

    this.saveTodos();
  }

  removeTodoData(e) {
    this.todoList = this.todoList.filter(todo => todo.text !== e.children[1].innerText);
    
    this.saveTodos();
  }
}