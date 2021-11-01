import React from 'react';
import { Container, Button } from 'react-bootstrap';
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
      return null
    }
    if (!(umbral < 1 && umbral >= 0)) {
      swal({
        text: 'Debes ingresar un umbral entre 0 y 1',
      });
      return null
    }
    setPage1(false)
  }
  return (
    <Container style={{ paddingTop: '2rem', paddingLeft: '35rem' }}>
      <Button onClick={nextPage} size="lg">
        Cargar datos
      </Button>
    </Container>
  );
}

export default BotonCargar;
