import { omit, maxBy, difference } from "lodash-es";
// devuelve los titulos de la primer fila
export const listadoTituloColumnas = (datos) => {
  return Object.keys(datos[0]);
};

export const formatColumns = (titles) => {
  let result = titles.map((column) => {
    return { field: column, title: column, sorting: true, filtering: true, }
  })
  result.push({ field: 'id', title: 'id', hidden: true })
  return result
}

export const formatedRow = (csv) => {
  return csv.map((item, index) => {
    return {...item, id: index}
  })
}

export const atributos = (data) => {
  let opcionesAtributosAux = [];
  //atributos, o sea los nombres
  for (let i = 0; i < listadoTituloColumnas(data).length - 1; i++) {
    let opciones = listadoValoresColumna(data, listadoTituloColumnas(data).at(i));
    let result = opciones.filter((item, index) => opciones.indexOf(item) === index);
    opcionesAtributosAux.push(result);
  }
  return opcionesAtributosAux
}

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

// devuelve un objeto con cada nombre de atributo y la cantidad de veces que aparece
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
export const calculoEntropíaConjunto = (columnaDeLaClase) => {
  const cantidadPorValorDeClase = cantidadApariciones(columnaDeLaClase);
  const cantElementosD = columnaDeLaClase.length;
  let entropia = 0;
  cantidadPorValorDeClase.forEach((campoValorClase) => {
    const terminoValorClase =
      -1 * (campoValorClase.cant / cantElementosD) * log2(campoValorClase.cant / cantElementosD);
    entropia = entropia + terminoValorClase;
  });
  return entropia;
};

// devuelve un listado de Atributos Separados Por valor de Clase y su cantidad de apariciones
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

// funcion que suma las entropias parciales de cada atributo y devuelve las entropias de los valores de cada atributo
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

