// 함수로 잘 굴러가는지 테스트 중...

//할 일 추가
const addBtn = document.querySelector('#form_addBtn');
addBtn.addEventListener('click', addList)

function addList() {
  const inputValue = document.querySelector('#form_input').value;
  const itemList = document.querySelector('#todo_contents');

  if (inputValue === '') {
    return console.log('입력하세요');
  }

  const addNewItem = createItem(inputValue);
  return itemList.appendChild(addNewItem);
}

function createItem(inputValue) {
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'todo_item');
  newItem.innerHTML = `
    <button class="item_checkBtn">
      <i class="far fa-square"></i>
    </button>
    <span class="item_name">${inputValue}</span> 
    <button class="item_deleteBtn">
      <i class="fas fa-minus-circle"></i>
    </button>
  `;

  return newItem
}

