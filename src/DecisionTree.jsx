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
  let tree = {};
  const expansion = (dataSet) => {
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 18 ~ expansion ~ dataSet', dataSet);
    if (dataSet.length === 0) {
      return console.log("alóo");
    }
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
    // console.log('🚀 ~ file: DecisionTree.jsx ~ line 36 ~ expansion ~ nodo', nodo);
    const listadoDataSetsForExpansion = nodo.dataSet.map((rama) => {
      if (rama.filas.length === 0) {
        console.log(
          'nodo: ',
          nodo.nodo.atributo,
          ', atributo tipo: ',
          rama.valorAtributo,
          ', es un nodo puro de clase: ',
          rama.nodoPuro.campoClase
        );
        tree[rama.valorAtributo] = { 
          ...tree[rama.valorAtributo],
          [rama.valorAtributo]: rama.nodoPuro.campoClase  } || {}
        // console.log('🚀 ~ file: DecisionTree.jsx ~ line 47 ~ listadoDataSetsForExpansion ~ tree[nodo.nodo.atributo]', tree[nodo.nodo.atributo]);
        return [];
      } else {
        // tree[nodo.nodo.atributo] = { ...tree[nodo.nodo.atributo[rama.valorAtributo[rama.nodoPuro.campoClase]]] } || {}
        // console.log(
        //   'nodo: ',
        //   nodo.nodo.atributo,
        //   ', atributo tipo: ',
        //   rama.valorAtributo,
        //   ', es un nodo puro de clase: ',
        //   rama.nodoPuro.campoClase
        // );
        // tree[nodo.nodo.atributo] = { ...tree[nodo.nodo.atributo][rama.valorAtributo] } || { ok: 'ok' }
        return rama.filas
      };
    });
    console.log(
      '🚀 ~ file: DecisionTree.jsx ~ line 38 ~ expansion ~ listadoDataSetsForExpansion',
      listadoDataSetsForExpansion
    );

    listadoDataSetsForExpansion.map((dataSet) => {
      if (dataSet.length === 0) {
        return null
      }
      return expansion(dataSet);
    });
  };
  expansion(dataSet);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 17 ~ DecisionTree ~ tree', tree);

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
