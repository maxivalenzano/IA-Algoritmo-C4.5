import React, { useState, useEffect } from "react";
import { calcularC45, posicionClase } from "./funciones";
import Tree from "react-d3-tree";
import { Box } from "@material-ui/core";
import { useCenteredTree, renderRectSvgNode } from "./useCenteredTree";
import swal from "@sweetalert/with-react";
import "./styles.css";
import DialogInstancia from "./DialogInstancia"

const DecisionTree = ({ csv, umbral = 0, height, width, csvTest, setResultados, openModalClasificador, toggleModalClasificador }) => {
  const containerStyles = {
    width: width,
    height: height,
  };
  const [translate, containerRef] = useCenteredTree();
  const [jsonValuesC45, setJsonValuesC45] = useState({ test: {}, graph: {}, caminosPosibles: {} });
  console.log("🚀 ~ file: DecisionTree.jsx ~ line 16 ~ DecisionTree ~ jsonValuesC45", jsonValuesC45);
  useEffect(() => {
    setJsonValuesC45(calcularC45(csv, umbral, csvTest, setResultados));
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
          <p>Ganancia: {(nodeDatum.info?.ganancia).toFixed(4) || ""}</p>
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
    const total = nodeDatum.anterior?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => {
      return acc + curr.cant;
    }, 0);
    const totalRama = nodeDatum.info?.cantXClase[0]?.atributoTotal.reduce((acc, curr) => {
      return acc + curr.cant;
    }, 0);
    const find = nodeDatum.anterior?.cantXClase[0]?.atributoTotal?.find(
      (item) => item.campo === nodeDatum.attributes?.atributo
    );
    swal({
      content: (
        <div>
          <h3>
            {nodeDatum.anterior?.atributo}: {nodeDatum.attributes?.atributo || ""}
          </h3>
          {nodeDatum.info ? (
            <>
              <p>
                Cantidad: {find?.cant || ""} / {total}
              </p>
            </>
          ) : (
            <p>Cantidad: {find.cant}</p>
          )}
          <h3>{nodeDatum.name}</h3>
          {nodeDatum.info && (
            <>
              <p>Ganancia: {nodeDatum.info?.ganancia?.toFixed(4) || ""}</p>
            </>
          )}
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
      ),
    });
  };
  return (
    <Box style={containerStyles} ref={containerRef}>
      <Tree
        data={jsonValuesC45.graph}
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          renderRectSvgNode({ ...rd3tProps, handleNodeClick, handleRamaClick })
        }
        orientation="vertical"
      />
      <DialogInstancia
        caminos={jsonValuesC45.caminosPosibles}
        clase={posicionClase(csv)}
        archivoCSV={csv}
        openModalClasificador={openModalClasificador}
        toggleModalClasificador={toggleModalClasificador}
        title="Árbol con Ganancia"
      />
    </Box>
  );
};

export default DecisionTree;
