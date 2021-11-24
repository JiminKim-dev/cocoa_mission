const fruitMenu = document.querySelector('.dropdown-menu');

(function showFruitMenu() {
  const showFruitMenu = document.querySelector('.dropdown-toggle');
  let timer;

  showFruitMenu.addEventListener('mouseenter', () => {
    timer = setTimeout(() => fruitMenu.classList.toggle('show'), 1000);
  });

  showFruitMenu.addEventListener('mouseleave', () => {
    clearTimeout(timer)
  });
})();

// 문제2 미구현
fruitMenu.addEventListener('mouseover', (e) => {
  console.count(e.target.id);
});