// calcula las entropias de cada termino de cada valor de atributo (es un calculo parcial, luego se pasa a SumaEntropía)
export const calculoEntropiaParcialPorValorAtributoPorValorClase = (atributo, cantValorPorAtributo) => {
  return atributo.filtradoSegunClase.map((clase) => {
    const atributoTotal = cantValorPorAtributo.find(
      (item) => String(item.atributo) === String(atributo.atributo)
    );

    const result = clase.atributos.map((key) => {
      const cantValorAtributo = atributoTotal.cant.find((value) => String(value.campo) === String(key.campo));
      const campoAtributo = key.campo;
      const terminoEntropiaParcial =
        -1 * (key.cant / cantValorAtributo.cant) * log2(key.cant / cantValorAtributo.cant);
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

// devuelve un objeto con cada nombre de atributo y la cantidad de veces que aparece
export const cantValorPorAtributo = (listaAtributos, conjuntoDeDatos) => {
  return listaAtributos.map((atributo) => {
    const result = cantidadApariciones(listadoValoresColumna(conjuntoDeDatos, atributo));
    return {
      cant: result,
      atributo: atributo,
    };
  });
};

// funcion que selecciona el atributo con mayor ganancia o tasa de ganancia
export const maximoGanancia = (conjunto) => {
  const onlyGanancia = conjunto.map((item) => item.ganancia);
  const max = Math.max(...onlyGanancia);
  const busqueda = conjunto.find((item) => item.ganancia === max);
  return busqueda;
};

// devuelve la ganancia de informacion de un atributo
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

// devuelve la tasa de ganancia de informacion de un atributo
export const calculoTasaGananciaInformacion = (entropiaTotalAtributos, entropiaConjunto) => {
  return entropiaTotalAtributos.map((item) => {
    const atributosTotales = item.cantXclases[0].atributoTotal;
    const cantValoresClase = atributosTotales.reduce((acc, curr) => {
      return acc + curr.cant;
    }, 0);

    const denominadorTG = atributosTotales.reduce((acc, curr) => {
      const termino = -1 * (curr.cant / cantValoresClase) * log2(curr.cant / cantValoresClase);
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

// devuelve un nuevo dataSet sin las filas de aquellos valores de atributo que se correspondan con un solo valor de clase
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

// funcion obsoleta
export const filterConjunto = (conjunto, clase) => {
  const filtered = conjunto.map((item) => {
    return omit(item, clase);
  });
  return filtered;
};

// busca en el atributo de mayor ganancia, toda la informacion respecto al valor de clase que le pasemos
export const busquedaCampoClase = (gananciaMax, valor) => {
  const busqueda = gananciaMax.cantXClase.find((campoClase) =>
    campoClase.entropias?.find((campoAtributo) => String(campoAtributo.campoAtributo) === String(valor.campo))
  );
  return busqueda.entropias.find((item) => String(item.campoAtributo) === String(valor.campo));
};

// funcion que devuelve el nuevo dataSet para su recursion
export const filtradoSegunAtributoGananciaMaxima = (gananciaMax, dataSet, nombreClase, umbral) => {
  // llama a la funcion que elimina los puros del dataSet (si los hubiera)
  const nuevoDataSetSinPuros = reducirTabla(gananciaMax, dataSet);

  // en base al nodo de mayor ganancia, por cada una de sus ramas, devuelve un dataSet reducido.
  //  en caso de que alguna rama sea sea pura, devuelve un dataSet vacio, ademas de informacion acerca de cada atributo
  return gananciaMax.entropiasIndividuales.map((valor) => {
    let campoPuro = {};
    // comparamos la ganancia o tasa de ganancia con el umbral ingresado
    if (gananciaMax.ganancia < umbral) {
      const valoresClasePorAtrib = gananciaMax.cantXClase.map((campoClase) => {
        return campoClase.entropias.find((atributo) => atributo.campoAtributo === valor.campo) ?? {};
      });
      // buscamos el valor mas frecuente de clase por cada valor de atributo
      const maxValorClasePorAtrib = maxBy(valoresClasePorAtrib, function (item) {
        return item.cantAtributoXClase;
      });
      // buscamos si hay mas de 1 valor frecuente
      const valoresMaxDuplicados = valoresClasePorAtrib.filter(
        (item) => item.cantAtributoXClase === maxValorClasePorAtrib.cantAtributoXClase
      );
      // verifica si el valor mas frecuente es unico, en caso de ser unico es un nodo puro
      if (valoresMaxDuplicados.length === 1) {
        campoPuro = maxValorClasePorAtrib;
      }

      return {
        gananciaMax: gananciaMax,
        valorAtributo: valor,
        filas: [],
        nodoPuro: campoPuro,
      };
    }
    // tratamiento por si la ganancia es mayor al umbral
    const result = nuevoDataSetSinPuros.filter((item) => {
      return String(item[gananciaMax.atributo]) === String(valor.campo);
    });

    // si el nuevo dataSet es vacio, lo clasifica como puro para ese valor de atributo
    if (result.length === 0) {
      campoPuro = busquedaCampoClase(gananciaMax, valor);
    }

    // prepara el nuevo dataSet, eliminando toda la columna del atributo con mayor ganancia
    const filtrados = result.map((fila) => omit(fila, gananciaMax.atributo));

    // verificamos si la entropia del futuro conjunto a evaluar es 0, para resguardar informacion
    const entropiaFuturoConjunto = calculoEntropíaConjunto(listadoValoresColumna(filtrados, nombreClase));
    if (entropiaFuturoConjunto === 0) {
      campoPuro = busquedaCampoClase(gananciaMax, valor);
    }

    return {
      gananciaMax: gananciaMax,
      valorAtributo: valor,
      filas: filtrados,
      nodoPuro: campoPuro,
    };
  });
};

// calcula la entropia individual de cada valor de atributo
export const calculoEntropiaIndividual = (claseNombre, dataSet) => {
  const columnas = listadoTituloColumnas(dataSet);
  const listaAtributos = columnas.filter((item) => item !== claseNombre);
  // de esta variable
  const listadoAtributosSeparadosPorClase = listadoDeAtributosSeparadosPorColumna(claseNombre, dataSet);

  const cantValorPorAtributoConst = cantValorPorAtributo(listaAtributos, dataSet);

  const calculosEntropíaIndividual = listadoAtributosSeparadosPorClase.map((atributo) => {
    const calculosPorClase = calculoEntropiaParcialPorValorAtributoPorValorClase(
      atributo,
      cantValorPorAtributoConst
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

// calcula la entropia individual de cada atributo
export const calcularEntropiaTotalXAtributo = (nombreClase, dataSet) => {
  const listadoValoresClases = listadoValoresColumna(dataSet, nombreClase);

  const calculosEntropíaIndividual = calculoEntropiaIndividual(nombreClase, dataSet);

  const entropiaTotalAtributos = calculosEntropíaIndividual.map((item) => {
    const result = item.entropiasTotales.map((value) => {
      const cantValorAtributo = item.cantAtributos.find((key) => String(key.campo) === String(value.campo));
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

// funcion recursiva utilizando la Ganancia
export const expansionAlgoritmo = (dataSet, umbral) => {
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
  // caso base, si nodo es puro
  if (entropiaConjunto === 0) {
    return [];
  }
  const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet);
  const calculoGananciaInform = calculoGananciaInformacion(entropiaTotalAtributos, entropiaConjunto);
  const gananciaMaxima = maximoGanancia(calculoGananciaInform);
  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
    gananciaMaxima,
    dataSet,
    clase.nombre,
    umbral
  );

  return dataSetForExpansion.map((rama) => {
    return {
      gananciaMax: rama.gananciaMax,
      valorAtributo: rama.valorAtributo,
      nodoPuro: { clase: clase.nombre, nodoPuro: rama.nodoPuro },
      nodo: gananciaMaxima.atributo,
      ramas: expansionAlgoritmo(rama.filas, umbral),
    };
  });
};

// funcion recursiva utilizando la Tasa de Ganancia
export const expansionAlgoritmoConTG = (dataSet, umbral) => {
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
  // caso base, si nodo es puro
  if (entropiaConjunto === 0) {
    return [];
  }
  const entropiaTotalAtributos = calcularEntropiaTotalXAtributo(clase.nombre, dataSet);
  const calculoTasaGanancia = calculoTasaGananciaInformacion(entropiaTotalAtributos, entropiaConjunto);
  const gananciaMaxima = maximoGanancia(calculoTasaGanancia);
  const dataSetForExpansion = filtradoSegunAtributoGananciaMaxima(
    gananciaMaxima,
    dataSet,
    clase.nombre,
    umbral
  );

  return dataSetForExpansion.map((rama) => {
    return {
      gananciaMax: rama.gananciaMax,
      valorAtributo: rama.valorAtributo,
      nodoPuro: { clase: clase.nombre, nodoPuro: rama.nodoPuro },
      nodo: gananciaMaxima.atributo,
      ramas: expansionAlgoritmoConTG(rama.filas, umbral),
    };
  });
};

//funcion auxiliar que nos formatea los datos de salida en un JSON para la librería gráfica
export const auxFormateoDatos = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return datos.map((nodo) => {
    const nameNodo = nodo.ramas[0]?.nodo
      ? `Nodo: ${nodo.ramas[0]?.nodo}`
      : nodo.nodoPuro?.nodoPuro?.campoClase
      ? `${nodo.nodoPuro.clase}: ${nodo.nodoPuro.nodoPuro?.campoClase}`
      : "NodoImpuro";
    return nodo.ramas.length === 0
      ? {
          name: nameNodo,
          info: nodo.ramas[0]?.gananciaMax,
          anterior: nodo.gananciaMax,
          attributes: {
            atributo: nodo.valorAtributo.campo,
            entropy: nodo.valorAtributo.entropia,
          },
        }
      : {
          name: nameNodo,
          info: nodo.ramas[0]?.gananciaMax,
          anterior: nodo.gananciaMax,
          attributes: {
            atributo: nodo.valorAtributo.campo,
            entropy: nodo.valorAtributo.entropia,
          },
          children: auxFormateoDatos(nodo.ramas),
        };
  });
};

//funcion que nos formatea los datos de salida en un JSON para la librería gráfica
export const formatearDatos = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return {
    name: datos[0].nodo,
    info: datos[0].gananciaMax,
    children: datos.map((nodo) => {
      const nameNodo = nodo.ramas[0]?.nodo
        ? `Nodo: ${nodo.ramas[0]?.nodo}`
        : nodo.nodoPuro?.nodoPuro?.campoClase
        ? `${nodo.nodoPuro.clase}: ${nodo.nodoPuro.nodoPuro?.campoClase}`
        : "NodoImpuro";
      return nodo.ramas.length === 0
        ? {
            name: nameNodo,
            info: nodo.ramas[0]?.gananciaMax,
            anterior: nodo.gananciaMax,
            attributes: {
              atributo: nodo.valorAtributo.campo,
              entropy: nodo.valorAtributo.entropia,
            },
          }
        : {
            name: nameNodo,
            info: nodo.ramas[0]?.gananciaMax,
            anterior: nodo.gananciaMax,
            attributes: {
              atributo: nodo.valorAtributo.campo,
              entropy: nodo.valorAtributo.entropia,
            },
            children: auxFormateoDatos(nodo.ramas),
          };
    }),
  };
};
let caminosPosibles = [];
let noClasifican = [];
let correctos = [];
let fallidos = [];
let caminosPosiblesTG = [];
let noClasificanTG = [];
let correctosTG = [];
let fallidosTG = [];

export const formatearDatosTest = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return {
    name: datos[0].nodo,
    children: datos.map((nodo) => {
      const attributeName = nodo.nodo;
      const nameNodo = nodo.ramas[0]?.nodo
        ? nodo.ramas[0]?.nodo
        : nodo.nodoPuro?.nodoPuro?.campoClase
        ? nodo.nodoPuro.nodoPuro?.campoClase
        : "NodoImpuro";
        if (nodo.ramas.length === 0) {
          if (nameNodo !== 'NodoImpuro') {
            caminosPosibles.push({
              ...datos.obj,
              [attributeName]: nodo.valorAtributo.campo,
              [nodo.nodoPuro.clase]: nameNodo,
            });
          } else {
            caminosPosibles.push({
              ...datos.obj,
              [attributeName]: nodo.valorAtributo.campo,
              [nodo.nodoPuro.clase]: nameNodo,
            });
          }
        }
      return nodo.ramas.length === 0
        ? {
            name: nameNodo,
            attributes: nodo.valorAtributo.campo,
            obj: { [attributeName]: nodo.valorAtributo.campo, [nodo.nodoPuro.clase]: nameNodo },
          }
        : {
            name: nameNodo,
            attributes: nodo.valorAtributo.campo,
            obj: { [attributeName]: nodo.valorAtributo.campo },
            children: auxFormateoDatosTest({
              datos: nodo.ramas,
              obj: { [attributeName]: nodo.valorAtributo.campo },
            }),
          };
    }),
  };
};

export const auxFormateoDatosTest = (datos) => {
  if (datos.datos.length === 0) {
    return [];
  }
  return datos.datos.map((nodo) => {
    const attributeName = nodo.nodo;
    const nameNodo = nodo.ramas[0]?.nodo
      ? nodo.ramas[0]?.nodo
      : nodo.nodoPuro?.nodoPuro?.campoClase
      ? nodo.nodoPuro.nodoPuro?.campoClase
      : "NodoImpuro";
      if (nodo.ramas.length === 0) {
        if (nameNodo !== 'NodoImpuro') {
          caminosPosibles.push({
            ...datos.obj,
            [attributeName]: nodo.valorAtributo.campo,
            [nodo.nodoPuro.clase]: nameNodo,
          });
        } else {
          caminosPosibles.push({
            ...datos.obj,
            [attributeName]: nodo.valorAtributo.campo,
            [nodo.nodoPuro.clase]: nameNodo,
          });
        }
      }
    return nodo.ramas.length === 0
      ? {
          name: nameNodo,
          attributes: nodo.valorAtributo.campo,
          obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo, [nodo.nodoPuro.clase]: nameNodo },
        }
      : {
          name: nameNodo,
          attributes: nodo.valorAtributo.campo,
          obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo },
          children: auxFormateoDatosTest({
            datos: nodo.ramas,
            obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo },
          }),
        };
  });
};
export const testearFilas = (caminosPosibles, dataSet) => {
  const result = dataSet.map((row) => {
    const result2 = caminosPosibles.map((camino) => {
      let bandera = true;
      let incorrecto = false;
      let count = 0;
      const largo = Object.entries(camino).length;
      const result3 = Object.entries(camino).map(([key, value]) => {
        // value === 'NodoImpuro' && console.log('🚀 ~ file: funciones.js ~ line 585 ~ result3', (count), largo)
        if (value === 'NodoImpuro' && ((count+1) === largo)) {
          // console.log('🚀 ~ file: funciones.js ~ line 584', value, String(row[key]));
          incorrecto = true;
        }
        bandera = (String(row[key]) === String(value));
        bandera && count ++;
        return String(row[key]) === String(value);
      });
      // console.log('🚀 ~ file: funciones.js ~ line 594 ~ result3 ~ result3', result3);
      if (incorrecto) {
      //   console.log('🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~', {
      //   validaciones: result3,
      //   posibleIncorrecto: row,
      //   camino: camino,
      // });
      noClasifican.push(row)
    } 
      return !result3.includes(false);
    });
    // console.log(
    //   "🚀 ~ file: funciones.js ~ line 562 ~ result2 ~ result2",
    //   {result2,
    //   valor: result2.includes(true),
    //   row}
    // );
    if (result2.includes(true)) {
      correctos.push(row)
    } else {fallidos.push(row)}
    return result2.includes(true);
  });
  // console.log("🚀 ~ file: funciones.js ~ line 558 ~ testearFilas ~ result", result);
  return result;
};

export const formatearDatosTestTG = (datos) => {
  if (datos.length === 0) {
    return [];
  }
  return {
    name: datos[0].nodo,
    children: datos.map((nodo) => {
      const attributeName = nodo.nodo;
      const nameNodo = nodo.ramas[0]?.nodo
        ? nodo.ramas[0]?.nodo
        : nodo.nodoPuro?.nodoPuro?.campoClase
        ? nodo.nodoPuro.nodoPuro?.campoClase
        : "NodoImpuro";
        if (nodo.ramas.length === 0) {
          if (nameNodo !== 'NodoImpuro') {
            caminosPosiblesTG.push({
              ...datos.obj,
              [attributeName]: nodo.valorAtributo.campo,
              [nodo.nodoPuro.clase]: nameNodo,
            });
          } else {
            caminosPosiblesTG.push({
              ...datos.obj,
              [attributeName]: nodo.valorAtributo.campo,
              [nodo.nodoPuro.clase]: nameNodo,
            });
          }
        }
      return nodo.ramas.length === 0
        ? {
            name: nameNodo,
            attributes: nodo.valorAtributo.campo,
            obj: { [attributeName]: nodo.valorAtributo.campo, [nodo.nodoPuro.clase]: nameNodo },
          }
        : {
            name: nameNodo,
            attributes: nodo.valorAtributo.campo,
            obj: { [attributeName]: nodo.valorAtributo.campo },
            children: auxFormateoDatosTestTG({
              datos: nodo.ramas,
              obj: { [attributeName]: nodo.valorAtributo.campo },
            }),
          };
    }),
  };
};

export const auxFormateoDatosTestTG = (datos) => {
  if (datos.datos.length === 0) {
    return [];
  }
  return datos.datos.map((nodo) => {
    const attributeName = nodo.nodo;
    const nameNodo = nodo.ramas[0]?.nodo
      ? nodo.ramas[0]?.nodo
      : nodo.nodoPuro?.nodoPuro?.campoClase
      ? nodo.nodoPuro.nodoPuro?.campoClase
      : "NodoImpuro";
      if (nodo.ramas.length === 0) {
        if (nameNodo !== 'NodoImpuro') {
          caminosPosiblesTG.push({
            ...datos.obj,
            [attributeName]: nodo.valorAtributo.campo,
            [nodo.nodoPuro.clase]: nameNodo,
          });
        } else {
          caminosPosiblesTG.push({
            ...datos.obj,
            [attributeName]: nodo.valorAtributo.campo,
            [nodo.nodoPuro.clase]: nameNodo,
          });
        }
      }
    return nodo.ramas.length === 0
      ? {
          name: nameNodo,
          attributes: nodo.valorAtributo.campo,
          obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo, [nodo.nodoPuro.clase]: nameNodo },
        }
      : {
          name: nameNodo,
          attributes: nodo.valorAtributo.campo,
          obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo },
          children: auxFormateoDatosTestTG({
            datos: nodo.ramas,
            obj: { ...datos.obj, [attributeName]: nodo.valorAtributo.campo },
          }),
        };
  });
};
export const testearFilasTG = (caminosPosiblesTG, dataSet) => {
  const result = dataSet.map((row) => {
    const result2 = caminosPosiblesTG.map((camino) => {
      let banderaTG = true;
      let incorrectoTG = false;
      let countTG = 0;
      const largo = Object.entries(camino).length;
      const result3 = Object.entries(camino).map(([key, value]) => {
        // value === 'NodoImpuro' && console.log('🚀 ~ file: funciones.js ~ line 585 ~ result3', (countTG), largo)
        if (value === 'NodoImpuro' && ((countTG+1) === largo)) {
          // console.log('🚀 ~ file: funciones.js ~ line 584', value, String(row[key]));
          incorrectoTG = true;
        }
        banderaTG = (String(row[key]) === String(value));
        banderaTG && countTG ++;
        return String(row[key]) === String(value);
      });
      // console.log('🚀 ~ file: funciones.js ~ line 594 ~ result3 ~ result3', result3);
      if (incorrectoTG) {
      //   console.log('🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~🚀 ~', {
      //   validaciones: result3,
      //   posibleIncorrecto: row,
      //   camino: camino,
      // });
      noClasificanTG.push(row)
    } 
      return !result3.includes(false);
    });
    // console.log(
    //   "🚀 ~ file: funciones.js ~ line 562 ~ result2 ~ result2",
    //   {result2,
    //   valor: result2.includes(true),
    //   row}
    // );
    if (result2.includes(true)) {
      correctosTG.push(row)
    } else {fallidosTG.push(row)}
    return result2.includes(true);
  });
  // console.log("🚀 ~ file: funciones.js ~ line 558 ~ testearFilas ~ result", result);
  return result;
};

// funcion que combina el algoritmo de expansion y el formateo de salida
export const calcularC45 = (dataSet, umbral, csvTest = [], setResultados) => {
  const data = formatearDatos(expansionAlgoritmo(dataSet, umbral));
  caminosPosibles = [];
  noClasifican = [];
  correctos = [];
  fallidos = [];
  formatearDatosTest(expansionAlgoritmo(dataSet, umbral));
  if (csvTest) {
    // console.log('🚀 ~ file: funciones.js ~ line 557 ~ calcularC45 ~ csvTest', csvTest);
    const testRows = cantidadApariciones(testearFilas(caminosPosibles, csvTest));
    const aciertos = testRows.find((item) => item.campo === 'true');
    const noAciertos = testRows.find((item) => item.campo === 'false');
    const calculo = `${(aciertos?.cant / csvTest.length) * 100}%`;
    const calculoErrores = `${
      (((noAciertos?.cant || 0) - noClasifican.length) / csvTest.length) * 100
    }%`;
    const calculoSinClasificar = `${(noClasifican.length / csvTest.length) * 100}%`;
    const diferencia = difference(fallidos, noClasifican);
    setResultados([
      ['Resultados', 'Cantidades'],
      ['Correctos', aciertos?.cant],
      ['Incorrectos', (noAciertos?.cant || 0) - noClasifican.length],
      ['Sin clasificar', noClasifican?.length],
    ]);
    return {
      graph: data,
      caminosPosibles: caminosPosibles,
      testRows,
      portentajeAciertos: calculo,
      portentajeIncorrectos: calculoErrores,
      portentajeSinClasificar: calculoSinClasificar,
      row: { incorrectos: diferencia, aciertos: correctos, noClasifican },
    };
  } else {
    return { graph: data, caminosPosibles: caminosPosibles };
  }
};

// funcion que combina el algoritmo de expansion y el formateo de salida
export const calcularC45_TG = (dataSet, umbral, csvTest = [], setResultadosTG) => {
  const data = formatearDatos(expansionAlgoritmoConTG(dataSet, umbral));
  caminosPosiblesTG = [];
  noClasificanTG = [];
  correctosTG = [];
  fallidosTG = [];
  formatearDatosTestTG(expansionAlgoritmoConTG(dataSet, umbral));
  if (csvTest) {
    // console.log('🚀 ~ file: funciones.js ~ line 651 ~ csvTest', csvTest);
    const testRows = cantidadApariciones(testearFilasTG(caminosPosiblesTG, csvTest));
    const aciertos = testRows.find((item) => item.campo === 'true');
    const noAciertos = testRows.find((item) => item.campo === 'false');
    const calculo = `${(aciertos?.cant / csvTest.length) * 100}%`;
    const calculoErrores = `${
      (((noAciertos?.cant || 0) - noClasifican.length) / csvTest.length) * 100
    }%`;
    const calculoSinClasificar = `${(noClasifican.length / csvTest.length) * 100}%`;
    const diferencia = difference(fallidos, noClasifican);
    setResultadosTG([
      ['Resultados', 'Cantidades'],
      ['Correctos', aciertos?.cant],
      ['Incorrectos', (noAciertos?.cant || 0) - noClasifican.length],
      ['Sin clasificar', noClasifican?.length],
    ]);
    return {
      graph: data,
      caminosPosibles: caminosPosiblesTG,
      testRows,
      portentajeAciertos: calculo,
      portentajeIncorrectos: calculoErrores,
      portentajeSinClasificar: calculoSinClasificar,
      row: { incorrectos: diferencia, aciertos: correctos, noClasifican },
    };
  } else {
    return { graph: data, caminosPosibles: caminosPosiblesTG };
  }
};
