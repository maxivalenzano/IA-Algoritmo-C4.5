import React from 'react'
import conjuntoEntrenamiento from './conjuntoEntrenamiento2'
import { log2, cantidadApariciones, calculoEntropiaConjunto, listadoAtributos, posicionClase, listadoTituloColumnas } from './funciones'

const DecisionTree = () => {
  const [umbral, setUmbral] = React.useState(0)
  const columnas = listadoTituloColumnas(conjuntoEntrenamiento);
  const listaAtributos = columnas.slice(1, -1);
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 10 ~ DecisionTree ~ listaAtributos', listaAtributos);
  // obtenemos el nombre de la clase
  const nombreDeClase = posicionClase(conjuntoEntrenamiento);
  // obtenemos un listado de todos los componentes
  const listadoAtributoClases = listadoAtributos(conjuntoEntrenamiento, nombreDeClase.nombre);
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 12 ~ DecisionTree ~ listadoAtributoClases', listadoAtributoClases);
  // clasificamos en nombre y cantidad
  const cantidadAtributoClases = cantidadApariciones(listadoAtributoClases);
  //se calcula la entropia del conjunto para los valores de la clase
  const entropiaConjunto = calculoEntropiaConjunto(listadoAtributoClases);
  // console.log('entropia del Conjunto: ', entropiaConjunto);
  // const filtradoSegunClase = cantidadAtributoClases.map(clase => {
  //   const result = conjuntoEntrenamiento.filter(item => item[nombreDeClase.nombre] === clase.campo);
  //   return { campo: clase.campo, cant: result }
  // })
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 24 ~ DecisionTree ~ filtradoSegunClase', filtradoSegunClase);

  const listadoAtributosSeparadosPorClase = listaAtributos.map(atributo => {
    const filtradoSegunClase = cantidadAtributoClases.map(clase => {
      const listadoCamposClase = conjuntoEntrenamiento.filter(item =>
        (item[nombreDeClase.nombre] === clase.campo)
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
  // console.log('listadoAtributosSeparadosPorClase', listadoAtributosSeparadosPorClase);

  const cantValorPorAtributo = listaAtributos.map(atributo => {
    const result = cantidadApariciones(listadoAtributos(conjuntoEntrenamiento, atributo));
    return { cant: result, atributo: atributo }
  })

  const calculoEntropiaIndividual = listadoAtributosSeparadosPorClase.map(atributo => {
    const calculosPorClase = atributo.filtradoSegunClase.map(clase => {
      const atributoTotal = cantValorPorAtributo.find(item => item.atributo === atributo.atributo)
      const result = clase.atributos.map(key => {
        const cantValorAtributo = atributoTotal.cant.find(value => value.campo === key.campo)
        const campoAtributo = key.campo;
        const entropiaParcial = -1 * (key.cant / cantValorAtributo.cant * log2(key.cant / cantValorAtributo.cant));
        return { entropiaParcial: entropiaParcial, campoAtributo: campoAtributo }
      })
      return { campoClase: clase.campoClase, entropias: result, atributoTotal: atributoTotal.cant }
    })
    let entropiasTotales = {};
    calculosPorClase.forEach(item => {
      item.entropias.forEach(campo => {
        entropiasTotales[campo.campoAtributo] = (entropiasTotales[campo.campoAtributo] || 0) + campo.entropiaParcial
      })
    })
    const entropyToObject = Object.entries(entropiasTotales).map(item => {
      return { campo: item[0], entropia: item[1] }
    })
    return {
      atributo: atributo.atributo,
      cantAtrinutos: calculosPorClase[0].atributoTotal,
      // calculosPorClase: calculosPorClase,
      entropiasTotales: entropyToObject
    }
  })
  const entropiaTotalAtributos = calculoEntropiaIndividual.map(item => {
    const result = item.entropiasTotales.map(value => {
      const cantValorAtributo = item.cantAtrinutos.find(key => key.campo === value.campo);
      const entropy = (cantValorAtributo.cant / listadoAtributoClases.length) * value.entropia
      return { campo: value.campo, entropy: entropy }
    })
    const entropia = result
      .map(item => item.entropy)
      .reduce((acc, curr) => {
        return (acc + curr)
      }, 0)
    return { atributo: item.atributo, entropia }
  })
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 83 ~ DecisionTree ~ entropiaTotalAtributos', entropiaTotalAtributos);

  const calculoGananciaInform = entropiaTotalAtributos.map(item => {
    const ganancia = entropiaConjunto - item.entropia;
    return { atributo: item.atributo, ganancia: ganancia }
  })
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 96 ~ DecisionTree ~ calculoGananciaInform', calculoGananciaInform);
  const maximoGanancia = (conjunto) => {
    const onlyGanancia = conjunto.map(item => item.ganancia);
    const max = Math.max(...onlyGanancia);
    const busqueda = conjunto.find(item => item.ganancia === max)
    return busqueda
  }
  console.log(maximoGanancia(calculoGananciaInform))


  return (
    <React.Fragment>
      <p>Ingrese Umbral: </p><input
        value={umbral}
        onChange={e => setUmbral(e.target.value)}
        type="number"
        min={1}
        max={100} />
      <p>Nombre de la clase: {nombreDeClase.nombre}</p>
      <p>Entropia del conjunto: {entropiaConjunto}</p>
    </React.Fragment>
  );
}

export default DecisionTree;