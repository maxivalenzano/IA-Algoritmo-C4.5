import { omit, maxBy } from 'lodash-es';
// devuelve los titulos de la primer fila
export const listadoTituloColumnas = (datos) => {
  return Object.keys(datos[0]);
};

// devuelve el nombre de la clase (ultima fila)
export const posicionClase = (datos) => {
  const columnas = listadoTituloColumnas(datos);
  return {
    nombre: columnas[columnas.length - 1],
    index: columnas.length - 1,
  };
};
// devuelve el nombre del ID (primera columna)
export const nombreID = (datos) => {
  const columnas = listadoTituloColumnas(datos);
  return columnas[0];
};

// devuelve un listado con todos los campos de la fila dada
export const listadoValoresColumna = (datos, nombreColumna) => {
  return datos.map((item) => item[nombreColumna]);
};

// devuelve log en base 2
export const log2 = (n) => {
  return Math.log(n) / Math.log(2);
};

export const logN = (n, m) => {
  return Math.log(n) / Math.log(m);
};

// devuelve un objeto con cada nombre de atributo y su cantidad de aparicion
export const cantidadApariciones = (arr) => {
  const counts = {};
  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }
  const object = Object.entries(counts).map((item) => {
    return {
      campo: item[0],
      cant: item[1],
    };
  });
  return object;
};

// devuelve la entropia del conjunto
export const calculoEntropíaConjunto = (columnaDeLaClase, baseLogN) => {
  const cantidadPorValorDeClase = cantidadApariciones(columnaDeLaClase);
  const cantElementosD = columnaDeLaClase.length;
  let entropia = 0;
  cantidadPorValorDeClase.forEach((campoValorClase) => {
    const terminoValorClase =
      -1 *
      (campoValorClase.cant / cantElementosD) *
      logN(campoValorClase.cant / cantElementosD, baseLogN);
    entropia = entropia + terminoValorClase;
  });
  return entropia;
};

export const listadoDeAtributosSeparadosPorColumna = (nombreClase, dataSet) => {
  const columnas = listadoTituloColumnas(dataSet);
  const listaAtributos = columnas.filter((item) => item !== nombreClase);
  const cantidadValoresDeClase = cantidadApariciones(listadoValoresColumna(dataSet, nombreClase));
  return listaAtributos.map((atributo) => {
    const filtradoSegunClase = cantidadValoresDeClase.map((clase) => {
      const listadoCamposClase = dataSet.filter((item) => {
        return String(item[nombreClase]) === String(clase.campo);
      });
      const listadoAtributosSeparadoPorClase = listadoCamposClase.map((item) => {
        return item[atributo];
      });
      const aparicionesAtributo = cantidadApariciones(listadoAtributosSeparadoPorClase);
      return {
        campoClase: clase.campo,
        cantCampoClase: listadoCamposClase.length,
        campoAtributo: listadoAtributosSeparadoPorClase,
        atributos: aparicionesAtributo,
      };
    });
    return {
      atributo: atributo,
      filtradoSegunClase,
    };
  });
};

export const sumaEntropía = (calculosPorClase) => {
  let entropiasTotales = {};
  calculosPorClase.forEach((item) => {
    item.entropias.forEach((campo) => {
      entropiasTotales[campo.campoAtributo] =
        (entropiasTotales[campo.campoAtributo] || 0) + campo.entropiaParcial;
    });
  });
  const entropyToObject = Object.entries(entropiasTotales).map((item) => {
    return {
      campo: item[0],
      entropia: item[1],
    };
  });
  return entropyToObject;
};

export const calculoEntropíaIndividual = (atributo, cantValorPorAtributo, baseLogN) => {
  return atributo.filtradoSegunClase.map((clase) => {
    const atributoTotal = cantValorPorAtributo.find(
      (item) => String(item.atributo) === String(atributo.atributo)
    );

    const result = clase.atributos.map((key) => {
      const cantValorAtributo = atributoTotal.cant.find(
        (value) => String(value.campo) === String(key.campo)
      );
      const campoAtributo = key.campo;
      const terminoEntropiaParcial =
        -1 *
        (key.cant / cantValorAtributo.cant) *
        logN(key.cant / cantValorAtributo.cant, baseLogN);
      return {
        entropiaParcial: terminoEntropiaParcial,
        campoAtributo: campoAtributo,
        campoClase: clase.campoClase,
        cantTotalXatributo: cantValorAtributo.cant,
        cantAtributoXClase: key.cant,
      };
    });
    return {
      campoClase: clase.campoClase,
      entropias: result,
      atributoTotal: atributoTotal.cant,
    };
  });
};

export const cantValorPorAtributo = (listaAtributos, conjuntoDeDatos) => {
  return listaAtributos.map((atributo) => {
    const result = cantidadApariciones(listadoValoresColumna(conjuntoDeDatos, atributo));
    return {
      cant: result,
      atributo: atributo,
    };
  });
};

