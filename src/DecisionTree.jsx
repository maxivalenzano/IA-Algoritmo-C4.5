import React from 'react'
import conjuntoEntrenamiento from './conjuntoEntrenamiento2'
import { log2, cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, posicionClase, listadoTituloColumnas } from './funciones'

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0)
  const columnas = listadoTituloColumnas(conjuntoEntrenamiento);
  const listaAtributos = columnas.slice(1, -1);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 10 ~ DecisionTree ~ listaAtributos', listaAtributos);
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
  const atributoPorClase = filtradoSegunClase.map(item => 
    listaAtributos.map(nombre => 
      {
        const listadoValorClase = listadoAtributos(item.cant, nombre);
        const tipoValorAtributo = cantidadApariciones(listadoValorClase);
        return(
          {
            clase: item.campo,
            atributo: nombre,
            cant: tipoValorAtributo,
            cantValorClase: listadoValorClase.length
          }
      )
    }
    )
  );
  console.log('🚀 atributoPorClase', atributoPorClase);
  
  const primerosValores = atributoPorClase.map(atributoClase =>
      atributoClase.map(atributo => {
        const nombreAtributo = atributo.atributo;
        let entropiaAtributos = 0;
        atributo.cant.forEach(item =>
          {
            entropiaAtributos = entropiaAtributos + -1*(item.cant/atributo.cantValorClase*log2(item.cant/atributo.cantValorClase))
          });
        return {nombreAtributo, entropiaAtributos, valorClase: atributo.clase}
      })
    )
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 55 ~ DecisionTree ~ iteracion', primerosValores);


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