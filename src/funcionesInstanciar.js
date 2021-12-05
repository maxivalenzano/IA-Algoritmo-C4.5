import { atributos } from './funciones';
import Instancia from './Instancia';

//exporta la función instanciar
export const instanciar = (data) => {
  const opcionesAtributos = atributos(data);
  return <Instancia data={data} opcionesAtributos={opcionesAtributos}/>
};

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
          <em>Resultados Test</em>: esta opción le permitirá ver el resultado del testeo, en caso de que haya ingresado el dataset
          correspondiente, es decir, el csv de prueba. Una vez clickeada esta acción, se le abrirá una
          ventana, la cual mostrará los datos en dos gráficos: uno corresponderá al resultado utilizando la ganancia de información y el otro a la tasa de ganancia de información
        </li>
        <li>
          <em>Clasificar instancia con ganancia</em>: al dar click sobre esta opción, se le abrirá una nueva
          ventana para ingresar los datos de una instancia a probar con la medida de ganancia de información y poder conocer la clasificación pertinente.
        </li>
        <li>
          <em>Clasificar instancia con tasa de ganancia</em>: al dar click sobre esta opción, se le abrirá una nueva
          ventana para ingresar los datos de una instancia a probar con la medida de tasa de ganancia de información y poder conocer la clasificación pertinente.
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

export { displayHelp };
