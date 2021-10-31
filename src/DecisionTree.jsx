import React from "react";
import dataSet from "./conjuntoEntrenamiento4";
import {
  maximoGanancia,
  calculoEntropíaConjunto,
  listadoValoresColumna,
  posicionClase,
  calculoGananciaInformacion,
  filtradoSegunAtributoGananciaMaxima,
  calcularEntropiaTotalXAtributo,
} from "./funciones";

const DecisionTree = () => {
  const expansion = (dataSet) => {
  console.log('🚀 ~ --------------------------------------------------------------', dataSet);
    // caso base
    if (dataSet.length === 0) {
      return [];
    }
    const clase = posicionClase(dataSet);
    // caso base, si nodo Impuro
    if (clase.index === 0) {
      return [];
    }
    const listadoValoresClases = listadoValoresColumna(dataSet, clase.nombre);
    const entropiaConjunto = calculoEntropíaConjunto(listadoValoresClases);
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 24 ~ expansion ~ entropiaConjunto', entropiaConjunto);
    if (entropiaConjunto === 0) {
      return [];
    }
    const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(
      clase.nombre,
      dataSet
    );
    // console.log('🚀 ~ file: DecisionTree.jsx ~ line 29 ~ expansion ~ entropiaTotalAtributos', entropiaTotalAtributos);
    const calculoGananciaInform = calculoGananciaInformacion(
      entropiaTotalAtributos,
      entropiaConjunto
    );
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 34 ~ expansion ~ calculoGananciaInform', calculoGananciaInform);
    const gananciaMaxima = maximoGanancia(calculoGananciaInform);
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 36 ~ expansion ~ gananciaMaxima', gananciaMaxima);
    const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
      gananciaMaxima,
      dataSet,
      clase.nombre
    );
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 41 ~ expansion ~ dataSetForExpansion', dataSetForExpansion);

    return dataSetForExpansion.map((rama) => {
    console.log('🚀 ~ file: DecisionTree.jsx ~ line 45 ~ returnDataSetForExpansion.map ~ rama', rama);
    return ({
        valorAtributo: rama.valorAtributo,
        nodoPuro: rama.nodoPuro,
        nodo: gananciaMaxima.atributo,
        ramas: expansion(rama.filas),
      })
    });
  };

  const data = expansion(dataSet);
  console.log("🚀 ~ ----------------------------------------", data);

  const recursive2 = (datos) => {
    if (datos.length === 0) {
      return [];
    }

    return datos.map((nodo) =>
    {
        console.log('🚀 ~ file: DecisionTree.jsx ~ line 70 ~ recursive2 ~ nodo', nodo);
        return (nodo.ramas[0]?.nodo
          ? {
              name: nodo.ramas[0]?.nodo,
              attributes: {
                department: nodo.valorAtributo,
              },
              children: recursive2(nodo.ramas),
            }
          : {
              name: nodo.nodoPuro.campoClase ? `valorClase: ${nodo.nodoPuro.campoClase}` : '?',
              attributes: {
                department: nodo.valorAtributo,
              },
              children: recursive2(nodo.ramas),
            })
      }
    );
  };

  const recursiveData = (datos) => {
    if (datos.length === 0) {
      return [];
    }

    return {
      name: datos[0].nodo,
      children: datos.map((nodo) =>
        nodo.ramas[0]?.nodo
          ? {
              name: nodo.ramas[0]?.nodo,
              attributes: {
                department: nodo.valorAtributo,
              },
              children: recursive2(nodo.ramas),
            }
          : {
              name: nodo.nodoPuro.campoClase ? `valorClase: ${nodo.nodoPuro.campoClase}` : '?',
              attributes: {
                department: nodo.valorAtributo,
              },
              children: recursive2(nodo.ramas),
            }
      ),
    };
  };

  console.log(
    "🚀 ~ -----------------------------------------------",
    recursiveData(data)
  );

  return (
    <React.Fragment>
      <p>hola mundo</p>
    </React.Fragment>
  );
};

export default DecisionTree;
