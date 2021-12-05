import React, { useState, forwardRef } from 'react';
import CSVReader from 'react-csv-reader';
import { Chart } from 'react-google-charts';
import BotonCargar from './boton';
import DecisionTree from './DecisionTree';
import DecisionTreeTG from './DecisionTreeTG';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import './styles.css';
import CloseIcon from './CloseIcon';
import conjuntoEntrenamiento2 from './conjuntoEntrenamiento4';
import conjuntoTest from './conjuntoTest';
import { displayHelp } from './funcionesInstanciar';
import { listadoTituloColumnas, formatColumns, formatedRow } from './funciones';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

//Crea el footer de la página principal
// const Footer = () => (
//   <footer className="footer">
//     <p>Inteligencia Artificial - Grupo 10</p>
//   </footer>
// );

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
  const titleColumns = archivoCSV ? listadoTituloColumnas(archivoCSV) : [];
  const rows = archivoCSV ? formatedRow(archivoCSV) : [];
  const rowsTest = archivoCSVtest ? formatedRow(archivoCSVtest) : [];
  const columns = formatColumns(titleColumns);
  const [umbral, setUmbral] = useState(0);
  const [page1, setPage1] = useState(true);
  const [viewTree1, setViewTree1] = useState(true);
  const [viewTree2, setViewTree2] = useState(true);
  const [seeTwoTrees, setSeeTwoTrees] = useState(6);
  const [widthTrees, setWidthTrees] = useState('50vw');
  const [resultados, setResultados] = useState([]);
  const [resultadosTG, setResultadosTG] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalGrid, setOpenModalGrid] = useState(false);
  const [openModalTest, setOpenModalTest] = useState(false);
  const [openModalHelp, setOpenModalHelp] = useState(false);
  const [openModalClasificador, setOpenModalClasificador] = useState(false);
  const [openModalClasificadorTG, setOpenModalClasificadorTG] = useState(false);

  function toggleModalClasificadorTG() {
    setOpenModalClasificadorTG(!openModalClasificadorTG);
  }

  function toggleModalClasificador() {
    setOpenModalClasificador(!openModalClasificador);
  }

  function toggleModalHelp() {
    setOpenModalHelp(!openModalHelp);
  }
  function toggleModalTest() {
    setOpenModalTest(!openModalTest);
  }
  function toggleModal() {
    setOpenModal(!openModal);
  }
  function toggleModalGrid() {
    setOpenModalGrid(!openModalGrid);
  }
  const handleForce = (data, fileInfo) => {
    setArchivoCSV(data);
  };
  const handleForce2 = (data, fileInfo) => {
    setArchivoCSVtest(data);
  };
  function displayH() {
    toggleModalHelp();
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
          <Box pt={6} pb={2} display="flex" justifyContent="center">
            <Box px={1}>
              <BotonCargar archivoCSV={archivoCSV} umbral={umbral} setPage1={setPage1} />
            </Box>
            <Box px={2} align="center">
              <Button
                disabled={!archivoCSV}
                style={{ backgroundColor: openModalGrid ? '#F0CCE3' : '#C0D4F0' }}
                variant="contained"
                onClick={toggleModalGrid}>
                Previsualizar Training
              </Button>
            </Box>
            <Box px={2} align="center">
              <Button
                disabled={!archivoCSVtest}
                style={{ backgroundColor: openModalTest ? '#F0CCE3' : '#C0D4F0' }}
                variant="contained"
                onClick={toggleModalTest}>
                Previsualizar Test
              </Button>
            </Box>
          </Box>
          {openModalGrid && (
            <Box py={3} style={{ maxWidth: '100%' }}>
              <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={rows}
                title="Previsualizacion de Archivo CSV"
                localization={{
                  toolbar: {
                    nRowsSelected: '{0} filas(s) seleccionadas',
                    searchPlaceholder: 'Buscar',
                  },
                  header: {
                    actions: 'Acciones',
                  },
                  body: {
                    emptyDataSourceMessage: 'Sin registros para mostrar',
                    filterRow: {
                      filterTooltip: 'Filtrar',
                    },
                  },
                  pagination: {
                    labelRowsSelect: 'filas',
                    labelDisplayedRows: '{count} de {from}-{to}',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Próxima página',
                    lastTooltip: 'Última página',
                  },
                }}
                fullWidth
                options={{
                  selection: false,
                  filtering: true,
                }}
              />
            </Box>
          )}
          {openModalTest && (
            <Box py={3} style={{ maxWidth: '100%' }}>
              <MaterialTable
                icons={tableIcons}
                columns={columns}
                data={rowsTest}
                title="Previsualizacion de Archivo CSV para Test"
                localization={{
                  toolbar: {
                    nRowsSelected: '{0} filas(s) seleccionadas',
                    searchPlaceholder: 'Buscar',
                  },
                  header: {
                    actions: 'Acciones',
                  },
                  body: {
                    emptyDataSourceMessage: 'Sin registros para mostrar',
                    filterRow: {
                      filterTooltip: 'Filtrar',
                    },
                  },
                  pagination: {
                    labelRowsSelect: 'filas',
                    labelDisplayedRows: '{count} de {from}-{to}',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Página anterior',
                    nextTooltip: 'Próxima página',
                    lastTooltip: 'Última página',
                  },
                }}
                fullWidth
                options={{
                  selection: false,
                  filtering: true,
                }}
              />
            </Box>
          )}
        </Container>
      ) : (
        <>
          <Box py={2} px={'10vw'} display="flex" justifyContent="center">
            <Typography variant="h4">Análisis Comparativo - Árboles de decisión</Typography>
          </Box>
          <Box pb={2} px={'10vw'} display="flex" justifyContent="center">
            <Box px={1}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  displayH();
                }}>
                Ayuda
              </Button>
            </Box>
            <Box px={1}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                onClick={() => {
                  setPage1(true);
                  setArchivoCSV(null);
                  setArchivoCSVtest(null);
                  setOpenModalTest(false);
                  setOpenModalGrid(false);
                  setOpenModalClasificador(false);
                  setOpenModalClasificadorTG(false);
                  setResultados([]);
                  setResultadosTG([]);
                }}>
                Regresar al menú principal
              </Button>
            </Box>
            <Box px={1}>
              <Button
                style={{
                  backgroundColor:
                    viewTree1 && viewTree2 ? '#C0D4F0' : viewTree1 ? '#F0CCE3' : '#C0D4F0',
                }}
                variant="contained"
                onClick={() => {
                  setViewTree1(true);
                  setViewTree2(false);
                  setOpenModalClasificadorTG(false);
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
                  setOpenModalClasificador(false);
                  setSeeTwoTrees(12);
                  setWidthTrees('100vw');
                }}>
                Árbol con Tasa Ganancia
              </Button>
            </Box>
            <Box px={1}>
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
          </Box>

          <Box pb={2} px={'10vw'} display="flex" justifyContent="center">
            <Box px={1}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                disabled={!archivoCSVtest}
                onClick={toggleModal}>
                Resultado Test
              </Button>
            </Box>
            <Box px={1}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                variant="contained"
                disabled={!viewTree1}
                onClick={() => toggleModalClasificador()}>
                Clasificar Instancia con Ganancia
              </Button>
            </Box>
            <Box px={1}>
              <Button
                style={{ backgroundColor: '#C0D4F0' }}
                disabled={!viewTree2}
                variant="contained"
                onClick={() => toggleModalClasificadorTG()}>
                Clasificar Instancia con Tasa de Ganancia
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
                    openModalClasificador={openModalClasificador}
                    toggleModalClasificador={toggleModalClasificador}
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
                    openModalClasificador={openModalClasificadorTG}
                    toggleModalClasificador={toggleModalClasificadorTG}
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
                  loader={<div>Cargando Gráfico...</div>}
                  data={resultados}
                  options={{
                    title: 'Resultados de la prueba con Ganancia',
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
                <Chart
                  width={'500px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>Cargando Gráfico...</div>}
                  data={resultadosTG}
                  options={{
                    title: 'Resultados de la prueba con Tasa de Ganancia',
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
                <Button variant="contained" style={{ backgroundColor: '#F0CCE3' }} onClick={toggleModal}>
                  Salir
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openModalHelp}
            setIsOpen={toggleModalHelp}
            aria-labelledby="form-dialog-title">
            <DialogContent>
              <Box display="flex" justifyContent="flex-end">
                <CloseIcon className={classes.closeIcon} onClick={toggleModalHelp} />
              </Box>
              {displayHelp()}
              <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
                <Button variant="contained" style={{ backgroundColor: '#F0CCE3' }} onClick={toggleModalHelp}>
                  Salir
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default App;
