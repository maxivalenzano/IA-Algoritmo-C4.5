import React from 'react';
import dataSet from './conjuntoEntrenamiento4';
import {
  calcularC45
} from './funciones';

const DecisionTree = () => {
  
  
  
  console.log(
    '🚀 ~ file: DecisionTree.jsx ~ line 108 ~ recursiveData ~ recursiveData', calcularC45(dataSet)
  );

  return (
    <React.Fragment>
      <p>hola mundo</p>
    </React.Fragment>
  );
};

export default DecisionTree;
