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
export const listadoAtributos = (datos, nombreColumna) => {
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

export const listadoDeAtributosSeparadosPorClase = (
  nombreColumna,
  listaAtributos,
  conjuntoDeDatos
) => {
  const cantidadAtributoClases = cantidadApariciones(
    listadoAtributos(conjuntoDeDatos, nombreColumna.nombre)
  );
  return listaAtributos.map((atributo) => {
    const filtradoSegunClase = cantidadAtributoClases.map((clase) => {
      const listadoCamposClase = conjuntoDeDatos.filter(
        (item) => item[nombreColumna.nombre] === clase.campo
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
      listadoAtributos(conjuntoDeDatos, atributo)
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
  const camposPuros = gananciaMax.entropíasIndividuales
    .filter((item) => item.entropía === 0)
    .map((item) => item.campo);
  let tablaSinCamposPuros = atributos;
  if (camposPuros.length) {
    tablaSinCamposPuros = atributos.filter(
      (item) => !camposPuros.includes(item[gananciaMax.atributo])
    );
  }
  return tablaSinCamposPuros;
};

export const filterConjunto = (
  conjunto,
  clase,
  id = '',
  firstIteracion = false
) => {
  const filtered = firstIteracion
    ? conjunto.map((item) => {
        return omit(item, [id, clase]);
      })
    : conjunto.map((item) => {
        return omit(item, clase);
      });
  return filtered;
};
