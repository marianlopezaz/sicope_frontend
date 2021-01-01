import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import AddBox from "@material-ui/icons/AddBox";
//import Mapa from '../Mapa';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const emptyClient = {
  name: "",
  surname: "",
  dni: "",
  phone: "",
  address: "",
  lat: 0,
  lng: 0,
};

export default function ModalAdd(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [client, setClient] = React.useState(emptyClient);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClient(emptyClient);
  };

  const handleChange = (prop) => (event) => {
    setClient({ ...client, [prop]: event.target.value });
  };

//   const handleUbicationChange = (address, lat, lng) => {
//     setClient({ ...client, address: address, lat: lat, lng: lng });
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmitModalAdd(client);
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="center">
          Nuevo Cliente
        </DialogTitle>
        <form
          id="add_user_form"
          action=""
          onSubmit={handleSubmit}
          method="post"
        >
          <DialogContent id="client_add_container">
            <TextField
              autoFocus
              margin="dense"
              id="name_modal_add_clients"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              required
              value={client.name}
              onChange={handleChange("name")}
            />
            <TextField
              margin="dense"
              id="surname_modal_add_clients"
              name="surname"
              label="Apellido"
              type="text"
              fullWidth
              required
              value={client.surname}
              onChange={handleChange("surname")}
            />
            <TextField
              margin="dense"
              id="dni_modal_add_clients"
              name="dni"
              label="DNI"
              type="numeric"
              fullWidth
              required
              value={client.dni}
              onChange={handleChange("dni")}
            />
            <TextField
              margin="dense"
              id="phone_modal_add_clients"
              name="phone"
              label="Celular"
              type="numeric"
              fullWidth
              required
              value={client.phone}
              onChange={handleChange("phone")}
            />
            <TextField
              margin="dense"
              id="address_modal_add_clients"
              name="address"
              label="Dirección"
              type="text"
              fullWidth
              required
              value={client.address}
              onChange={handleChange("address")}
            />
            {/* <Mapa
                        google={props.google}
                        center={{lat: client.lat, lng: client.lng}}
                        handleUbicationChange={handleUbicationChange}
                        height='250px'
                        zoom={14}
                    /> */}
          </DialogContent>
          <DialogActions className="responsive_actions">
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {open === false ? (
        <Fab
          icon={<AddBox />}
          mainButtonStyles={{
            backgroundColor: "var(--main_color)",
            position: "relative",
            top: 0,
          }}
          onClick={handleClickOpen}
        >
          <Action
            style={{
              width: 130,
              height: 30,
              borderRadius: 0,
              borderBottomLeftRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: "var(--main_color)",
              position: "relative",
              top: 72,
              right: 60,
            }}
          >
            <span>Nuevo Cliente</span>
          </Action>
        </Fab>
      ) : null}
    </div>
  );
}
