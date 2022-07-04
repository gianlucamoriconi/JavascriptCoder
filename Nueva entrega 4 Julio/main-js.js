/* ### Acciones del usuario ### */


/*Array vacío que irá llenando el usuario con sus ingredientes elegidos*/
let sandwichFinal = [];

/*Ingredientes*/
// let pan = ["Ciabatta", "Baguette", "Focaccia"];
// let carnes = ["Asado", "Vacío", "Bondiola", "Pollo"];
// let vegetales = ["Lechuga", "Tomate", "Berenjena asada", "Cebolla cruda", "Cebolla caramelizada"];
// let quesos = ["Cheddar", "Provoleta", "Dambo"];
// let salsaCondimentos = ["Sal", "Limón", "Aceite de oliva", "Mayonesa", "Ketchup"];
// let botonOrdenar = document.getElementById("orderOne");
// let botonVerOrden = document.getElementById("seeOrder");

/*Programa para armar sandwich*/

let Ingredientes = [
{
  ingrediente: "Pan",
  aceptaVariasOpciones: false,
  omitible: false,
  opciones: ["ciabatta", "baguette", "focaccia"],
  tipo: "pan"
},
{
  ingrediente: "Carnes",
  aceptaVariasOpciones: false,
  omitible: true,
  opciones: ["asado", "vacío", "bondiola", "pollo"],
  tipo: "carne"
},
{
  ingrediente: "Quesos",
  aceptaVariasOpciones: false,
  omitible: true,
  opciones: ["cheddar", "provoleta", "dambo"],
  tipo: "queso"
},
{
  ingrediente: "Salsas y condimientos",
  aceptaVariasOpciones: true,
  omitible: true,
  opciones: ["sal", "limon", "aceite de oliva", "mayonesa", "ketchup"],
  tipo: "salsa-condimento"
},
{
  ingrediente: "Vegetales y otros agregados",
  aceptaVariasOpciones: true,
  omitible: true,
  opciones: ["lechuga", "tomate", "aceitunas negras", "aceitunas verdes", "pepino", "pepinillo en vinagre", "rúcula", "repollo", "tomate cherry", "huevo duro", "huevo frito"],
  tipo: "vegetales-y-otros"
}
];
