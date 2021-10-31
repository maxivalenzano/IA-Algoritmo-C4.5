import React, { useState, useEffect } from 'react';
import dataSet from './conjuntoEntrenamiento6';
import { calcularC45 } from './funcionesTasaGanancia';
import Tree from 'react-d3-tree';
import { useCenteredTree } from './helpers';
import './styles.css';

const containerStyles = {
  width: '100vw',
  height: '100vh',
};

// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
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

const DecisionTree = () => {
  const [translate, containerRef] = useCenteredTree();
  const [jsonGraph, setJsonGraph] = useState({});

  useEffect(() => {
    setJsonGraph(calcularC45(dataSet));
    // const datosCalculados = ;
  }, []);
  console.log('🚀 ~ file', jsonGraph);

  return (
    <React.Fragment>
      <p>Con Tasa de Ganancia:</p>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={jsonGraph}
          translate={translate}
          renderCustomNodeElement={renderRectSvgNode}
          orientation="vertical"
        />
      </div>
    </React.Fragment>
  );
};

export default DecisionTree;
