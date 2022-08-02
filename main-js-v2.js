
/*Funcion creadora de items en menú*/

function createItemInGrid(uniqueOrMulti, name, price, category, input, unique){
  let newLabel = document.createElement('label');
  newLabel.setAttribute('for', name);
  newLabel.innerHTML = '<p class="fs-7 fw-bold mb-0">'+name+'</p><p class="fs-7 fw-light mb-0 text-center">$'+price+'</p>';
  newLabel.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-3', 'fs-7');
  newLabel.style.cursor = 'pointer';
  let newInput = document.createElement('input');
  newInput.setAttribute('type', input);
  newInput.setAttribute('id', name);
  newInput.setAttribute('data-price', price);
  newInput.setAttribute('unique', unique);

  /*
  Usamos el mismo valor de "name", para hacer que un input sea excluyente de los demás.
  Ejemplo, no se pueden elegir dos tipos de pan para el mismo sanguche, entonces haremos que los
  inputs de pan lleven todos el mismo "name" otorgandole como valor su propiedad "tipo" que es "Pan".
  */
  newInput.setAttribute('name', uniqueOrMulti);

  //El atributo category lo inventamos para categorizar los inputs
  //nos servirá para armar la orden.
  newInput.setAttribute('category', category);
  newLabel.append(newInput);
  document.getElementById(category).querySelector(".container-items").append(newLabel);

}

/*Ver selección del usuario en la columna derecha*/

function selection(name, price, category){
  let newItem = document.createElement('div');
  newItem.setAttribute('id', name);
  newItem.setAttribute('data-price', price);
  newItem.innerHTML = '<p class="fs-7 fw-bold mb-0">'+name+'</p><p class="fs-7 fw-light mb-0 text-center">$'+price+'</p>';
  newItem.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-3', 'fs-7');
  document.querySelector(".container-order").append(newItem);
}

function seeSelection(){
  if (document.querySelectorAll(".container-order .item")) {
    let itemsInList = document.querySelectorAll(".container-order .item");
    for (var i = 0; i < itemsInList.length; i++) {
      itemsInList[i].remove();
    }
  }

  let optionsSelected = document.querySelectorAll(".container-items input:checked");
  for (var i = 0; i < optionsSelected.length; i++) {
    let name = optionsSelected[i].getAttribute("id");
    let price = optionsSelected[i].getAttribute("data-price");
    let category = optionsSelected[i].getAttribute("category");
    selection(name, price, category);
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
  // console.log("Click para editName funciona");
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

sandwichSaved = [];

let saveSelectionFunction = function saveSelection(){
  if (sandwichSaved.length >= 1) {
    for (let i = sandwichSaved.length; i > 0; i--) {
      sandwichSaved.pop();
    }
  }

  let optionsSelected = document.querySelectorAll(".container-items input:checked");
  if (optionsSelected.length < 2) {
    swal("Ey!", "Todavía te falta completar el sandiwich", "error");
  }
  else {
    for (var i = 0; i < optionsSelected.length; i++) {
      let name = optionsSelected[i].getAttribute("id");
      let category = optionsSelected[i].getAttribute("category");
      sandwichSaved.push(name);
    }

    console.log(sandwichSaved);
    localStorage.setItem('sandwichSaved', JSON.stringify(sandwichSaved));
    saveName();
    let goToOrder = window.location.href = "./success.html";
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


function isSelected(item, category){
  console.log(item);
  console.log(category);

  if (item.checked) {
    item.closest("label").classList.add('selected');

  }
  else if (!item.checked){
    item.closest("label").classList.remove('selected');
  }

  if (item.getAttribute("unique") == "true") {
    let itemsWithSameCategory = item.closest(`#${category}`);
    itemsWithSameCategory = itemsWithSameCategory.querySelectorAll(`input[category='${category}']`);
    console.log(itemsWithSameCategory);
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
      for (var i = 0; i < data.length; i++) {
        let opciones = data[i].opciones;

        for (var z = 0; z < opciones.length; z++) {
          opciones[z];
          let typeOfIngredient = data[i].tipo.toLowerCase();
          let nameOfIngredient = opciones[z].name;
          let priceOfIngredient = opciones[z].price;

          if (data[i].aceptaVariasOpciones == false) {
            let typeOfInput = "checkbox";
            let unique = "true";
            createItemInGrid(typeOfIngredient, nameOfIngredient, priceOfIngredient, typeOfIngredient, typeOfInput, unique);
          }
          else if (data[i].aceptaVariasOpciones == true) {
            let typeOfInput = "checkbox";
            let unique = "false";
            createItemInGrid(nameOfIngredient, nameOfIngredient, priceOfIngredient, typeOfIngredient, typeOfInput, unique);
          }
        }
      }

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
          console.log(categoryOfSelected);
          isSelected(itemSelected, categoryOfSelected);
        });
        item.addEventListener('click', seeSelection);
      });
    }
  });
}


start.addEventListener('click', getInfo);



function sumOfItems(){
  if (document.querySelectorAll("#myOrder .item")) {
    let itemPriceInOrder = document.querySelectorAll("#myOrder .item");
    itemPriceInOrder.forEach((item) => {
      itemPriceInOrderS = item.getAttribute("data-price");
      console.log(itemPriceInOrderS);
    });
  }
}