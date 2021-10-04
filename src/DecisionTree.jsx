import React from 'react';
import conjuntoEntrenamiento from './conjuntoEntrenamiento2';
import {
  maximoGanancia,
  calculoEntropiaConjunto,
  listadoAtributos,
  posicionClase,
  listadoTituloColumnas,
  listadoDeAtributosSeparadosPorClase,
  sumaEntropia,
  calculoEntropiaIndividual,
  cantValorPorAtributo,
  calculoGananciaInformacion,
} from './funciones';

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0);
  const columnas = listadoTituloColumnas(conjuntoEntrenamiento);
  const listaAtributos = columnas.slice(1, -1);
  // obtenemos el nombre de la clase
  const nombreDeClase = posicionClase(conjuntoEntrenamiento);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(
    conjuntoEntrenamiento,
    nombreDeClase.nombre
  );
  // clasificamos en nombre y cantidad
  // const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  //se calcula la entropia del conjunto para los valores de la clase
  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases);

  const listadoAtributosSeparadosPorClase = listadoDeAtributosSeparadosPorClase(
    nombreDeClase,
    listaAtributos,
    conjuntoEntrenamiento
  );
  // console.log('listadoAtributosSeparadosPorClase', listadoAtributosSeparadosPorClase);

  const cantValorPorAtributoConst = cantValorPorAtributo(
    listaAtributos,
    conjuntoEntrenamiento
  );

  const calculosEntropiaIndividual = listadoAtributosSeparadosPorClase.map(
    (atributo) => {
      const calculosPorClase = calculoEntropiaIndividual(
        atributo,
        cantValorPorAtributoConst
      );
      const entropiaTotal = sumaEntropia(calculosPorClase);
      return {
        atributo: atributo.atributo,
        cantAtrinutos: calculosPorClase[0].atributoTotal,
        // calculosPorClase: calculosPorClase,
        entropiasTotales: entropiaTotal,
      };
    }
  );
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 37 ~ DecisionTree ~ calculosEntropiaIndividual', calculosEntropiaIndividual);

  const entropiaTotalAtributos = calculosEntropiaIndividual.map((item) => {
    const result = item.entropiasTotales.map((value) => {
      const cantValorAtributo = item.cantAtrinutos.find(
        (key) => key.campo === value.campo
      );
      const entropy =
        (cantValorAtributo.cant / listadoAtributoClases.length) *
        value.entropia;
      return {
        campo: value.campo,
        entropy: entropy,
      };
    });
    const entropia = result
      .map((item) => item.entropy)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);
    return {
      atributo: item.atributo,
      entropia,
      entropiasIndividuales: item.entropiasTotales,
    };
  });
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 83 ~ DecisionTree ~ entropiaTotalAtributos',
    entropiaTotalAtributos
  );

  const calculoGananciaInform = calculoGananciaInformacion(
    entropiaTotalAtributos,
    entropiaConjunto
  );
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 96 ~ DecisionTree ~ calculoGananciaInform',
    calculoGananciaInform
  );

  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 59 ~ DecisionTree ~ gananciaMaxima',
    gananciaMaxima
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
      <p>Entropia del conjunto: {entropiaConjunto}</p>
    </React.Fragment>
  );
};

export default DecisionTree;
