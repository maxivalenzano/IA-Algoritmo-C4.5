import React from 'react';
import { Box, Button } from '@material-ui/core';
import swal from 'sweetalert';
import './styles.css';

//Función que renderiza el boton de cargar los datos
function BotonCargar({ umbral, archivoCSV, setPage1 }) {
  //Función que, en caso de validar correctamente, lleva a la proxima página. Caso contrario, muestra una alerta.
  function nextPage() {
    //Valida que estén ambos parámetros
    if (!archivoCSV) {
      swal({
        text: 'Debes subir un archivo CSV',
      });
      return null;
    }
    if (!(umbral < 1 && umbral >= 0)) {
      swal({
        text: 'Debes ingresar un umbral entre 0 y 1',
      });
      return null;
    }
    setPage1(false);
  }
  return (
    <Box align="center">
      <Button onClick={nextPage} style={{ backgroundColor: '#C0D4F0' }}  size="large">
        Cargar datos
      </Button>
    </Box>
  );
}

export default BotonCargar;
