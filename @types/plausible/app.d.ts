// para la librería externa plausible
//esto no se trata de una dependencia
//sino que queremos extender a window el tipado
// para ello usaremos interface y que queremos extender a Window

// definiendo type Options
type Options = {
  //funciona que no retorna nada o no sabemos lo que retorna
  callback: () => void;
  //tipado de prop que es un objeto cuya key sera string y claves sera string o number o booleano o undefined
  //record para objeto
  props: Record<string, string | number | boolean | undefined>;
};

interface Window {
  //extenderá todo lo le window
  //para la propiedad plausible
  //event --> evento y void que no retorna nada
  // plausible: (event: string) => void;

  //limitando evento
  //el options? quiere decir es opcional
  plausible: (event: "add_image" | "remove_image", options?: Options) => void;
}
