import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 25 });
    }
  }, []);
  return [translate, containerRef];
};

export const renderRectSvgNode = ({ nodeDatum, toggleNode, handleNodeClick }) => (
  <g>
    <circle r="15" x="-10" onClick={toggleNode} />
    {nodeDatum.name === 'NodoImpuro' ? (
      <text fill="red" stroke='red' strokeWidth="1" x="20" onClick={() => handleNodeClick(nodeDatum)}>
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
