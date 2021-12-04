import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { Chart } from 'react-google-charts';
import BotonCargar from './boton';
import DecisionTree from './DecisionTree';
import DecisionTreeTG from './DecisionTreeTG';
import { Box, Container, Button, Typography, Grid, DialogContent, makeStyles, Dialog } from '@material-ui/core';
import CloseIcon from './CloseIcon';
import swal from '@sweetalert/with-react';
import { instanciar, displayHelp } from './funcionesInstanciar';
import './styles.css';
import conjuntoEntrenamiento2 from './conjuntoEntrenamiento4';
import conjuntoTest from './conjuntoTest';

//Crea el footer de la página principal
const Footer = () => (
  <footer className="footer">
    <p>Inteligencia Artificial - Grupo 10</p>
  </footer>
);

const useStyles = makeStyles(() => ({
  closeIcon: {
    width: '30px',
    height: '28px',
    cursor: 'pointer',
  },
}));

const App = () => {
  const classes = useStyles();
  const [archivoCSV, setArchivoCSV] = useState(conjuntoEntrenamiento2);
  const [archivoCSVtest, setArchivoCSVtest] = useState(conjuntoTest);
  const [umbral, setUmbral] = useState(0);
  const [page1, setPage1] = useState(true);
  const [viewTree1, setViewTree1] = useState(true);
  const [viewTree2, setViewTree2] = useState(true);
  const [seeTwoTrees, setSeeTwoTrees] = useState(6);
  const [widthTrees, setWidthTrees] = useState('50vw');
  const [resultados, setResultados] = useState([]);
  const [resultadosTG, setResultadosTG] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function toggleModal() {
    setOpenModal(!openModal);
  }

  const handleForce = (data, fileInfo) => {
    setArchivoCSV(data);
  };

  const handleForce2 = (data, fileInfo) => {
    setArchivoCSVtest(data);
  };

  function botonTestear(data) {
    if (!data) {
      swal({
        text: 'Debes subir un archivo CSV de entrenamiento',
      });
    }
  }

  function displayH() {
    swal(displayHelp());
  }

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };
  return (
    <>
      {page1 ? (
        <Container>
          <p className="f1">Análisis Comparativo - Árboles de decisión</p>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">Seleccione el archivo CSV de entrenamiento</Typography>
            </Grid>
            <Grid item>
              <CSVReader
                // cssClass={classes.input}
                inputStyle={{ color: 'black' }}
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">Seleccione el archivo CSV de test</Typography>
            </Grid>
            <Grid item>
              <CSVReader
                // cssClass={classes.input}
                inputStyle={{ color: 'black' }}
                onFileLoaded={handleForce2}
                parserOptions={papaparseOptions}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">Ingrese Umbral</Typography>
            </Grid>
            <Grid item>
              <input
                required
                cssclass="box"
                value={umbral}
                onChange={(e) => setUmbral(e.target.value)}
                type="number"
                id="inputUmbral"
                min={0}
                max={1}
                step={0.001}
              />
            </Grid>
          </Grid>
          <Box pt={6}>
            <BotonCargar archivoCSV={archivoCSV} umbral={umbral} setPage1={setPage1} />
          </Box>
          <Footer />
        </Container>
      ) : (
        <>
          <Box py={2} px={'10vw'} display="flex" justifyContent="center">
            <Typography variant="h4">Análisis Comparativo - Árboles de decisión</Typography>
          </Box>
          <Box pb={2} px={'10vw'} display="flex" justifyContent="center">
            <Box px={2}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  displayH();
                }}>
                Ayuda
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  setPage1(true);
                  setArchivoCSV(null);
                  setArchivoCSVtest(null);
                  setUmbral(0);
                }}>
                Regresar al menú principal
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{
                  backgroundColor:
                    viewTree1 && viewTree2 ? '#C0D4F0' : viewTree1 ? '#F0CCE3' : '#C0D4F0',
                }}
                variant="contained"
                onClick={() => {
                  setViewTree1(true);
                  setViewTree2(false);
                  setSeeTwoTrees(12);
                  setWidthTrees('100vw');
                }}>
                Árbol con Ganancia
              </Button>
            </Box>
            <Box px={2} align="center">
              <Button
                style={{
                  backgroundColor:
                    viewTree1 && viewTree2 ? '#C0D4F0' : viewTree2 ? '#F0CCE3' : '#C0D4F0',
                }}
                variant="contained"
                onClick={() => {
                  setViewTree1(false);
                  setViewTree2(true);
                  setSeeTwoTrees(12);
                  setWidthTrees('100vw');
                }}>
                Árbol con Tasa Ganancia
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{ backgroundColor: viewTree1 && viewTree2 ? '#F0CCE3' : '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  setViewTree1(true);
                  setViewTree2(true);
                  setSeeTwoTrees(6);
                  setWidthTrees('50vw');
                }}>
                Mostrar ambos
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={toggleModal}>
                Testear
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  setViewTree1(true);
                  setViewTree2(true);
                  setSeeTwoTrees(6);
                  setWidthTrees('50vw');
                  setArchivoCSVtest(null);
                  instanciar(archivoCSV);
                }}>
                Clasificar Nueva Instancia
              </Button>
            </Box>
          </Box>
          <Grid container>
            <Grid item xs={seeTwoTrees}>
              {viewTree1 && (
                <Box align="center">
                  <Typography style={{ marginBottom: 8 }} variant="h5">
                    Árbol con ganancia de Información
                  </Typography>
                  <DecisionTree
                    csvTest={archivoCSVtest}
                    csv={archivoCSV}
                    umbral={umbral}
                    height={'100vh'}
                    width={widthTrees}
                    resultados={resultados}
                    setResultados={setResultados}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={seeTwoTrees}>
              {viewTree2 && (
                <Box align="center">
                  <Typography variant="h5">Árbol con Tasa de ganancia</Typography>
                  <DecisionTreeTG
                    csvTest={archivoCSVtest}
                    csv={archivoCSV}
                    umbral={umbral}
                    height={'100vh'}
                    width={widthTrees}
                    setResultadosTG={setResultadosTG}
                  />
                </Box>
              )}
            </Grid>
          </Grid>

          <Dialog open={openModal} setIsOpen={toggleModal} aria-labelledby="form-dialog-title">
            <DialogContent>
              <Box display="flex" justifyContent="flex-end">
                <CloseIcon className={classes.closeIcon} onClick={toggleModal} />
              </Box>
              <Box mb={3} align="center">
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={resultados}
                  options={{
                    title: 'Resultados de la prueba con Ganancia',
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Loading Chart2...</div>}
                  data={resultadosTG}
                  options={{
                    title: 'Resultados de la prueba con Tasa de Ganancia',
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
                <Button onClick={toggleModal}>Salir</Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default App;
