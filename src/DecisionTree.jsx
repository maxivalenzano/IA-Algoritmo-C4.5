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
  console.log('listadoAtributosSeparadosPorClase', listadoAtributosSeparadosPorClase);

  const cantValorPorAtributo = listaAtributos.map(atributo => {
    const result = cantidadApariciones(listadoAtributos(conjuntoEntrenamiento, atributo));
    return { cant: result, atributo: atributo }
  })

  const calculo = listadoAtributosSeparadosPorClase.map(atributo => {
    const calculosPorClase = atributo.filtradoSegunClase.map(clase => {
      const atributoTotal = cantValorPorAtributo.find(item => item.atributo === atributo.atributo)
      const result = clase.atributos.map(key => {
        const cantValorAtributo = atributoTotal.cant.find(value => value.campo === key.campo)
        const campoAtributo = key.campo;
        const entropiaParcial = -1 * (key.cant / cantValorAtributo.cant * log2(key.cant / cantValorAtributo.cant));
        return { entropiaParcial: entropiaParcial, campoAtributo: campoAtributo }
      })
      return { campoClase: clase.campoClase, entropias: result }
    })
    let entropiasTotales = {};
    calculosPorClase.forEach(item => {
      item.entropias.forEach(campo => {
        entropiasTotales[campo.campoAtributo] = (entropiasTotales[campo.campoAtributo] || 0) + campo.entropiaParcial
      })
    })
    // console.log('🚀 ~ file: DecisionTree.jsx ~ line 67 ~ DecisionTree ~ entropiasTotales', entropiasTotales);
    return {
      atributo: atributo.atributo,
      // calculosPorClase: calculosPorClase,
      entropiasTotales: entropiasTotales
    }
  })
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 69 ~ DecisionTree ~ calculo', calculo);





  // const atributoPorClase = filtradoSegunClase.map(item => {
  //   const result = listaAtributos.map(nombre => {
  //     const listadoValorClase = listadoAtributos(item.cant, nombre);
  //     const tipoValorAtributo = cantidadApariciones(listadoValorClase);
  //     return (
  //       {
  //         clase: item.campo,
  //         atributo: nombre,
  //         cant: tipoValorAtributo,
  //         cantValorClase: listadoValorClase.length
  //       }
  //     )
  //   })
  //   return result;
  // }
  // );
  // // console.log('🚀 atributoPorClase', atributoPorClase);

  // const primerosValores = atributoPorClase.map(atributoClase =>
  //   atributoClase.map(atributo => {
  //     const nombreAtributo = atributo.atributo;
  //     const atributoTotal = cantValorPorAtributo.find(item => item.atributo === nombreAtributo)
  //     // console.log('🚀 ~ file: DecisionTree.jsx ~ line 54 ~ DecisionTree ~ atributoTotal', atributoTotal);
  //     const entropiaParciales = atributo.cant.map(item => {
  //       const cantValorAtributo = atributoTotal.cant.find(value => value.campo === item.campo)
  //       // console.log(`---------${item.campo}---Clase:${atributo.clase}----------`)
  //       // console.log('item buscado:', cantValorAtributo);
  //       // console.log('entropia', -1 * (item.cant / cantValorAtributo.cant * log2(item.cant / cantValorAtributo.cant)));
  //       // console.log('item.cant', item.cant);
  //       // console.log('cantValorAtributo.cant', cantValorAtributo.cant);
  //       const entropia = -1 * (item.cant / cantValorAtributo.cant * log2(item.cant / cantValorAtributo.cant));
  //       return { campo: item.campo, entropiaParcial: entropia }
  //     });
  //     return { nombreAtributo, entropiaParciales, valorClase: atributo.clase }
  //   })
  // )
  // console.log('🚀 ~ file: DecisionTree.jsx ~ line 55 ~ DecisionTree ~ primerosValores', primerosValores);


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