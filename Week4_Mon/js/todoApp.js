import TodoDataManager from './todoDataManager.js';
import TodoViewManager from './todoViewManager.js';
import TodoController from './todoController.js';

function loadEventHandle() {
  const model = new TodoDataManager();
  const view = new TodoViewManager(model);
  const todoList = new TodoController(model, view);
  
  todoList.init();
}

window.addEventListener('DOMContentLoaded', loadEventHandle);