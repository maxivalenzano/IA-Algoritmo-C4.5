import React from 'react'
import conjuntoEntrenamiento from './conjuntoEntrenamiento2'
import { cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, posicionClase } from './funciones'

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0)

  // obtenemos el nombre de la clase
  const nombreDeClase = posicionClase(conjuntoEntrenamiento);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 10 ~ DecisionTree ~ nombreDeClase', nombreDeClase);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(conjuntoEntrenamiento, nombreDeClase.nombre);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 13 ~ DecisionTree ~ listadoAtributoClases', listadoAtributoClases);
  // clasificamos en nombre y cantidad
  const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  console.log('🚀 ~ file: App.js ~ line 15 ~ App ~ cantidadAtributoClases', cantidadAtributoClases);

  //se calcula la entropia del conjunto para los valores de la clase
  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases);
  // console.log('entropia del Conjunto: ', entropiaConjunto);
  const filtradoSegunClase = cantidadAtributoClases.map(clase => conjuntoEntrenamiento.filter(item => item[nombreDeClase.nombre] === clase.campo))
  console.log('filtradoSegunClase:', filtradoSegunClase);

  return (
    <React.Fragment>
      <p>Ingrese Umbral: </p><input
        value={umbral}
        onChange={e => setUmbral(e.target.value)}
        type="number"
        min={1}
        max={100} />
      <p>Nombre de la clase: {nombreDeClase.nombre}</p>
      <p>Entropia del conjunto: {entropiaConjunto}</p>
    </React.Fragment>
  );
}

export default DecisionTree;