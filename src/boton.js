import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button} from 'react-bootstrap';
import swal from 'sweetalert';
import './styles.css';

//Valida que estén ambos parámetros     
const validar =() =>  {
      var elementoCSV = document.getElementById("exampleFormControlFile1").value
      var elementoUmbral = document.getElementById("inputUmbral").value
      if (elementoCSV === "" || elementoUmbral === ""){
        return false
      }
      return true
    } 

//Función que, en caso de validar correctamente, lleva a la proxima página. Caso contrario, muestra una alerta.
    function nextPage() {
        if(validar()) {
            window.location.href = "./Page2"
        }
        else{
            swal({
                text: "Debes ingresar ambos parámetros",
            });   
        }
    }
    

//Función que renderiza el boton de cargar los datos
function BotonCargar() {
    return (
        <Container style={{ paddingTop: '2rem' , paddingLeft: '35rem'}}>
                <Button 
                    onClick={ nextPage}
                    // onChange={(e) => setCSV(e.target.value)}
                    size="lg"
                >
                    Cargar datos
                </Button>
      
        </Container>
    );
}

ReactDOM.render(
    <BotonCargar />,
    document.getElementById('root')
);

export default BotonCargar;