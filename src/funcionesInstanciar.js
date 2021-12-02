import { listadoTituloColumnas, listadoValoresColumna } from "./funciones";
import swal from "@sweetalert/with-react";

//exporta la función instanciar
export const instanciar = (data) => {
  atributos(data);
  swal(form(data));
};

var opcionesAtributos = [];
//arma el arreglo de arreglos => cada posición sería el nombre del atributo con sus posibles valores
function atributos(data) {
  //atributos, o sea los nombres
  //console.log(listadoTituloColumnas(data).slice(0,-1))
  //console.log(listadoTituloColumnas(data).pop())
  //console.log(listadoTituloColumnas(data).length-1)

  for (let i = 0; i < listadoTituloColumnas(data).length - 1; i++) {
    var opciones = listadoValoresColumna(data, listadoTituloColumnas(data).at(i));
    var result = opciones.filter((item, index) => opciones.indexOf(item) === index);
    opcionesAtributos.push(result);
  }
}
//exporta la función del popup del formulario para una nueva instancia
function form(data) {
  var listaAtributos = listadoTituloColumnas(data).slice(0, -1);

  return (
    <div>
      <form>
        {listaAtributos.map(function (e, i) {
          return (
            <div>
              <label>{e + ":"}</label>

              <select>
                {opcionesAtributos[i].map((selectData) => {
                  return <option value={i}>{selectData}</option>;
                })}
              </select>
            </div>
          );
        })}
      </form>
      <h5>{listadoTituloColumnas(data).pop()}</h5>
    </div>
  );
}

function displayHelp() {
  return (
    <div>
      <p>
        <strong>
          <span>Guía de Usuario</span>
        </strong>
      </p>
      <p>
        <span>
          En los botones superiores de la presente página se pueden realizar las siguientes acciones:
        </span>
      </p>
      <ul>
        <li>
          <em>Regresar al menú principal</em>
        </li>
        <li>
          <em>Árbol con ganancia</em>: se le presentará en pantalla únicamente el árbol utilizando la medida
          de ganancia de información
        </li>
        <li>
          <em>Árbol con tasa ganancia</em>: se le presentará en pantalla únicamente el árbol utilizando la
          medida de tasa de ganancia de información
        </li>
        <li>
          <em>Mostrar ambos</em>: se mostrarán los árboles con ambas medidas
        </li>
        <li>
          <em>Testear</em>: esta opción le permitirá testear, en caso de que haya ingresado el dataset
          correspondiente, los datos del csv de prueba. Una vez clickeada esta acción, se le abrirá una
          ventana, la cual mostrará los datos correspondientes al testeo realizado
        </li>
        <li>
          <em>Ingresar una nueva instancia</em>: al dar click sobre esta opción, se le abrirá una nueva
          ventana para ingresar los datos de la nueva instancia a probar. Luego de cargar los datos, presione
          el botón ok y le aparecerá la clasificación pertinente a esta instancia.
        </li>
      </ul>
      <p>
        <span>
          Por otro lado, <strong>los árboles son interactivos</strong>. Estos tienen las siguientes funciones:
        </span>
      </p>
      <ul>
        <li>Podrá hacer zoom in y zoom out a los árboles con el scroll según considere necesario.</li>
        <li>Haciendo click en el círculo de un nodo de decisión, el árbol se puede contraer o expandir.</li>
        <li>
          Haciendo click en el nombre de los nodos de decisión se podrá mostrar la siguiente información:
          <ol>
            <li>Ganancia o tasa de ganancia (según corresponda).</li>
            <li>Cantidad de valores de atributo del nodo y el nombre correspondiente.</li>
          </ol>
        </li>
      </ul>
      <p>
        <strong>
          <span>
            <u>Aclaración:</u>{" "}
          </span>
        </strong>
        <span>
          Los nodos de color gris son nodos de decisión, mientras que los nodos de color blanco son nodos
          hojas. Cuando un nodo es impuro, se marcará con color rojo.
        </span>
      </p>
    </div>
  );
}

export { displayHelp, form };