export const maximoGanancia = (conjunto) => {
  const onlyGanancia = conjunto.map((item) => item.ganancia);
  const max = Math.max(...onlyGanancia);
  const busqueda = conjunto.find((item) => item.ganancia === max);
  return busqueda;
};

export const calculoGananciaInformacion = (entropiaTotalAtributos, entropiaConjunto) => {
  return entropiaTotalAtributos.map((item) => {
    const ganancia = entropiaConjunto - item.entropia;
    return {
      atributo: item.atributo,
      ganancia: ganancia,
      entropiasIndividuales: item.entropiasIndividuales,
      cantXClase: item.cantXclases,
    };
  });
};

export const calculoTasaGananciaInformacion = (
  entropiaTotalAtributos,
  entropiaConjunto,
  baseLogN
) => {
  return entropiaTotalAtributos.map((item) => {
    const atributosTotales = item.cantXclases[0].atributoTotal;
    const cantValoresClase = atributosTotales.reduce((acc, curr) => {
      return acc + curr.cant;
    }, 0);

    const denominadorTG = atributosTotales.reduce((acc, curr) => {
      const termino =
        -1 * (curr.cant / cantValoresClase) * logN(curr.cant / cantValoresClase, baseLogN);
      return acc + termino;
    }, 0);
    const ganancia = entropiaConjunto - item.entropia;

    return {
      atributo: item.atributo,
      ganancia: ganancia / denominadorTG ? ganancia / denominadorTG : 0,
      entropiasIndividuales: item.entropiasIndividuales,
      cantXClase: item.cantXclases,
    };
  });
};

export const reducirTabla = (gananciaMax, atributos) => {
  let nuevoDataSet = atributos;
  const camposPuros = gananciaMax.entropiasIndividuales
    .filter((item) => item.entropia === 0)
    .map((item) => item.campo);
  if (camposPuros.length) {
    nuevoDataSet = atributos.filter((item) => !camposPuros.includes(item[gananciaMax.atributo]));
  }
  return nuevoDataSet;
};

export const filterConjunto = (conjunto, clase) => {
  const filtered = conjunto.map((item) => {
    return omit(item, clase);
  });
  return filtered;
};

export const busquedaCampoClase = (gananciaMax, valor) => {
  const busqueda = gananciaMax.cantXClase.find((campoClase) =>
    campoClase.entropias?.find(
      (campoAtributo) => String(campoAtributo.campoAtributo) === String(valor.campo)
    )
  );
  return busqueda.entropias.find((item) => String(item.campoAtributo) === String(valor.campo));
};

export const filtradoSegunAtributoGananciaMaxima = (
  gananciaMax,
  dataSet,
  nombreClase,
  umbral,
  baseLogN
) => {
  const nuevoDataSetSinPuros = reducirTabla(gananciaMax, dataSet);
  return gananciaMax.entropiasIndividuales.map((valor) => {
    let campoPuro = {};
    if (gananciaMax.ganancia < umbral) {
      const valoresClasePorAtrib = gananciaMax.cantXClase.map((campoClase) => {
        return (
          campoClase.entropias.find((atributo) => atributo.campoAtributo === valor.campo) ?? {}
        );
      });
      const maxValorClasePorAtrib = maxBy(valoresClasePorAtrib, function (item) {
        return item.cantAtributoXClase;
      });
      const valoresMaxDuplicados = valoresClasePorAtrib.filter(
        (item) => item.cantAtributoXClase === maxValorClasePorAtrib.cantAtributoXClase
      );
      if (valoresMaxDuplicados.length === 1) {
        campoPuro = maxValorClasePorAtrib;
      }

      return {
        valorAtributo: valor.campo,
        filas: [],
        nodoPuro: campoPuro,
      };
    }
    const result = nuevoDataSetSinPuros.filter((item) => {
      return String(item[gananciaMax.atributo]) === String(valor.campo);
    });

    if (result.length === 0) {
      campoPuro = busquedaCampoClase(gananciaMax, valor);
    }
    const filtrados = result.map((fila) => omit(fila, gananciaMax.atributo));
    const entropiaFuturoConjunto = calculoEntropíaConjunto(
      listadoValoresColumna(filtrados, nombreClase),
      baseLogN
    );

    if (entropiaFuturoConjunto === 0) {
      campoPuro = busquedaCampoClase(gananciaMax, valor);
    }

    return {
      valorAtributo: valor.campo,
      filas: filtrados,
      nodoPuro: campoPuro,
    };
  });
};

export const calculoEntropiaIndividual = (claseNombre, dataSet, baseLogN) => {
  const columnas = listadoTituloColumnas(dataSet);
  const listaAtributos = columnas.filter((item) => item !== claseNombre);

  // de esta variable
  const listadoAtributosSeparadosPorClase = listadoDeAtributosSeparadosPorColumna(
    claseNombre,
    dataSet
  );

  const cantValorPorAtributoConst = cantValorPorAtributo(listaAtributos, dataSet);

  const calculosEntropíaIndividual = listadoAtributosSeparadosPorClase.map((atributo) => {
    // buscar valores aquí de la cantidad por atributos
    const calculosPorClase = calculoEntropíaIndividual(
      atributo,
      cantValorPorAtributoConst,
      baseLogN
    );
    const entropiaTotal = sumaEntropía(calculosPorClase);
    return {
      atributo: atributo.atributo,
      cantAtributos: calculosPorClase[0].atributoTotal,
      cantXclases: calculosPorClase,
      entropiasTotales: entropiaTotal,
    };
  });
  return calculosEntropíaIndividual;
};

