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
          this.renderCountFruits(e)
          this.trottleTimer = null;
        }, 500)
      }
    })
  }

  renderCountFruits(e) {
    // 마우스가 움직일때마다 카운트하는 UI 추가
    console.log(e.target.id);
  }
}

const smartDropdown = new DropdownController()
smartDropdown.init();