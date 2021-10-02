import React from 'react';
import CSVReader from "react-csv-reader";
import DecisionTree from './DecisionTree';
import "./styles.css";

const App = () => {
  const handleForce = (data, fileInfo) => console.log(data, fileInfo);
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };
  return (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Seleccione un archivo CSV"
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
      <DecisionTree />
    </div>
  );
}

export default App;
