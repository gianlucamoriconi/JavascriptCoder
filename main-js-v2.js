/*

Funcion creadora de items en menú
La información para los párametros es obtenida por la constante getInfo a través de un fetch

*/

function createItemInGrid(name, price, category, input, unique, imgUrl){
  let nameParsed = name.replace(/ /g, "-");
  let newLabel = document.createElement('label');
  newLabel.setAttribute('for', nameParsed);
  newLabel.setAttribute('data-price', price);
  newLabel.innerHTML = `<div class="img-item"><img src="${imgUrl}"></div><div class="info-item"><p class="item-name fs-7 fw-bold mb-0 mt-2 text-center">${name}</p><p class="item-price fs-7 fw-light mb-0 text-center">$${price}</p></div>`;
  newLabel.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-2', 'fs-7');
  newLabel.style.cursor = 'pointer';
  let newInput = document.createElement('input');
  newInput.setAttribute('type', input);
  newInput.setAttribute('id', nameParsed);
  newInput.setAttribute('data-price', price);
  newInput.setAttribute('unique', unique);
  newInput.setAttribute('name', name);
  newInput.setAttribute('category', category);
  newLabel.append(newInput);
  document.getElementById(category).querySelector(".container-items").append(newLabel);

}

/*Suma de carrito*/

let totalPriceOrder = 0;
function sumOfItems(){
  if (document.querySelectorAll("#myOrder .item")) {
    let itemPriceInOrder = document.querySelectorAll("#myOrder .item");

    totalPriceOrder = 0;
    itemPriceInOrder.forEach((item) => {
      itemPriceInOrderS = Number(item.getAttribute("data-price"));
      totalPriceOrder = totalPriceOrder + itemPriceInOrderS;
    });

    document.querySelector(".cart-total").innerText = "$" + totalPriceOrder;
    document.querySelector(".cart-total").setAttribute("total-price", totalPriceOrder);
  }
}


/*Ver selección del usuario en la columna derecha*/

function selection(name, price, category, imgUrl){
  let newItem = document.createElement('div');
  let nameParsed = name.replace(/ /g, "-");
  newItem.setAttribute('data-id', nameParsed);
  newItem.setAttribute('data-price', price);
  newItem.innerHTML = `<div class="img-item-cart"><img src=${imgUrl}></div><div class="d-flex justify-content-end col"><p class="col-8 fs-7 fw-bold m-auto ps-2">${name}</p><p class="item-price d-flex justify-content-end col-4 fs-7 fw-light m-auto">$${price}<a class="delete-icon"><svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" class="delete-icon-svg"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path></svg></a></p></div>`;
  newItem.classList.add('item', 'd-flex', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'ms-2', 'me-2', 'p-3', 'fs-7');
  document.querySelector(".content-order").append(newItem);
  sumOfItems();
}


let itemToDelete = {};

function seeSelection(){

  if (document.querySelectorAll(".content-order .item")) {
    let itemsInList = document.querySelectorAll(".content-order .item");
    for (var i = 0; i < itemsInList.length; i++) {
      itemsInList[i].remove();
    }
  }

  let optionsSelected = document.querySelectorAll(".container-items input:checked");

  for (var i = 0; i < optionsSelected.length; i++) {
    let name = optionsSelected[i].closest("label").querySelector(".item-name").innerText;
    let price = optionsSelected[i].getAttribute("data-price");
    let category = optionsSelected[i].getAttribute("category");
    let imgUrl = optionsSelected[i].closest("label").querySelector(".img-item img").getAttribute("src");
    selection(name, price, category, imgUrl);
    itemToDelete = document.querySelectorAll(".delete-icon");
  }
  sumOfItems();
}


/*Session storage*/
//Si existe un nombre, lo colocamos
let userNameSaved = localStorage.getItem('userName');

function putName(){
  let userNameSaved = localStorage.getItem('userName');
  let newSpan = document.createElement("span");
  newSpan.classList.add("username", "color-light", "fw-bold");
  newSpan.setAttribute("id", "userName");
  newSpan.innerText = userNameSaved;
  newSpan.setAttribute("data-name", userNameSaved);
  document.querySelector("input#userName").replaceWith(newSpan);
}

if (userNameSaved) {
  if ((userNameSaved != "undefined") && (userNameSaved.length !== 0)) {
    putName();
  }
}


//Guardamos el nombre ingresado
let userNameElement = document.getElementById("userName");
let saveName = function saveName(){
  if (document.querySelector("input#userName")) {
    let userName = document.getElementById("userName").value;
    localStorage.setItem('userName', userName);
  }

  else if (document.querySelector("span#userName")) {
    let userName = document.getElementById("userName").getAttribute("data-name");
    localStorage.setItem('userName', userName);
  }
}



let start = document.getElementById("start");
start.addEventListener('click', saveName);


//Si existe y quiere cambiarlo, podrá hacerlo haciendo click sobre el nombre
let editName = function editName(){
  var currentUserName = document.getElementById("userName").innerText;
  var newInput = document.createElement("input");
  newInput.classList.add("username", "color-light", "fw-bold");
  newInput.setAttribute("id", "userName");
  newInput.value = currentUserName;
  document.querySelector("span#userName").replaceWith(newInput);
  document.querySelector("input#userName").click();
}

if (document.querySelector("span#userName")) {
  document.querySelector("span#userName").addEventListener('click', editName);
}


/*Ver seleccion*/
let saveSelection = document.getElementById("save-selection");

sandwichSaved = {
  items: [],
  totalPrice: []
};

