import React from 'react'
import conjuntoEntrenamiento from './conjuntoEntrenamiento2'
import { cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, posicionClase, listadoTituloColumnas } from './funciones'

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0)
  const columnas = listadoTituloColumnas(conjuntoEntrenamiento);
  const columnasSlide = columnas.slice(1, -1);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 10 ~ DecisionTree ~ columnasSlide', columnasSlide);
  // obtenemos el nombre de la clase
  const nombreDeClase = posicionClase(conjuntoEntrenamiento);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(conjuntoEntrenamiento, nombreDeClase.nombre);
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 12 ~ DecisionTree ~ listadoAtributoClases', listadoAtributoClases);
  // clasificamos en nombre y cantidad
  const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  //se calcula la entropia del conjunto para los valores de la clase
  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases);
  // console.log('entropia del Conjunto: ', entropiaConjunto);
  const filtradoSegunClase = cantidadAtributoClases.map(clase => {
    const result = conjuntoEntrenamiento.filter(item => item[nombreDeClase.nombre] === clase.campo);
    return{campo: clase.campo , cant: result}
  })
  console.log('filtradoSegunClase:', filtradoSegunClase);
  const result = filtradoSegunClase.map(item => 
    (columnasSlide.map(nombre => 
      {
        const cantidad = cantidadApariciones(listadoAtributos(item.cant, nombre));
        return(
          {
            clase: item.campo,
            atributo: nombre,
            cant: cantidad
          }
      )
    }
    ))
  );
  
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 26 ~ DecisionTree ~ result', result);
  

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