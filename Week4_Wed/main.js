class DropdownController {
  constructor() {
    this.menu = document.querySelector('.dropdown-menu');
    this.showMenu = document.querySelector('.dropdown-toggle');
    this.fruitids = document.querySelectorAll('.count-fruit');
  }

  showFruitMenu() {
    let timer;
    this.showMenu.addEventListener('mouseenter', () => {
      timer = setTimeout(() => this.menu.classList.toggle('show'), 1000);
    });

    this.showMenu.addEventListener('mouseleave', () => {
      clearTimeout(timer);
    });
  }

}

const smartDropdown = new DropdownController()
smartDropdown.showFruitMenu();