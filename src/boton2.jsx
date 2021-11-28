import React from 'react';
import { Box, Button } from '@material-ui/core';
import swal from '@sweetalert/with-react';
import './styles.css';

//Función que renderiza el boton de testeo
function BotonCargar2({ archivoCSVtest }) {
    //Valida que exista el csv de test
    if (!archivoCSVtest) {
      swal({
        text: 'Para testear, se debe subir un archivo de test. Por favor, vuelva al menú principal para ingresarlo',
      });
      return null;
    }
}

export default BotonCargar2;