let saveSelectionFunction = function saveSelection(){
  if (sandwichSaved.items.length >= 1) {
    for (let i = sandwichSaved.items.length; i > 0; i--) {
      sandwichSaved.items.pop();
    }
  }

  if (sandwichSaved.totalPrice.length >= 1) {
    for (let i = sandwichSaved.totalPrice.length; i > 0; i--) {
      sandwichSaved.totalPrice.pop();
    }
  }

  let optionsSelected = document.querySelectorAll(".container-items input:checked");
  if (optionsSelected.length < 2) {
    swal({
      title: "¡Ey!",
      text: "Todavía te falta completar el sandiwich",
      icon: "./media/images/what-ross.gif",
    });
  }

  else {
    swal({
      title: "¡Buen sandwich!",
      text: "¿Querés confirmarlo?",
      buttons: true,
      icon: "./media/images/oh-wow.gif",
    }).then((ok) => {
      if (ok) {
        for (var i = 0; i < optionsSelected.length; i++) {
          let name = optionsSelected[i].getAttribute("name");
          let category = optionsSelected[i].getAttribute("category");
          sandwichSaved.items.push(name);
        }

        //Guardamos el precio total de la orden
        let totalPrice = document.querySelector("#myOrder .cart-total").getAttribute("total-price");
        totalPrice = Number(totalPrice);
        sandwichSaved.totalPrice.push(totalPrice);

        //Guardamos los items elegidos
        localStorage.setItem('sandwichSaved', JSON.stringify(sandwichSaved));
        saveName();

        //llevamos a la página de success
        let goToOrder = window.location.href = "./success.html";
      }

      else {
        swal("¡Ok! Continúa con el armado");
      }
    });
  }
}

saveSelection.addEventListener('click', saveSelectionFunction);

let orderExist = localStorage.getItem('sandwichSaved');

if (orderExist != null) {
  let orderExistButton = document.createElement("a");
  let iconClipboard = document.createElement("i");
  iconClipboard.classList.add("fa-solid", "fa-clipboard-list", "ms-2");
  orderExistButton.classList.add("color-light", "fs-6", "btn", "btn-primary", "mt-3", "ms-2");
  orderExistButton.innerText = "Ver mi último pedido";
  orderExistButton.setAttribute("href","./success.html");
  orderExistButton.append(iconClipboard);

  document.getElementById("actions-home").append(orderExistButton);
}


/*Seleeccion de items*/

function isSelected(item, category){
  if (item.checked) {
    item.closest("label").classList.add('selected');

  }
  else if (!item.checked){
    item.closest("label").classList.remove('selected');
  }

  if (item.getAttribute("unique") == "true") {
    let itemsWithSameCategory = item.closest(`#${category}`);
    itemsWithSameCategory = itemsWithSameCategory.querySelectorAll(`input[category='${category}']`);
    itemsWithSameCategory.forEach((x) => {
      if (x != item) {
        x.checked = false;
        x.closest("label").classList.remove('selected');
      }
    });
  }
};



var infoIngredients = {};

const getInfo = () => {
  fetch("https://dolcefilipa.com/data.json",{
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  })
  .then( (resp) => resp.json() )
  .then( (data) => {
    infoIngredients = data;
    document.getElementById("menu").classList.add("d-flex");
    if (!document.getElementById("pickingTable").classList.contains("loaded")) {

      data.map(function(element){
        let opciones = element.opciones;

        opciones.map(function(opt){
          opt;
          let typeOfIngredient = element.tipo.toLowerCase();
          let nameOfIngredient = opt.name;
          let priceOfIngredient = opt.price;
          let imgUrl = opt.imgUrl;

          if (element.aceptaVariasOpciones == false) {
            let typeOfInput = "checkbox";
            let unique = "true";
            createItemInGrid(nameOfIngredient, priceOfIngredient, typeOfIngredient, typeOfInput, unique, imgUrl);
          }
          else if (element.aceptaVariasOpciones == true) {
            let typeOfInput = "checkbox";
            let unique = "false";
            createItemInGrid(nameOfIngredient, priceOfIngredient, typeOfIngredient, typeOfInput, unique, imgUrl);
          }

        });

      });

      document.getElementById("pickingTable").classList.add("loaded");
      location.hash = "#menu";

      //Cada vez que hacemos clic en una opción se ejecuta el efecto de selección
      //Y se actualiza la tabla derecha

      /*Efecto de elemento seleccionado o no*/
      let itemInGrid = document.querySelectorAll('.item > input');

      itemInGrid.forEach(item => {
        let itemClickedId = item.getAttribute("id");
        item.addEventListener('click', function(){
          let itemSelected = this;
          let categoryOfSelected = this.getAttribute("category");
          isSelected(itemSelected, categoryOfSelected);
        });
        item.addEventListener('click', seeSelection);
      });
    }
  });
}


start.addEventListener('click', getInfo);

/*Borrar item del carrito*/

function deleteClick(){
  //Si existe el elemento de eliminar en la orden, escuchamos el click en ellos
  if (itemToDelete.length > 0) {
    itemToDelete.forEach((itemDel) => {
      itemDel.addEventListener('click', function(){
        let id = itemDel.closest(".item").getAttribute("data-id");
        deleteItemFromCart(id);
      });
    });
  }
}


//Remover item de la orden luego de que hacen click en borrar (columna #myOrder)
function deleteItemFromCart(itemId){
  document.querySelector(`#pickingTable .item input#${itemId}`).checked = false;
  document.querySelector(`#pickingTable .item input#${itemId}`).closest("label").classList.remove('selected');
  //luego de borrar, actualizamos el carrito (items seleccionados y recalculamos el total)
  seeSelection();
  sumOfItems();
}

/*Usamos MutationObserver para detectar el cambio en los elementos selecionados */
const observer = new MutationObserver((mutation) => {
   if (mutation) {
     setTimeout(() => {
       deleteClick();
     });
   }
 });
 observer.observe(document.querySelector("#myOrder"), {
   subtree: true,
   childList: true,
 });
