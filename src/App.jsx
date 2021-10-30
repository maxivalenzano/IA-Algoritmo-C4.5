import React from 'react';
import CSVReader from 'react-csv-reader';
import BotonCargar from './boton';
import DecisionTree from './DecisionTree';
import './styles.css';
import {Link} from 'react-router-dom';


//Crea el footer de la página principal
const Footer = () => (
    <footer className="footer">
        <p>Inteligencia Artificial - Grupo 10</p>
    </footer>
);


const App = () => {
  const handleForce = (data, fileInfo) => console.log(data, fileInfo);
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };
    return (
        <div className="container">
            <div>
                <p className='f1'>
                    {'Análisis Comparativo - Árboles de decisión'}
                </p>
            </div>
            <div className="container2">
            
            <form>
               <div class="form-group">
                <label for="exampleFormControlFile1">Ingrese un archivo CSV:</label>
                <input type="file" accept=".txt, .csv" class="form-control-file" id="exampleFormControlFile1" onclick="" required/>
              </div>
                <DecisionTree />
            
              <div className="container3">
               <BotonCargar />
              </div>
            </form>
            </div>
           <Footer />
        </div>
    );
};
 
export default App;
