
/*Funcion creadora de items en menú*/

function createItemInGrid(uniqueOrMulti, name, category, input){
  let newLabel = document.createElement('label');
  newLabel.setAttribute('for', name);
  newLabel.innerHTML = '<p class="fs-7 fw-light mb-0">'+name+'</p>';
  newLabel.classList.add('item', 'shadow', 'bg-white', 'rounded-3', 'mb-4', 'me-2', 'p-3', 'fs-7');
  newLabel.style.cursor = 'pointer';
  let newInput = document.createElement('input');
  newInput.setAttribute('type', input);
  newInput.setAttribute('id', name);

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

function ingredientsInMenu(name, category){
  let newItem = document.createElement('div');
  newItem.setAttribute('id', name);
  newItem.innerHTML = '<p class="fs-7 fw-light mb-0">'+name+'</p>';
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
    let category = optionsSelected[i].getAttribute("category");
    ingredientsInMenu(name, category);
  }
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
  console.log("Click para editName funciona");
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

if (orderExist !== "null") {
  let orderExistButton = document.createElement("a");
  let iconClipboard = document.createElement("i");
  iconClipboard.classList.add("fa-solid", "fa-clipboard-list", "ms-2");
  orderExistButton.classList.add("color-light", "fs-6", "btn", "btn-primary", "mt-3", "ms-2");
  orderExistButton.innerText = "Ver mi último pedido";
  orderExistButton.setAttribute("href","./success.html");
  orderExistButton.append(iconClipboard);

  document.getElementById("actions-home").append(orderExistButton);
}




const getInfo = () => {
  fetch("https://dolcefilipa.com/data.json",{
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
  })
  .then( (resp) => resp.json() )
  .then( (data) => {
    document.getElementById("menu").classList.add("d-flex");
    if (!document.getElementById("pickingTable").classList.contains("loaded")) {
      for (var i = 0; i < data.length; i++) {
        let opcion = data[i].opciones;

        for (var z = 0; z < opcion.length; z++) {
          opcion[z];
          let typeOfIngredient = data[i].tipo.toLowerCase();
          let nameOfIngredient = opcion[z];

          if (data[i].aceptaVariasOpciones == false) {
            let typeOfInput = "radio";
            createItemInGrid(typeOfIngredient, nameOfIngredient, typeOfIngredient, typeOfInput);
          }
          else if (data[i].aceptaVariasOpciones == true) {
            let typeOfInput = "checkbox";
            createItemInGrid(nameOfIngredient, nameOfIngredient, typeOfIngredient, typeOfInput);
          }
        }
      }

      document.getElementById("pickingTable").classList.add("loaded");
      location.hash = "#menu";

      //Cada vez que hacemos clic en una opción se ejecuta el efecto de selección
      //Y se actualiza la tabla derecha

      /*Efecto de elemento seleccionado o no*/

      const isSelected = function isSelected(){
        itemInGrid.forEach(item => {
          if (item.checked) {
            if (!item.closest('.item').classList.contains('selected')) {
              item.closest('.item').classList.add('selected');
            }
          } else if (!item.checked){
            item.closest('.item').classList.remove('selected');
          }
        });
      };

      const itemInGrid = document.querySelectorAll('.item > input');

      itemInGrid.forEach(item => {
        item.addEventListener('click', isSelected);
        item.addEventListener('click', seeSelection);
      });
    }
  });
}


start.addEventListener('click', getInfo);
