

function ingredientsInOrder(name){
  let newItem = document.createElement('div');
  newItem.setAttribute('id', name);
  newItem.innerHTML = '<p class="fs-7 fw-light mb-0">'+name+'</p>';
  newItem.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-3', 'fs-7');
  document.getElementById("orderSaved").append(newItem);
}

let orderExist = localStorage.getItem('sandwichSaved');

let orderSavedParsed = JSON.parse(orderExist);
for (var i = 0; i < orderSavedParsed.length; i++) {
  let name = orderSavedParsed[i];
  // let category = orderSavedParsed[i].getAttribute("category");
  ingredientsInOrder(name);
}
