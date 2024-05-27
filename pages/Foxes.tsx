import React, { useState } from "react";

//2da forma aquí ya puedes agregar los demas elementos si el json es largo
type fruit = Array<{ id: string; nameFruit: string }>;

//FORMA RECOMENDADA
//3ra forma aquí solo el objeto y puedes agregar mas claves valor según el objeto
type fruitItem = {
  id: string;
  nameFruit: string;
};

const Fruits = () => {
  //variables de estado con array de objetos
  //1era forma
  //una linea pero esto cuando tiene mas campos se hará mas largo
  const [fruit, setFruit] = useState<Array<{ id: string; nameFruit: string }>>([
    { id: "1", nameFruit: "pera" },
    { id: "2", nameFruit: "manzana" },
    { id: "3", nameFruit: "mango" },
  ]);

  //2da forma
  const [fruit, setFruit] = useState<fruit>([
    { id: "1", nameFruit: "pera" },
    { id: "2", nameFruit: "manzana" },
    { id: "3", nameFruit: "mango" },
  ]);

  //3era forma
  //FORMA RECOMENDADA
  const [fruit, setFruit] = useState<Array<fruitItem>>([
    { id: "1", nameFruit: "pera" },
    { id: "2", nameFruit: "manzana" },
    { id: "3", nameFruit: "mango" },
  ]);

  return <div>Fruits</div>;
};

export default Fruits;
