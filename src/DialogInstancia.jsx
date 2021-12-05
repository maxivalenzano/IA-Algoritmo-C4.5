import React from 'react';
import { Box, Button, DialogContent, makeStyles, Dialog } from '@material-ui/core';
import CloseIcon from './CloseIcon';
import './styles.css';
import Instancia from './Instancia';
import { atributos } from './funciones';

const useStyles = makeStyles(() => ({
  closeIcon: {
    width: '30px',
    height: '28px',
    cursor: 'pointer',
  },
}));

const DialogInstancia = ({
  archivoCSV,
  openModalClasificador,
  toggleModalClasificador,
  caminos,
  clase,
  title,
}) => {
  const classes = useStyles();

  const opcionesAtributos = atributos(archivoCSV);
  return (
    <>
      {opcionesAtributos && (
        <Dialog
          open={openModalClasificador}
          setIsOpen={toggleModalClasificador}
          aria-labelledby="form-dialog-title">
          <DialogContent>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon className={classes.closeIcon} onClick={toggleModalClasificador} />
            </Box>
            <Instancia
              title={title}
              caminos={caminos}
              data={archivoCSV}
              opcionesAtributos={opcionesAtributos}
              clase={clase.nombre}
            />
            <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#F0CCE3' }}
                onClick={toggleModalClasificador}>
                Salir
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DialogInstancia;
