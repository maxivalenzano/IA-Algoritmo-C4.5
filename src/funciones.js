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

// devuelve la entropía del conjunto
export const calculoEntropíaConjunto = (columna) => {
  const columnaClase = cantidadApariciones(columna);
  const cantAtrib = columna.length;
  let entropía = 0;
  columnaClase.forEach((item) => {
    entropía =
      entropía + -1 * (item.cant / cantAtrib) * log2(item.cant / cantAtrib);
  });
  return entropía;
};

export const listadoDeAtributosSeparadosPorColumna = (
  nombreColumna,
  listaAtributos,
  dataSet
) => {
  const cantidadAtributoClases = cantidadApariciones(
    listadoValoresColumna(dataSet, nombreColumna)
  );
  return listaAtributos.map((atributo) => {
    const filtradoSegunClase = cantidadAtributoClases.map((clase) => {
      const listadoCamposClase = dataSet.filter(
        (item) => item[nombreColumna] === clase.campo
      );
      const listadoAtributosSeparadoPorClase = listadoCamposClase.map(
        (item) => {
          return item[atributo];
        }
      );
      const aparicionesAtributo = cantidadApariciones(
        listadoAtributosSeparadoPorClase
      );
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
  let entropíasTotales = {};
  calculosPorClase.forEach((item) => {
    item.entropías.forEach((campo) => {
      entropíasTotales[campo.campoAtributo] =
        (entropíasTotales[campo.campoAtributo] || 0) + campo.entropíaParcial;
    });
  });
  const entropyToObject = Object.entries(entropíasTotales).map((item) => {
    return {
      campo: item[0],
      entropía: item[1],
    };
  });
  return entropyToObject;
};

export const calculoEntropíaIndividual = (atributo, cantValorPorAtributo) => {
  return atributo.filtradoSegunClase.map((clase) => {
    const atributoTotal = cantValorPorAtributo.find(
      (item) => item.atributo === atributo.atributo
    );
    const result = clase.atributos.map((key) => {
      const cantValorAtributo = atributoTotal.cant.find(
        (value) => value.campo === key.campo
      );
      const campoAtributo = key.campo;
      const entropíaParcial =
        -1 *
        ((key.cant / cantValorAtributo.cant) *
          log2(key.cant / cantValorAtributo.cant));
      return {
        entropíaParcial: entropíaParcial,
        campoAtributo: campoAtributo,
      };
    });
    return {
      campoClase: clase.campoClase,
      entropías: result,
      atributoTotal: atributoTotal.cant,
    };
  });
};

export const cantValorPorAtributo = (listaAtributos, conjuntoDeDatos) => {
  return listaAtributos.map((atributo) => {
    const result = cantidadApariciones(
      listadoValoresColumna(conjuntoDeDatos, atributo)
    );
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

export const calculoGananciaInformacion = (
  entropíaTotalAtributos,
  entropíaConjunto
) => {
  return entropíaTotalAtributos.map((item) => {
    const ganancia = entropíaConjunto - item.entropía;
    return {
      atributo: item.atributo,
      ganancia: ganancia,
      entropíasIndividuales: item.entropíasIndividuales,
    };
  });
};

export const reducirTabla = (gananciaMax, atributos) => {
  let nuevoDataSet = atributos;
  const camposPuros = gananciaMax.entropíasIndividuales
    .filter((item) => item.entropía === 0)
    .map((item) => item.campo);
  if (camposPuros.length) {
    nuevoDataSet = atributos.filter(
      (item) => !camposPuros.includes(item[gananciaMax.atributo])
    );
  }
  return nuevoDataSet;
};

export const filterConjunto = (
  conjunto,
  clase
) => {
  const filtered = conjunto.map((item) => {
    return omit(item, clase);
  });
  return filtered;
};

export const filtradoSegunAtributoGananciaMaxima = (gananciaMax, dataSet) => {
  return gananciaMax.entropíasIndividuales.map(valor => {
    const result = dataSet.filter(item => item[gananciaMax.atributo] === valor.campo);
    const filtrados = result.map(fila => omit(fila, gananciaMax.atributo))
    return { valorAtributo: valor.campo, filas: filtrados }
  })
}