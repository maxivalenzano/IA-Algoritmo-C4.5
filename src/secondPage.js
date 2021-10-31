import React from 'react';
import { Container, Button} from 'react-bootstrap';


function App2 () {
    return (
        <Container className="botones-page2">
                <a href="javascript: history.go(-1)">
                <Button 
                    className="boton-page2" 
                    size="lg"
                >
                    Regresar al menú principal
                </Button></a>
                <Button
                    className="boton-page2" 
                    size="lg"
                >
                    Mostrar paso siguiente
                </Button>
                <Button
                    className="boton-page2" 
                    size="lg"
                >
                    Mostrar árboles completos
                </Button>
                <Button
                    className="boton-page2" 
                    type = "reset"
                    size="lg"
                >
                    Resetear gráficos
                </Button>
        </Container>
    );
}

export default App2;