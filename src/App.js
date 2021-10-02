import React from 'react';
import conjuntoEntrenamiento from './conjuntoEntrenamiento'
import { cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, nombreClase } from './funciones'

const App = () => {
  const [umbral, setUmbral] = React.useState(0)

  // obtenemos el nombre de la clase
  const nombreDeClase = nombreClase(conjuntoEntrenamiento);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(conjuntoEntrenamiento, nombreDeClase);
  // clasificamos en nombre y cantidad
  const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  console.log('🚀 ~ file: App.js ~ line 15 ~ App ~ cantidadAtributoClases', cantidadAtributoClases);
  
  //se calcula la entropia del conjunto para los valores de la clase
  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases);
  console.log('entropia del Conjunto: ', entropiaConjunto);

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
