import { useRef } from "react";

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

  return (
    <img
      ref={node}
      className="rounded-lg mx-auto w-[600px] h-auto border border-black"
      src={imgFox}
    />
  );
};

export default Fox;
