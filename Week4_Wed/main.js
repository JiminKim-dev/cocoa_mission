class DropdownController {
  constructor() {
    this.menu = document.querySelector('.dropdown-menu');
    this.showMenu = document.querySelector('.dropdown-toggle');
    this.countFruits = document.querySelector('.count-fruits');

    this.debounceTimer;
    this.trottleTimer;
  }

  init() {
    this.showFruitMenu();
    this.showCountFruits();
  }

  showFruitMenu() {
    this.showMenu.addEventListener('mouseenter', () => {
      this.debounceTimer = setTimeout(() => this.menu.classList.add('show'), 1000);
    });

    this.menu.addEventListener('mouseleave', () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.menu.classList.remove('show'), 500);
    });
  }

  showCountFruits() {
    this.menu.addEventListener('mousemove', (e) => {
      if (!this.trottleTimer) {
        this.trottleTimer = setTimeout(() => {
          this.renderCountFruits(e.target.id);
          this.trottleTimer = null;
        }, 500);
      }
    });
  }

  renderCountFruits(fruitId) {
    const fruit = document.querySelector(`.${fruitId}`);
    !fruit ? this.createFruitList(fruitId) : fruit.lastChild.textContent++;
  }

  createFruitList(fruit) {
    const newFruit = document.createElement('div');
    newFruit.classList.add(fruit);
    newFruit.innerHTML = 
    `<span>${fruit}: </span>
    <span>1</span>`;

    this.countFruits.appendChild(newFruit);
  }
}

const smartDropdown = new DropdownController()
smartDropdown.init();