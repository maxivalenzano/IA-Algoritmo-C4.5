import React, { useState, useEffect } from 'react';
// import dataSet from './conjuntoEntrenamiento2';
import { calcularC45, calcularC45_TG } from './funciones';
import Tree from 'react-d3-tree';
import { useCenteredTree } from './helpers';
import './styles.css';

const containerStyles = {
  width: '100vw',
  height: '100vh',
};

const renderRectSvgNode = ({ nodeDatum, toggleNode, handleNodeClick }) => (
  <g>
    <circle r="15" x="-10" onClick={toggleNode} />
    {nodeDatum.name === 'NodoImpuro' ? (
      <text fill="red" strokeWidth="1" x="20" onClick={() => handleNodeClick(nodeDatum)}>
        {nodeDatum.name}
      </text>
    ) : (
      <text fill="black" strokeWidth="1" x="20" onClick={() => handleNodeClick(nodeDatum)}>
        {nodeDatum.name}
      </text>
    )}
    {nodeDatum.attributes?.department && (
      <>
        <text fill="black" x="20" dy="20" strokeWidth="1">
          rama: {nodeDatum.attributes?.department}
        </text>
        {/* <text fill="black" x="20" dy="40" strokeWidth="1">
          otro: {nodeDatum.attributes?.department}
        </text> */}
      </>
    )}
  </g>
);

const DecisionTree = ({ csv, umbral = 0 }) => {
  console.log('🚀 ~ file: DecisionTree.jsx ~ line 39 ~ DecisionTree ~ csv', csv);
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45, setJsonValuesC45] = useState({});
  const [jsonValuesC45TG, setJsonValuesC45TG] = useState({});
  useEffect(() => {
    setJsonValuesC45(calcularC45(csv, umbral));
    setJsonValuesC45TG(calcularC45_TG(csv, umbral));
  }, [csv, umbral]);

  const handleNodeClick = (nodeDatum) => {
    window.alert(
      nodeDatum.children ? "este es un Nodo rama" : "este es un nodo hoja"
    );
  };
  return (
    <React.Fragment>
      <p>Con ganancia de Información:</p>
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
      <p>Con Tasa de ganancia:</p>
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
