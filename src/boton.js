import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, Button} from 'react-bootstrap';

import './styles.css';


            
 const validar =() =>  {
      var elemento = document.getElementById("exampleFormControlFile1").value
      var elemento2 = document.getElementById("inputUmbral").value
      if (elemento === "" || elemento2 === ""){
        return false
       
      }
      return true
    } 

function PopUp() {
    <body>
    <p><a href="#popup"></a></p>
    <div id="popup" class="overlay">
    <div id="popupBody">
        <h2>Título de la ventana</h2>
        <a id="cerrar" href="#">&times;</a>
        <div class="popupContent">
            <p>Este es el contenido</p>
        </div>  
    </div>
    </div>
</body>

}
    
    function nextPage() {
        if(validar()) {
            window.location.href = "./Page2"

        }
        else{
            PopUp()
                 
        }
    }
    
function Example() {
    
    
    return (
       
        <Container style={{ paddingTop: '2rem' , paddingLeft: '3rem'}}>
            
                <Button 
                    onClick={ nextPage}
                    size="lg"
                    
                >
                    Cargar datos
                </Button>
      
        
        </Container>
    );
}

ReactDOM.render(
    <Example />,
    document.getElementById('root')
);

export default Example;