export const calcularEntropiaTotalXAtributo = (nombreClase, dataSet, baseLogN) => {
  const listadoValoresClases = listadoValoresColumna(dataSet, nombreClase);

  const calculosEntropíaIndividual = calculoEntropiaIndividual(nombreClase, dataSet, baseLogN);

  const entropiaTotalAtributos = calculosEntropíaIndividual.map((item) => {
    const result = item.entropiasTotales.map((value) => {
      const cantValorAtributo = item.cantAtributos.find(
        (key) => String(key.campo) === String(value.campo)
      );
      const entropy = (cantValorAtributo.cant / listadoValoresClases.length) * value.entropia;
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
      cantXclases: item.cantXclases,
    };
  });
  return entropiaTotalAtributos;
};

export const expansionAlgoritmo = (dataSet, umbral, baseLogN) => {
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
  const entropiaConjunto = calculoEntropíaConjunto(listadoValoresClases, baseLogN);
  // caso base, si nodo es puro
  if (entropiaConjunto === 0) {
    return [];
  }
  const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet, baseLogN);
  const calculoGananciaInform = calculoGananciaInformacion(
    entropiaTotalAtributos,
    entropiaConjunto
  );
  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
    gananciaMaxima,
    dataSet,
    clase.nombre,
    umbral
  );

  return dataSetForExpansion.map((rama) => {
    return {
      valorAtributo: rama.valorAtributo,
      nodoPuro: rama.nodoPuro,
      nodo: gananciaMaxima.atributo,
      ramas: expansionAlgoritmo(rama.filas, umbral, baseLogN),
    };
  });
};

export const expansionAlgoritmoConTG = (dataSet, umbral, baseLogN) => {
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
  const entropiaConjunto = calculoEntropíaConjunto(listadoValoresClases, baseLogN);
  // caso base, si nodo es puro
  if (entropiaConjunto === 0) {
    return [];
  }
  const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet, baseLogN);
  const calculoGananciaInform = calculoTasaGananciaInformacion(
    entropiaTotalAtributos,
    entropiaConjunto
  );
  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
    gananciaMaxima,
    dataSet,
    clase.nombre,
    umbral
  );

  return dataSetForExpansion.map((rama) => {
    return {
      valorAtributo: rama.valorAtributo,
      nodoPuro: rama.nodoPuro,
      nodo: gananciaMaxima.atributo,
      ramas: expansionAlgoritmoConTG(rama.filas, umbral, baseLogN),
    };
  });
};

export const auxFormateoDatos = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return datos.map((nodo) => {
    const nameNodo = nodo.ramas[0]?.nodo
      ? `Nodo: ${nodo.ramas[0]?.nodo}`
      : nodo.nodoPuro.campoClase
      ? `valorClase: ${nodo.nodoPuro.campoClase}`
      : 'NodoImpuro';
    return nodo.ramas.length === 0
      ? {
          name: nameNodo,
          attributes: {
            department: nodo.valorAtributo,
          },
        }
      : {
          name: nameNodo,
          attributes: {
            department: nodo.valorAtributo,
          },
          children: auxFormateoDatos(nodo.ramas),
        };
  });
};

export const formatearDatos = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return {
    name: datos[0].nodo,
    children: datos.map((nodo) => {
      const nameNodo = nodo.ramas[0]?.nodo
        ? `Nodo: ${nodo.ramas[0]?.nodo}`
        : nodo.nodoPuro.campoClase
        ? `valorClase: ${nodo.nodoPuro.campoClase}`
        : 'NodoImpuro';
      return nodo.ramas.length === 0
        ? {
            name: nameNodo,
            attributes: {
              department: nodo.valorAtributo,
            },
          }
        : {
            name: nameNodo,
            attributes: {
              department: nodo.valorAtributo,
            },
            children: auxFormateoDatos(nodo.ramas),
          };
    }),
  };
};

export const calcularC45 = (dataSet, umbral) => {
  const baseLogN = cantidadApariciones(
    listadoValoresColumna(dataSet, posicionClase(dataSet).nombre)
  ).length;
  const data = expansionAlgoritmo(dataSet, umbral, baseLogN);
  return formatearDatos(data);
};

export const calcularC45_TG = (dataSet, umbral) => {
  const baseLogN = cantidadApariciones(
    listadoValoresColumna(dataSet, posicionClase(dataSet).nombre)
  ).length;
  const data = expansionAlgoritmoConTG(dataSet, umbral, baseLogN);
  return formatearDatos(data);
};
