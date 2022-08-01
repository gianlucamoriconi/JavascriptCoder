/* ### Acciones del usuario ### */


/*Array vacío que irá llenando el usuario con sus ingredientes elegidos*/
let sandwichFinal = [];

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
