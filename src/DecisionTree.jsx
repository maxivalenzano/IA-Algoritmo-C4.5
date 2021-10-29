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

  const expansion = (dataSet) => {
    if (dataSet.length === 0) {
      return [];
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

    return dataSetForExpansion.map((rama) => ({
      valorAtributo: rama.valorAtributo,
      nodoPuro: rama.nodoPuro,
      nodo: gananciaMaxima.atributo,
      ramas: expansion(rama.filas)
    }))
  };

  console.log("🚀 ~ file: DecisionTree.jsx ~ line 52 ~ DecisionTree ~ expansion(dataSet)", expansion(dataSet))

  return (
    <React.Fragment>
      <p>hola mundo</p>
    </React.Fragment>
  );
};

export default DecisionTree;


