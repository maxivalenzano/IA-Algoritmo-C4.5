import React, { useState, useEffect } from 'react';
// import dataSet from './conjuntoEntrenamiento2';
import { calcularC45_TG } from './funciones';
import Tree from 'react-d3-tree';
import { useCenteredTree, renderRectSvgNode } from './useCenteredTree';
import swal from 'sweetalert';
import './styles.css';


const DecisionTree = ({ csv, umbral = 0, width, height }) => {
  const containerStyles = {
    width: width,
    height: height,
  };
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 39 ~ DecisionTree ~ csv', csv);
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45TG, setJsonValuesC45TG] = useState({});
  useEffect(() => {
    setJsonValuesC45TG(calcularC45_TG(csv, umbral));
  }, [csv, umbral]);

  const handleNodeClick = (nodeDatum) => {
    swal({
      text: nodeDatum.children ? 'este es un Nodo rama' : 'este es un nodo hoja',
    });
  };
  return (
    <React.Fragment>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={jsonValuesC45TG}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) =>
            renderRectSvgNode({ ...rd3tProps, handleNodeClick })
          }
          orientation="vertical"
        />
      </div>
    </React.Fragment>
  );
};

export default DecisionTree;
