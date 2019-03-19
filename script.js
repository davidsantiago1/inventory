function Item(name, size, quantity, condition){
  this.name = name;
  this.size = size;
  this.quantity = quantity;
  this.condition = condition;
}

function addItemToTable(item){
  const tr = document.createElement('tr');
  tr.className = 'collection-item';
  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.size}</td>
    <td>${item.condition}</td>
    <td>${item.quantity}</td>
    <td><a href="#" class="delete-item"><i class="fas fa-trash-alt text-info"></i></a></td>
  `;
  collection.appendChild(tr);

  //Store in LS
  storeItemInLS(item);
}

function storeItemInLS(item){
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  }else{
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

//Define UI Vars
const form = document.getElementById('item-form');
const collection = document.getElementById('collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.getElementById('filter');

const condition = document.getElementById('condition');
const showCond = document.getElementById('show-cond');
document.addEventListener('DOMContentLoaded', function(e){
  condition.value = 3;
  // showCond.innerHTML = condition.value;
});

//Load Event Listeners
loadEventListeners();

function loadEventListeners(){
  //DOM Load LS
  document.addEventListener('DOMContentLoaded', getItems);
  form.addEventListener('submit', addItem);
  form.addEventListener('mousemove', displayRangeValues);
  collection.addEventListener('click', removeItem);
  clearBtn.addEventListener('click', clearItems);
  filter.addEventListener('keyup', filterItems);
}

//Get items from LS
function getItems(){
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  }else{
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function(item){
    const tr = document.createElement('tr');
    tr.className = 'collection-item';
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.size}</td>
      <td>${item.condition}</td>
      <td>${item.quantity}</td>
      <td><a href="#" class="delete-item"><i class="fas fa-trash-alt text-info"></i></a></td>
    `;
    collection.appendChild(tr);

  });
}

//Submit Event
function addItem(e){
  const name = document.getElementById('item-name').value;
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const item = new Item(name, size, quantity, condition.value);
  addItemToTable(item);
  e.preventDefault();
}

//Range Display Values
const quality = ["Terrible", "Poor", "Okay", "Good", "Excellent"];
function displayRangeValues(e){
  let data = condition.value;
  for(let i = 0; i < 5; i++){
    if(data == i + 1){
      showCond.innerHTML = `${data} - ${quality[i]}`;
    }
  }
}

//Remove Item
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.parentElement.remove();
    //Remove from LS
    removeItemFromLS(e.target.parentElement.parentElement.parentElement);
  }
}

function removeItemFromLS(taskItem){
  let items;
  if(localStorage.getItem('items') === null){
    items = [];
  }else{
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.forEach(function(item, index){
    if(taskItem.firstElementChild.textContent === item.name){
      if(taskItem.children[1].textContent === item.size){
        items.splice(index, 1);
      }
    }
  });
  localStorage.setItem('items', JSON.stringify(items))
}

//Clear Items
function clearItems(e){
  // collection.innerHTML = '';
  //While loop is faster
  while(collection.firstChild){
    collection.removeChild(collection.firstChild);
  }
  clearItemsFromLS();
}

function clearItemsFromLS(){
  localStorage.clear();
}

//Filter Items
function filterItems(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(item){
    const thing = item.firstElementChild.textContent;
    if(thing.toLowerCase().indexOf(text) != -1){
      item.style.display = "table-row";
    }else{
      item.style.display = "none";
    }
  });
}

// collection.addEventListener('mouseover', function(e){
//   const row = e.target.parentElement;
//   let data = row.children[3];
//   let amount = data.innerHTML;
//
//   console.log(amount);
//   amount = '- ' + amount + ' +';
//   row.children[3].innerHTML = amount;
// });
