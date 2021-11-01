import React, { useState, useEffect } from 'react';
// import dataSet from './conjuntoEntrenamiento2';
import { calcularC45 } from './funciones';
import Tree from 'react-d3-tree';
import { useCenteredTree, renderRectSvgNode } from './useCenteredTree';
import swal from 'sweetalert';
import './styles.css';

const containerStyles = {
  width: '100vw',
  height: '100vh',
};

const DecisionTree = ({ csv, umbral = 0 }) => {
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 39 ~ DecisionTree ~ csv', csv);
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45, setJsonValuesC45] = useState({});
  useEffect(() => {
    setJsonValuesC45(calcularC45(csv, umbral));
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
          data={jsonValuesC45}
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
