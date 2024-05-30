import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

//para los props de la Imagen en si
type LazyImageProps = {
  src: string;
  //explicito cuando es una función el prop
  onClick: () => void;
};

//para las funciones y propiedades de imagen
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

//unimos las dos propiedades explicitas en Props
type Props = LazyImageProps & ImageNative;

//función explicita que devuelve un JSX (devuelve un html)
//los children de tipo Props
//...imgProps esto quiere decir que todo lo demás guárdalo en este valor ...imgProps
const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  // console.log({ ...imgProps }); --> {alt: 'imagen ys4ndslqr_1717031493245', onClick: ƒ}

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
          setSrcImage(src);
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
  }, [src]);

  return (
    <img
      ref={node}
      //bg-slate-500 fondo gris
      className="rounded-lg mx-auto w-[320px] h-auto border border-black bg-slate-500"
      //inicializar la imagen con el cuadro gris
      src={srcImage}
      {...imgProps}
    />
  );
};

export default LazyImage;
