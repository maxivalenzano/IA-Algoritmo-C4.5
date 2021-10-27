import React from 'react';
import dataSet from './conjuntoEntrenamiento2';
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoValoresColumna,
  posicionClase,
  calculoGananciaInformacion,
  filtradoSegunAtributoGananciaMaxima,
  calcularEntropiaTotalXAtributo,
} from './funciones';

const DecisionTree = () => {


  const [umbral, setUmbral] = React.useState(0);
  // obtenemos el nombre de la clase

  const expansion = (dataSet) => {

    if (dataSet.length === 0) { return console.log("nodo puro ashee") }
    const clase = posicionClase(dataSet);
    const listadoValoresClases = listadoValoresColumna(dataSet, clase.nombre);
    const entropiaConjunto = calculoEntropíaConjunto(listadoValoresClases);
    const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet);
    const calculoGananciaInform = calculoGananciaInformacion(
      entropiaTotalAtributos,
      entropiaConjunto
    );
    const gananciaMaxima = maximoGanancia(calculoGananciaInform);
    const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(gananciaMaxima, dataSet);
    const nodo = {
      nodo: gananciaMaxima,
      dataSet: dataSetForExpansion,
    };
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 32 ~ DecisionTree ~ nodo', nodo);

    const listadoDataSetsForExpansion = nodo.dataSet.map(filas => filas.filas);
    console.log("🚀 ~ file: DecisionTree.jsx ~ line 38 ~ expansion ~ listadoDataSetsForExpansion", listadoDataSetsForExpansion)

    listadoDataSetsForExpansion.map(dataSet => {
      console.log("este es el nuevo dataSet", dataSet, "su longitud es: ", dataSet.length);
      return expansion(dataSet)
    })

  }
  expansion(dataSet);

  return (
    <React.Fragment>
      <p>hola mundo</p>
    </React.Fragment>
  );
};

export default DecisionTree;








  // //segunda iteracion
  // const sexo = dataSetForExpansion.map((dataSetXValorAtributo) => {
  //   //calculamos la entropia de los nuevos conjuntos de expansion
  //   const listadoValoresClasesExpansion = listadoValoresColumna(
  //     dataSetXValorAtributo.filas,
  //     clase.nombre
  //   );
  //   const entropiaConjuntoExpansion = calculoEntropíaConjunto(listadoValoresClasesExpansion);
  //   // const entropiaAtributosIndividualesExpansion = (dataSetXValorAtributo.filas.length === 0) ? [] : calculoEntropiaIndividual(clase.nombre, dataSetXValorAtributo.filas);
  //   const entropiaTotalAtributosExpansion =
  //     dataSetXValorAtributo.filas.length === 0
  //       ? []
  //       : calcularEntropiaTotalXAtributo(clase.nombre, dataSetXValorAtributo.filas);
  //   const gananciaInformacionExpansion =
  //     dataSetXValorAtributo.filas.length === 0
  //       ? []
  //       : calculoGananciaInformacion(entropiaTotalAtributosExpansion, entropiaConjuntoExpansion);
  //   const gananciaMaximaExpansion =
  //     dataSetXValorAtributo.filas.length === 0 ? [] : maximoGanancia(gananciaInformacionExpansion);
  //   const nuevoDataSetSinPurosSexo =
  //     dataSetXValorAtributo.filas.length === 0
  //       ? []
  //       : filtradoSegunAtributoGananciaMaxima(gananciaMaximaExpansion, dataSetXValorAtributo.filas);
  //   return {
  //     valorAtributo: dataSetXValorAtributo.valorAtributo,
  //     entropia: entropiaConjuntoExpansion,
  //     entropiaAtributos: entropiaTotalAtributosExpansion,
  //     gananciaInformacionExpansion,
  //     gananciaMaximaExpansion,
  //     nuevoDataSetSinPurosSexo,
  //   };
  // });
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 67 ~ sexo ~ sexo', sexo);

