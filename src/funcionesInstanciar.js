import { listadoTituloColumnas, listadoValoresColumna } from './funciones';
import swal from '@sweetalert/with-react';

//exporta la función instanciar
export const instanciar = (data) => {
  atributos(data);
  swal(
    form(data)
  )
  
}

var opcionesAtributos = [];
//arma el arreglo de arreglos => cada posición sería el nombre del atributo con sus posibles valores
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
}
//exporta la función del popup del formulario para una nueva instancia
export default function form(data) {
  var listaAtributos = listadoTituloColumnas(data).slice(0, -1)

  return (
    <div>
      <form>
        {
          listaAtributos.map(function(e, i) {
            return (
              <div>
                <label>{e + ":"}</label>
                
                <select>
                  {
                  opcionesAtributos[i].map(selectData =>{
                    console.log(selectData)
                    return(
                      
                        <option value={i}>{selectData}</option>
                    
                    )
                  })
                }
                </select>
                
              </div>      
            )
          }
        )}  
      </form>
      <h5>{listadoTituloColumnas(data).pop()}</h5>
    </div>
  )
}