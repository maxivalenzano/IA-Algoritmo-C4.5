import React from 'react';
import conjuntoEntrenamiento from './conjuntoEntrenamiento'
import { cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, nombreClase } from './funciones'

const App = () => {
const [umbral, setUmbral] = React.useState(0)

  //obtenemos la cantidad de veces que aparecen los valores de la clase en el conjunto de entrenamiento

  const nombreDeClase = nombreClase(conjuntoEntrenamiento);

  const listadoAtributoClases = listadoAtributos(conjuntoEntrenamiento, nombreDeClase);

  const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  console.log('🚀 ~ file: App.js ~ line 15 ~ App ~ cantidadAtributoClases', cantidadAtributoClases);

  //se calcula la entropia del conjunto, para dos valores de una clase

  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases, cantidadAtributoClases);

  console.log('entropia del Conjunto: ', entropiaConjunto);
  console.log('🚀 ~ file: App.js ~ line 27 ~ App ~ umbral', umbral);

  return (
    <>
    <p>Hello world!</p>
    <p>Ingrese Umbral: </p>
     <input
      value={umbral}
      onChange={e => setUmbral(e.target.value)}
      type="number"
      min={1}
      max={100}
     />
     <p>Nombre de la clase: {nombreDeClase}</p>
     <p>Entropia del conjunto: {entropiaConjunto}</p>
    </>

  );
}

export default App;
