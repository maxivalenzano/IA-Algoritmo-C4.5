import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import BotonCargar from './boton';
import DecisionTree from './DecisionTree';
import DecisionTreeTG from './DecisionTreeTG';
import { Container, Button } from 'react-bootstrap';
import './styles.css';

//Crea el footer de la página principal
const Footer = () => (
  <footer className="footer">
    <p>Inteligencia Artificial - Grupo 10</p>
  </footer>
);

const App = () => {
  const [archivoCSV, setArchivoCSV] = useState(null);
  const [umbral, setUmbral] = useState(0);
  const [page1, setPage1] = useState(true);
  const [viewTree1, setViewTree1] = useState(true);
  const [viewTree2, setViewTree2] = useState(false);

  const handleForce = (data, fileInfo) => {
    setArchivoCSV(data);
    console.log(data, fileInfo);
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };
  return (
    <>
      {page1 ? (
        <div className="container">
          <p className="f1">Análisis Comparativo - Árboles de decisión</p>
          <div className="container2">
            <div class="form-group">
              <CSVReader
                cssClass="react-csv-input"
                label="Seleccione un archivo CSV"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
              />
            </div>
            <div type="number" className="form-control-plaintext hola">
              <p>Ingrese Umbral: </p>
              <input
                required
                cssClass="box"
                value={umbral}
                onChange={(e) => setUmbral(e.target.value)}
                type="number"
                id="inputUmbral"
                min={0}
                max={1}
                step={0.001}
              />
            </div>
            <div className="container3">
              <BotonCargar archivoCSV={archivoCSV} umbral={umbral} setPage1={setPage1} />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <>
          <Container className="botones-page1">
            <Button className="boton-page1" size="lg" onClick={() => setPage1(true)}>
              Regresar al menú principal
            </Button>
            <Button className="boton-page1" size="lg" onClick={() => setViewTree1(!viewTree1)}>
              {viewTree1 ? 'Ocultar árbol con Ganancia' : 'Mostrar arbol con Ganancia'}
            </Button>
            <Button className="boton-page1" size="lg" onClick={() => setViewTree2(!viewTree2)}>
              {viewTree2 ? 'Ocultar árbol Tasa Ganancia' : 'Mostrar arbol Tasa Ganancia'}
            </Button>
            <Button
              className="boton-page1"
              size="lg"
              onClick={() => {
                setPage1(true);
                setArchivoCSV(null);
                setUmbral(0);
              }}>
              Resetear gráficos
            </Button>
          </Container>
            {viewTree1 && (
              <>
                <p>Con ganancia de Información:</p>
                <DecisionTree csv={archivoCSV} umbral={umbral} />
              </>
            )}
            {viewTree2 && (
              <>
                <p>Con Tasa de ganancia:</p>
                <DecisionTreeTG csv={archivoCSV} umbral={umbral} />
              </>
            )}
        </>
      )}
    </>
  );
};

export default App;
