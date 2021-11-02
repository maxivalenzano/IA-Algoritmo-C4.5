import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import dataSet from './conjuntoEntrenamiento2';
import BotonCargar from './boton';
import DecisionTree from './DecisionTree';
import DecisionTreeTG from './DecisionTreeTG';
import { Box, Container, Button, Typography, makeStyles, Grid } from '@material-ui/core';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: '10px',
    display: 'block',
    margin: '15px auto',
    borderRadius: '5px',
  },
}));

//Crea el footer de la página principal
const Footer = () => (
  <footer className="footer">
    <p>Inteligencia Artificial - Grupo 10</p>
  </footer>
);

const App = () => {
  const classes = useStyles();
  const [archivoCSV, setArchivoCSV] = useState(dataSet);
  const [umbral, setUmbral] = useState(0);
  const [page1, setPage1] = useState(true);
  const [viewTree1, setViewTree1] = useState(true);
  const [viewTree2, setViewTree2] = useState(true);
  const [seeTwoTrees, setSeeTwoTrees] = useState(6);
  const [widthTrees, setWidthTrees] = useState('50vw');

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
        <Container>
          <p className="f1">Análisis Comparativo - Árboles de decisión</p>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h5">Seleccione un archivo CSV</Typography>
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
              <Typography variant="h5">Ingrese Umbral</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
          <Box pt={6}>
            <BotonCargar archivoCSV={archivoCSV} umbral={umbral} setPage1={setPage1} />
          </Box>
          <Footer />
        </Container>
      ) : (
        <>
          <Box pb={2} px={'10vw'} display="flex" justifyContent="center">
            <Box px={2}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  setPage1(true);
                  setArchivoCSV(null);
                  setUmbral(0);
                }}>
                Regresar al menú principal
              </Button>
            </Box>
            <Box px={2}>
              <Button
                style={{ backgroundColor: viewTree1 ? '#F0CCE3' : '#C0D4F0' }}
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
                style={{ backgroundColor: viewTree2 ? '#F0CCE3' : '#C0D4F0' }}
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
                style={{ backgroundColor: '#C0D4F0' }}
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
          </Box>
          <Grid container>
            <Grid item xs={seeTwoTrees}>
              {viewTree1 && (
                <Box align="center">
                  <Typography style={{ marginBottom: 8 }} variant="h5">
                    Árbol con ganancia de Información
                  </Typography>
                  <DecisionTree
                    csv={archivoCSV}
                    umbral={umbral}
                    height={'100vh'}
                    width={widthTrees}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={seeTwoTrees}>
              {viewTree2 && (
                <Box align="center">
                  <Typography variant="h5">Árbol con Tasa de ganancia</Typography>
                  <DecisionTreeTG
                    csv={archivoCSV}
                    umbral={umbral}
                    height={'100vh'}
                    width={widthTrees}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default App;
