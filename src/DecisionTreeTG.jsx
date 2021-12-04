import React, { useState, useEffect } from 'react';
import { calcularC45_TG } from './funciones';
import Tree from 'react-d3-tree';
import { useCenteredTree, renderRectSvgNode } from './useCenteredTree';
import swal from '@sweetalert/with-react';
import './styles.css';

const DecisionTree = ({ csv, umbral = 0, width, height, csvTest, setResultadosTG }) => {
  const containerStyles = {
    width: width,
    height: height,
  };
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45TG, setJsonValuesC45TG] = useState({ test: {}, graph: {} });
  console.log('🚀 ~ file: DecisionTreeTG.jsx ~ line 15 ~ DecisionTree ~ jsonValuesC45TG', jsonValuesC45TG);
  useEffect(() => {
    setJsonValuesC45TG(calcularC45_TG(csv, umbral, csvTest, setResultadosTG));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csv, umbral, csvTest]);

  const handleNodeClick = (nodeDatum) => {
    const total = nodeDatum.info?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => {
      return acc + curr.cant;
    }, 0);
    swal({
      content: (
        <div>
          <h3>{nodeDatum.name}</h3>
          <p>Tasa de ganancia: {(nodeDatum.info?.ganancia).toFixed(4) || ''}</p>
          {nodeDatum.info && <p>Lista atributos:</p>}
          {nodeDatum.info &&
            nodeDatum.info?.cantXClase[0]?.atributoTotal.map((item) => {
              return (
                <p>
                  {item.campo}: {item.cant} / {total}
                </p>
              );
            })}
        </div>
      ),
      buttons: true,
    });
  };
  const handleRamaClick = (nodeDatum) => {
    const total = nodeDatum.anterior?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => { return acc + curr.cant }, 0);
    const totalRama = nodeDatum.info?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => { return acc + curr.cant }, 0);
    const find = nodeDatum.anterior?.cantXClase[0]?.atributoTotal?.find(
      (item) => item.campo === nodeDatum.attributes?.atributo
    );
    swal({
      content: (
        <div>
          <h3>{nodeDatum.anterior?.atributo}: {nodeDatum.attributes?.atributo || ''}</h3>
          {nodeDatum.info ? <>
            <p>Cantidad: {find?.cant || ''} / {total}</p>
          </> : <p>Cantidad: {find.cant}</p>}
          <h3>{nodeDatum.name}</h3>
          {nodeDatum.info && <>
            <p>Tasa de ganancia: {(nodeDatum.info?.ganancia)?.toFixed(4) || ''}</p>
          </>}
          {nodeDatum.info && <p>Lista atributos:</p>}
          {nodeDatum.info &&
            nodeDatum.info?.cantXClase[0]?.atributoTotal.map((item) => {
              return (
                <p>
                  {item.campo}: {item.cant} / {totalRama}
                </p>
              );
            })}
        </div>
      )
    });
  };
  return (
    <React.Fragment>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={jsonValuesC45TG.graph}
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
