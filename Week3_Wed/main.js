// 함수로 잘 굴러가는지 테스트 중... 

// 할일 추가
function addList() {
  const input = document.querySelector('#form_input');
  const itemList = document.querySelector('#todo_contents');

  if (input.value === '') {
    return alert('입력하세요');
  }

  const addNewItem = createItem(input.value);
  itemList.appendChild(addNewItem);
  input.value = '';
}

function createItem(inputValue) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'todo_item');
  newItem.innerHTML = `
    <button class="item_checkBtn">
      <i class="far fa-square checkIcon"></i>
    </button>
    <span class="item_text">${inputValue}</span> 
    <button class="item_deleteBtn">
      <i class="fas fa-minus-circle deleteIcon"></i>
    </button>
  `;

  return newItem
}

function checkBtnOnOff(e) {
  const itemText = e.parentElement.nextElementSibling;
  e.classList.toggle('fa-square');
  e.classList.toggle('fa-check-square');
  itemText.classList.toggle('checked');
}

function removeList(e) {
  e.closest('.todo_item').remove();
}

const todoForm = document.querySelector('#todo_form');
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  addList();
});

const itemLists = document.querySelector('#todo_contents');
itemLists.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkIcon')) checkBtnOnOff(e.target);
  if (e.target.classList.contains('deleteIcon')) removeList(e.target);
});