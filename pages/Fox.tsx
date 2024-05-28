import { useEffect, useRef, useState } from "react";

//definir aquí los prop
type Props = {
  imgFox: string;
  //aquí puede ir mas objeto de children con su respectiva valor explicito
};

//función explicita que devuelve un JSX (devuelve un html)
//los children de tipo Props
const Fox = ({ imgFox }: Props): JSX.Element => {
  //ref para referenciar un valor en react
  const node = useRef<HTMLImageElement>(null);
  //inicializar con cuadro transparente
  const [srcImage, setSrcImage] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  //agregamos observador
  useEffect(() => {
    //iniciar observador
    //Intersection observer recibe unas entradas que es un array
    // tipo void significa que es una función que no devuelve nada
    const observe = new IntersectionObserver((entries): void => {
      entries.forEach((entry): void => {
        //on intersection cuando la imagen es visible
        if (entry.isIntersecting) {
          setSrcImage(imgFox);
        }
      });
    });
    //nodo observador
    //aquí se puede poner asi con un ! al final ya que dirá que no es necesario validar ya que siempre existirá
    // observe.observe(node.current!);
    // pero es mejor poner asi
    if (node.current) {
      observe.observe(node.current);
    }
    //desconectar
    return (): void => {
      observe.disconnect();
    };
  }, [imgFox]);

  return (
    <img
      ref={node}
      //bg-slate-500 fondo gris
      className="rounded-lg mx-auto w-[320px] h-auto border border-black bg-slate-500"
      //inicializar la imagen con el cuadro gris
      src={srcImage}
    />
  );
};

export default Fox;
