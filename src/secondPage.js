import React from 'react';
import { Container, Button} from 'react-bootstrap';


function App2 () {
    return (
        <Container style={{ paddingTop: '2rem' , paddingLeft: '40rem'}}>
                <Button
                   // onClick={ }
                    size="lg"
                >
                    Regresar al menú principal
                </Button>
                <Button
                   // onClick={ }
                    size="lg"
                >
                    Mostrar paso siguiente
                </Button>
                <Button
                   // onClick={ }
                    size="lg"
                >
                    Mostrar árboles completos
                </Button>
                <Button
                   // onClick={ }
                    size="lg"
                >
                    Resetear gráficos
                </Button>
        </Container>
    );
}

export default App2;