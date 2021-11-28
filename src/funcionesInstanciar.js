import { listadoTituloColumnas, listadoValoresColumna } from './funciones';

export const instanciar = (data) => {
  atributos(data);
}
//esto es el arreglo con los nombres de los atributos
//var nombresAtributos = listadoTituloColumnas(data)
var opcionesAtributos = [];

function atributos(data) {
  //atributos, o sea los nombres
  //console.log(listadoTituloColumnas(data).slice(0,-1))
  //console.log(listadoTituloColumnas(data).pop())
  //console.log(listadoTituloColumnas(data).length-1)


  for (let i = 0; i < listadoTituloColumnas(data).length - 1; i++) {
    var opciones = listadoValoresColumna(data, listadoTituloColumnas(data).at(i))
    var result = opciones.filter((item, index) => {
      return opciones.indexOf(item) === index;
    })
    opcionesAtributos.push(result)
  }
 // console.log(opcionesAtributos)
  var listaAtributos = listadoTituloColumnas(data).slice(0, -1)
  var valueNoSeQue = listadoTituloColumnas(data).pop()
  //console.log(listaAtributos)
  //console.log(valueNoSeQue)
  form(data)
}

export default function form(data) {
  
  return (
    <div>
      <form>
        {
          listadoTituloColumnas(data).map(function(e, i) {
            return (
              <div>
                <h1>{e}</h1>
                <select>{opcionesAtributos[i]}</select>
              </div>      
            )
          }
        )}  
      </form>
    </div>
  )
}