import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import { Container, Button} from 'react-bootstrap';

import './styles.css';



function Example() {
    return (
        <Container style={{ paddingTop: '2rem' , paddingLeft: '40rem'}}>
         
                <Button 
                    //onClick={ href }
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