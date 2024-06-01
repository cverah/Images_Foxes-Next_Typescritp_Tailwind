//aquí validación de la librería lodash
//si bien lodash tiene muchas funciones solo tiparemos lo que se usa en este caso el random

//existe un modulo lodash
declare module "lodash" {
  //tipado para función random
  export function random(lower: number, upper: number): number;
}
