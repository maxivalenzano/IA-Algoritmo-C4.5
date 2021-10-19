import React, { useState } from 'react';
import conjuntoEntrenamiento from './conjuntoEntrenamiento2';
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoAtributos,
  posicionClase,
  nombreID,
  listadoTituloColumnas,
  listadoDeAtributosSeparadosPorClase,
  sumaEntropía,
  calculoEntropíaIndividual,
  cantValorPorAtributo,
  calculoGananciaInformacion,
  reducirTabla,
  filterConjunto,
} from './funciones';

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0);
  const [primeraIteracion, setPrimeraIteracion] = useState(true);
  // obtenemos el nombre de la clase
  const nombreDeClase = posicionClase(conjuntoEntrenamiento);
  const nombreDeID = nombreID(conjuntoEntrenamiento);
  const columnas = listadoTituloColumnas(conjuntoEntrenamiento);
  const listaAtributos = columnas.filter(
    (item) => item !== nombreDeID && item !== nombreDeClase.nombre
  );
  const onlyAtributos = filterConjunto(
    conjuntoEntrenamiento,
    nombreDeClase.nombre,
    nombreDeID,
    primeraIteracion
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 21 ~ DecisionTree ~ onlyAtributos', onlyAtributos);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(
    conjuntoEntrenamiento,
    nombreDeClase.nombre
  );
  // clasificamos en nombre y cantidad
  // const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  //se calcula la entropía del conjunto para los valores de la clase
  const entropíaConjunto = calculoEntropíaConjunto(listadoAtributoClases);

  const listadoAtributosSeparadosPorClase = listadoDeAtributosSeparadosPorClase(
    nombreDeClase,
    listaAtributos,
    conjuntoEntrenamiento
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 37 ~ DecisionTree ~ listadoAtributosSeparadosPorClase', listadoAtributosSeparadosPorClase);

  const cantValorPorAtributoConst = cantValorPorAtributo(
    listaAtributos,
    conjuntoEntrenamiento
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
        (cantValorAtributo.cant / listadoAtributoClases.length) *
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

  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 59 ~ DecisionTree ~ gananciaMaxima',
    gananciaMaxima
  );

  const nuevaTabla = reducirTabla(gananciaMaxima, onlyAtributos);
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 130 ~ DecisionTree ~ nuevaTabla',
    nuevaTabla
  );
  const nuevito = filterConjunto(nuevaTabla, gananciaMaxima.atributo);
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 121 ~ DecisionTree ~ nuevito',
    nuevito
  );

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
      <p>Nombre de la clase: {nombreDeClase.nombre}</p>
      <p>Entropía del conjunto: {entropíaConjunto}</p>
    </React.Fragment>
  );
};

export default DecisionTree;
