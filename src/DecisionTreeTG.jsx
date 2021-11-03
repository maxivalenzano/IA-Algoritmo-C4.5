import React, { useState, useEffect } from 'react';
import { calcularC45_TG } from './funciones';
import Tree from 'react-d3-tree';
import { useCenteredTree, renderRectSvgNode } from './useCenteredTree';
import swal from '@sweetalert/with-react';
import './styles.css';

const DecisionTree = ({ csv, umbral = 0, width, height }) => {
  const containerStyles = {
    width: width,
    height: height,
  };
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45TG, setJsonValuesC45TG] = useState({});
  useEffect(() => {
    setJsonValuesC45TG(calcularC45_TG(csv, umbral));
  }, [csv, umbral]);

  const handleNodeClick = (nodeDatum) => {
    swal({
      content: (
        <div>
          <h3>{nodeDatum.name}</h3>
          <p>Tasa de ganancia: {(nodeDatum.info?.ganancia).toFixed(4) || ''}</p>
        </div>
      ),
      buttons: true,
    });
  };
  const handleRamaClick = (nodeDatum) => {
    const total = nodeDatum.info?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => { return acc + curr.cant }, 0);
    const find = nodeDatum.info?.cantXClase[0]?.atributoTotal?.find(
      (item) => item.campo === nodeDatum.attributes?.atributo
    );
    swal({
      content: (
        <div>
          <h3>Valor de atributo: {nodeDatum.attributes?.atributo || ''}</h3>
          {nodeDatum.info && <>
            <p>Cantidad: {find?.cant || ''} / {total}</p>
            <p>Entropía: {(nodeDatum.attributes?.entropy).toFixed(4) || ''}</p>
          </>}
          <h3>{nodeDatum.name}</h3>
          {nodeDatum.info && <>
            <p>Tasa de ganancia: {(nodeDatum.info?.ganancia)?.toFixed(4) || ''}</p>
          </>}
        </div>
      )
    });
  };
  return (
    <React.Fragment>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={jsonValuesC45TG}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) =>
            renderRectSvgNode({ ...rd3tProps, handleNodeClick, handleRamaClick })
          }
          orientation="vertical"
        />
      </div>
    </React.Fragment>
  );
};

export default DecisionTree;
