import React, { useState, useEffect } from 'react';
// import dataSet from './conjuntoEntrenamiento2';
import { calcularC45 } from './funciones';
import Tree from 'react-d3-tree';
import { Box } from '@material-ui/core';
import { useCenteredTree, renderRectSvgNode } from './useCenteredTree';
import swal from 'sweetalert';
import './styles.css';

const DecisionTree = ({ csv, umbral = 0, height, width }) => {
  const containerStyles = {
    width: width,
    height: height,
  };
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
    <Box style={containerStyles} ref={containerRef}>
      <Tree
        data={jsonValuesC45}
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          renderRectSvgNode({ ...rd3tProps, handleNodeClick })
        }
        orientation="vertical"
      />
    </Box>
  );
};

export default DecisionTree;
