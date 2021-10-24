import React from 'react';
import dataSet from './conjuntoEntrenamiento2';
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoValoresColumna,
  posicionClase,
  listadoTituloColumnas,
  listadoDeAtributosSeparadosPorColumna,
  sumaEntropía,
  calculoEntropíaIndividual,
  cantValorPorAtributo,
  calculoGananciaInformacion,
  reducirTabla,
  filterConjunto,
  filtradoSegunAtributoGananciaMaxima,
} from './funciones';

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0);
  // obtenemos el nombre de la clase
  const clase = posicionClase(dataSet);
  const columnas = listadoTituloColumnas(dataSet);
  const listaAtributos = columnas.filter(
    (item) => item !== clase.nombre
  );
  const onlyAtributos = filterConjunto(
    dataSet,
    clase.nombre,
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 21 ~ DecisionTree ~ onlyAtributos', onlyAtributos);
  // obtenemos un listado de todos los componentes
  const listadoValoresClases = listadoValoresColumna(
    dataSet,
    clase.nombre
  );
  // clasificamos en nombre y cantidad
  // const cantidadAtributoClases = cantidadApariciones(listadoValoresClases);
  //se calcula la entropía del conjunto para los valores de la clase
  const entropíaConjunto = calculoEntropíaConjunto(listadoValoresClases);

  const listadoAtributosSeparadosPorClase = listadoDeAtributosSeparadosPorColumna(
    clase.nombre,
    listaAtributos,
    dataSet
  );
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 51 ~ DecisionTree ~ listadoAtributosSeparadosPorClase', listadoAtributosSeparadosPorClase);

  const cantValorPorAtributoConst = cantValorPorAtributo(
    listaAtributos,
    dataSet
  );

  const calculosEntropíaIndividual = listadoAtributosSeparadosPorClase.map(
    (atributo) => {
      const calculosPorClase = calculoEntropíaIndividual(
        atributo,
        cantValorPorAtributoConst
      );
      const entropíaTotal = sumaEntropía(calculosPorClase);
      return {
        atributo: atributo.atributo,
        cantAtributos: calculosPorClase[0].atributoTotal,
        // calculosPorClase: calculosPorClase,
        entropíasTotales: entropíaTotal,
      };
    }
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 37 ~ DecisionTree ~ calculosEntropíaIndividual', calculosEntropíaIndividual);

  const entropíaTotalAtributos = calculosEntropíaIndividual.map((item) => {
    const result = item.entropíasTotales.map((value) => {
      const cantValorAtributo = item.cantAtributos.find(
        (key) => key.campo === value.campo
      );
      const entropy =
        (cantValorAtributo.cant / listadoValoresClases.length) *
        value.entropía;
      return {
        campo: value.campo,
        entropy: entropy,
      };
    });
    const entropía = result
      .map((item) => item.entropy)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    return {
      atributo: item.atributo,
      entropía,
      entropíasIndividuales: item.entropíasTotales,
    };
  });

  const calculoGananciaInform = calculoGananciaInformacion(
    entropíaTotalAtributos,
    entropíaConjunto
  );
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 104 ~ DecisionTree ~ calculoGananciaInform', calculoGananciaInform);


  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 108 ~ DecisionTree ~ gananciaMaxima', gananciaMaxima);


  const nuevoDataSetSinPuros = reducirTabla(gananciaMaxima, dataSet);
  console.log("🚀 ~ file: DecisionTree.jsx ~ line 107 ~ DecisionTree ~ nuevoDataSetSinPuros", nuevoDataSetSinPuros)

  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(gananciaMaxima, nuevoDataSetSinPuros)
  console.log("🚀 ~ file: DecisionTree.jsx ~ line 117 ~ dataSetForExpansion", dataSetForExpansion)

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
