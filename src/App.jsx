import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import DecisionTree from './DecisionTree';
import './styles.css';

const App = () => {
  const [archivoCSV, setArchivoCSV] = useState([]);
  const handleForce = (data, fileInfo) => {
    setArchivoCSV(data);
    console.log(data, fileInfo)
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };
  return (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Seleccione un archivo CSV"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      {archivoCSV.length > 1 && <DecisionTree csv={archivoCSV} umbral={0} />}
    </div>
  );
};

export default App;
