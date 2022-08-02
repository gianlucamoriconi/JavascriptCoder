let orderExist = localStorage.getItem('sandwichSaved');
let orderSavedParsed = JSON.parse(orderExist);


function ingredientsInOrder(name){
  let newItem = document.createElement('div');
  newItem.setAttribute('id', name);
  newItem.innerHTML = '<p class="fs-7 fw-light mb-0">'+name+'</p>';
  newItem.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-3', 'fs-7');
  document.getElementById("orderSaved").append(newItem);
}



for (var i = 0; i < orderSavedParsed.items.length; i++) {
  let name = orderSavedParsed.items[i];
  // let category = orderSavedParsed[i].getAttribute("category");
  ingredientsInOrder(name);
}

//Precio en orden guardada
let totalPriceInSuccessOrder = Number(orderSavedParsed.totalPrice);
let totalFooter = document.createElement("div");
totalFooter.classList.add("footer-cart", "d-flex", "pt-4", "pb-2", "ps-2", "pe-2");
totalFooter.innerHTML = `<h5 class="title-footer-cart col-6">Total:</h5><span class="cart-total col-6 text-end">$${totalPriceInSuccessOrder}</span>`;
document.getElementById("orderSaved").append(totalFooter);
