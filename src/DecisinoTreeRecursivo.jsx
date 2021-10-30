import React from 'react';
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoValoresColumna,
  calculoGananciaInformacion,
  filtradoSegunAtributoGananciaMaxima,
  calcularEntropiaTotalXAtributo,
} from './funciones';

const DecisionTree = () => {

  const sexo = dataSetForExpansion.map((dataSetXValorAtributo) => {
    //calculamos la entropia de los nuevos conjuntos de expansion
    const listadoValoresClasesExpansion = listadoValoresColumna(
      dataSetXValorAtributo.filas,
      clase.nombre
    );

    const entropíaConjuntoExpansion = calculoEntropíaConjunto(listadoValoresClasesExpansion);
    // const entropiaAtributosIndividualesExpansion = (dataSetXValorAtributo.filas.length === 0) ? [] : calculoEntropiaIndividual(clase.nombre, dataSetXValorAtributo.filas);
    const entropíaTotalAtributosExpansion =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : calcularEntropiaTotalXAtributo(clase.nombre, dataSetXValorAtributo.filas);
    const gananciaInformacionExpansion =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : calculoGananciaInformacion(entropíaTotalAtributosExpansion, entropíaConjuntoExpansion);
    const gananciaMaximaExpansion =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : maximoGanancia(gananciaInformacionExpansion);
    const nuevoDataSetSinPurosSexo =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : filtradoSegunAtributoGananciaMaxima(gananciaMaximaExpansion, dataSetXValorAtributo.filas);
    return {
      valorAtributo: dataSetXValorAtributo.valorAtributo,
      entropia: entropíaConjuntoExpansion,
      entropiaAtributos: entropíaTotalAtributosExpansion,
      gananciaInformacionExpansion,
      gananciaMaximaExpansion,
      nuevoDataSetSinPurosSexo,
    };
  });

  return (
    <>
      <p>Entropía del conjunto{}: {sexo.entropia}</p>
    </>
  );
};

export default DecisionTree;