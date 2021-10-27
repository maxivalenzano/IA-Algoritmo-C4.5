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
  const clase = posicionClase(dataSet);
  // obtenemos un listado de todos los componentes
  const listadoValoresClases = listadoValoresColumna(dataSet, clase.nombre);
  //se calcula la entropia del conjunto para los valores de la clase
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
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 32 ~ DecisionTree ~ primerNodo', nodo);
  //segunda iteracion
  const sexo = dataSetForExpansion.map((dataSetXValorAtributo) => {
    //calculamos la entropia de los nuevos conjuntos de expansion
    const listadoValoresClasesExpansion = listadoValoresColumna(
      dataSetXValorAtributo.filas,
      clase.nombre
    );
    const entropiaConjuntoExpansion = calculoEntropíaConjunto(listadoValoresClasesExpansion);
    // const entropiaAtributosIndividualesExpansion = (dataSetXValorAtributo.filas.length === 0) ? [] : calculoEntropiaIndividual(clase.nombre, dataSetXValorAtributo.filas);
    const entropiaTotalAtributosExpansion =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : calcularEntropiaTotalXAtributo(clase.nombre, dataSetXValorAtributo.filas);
    const gananciaInformacionExpansion =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : calculoGananciaInformacion(entropiaTotalAtributosExpansion, entropiaConjuntoExpansion);
    const gananciaMaximaExpansion =
      dataSetXValorAtributo.filas.length === 0 ? [] : maximoGanancia(gananciaInformacionExpansion);
    const nuevoDataSetSinPurosSexo =
      dataSetXValorAtributo.filas.length === 0
        ? []
        : filtradoSegunAtributoGananciaMaxima(gananciaMaximaExpansion, dataSetXValorAtributo.filas);
    return {
      valorAtributo: dataSetXValorAtributo.valorAtributo,
      entropia: entropiaConjuntoExpansion,
      entropiaAtributos: entropiaTotalAtributosExpansion,
      gananciaInformacionExpansion,
      gananciaMaximaExpansion,
      nuevoDataSetSinPurosSexo,
    };
  });
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 67 ~ sexo ~ sexo', sexo);

  return (
    <React.Fragment>
      <p>Ingrese Umbral: </p>
      <input
        value={umbral}
        onChange={(e) => setUmbral(e.target.value)}
        type="number"
        min={1}
        max={100}
      />
      <p>Nombre de la clase: {clase.nombre}</p>
      <p>Entropía del conjunto: {entropiaConjunto}</p>
    </React.Fragment>
  );
};

export default DecisionTree;
