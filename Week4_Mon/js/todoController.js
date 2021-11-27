// 이벤트 핸들러, init 
export default class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.loadRenderTodos();
    this.formSubmitHandler();
    this.btnClickHandler();
  }

  submitHandle(e) {
    e.preventDefault();
    this.view.renderTodo(this.view.getInputText());
    this.model.addTodo(this.view.getInputText());
    this.view.resetInputText();
  }

  formSubmitHandler() {
    this.view.form.addEventListener('submit', (e) => this.submitHandle(e));
  }
  
  btnClickHandler() {
    this.view.itemLists.addEventListener('click', e => {
      if (e.target.classList.contains('checkbox')) this.view.checkBtnOnOff(e.target);

      if (e.target.classList.contains('deleteIcon')) this.view.removeTodo(e.target);
    })
  }
}