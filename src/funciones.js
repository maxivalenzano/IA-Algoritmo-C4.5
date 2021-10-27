import { omit } from 'lodash-es';
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

// devuevle log en base 2
export const log2 = (n) => {
  return Math.log(n) / Math.log(2);
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
export const calculoEntropíaConjunto = (columna) => {
  const columnaClase = cantidadApariciones(columna);
  const cantAtrib = columna.length;
  let entropia = 0;
  columnaClase.forEach((item) => {
    entropia = entropia + -1 * (item.cant / cantAtrib) * log2(item.cant / cantAtrib);
  });
  return entropia;
};

export const listadoDeAtributosSeparadosPorColumna = (nombreColumna, dataSet) => {
  const columnas = listadoTituloColumnas(dataSet);
  const listaAtributos = columnas.filter((item) => item !== nombreColumna);
  const cantidadAtributoClases = cantidadApariciones(listadoValoresColumna(dataSet, nombreColumna));
  return listaAtributos.map((atributo) => {
    const filtradoSegunClase = cantidadAtributoClases.map((clase) => {
      const listadoCamposClase = dataSet.filter((item) => item[nombreColumna] === clase.campo);
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

export const calculoEntropíaIndividual = (atributo, cantValorPorAtributo) => {
  return atributo.filtradoSegunClase.map((clase) => {
    const atributoTotal = cantValorPorAtributo.find((item) => item.atributo === atributo.atributo);
    const result = clase.atributos.map((key) => {
      const cantValorAtributo = atributoTotal.cant.find((value) => value.campo === key.campo);
      const campoAtributo = key.campo;
      const entropiaParcial =
        -1 * ((key.cant / cantValorAtributo.cant) * log2(key.cant / cantValorAtributo.cant));
      return {
        entropiaParcial: entropiaParcial,
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

export const filtradoSegunAtributoGananciaMaxima = (gananciaMax, dataSet) => {
  const nuevoDataSetSinPuros = reducirTabla(gananciaMax, dataSet);
  return gananciaMax.entropiasIndividuales.map((valor) => {
    const result = nuevoDataSetSinPuros.filter(
      (item) => item[gananciaMax.atributo] === valor.campo.texto
    );

    let campoPuro = {};
    if (result.length === 0) {
      const busqueda = gananciaMax.cantXClase.find((campoClase) =>
        campoClase.entropias?.find((campoAtributo) => campoAtributo.campoAtributo === valor.campo)
      );
      campoPuro = busqueda.entropias.find((item) => item.campoAtributo === valor.campo);
    }
    const filtrados = result.map((fila) => omit(fila, gananciaMax.atributo));
    return { valorAtributo: valor.campo, filas: filtrados, nodoPuro: campoPuro };
  });
};

export const calculoEntropiaIndividual = (claseNombre, dataSet) => {
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
    const calculosPorClase = calculoEntropíaIndividual(atributo, cantValorPorAtributoConst);
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

export const calcularEntropiaTotalXAtributo = (nombreClase, dataSet) => {
  const listadoValoresClases = listadoValoresColumna(dataSet, nombreClase);

  const calculosEntropíaIndividual = calculoEntropiaIndividual(nombreClase, dataSet);

  const entropiaTotalAtributos = calculosEntropíaIndividual.map((item) => {
    const result = item.entropiasTotales.map((value) => {
      const cantValorAtributo = item.cantAtributos.find((key) => key.campo === value.campo);
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
