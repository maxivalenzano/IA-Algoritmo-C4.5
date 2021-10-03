
// devuelve los titulos de la primer fila
export const listadoTituloColumnas = (datos) => {
  return Object.keys(datos[0]);
};

// devuelve el nombre de la clase (ultima fila)
export const posicionClase = (datos) => {
  const columnas = listadoTituloColumnas(datos)
  return { nombre: columnas[columnas.length - 1], index: (columnas.length - 1) }
};

// devuelve un listado con todos los campos de la fila dada
export const listadoAtributos = (datos, nombreColumna) => {
  return datos.map(item => item[nombreColumna])
}

// devuevle log en base 2
export const log2 = (n) => {
  return Math.log(n) / Math.log(2);
};

// devuelve un objeto con cada nombre de atributo y su cantidad de aparicion
export const cantidadApariciones = (arr) => {
  const counts = {};
  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  };
  const object = Object.entries(counts).map(item => {
    return { campo: item[0], cant: item[1] }
  })
  return object
};

// devuelve la entropia del conjunto
export const calculoEntropiaConjunto = (columna) => {
  const columnaClase = cantidadApariciones(columna)
  const cantAtrib = columna.length;
  let entropia = 0;
  columnaClase.forEach((item) => {
    entropia = entropia + (-1 * (item.cant / cantAtrib) * (log2(item.cant / cantAtrib)))
  })
  return entropia;
};

export const listadoDeAtributosSeparadosPorClase = (nombreColumna, listaAtributos, conjuntoDeDatos) => {
  const cantidadAtributoClases = cantidadApariciones(listadoAtributos(conjuntoDeDatos, nombreColumna.nombre));
  return listaAtributos.map(atributo => {
    const filtradoSegunClase = cantidadAtributoClases.map(clase => {
      const listadoCamposClase = conjuntoDeDatos.filter(item =>
        (item[nombreColumna.nombre] === clase.campo)
      );
      const listadoAtributosSeparadoPorClase = listadoCamposClase.map(item => {
        return item[atributo]
      })
      const aparicionesAtributo = cantidadApariciones(listadoAtributosSeparadoPorClase);
      return {
        campoClase: clase.campo,
        cantCampoClase: listadoCamposClase.length,
        campoAtributo: listadoAtributosSeparadoPorClase,
        atributos: aparicionesAtributo
      }
    })
    return { atributo: atributo, filtradoSegunClase }
  })
};

export const sumaEntropia = (calculosPorClase) => {
  let entropiasTotales = {};
  calculosPorClase.forEach(item => {
    item.entropias.forEach(campo => {
      entropiasTotales[campo.campoAtributo] = (entropiasTotales[campo.campoAtributo] || 0) + campo.entropiaParcial
    })
  })
  const entropyToObject = Object.entries(entropiasTotales).map(item => {
    return { campo: item[0], entropia: item[1] }
  })
  return entropyToObject
};

export const calculoEntropiaIndividual = (atributo, cantValorPorAtributo) => {
  return atributo.filtradoSegunClase.map(clase => {
    const atributoTotal = cantValorPorAtributo.find(item => item.atributo === atributo.atributo)
    const result = clase.atributos.map(key => {
      const cantValorAtributo = atributoTotal.cant.find(value => value.campo === key.campo)
      const campoAtributo = key.campo;
      const entropiaParcial = -1 * (key.cant / cantValorAtributo.cant * log2(key.cant / cantValorAtributo.cant));
      return { entropiaParcial: entropiaParcial, campoAtributo: campoAtributo }
    })
    return { campoClase: clase.campoClase, entropias: result, atributoTotal: atributoTotal.cant }
  })
}

export const cantValorPorAtributo = (listaAtributos, conjuntoDeDatos) => {
  return listaAtributos.map(atributo => {
    const result = cantidadApariciones(listadoAtributos(conjuntoDeDatos, atributo));
    return { cant: result, atributo: atributo }
  })
};

export const maximoGanancia = (conjunto) => {
  const onlyGanancia = conjunto.map(item => item.ganancia);
  const max = Math.max(...onlyGanancia);
  const busqueda = conjunto.find(item => item.ganancia === max)
  return busqueda
};

export const calculoGananciaInformacion = (entropiaTotalAtributos, entropiaConjunto) => {
  return entropiaTotalAtributos.map(item => {
    const ganancia = entropiaConjunto - item.entropia;
    return { atributo: item.atributo, ganancia: ganancia, entropiasIndividuales: item.entropiasIndividuales }
  })
};