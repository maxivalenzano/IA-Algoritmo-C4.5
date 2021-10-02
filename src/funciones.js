export const listadoColumnas = (datos) => {
  return Object.keys(datos[0]);
};

export const nombreClase = (datos) => {
  const columnas = listadoColumnas(datos)
  return columnas[columnas.length-1]
};

export const listadoAtributos = (datos, nombreCampo) => {
  return datos.map(item => item[nombreCampo])
}

export const log2 = (n) => {
    return Math.log(n) / Math.log(2);
};

export const cantidadApariciones = (arr) => {
    const counts = {};
    for (var i = 0; i < arr.length; i++) {
       counts[arr[i]] = 1 + (counts[arr[i]] || 0);
    };
    return counts;
};

export const calculoEntropiaConjunto = (listadoAtributos, attColumna) =>{
    const cantAtrib = listadoAtributos.length;
    let entropia = 0;
    Object.values(attColumna).forEach(value => {
      entropia = entropia + (-1*(value/cantAtrib)*(log2(value/cantAtrib)))
    })
    return entropia;
};