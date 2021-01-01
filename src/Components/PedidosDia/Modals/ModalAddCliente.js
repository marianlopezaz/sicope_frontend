import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//import Mapa from "../../Clientes/Mapa";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [client, setClient] = React.useState(emptyClient);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setClient(emptyClient);
  };

  const handleChange = (prop) => (event) => {
    setClient({ ...client, [prop]: event.target.value });
  };

//   const handleUbicationChange = (address, lat, lng) => {
//     setClient({ ...client, address: address, lat: lat, lng: lng });
//   };

  const handleSubmit = (e) => {
    setLoading(true);
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
        {loading ? (
          <ClipLoader
            css={[
              { display: "flex" },
              { margin: "0 auto" },
              { marginBottom: 25 },
              { borderColor: "var(--main_color)" },
            ]}
            size={30}
            loading={loading}
          />
        ) : (
          <div>
            <form
              id="add_user_form"
              action=""
              onSubmit={handleSubmit}
              method="post"
            >
              <DialogContent>
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
                  center={{ lat: client.lat, lng: client.lng }}
                  handleUbicationChange={handleUbicationChange}
                  height="250px"
                  zoom={14}
                /> */}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary">
                  Guardar
                </Button>
              </DialogActions>
            </form>
          </div>
        )}
      </Dialog>
      {open === false ? (
        <Button
          type="submit"
          id="add_cliente"
          color="primary"
          onClick={handleClickOpen}
        >
          Agregar Cliente
        </Button>
      ) : null}
    </div>
  );
}
