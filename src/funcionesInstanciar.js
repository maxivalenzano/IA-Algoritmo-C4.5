import { listadoTituloColumnas, listadoValoresColumna } from './funciones';

export const instanciar = ( data ) => {
    atributos(data);
    }


function atributos (data) {
  for (let i=0; i<listadoTituloColumnas(data).length-1; i++) {
    var opciones = listadoValoresColumna(data, listadoTituloColumnas(data).at(i))
    let result = opciones.filter((item,index)=>{
      console.log(result);
      console.log(listadoValoresColumna(data, listadoTituloColumnas(data).at(i)))
     return opciones.indexOf(item) === index;

})

  }}
