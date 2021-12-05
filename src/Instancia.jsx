import React, { useState } from 'react';
import { Box, MenuItem, Select } from '@material-ui/core';
import { listadoTituloColumnas } from './funciones';
import { omit } from 'lodash-es';

const Instancia = ({ data, opcionesAtributos, caminos, clase, title }) => {
  const [values, setValues] = useState({});
  let listaAtributos = listadoTituloColumnas(data).slice(0, -1);

  function handleChangeFormData(e) {
    const { name, value } = e.target;
    return setValues({ ...values, [name]: value });
  }

  const searchInstancia = () => {
    const search = caminos.map((camino) => {
      const reducido = omit(camino, clase);
      const result2 = Object.entries(reducido).map(([key, value]) => {
        return String(values[key]) === String(value);
      });

      if (!result2.includes(false)) {
        return { result2, clase: String(camino[clase]) };
      }
      return { result2, clase: null };
    });
    const busqueda = search.find((item) => item.clase !== null)?.clase;
    if (!busqueda) {
      return 'No clasifica';
    }
    return busqueda;
  };

  return (
    <Box minWidth={500} px={6}>
      <h4>{title}</h4>
      <h5>Nueva instancia</h5>
      <br/>
      {listaAtributos.map(function (nameAtr, valueAtr) {
        return (
          <Box pb={2}>
            <label>{nameAtr + ':'}</label>
            <Select
              fullWidth
              id={`${nameAtr}-select`}
              name={nameAtr}
              onChange={handleChangeFormData}
              value={values[nameAtr]}>
              {opcionesAtributos[valueAtr].map((selectData) => {
                return (
                  <MenuItem
                    style={{ fontSize: '12px' }}
                    key={`${nameAtr}KEY${valueAtr}${selectData}`}
                    value={selectData}>
                    {selectData}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        );
      })}
      <br />
      <h5>Resultado de la instancia</h5>

      <h4>
        {clase}: {searchInstancia()}
      </h4>
    </Box>
  );
};

export default Instancia;
