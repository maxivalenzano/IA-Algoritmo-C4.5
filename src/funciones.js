
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
}