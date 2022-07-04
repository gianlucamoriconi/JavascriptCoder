
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



for (var i = 0; i < Ingredientes.length; i++) {
  let opcion = Ingredientes[i].opciones;

  for (var z = 0; z < opcion.length; z++) {
    opcion[z];
    let typeOfIngredient = Ingredientes[i].tipo.toLowerCase();
    let nameOfIngredient = opcion[z];

    if (Ingredientes[i].aceptaVariasOpciones == false) {
      let typeOfInput = "radio";
      createItemInGrid(typeOfIngredient, nameOfIngredient, typeOfIngredient, typeOfInput);
    }
    else if (Ingredientes[i].aceptaVariasOpciones == true) {
      let typeOfInput = "checkbox";
      createItemInGrid(nameOfIngredient, nameOfIngredient, typeOfIngredient, typeOfInput);
    }
  }
}


/*Efecto de elemento seleccionado o no*/
const itemInGrid = document.querySelectorAll('.item > input');

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


/*Ver selección*/

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

/*Actualizar orden*/

function refresh(){
  if (document.querySelectorAll(".container-order .item")) {
    seeSelection();
  }
}


itemInGrid.forEach(item => {
  item.addEventListener('click', isSelected);
  item.addEventListener('click', seeSelection);
});


/*Session storage*/
//Si existe un nombre, lo colocamos
let userNameSaved = localStorage.getItem('userName');

function putName(){
  let newSpan = document.createElement("span");
  newSpan.classList.add("username", "color-light", "fw-bold");
  newSpan.setAttribute("id", "userName");
  newSpan.innerText = userNameSaved;
  document.querySelector("input#userName").replaceWith(newSpan);
}

if (userNameSaved) {
  putName();
}


//Guardamos el nombre ingresado
let userNameElement = document.getElementById("userName");
let saveName = function saveName(){
  let userName = document.getElementById("userName").value;
  localStorage.setItem('userName', userName);
}


document.addEventListener('click', function(event) {
  let inputName = document.querySelector("input#userName");
  if (inputName) {
    let clickOnInput = inputName.contains(event.target);

    if (!clickOnInput) {
      putName();
    }
  }

});


let start = document.getElementById("start")
start.addEventListener('click', saveName);


//Si existe y quiere cambiarlo, podrá hacerlo haciendo click sobre el nombre
let editName = function editName(){
  console.log("Click para editName funciona");
  let currentUserName = document.getElementById("userName").innerText;
  let newInput = document.createElement("input");
  newInput.classList.add("username", "color-light", "fw-bold");
  newInput.setAttribute("id", "userName");
  newInput.value = currentUserName;
  document.getElementById("userName").replaceWith(newInput);
}
document.getElementById("userName").addEventListener('click', editName);


//Si está el input activo y hace click fuera de él, quitamos el input y dejamos el nombre
