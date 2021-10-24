import React from 'react';
import dataSet from './conjuntoEntrenamiento2';
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoValoresColumna,
  posicionClase,
  calculoGananciaInformacion,
  reducirTabla,
  filtradoSegunAtributoGananciaMaxima,
  calcularEntropiaTotalXAtributo
} from './funciones';

const DecisionTree = () => {

  const [umbral, setUmbral] = React.useState(0);
  // obtenemos el nombre de la clase
  const clase = posicionClase(dataSet);

  // obtenemos un listado de todos los componentes
  const listadoValoresClases = listadoValoresColumna(
    dataSet,
    clase.nombre
  );
  //se calcula la entropía del conjunto para los valores de la clase
  const entropíaConjunto = calculoEntropíaConjunto(listadoValoresClases);

  const entropíaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet)

  const calculoGananciaInform = calculoGananciaInformacion(
    entropíaTotalAtributos,
    entropíaConjunto
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 104 ~ DecisionTree ~ calculoGananciaInform', calculoGananciaInform);

  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 108 ~ DecisionTree ~ gananciaMaxima', gananciaMaxima);

  const nuevoDataSetSinPuros = reducirTabla(gananciaMaxima, dataSet);
  // console.log("🚀 ~ file: DecisionTree.jsx ~ line 107 ~ DecisionTree ~ nuevoDataSetSinPuros", nuevoDataSetSinPuros)

  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(gananciaMaxima, nuevoDataSetSinPuros)
  console.log("🚀 ~ file: DecisionTree.jsx ~ line 117 ~ dataSetForExpansion", dataSetForExpansion)

  //segunda iteracion
  const sexo = dataSetForExpansion.map(dataSetXValorAtributo => {
    //calculamos la entropia de los nuevos conjuntos de expansion
    const listadoValoresClasesExpansion = listadoValoresColumna(
      dataSetXValorAtributo.filas,
      clase.nombre
    );

    const entropíaConjuntoExpansion = calculoEntropíaConjunto(listadoValoresClasesExpansion);
    // const entropiaAtributosIndividualesExpansion = (dataSetXValorAtributo.filas.length === 0) ? [] : calculoEntropiaIndividual(clase.nombre, dataSetXValorAtributo.filas);
    const entropíaTotalAtributosExpansion = (dataSetXValorAtributo.filas.length === 0) ? [] : calcularEntropiaTotalXAtributo(clase.nombre, dataSetXValorAtributo.filas)

    return {
      valorAtributo: dataSetXValorAtributo.valorAtributo,
      entropia: entropíaConjuntoExpansion,
      entropiaAtributos: entropíaTotalAtributosExpansion
    }
  });
  console.log("🚀 ~ file: DecisionTree.jsx ~ line 120 ~ DecisionTree ~ sexo", sexo)

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
      <p>Entropía del conjunto: {entropíaConjunto}</p>
    </React.Fragment>
  );
};

export default DecisionTree;
