const showDropdownMenu = document.querySelector('.dropdown-toggle');


// 드롭다운 테스트
showDropdownMenu.addEventListener('mouseenter', (e) => {
  e.target.nextElementSibling.classList.toggle('show');
});