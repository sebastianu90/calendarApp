import React from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import { DialogTitle, DialogContent, TextField, Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hora: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  spacing: {
    marginBlockStart: "5px",
    marginBlockEnd: "5px",
  },
  spacingBotton: {
    marginBlockStart: "5px",
    marginBlockEnd: "5px",
  },
}));

export default function PopupEditar(props) {
  const {
    visibleModalEdit,
    setVisibleModalEdit,
    onInputChange,
    editEventCalendar,
    form,
    selectInfo,
    clickInfo,
  } = props;

  const classes = useStyles();

  const handleOnClick = (event) => {
    event.preventDefault();
    setVisibleModalEdit(false);
    editEventCalendar();
  };

  return (
    <Dialog open={visibleModalEdit}>
      <Container>
        <DialogTitle>Agenda Carga</DialogTitle>
        <DialogContent>
          <div className={classes.hora}>
            <span class="material-icons">schedule</span>
            <h4 className={classes.spacing}>
              {selectInfo.startStr}-{selectInfo.endStr}
            </h4>
          </div>
          <div className={classes.hora}>
            <span class="material-icons">speaker</span>
            <h4 className={classes.spacing}> {form.apellido}</h4>
          </div>
          <div className={classes.hora}>
            <span class="material-icons">person</span>
            <h4> ¿Quien agenda la carga?</h4>
          </div>
          <div>
            <div className="box-two-inputs">
              <TextField
                onChange={onInputChange}
                value={form.nombre}
                type="text"
                name="nombre"
                placeholder="nombre"
                variant="outlined"
              />
              <TextField
                onChange={onInputChange}
                value={form.apellido}
                type="text"
                name="apellido"
                placeholder="apellido"
                variant="outlined"
              />
            </div>
            <div className="box-one-input">
              <TextField
                onChange={onInputChange}
                value={form.email}
                type="text"
                name="email"
                placeholder="email"
                variant="outlined"
              />
            </div>
          </div>
          <div className={classes.hora}>
            <span class="material-icons">directions_car_filled</span>
            <h3>datos de vehiculo </h3>
          </div>
          <div className="box-three-inputs">
            <TextField
              onChange={onInputChange}
              value={form.vehiculo}
              type="text"
              name="vehiculo"
              placeholder="vehiculo"
              variant="outlined"
            />
            <TextField
              onChange={onInputChange}
              value={form.modelo}
              type="text"
              name="modelo"
              placeholder="modelo"
              variant="outlined"
            />
            <TextField
              onChange={onInputChange}
              value={form.patente}
              type="text"
              name="patente"
              placeholder="patente"
              variant="outlined"
            />
          </div>
          <Button className={classes.spacingBotton} onClick={handleOnClick} variant="contained">
            Actualizar
          </Button>
        </DialogContent>
      </Container>
    </Dialog>
  );
}
