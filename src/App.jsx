import React from 'react';
import CSVReader from 'react-csv-reader';
import Example from './boton';
import DecisionTree from './DecisionTree';
import './styles.css';
import {Link} from 'react-router-dom';


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
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>
</form>
            
            
                <DecisionTree />
            
            <div className="container3">
              <Link to="/Page2">
              <Example /> </Link >
            </div>
            </div>
          
           <Footer />
        </div>
    );
    
};
 
export default App;
