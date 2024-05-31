import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

//para los props de la Imagen en si
type LazyImageProps = {
  src: string;
  //explicito de una función en el prop
  //el ? es opcional ose puede o no puede ir el prop
  //el valor del parámetro sera una imagen por ello se asigna el explicito para una imagen el HTMLImageElement
  //void retorna un vació
  onLazyLoad?: (img: HTMLImageElement) => void;
};

//para las funciones y propiedades de imagen
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

//unimos las dos propiedades explicitas en Props
type Props = LazyImageProps & ImageNative;

const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  // console.log({ ...imgProps }); --> {alt: 'imagen ys4ndslqr_1717031493245', onClick: ƒ}

  //ref para referenciar un valor en react
  const node = useRef<HTMLImageElement>(null);
  //inicializar con cuadro transparente
  const [srcImage, setSrcImage] = useState<string>(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  const [isLazyLoaded, setIsLazyLoaded] = useState<boolean>(false);

  //agregamos observador
  useEffect(() => {
    //si ya cargo la imagen retornar
    if (isLazyLoaded) return;
    //iniciar observador
    //Intersection observer recibe unas entradas que es un array
    // tipo void significa que es una función que no devuelve nada
    const observe = new IntersectionObserver((entries): void => {
      entries.forEach((entry): void => {
        // si la imagen no esta interceptado si la imagen ya existe
        if (!entry.isIntersecting || !node.current) {
          return;
        }
        //cargar la imagen
        setSrcImage(src);
        //desconectar observador
        observe.disconnect();
        //cambiar la carga de imagen a true
        setIsLazyLoaded(true);

        //validar la función onLazyLoad
        if (typeof onLazyLoad === "function") {
          //node.current es la imagen actual entonces lo mandamos a la función
          onLazyLoad(node.current);
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
  }, [src, onLazyLoad, isLazyLoaded]);

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
