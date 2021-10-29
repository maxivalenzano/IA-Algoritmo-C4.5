import React from "react";
import dataSet from "./conjuntoEntrenamiento2";
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
    if (dataSet.length === 0) {
      return [];
    }
    const clase = posicionClase(dataSet);
    const listadoValoresClases = listadoValoresColumna(dataSet, clase.nombre);
    const entropiaConjunto = calculoEntropíaConjunto(listadoValoresClases);
    const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(
      clase.nombre,
      dataSet
    );
    const calculoGananciaInform = calculoGananciaInformacion(
      entropiaTotalAtributos,
      entropiaConjunto
    );
    const gananciaMaxima = maximoGanancia(calculoGananciaInform);
    const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
      gananciaMaxima,
      dataSet
    );

    return dataSetForExpansion.map((rama) => ({
      valorAtributo: rama.valorAtributo,
      nodoPuro: rama.nodoPuro,
      nodo: gananciaMaxima.atributo,
      ramas: expansion(rama.filas),
    }));
  };

  const data = expansion(dataSet);
  console.log("🚀 ~ ----------------------------------------", data);

  const recursive2 = (datos) => {
    if (datos.length === 0) {
      return [];
    }

    return datos.map((nodo) =>
      nodo.ramas[0]?.nodo
        ? {
            name: nodo.ramas[0]?.nodo,
            valorAtributo: nodo.valorAtributo,
            children: recursiveData(nodo.ramas),
          }
        : {
            nodoPuro: true,
            valorAtributo: nodo.valorAtributo,
            children: recursiveData(nodo.ramas),
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
              valorAtributo: nodo.valorAtributo,
              children: recursive2(nodo.ramas),
            }
          : {
              nodoPuro: true,
              valorAtributo: nodo.valorAtributo,
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
