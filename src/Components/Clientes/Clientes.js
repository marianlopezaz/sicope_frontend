import React, { Component } from "react";
import "./Clientes.scss";
import "../Usuarios/Usuarios.scss";

// Import Componentes
import CrudClients from "../../Utils/CrudClients";
import ModalAdd from "./Modals/ModalAdd";

// Import dependencias
import Alert from "react-s-alert";
import Table from "../Layouts/Table/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],

      inputFocusStyle: {
        outline: "none",
        border: "none",
        borderBottom: "solid",
        borderWidth: 2,
        color: "black",
        borderColor: "var(--main_color)",
      },
      inputStyle: {
        outline: "none",
        border: "none",
        borderBottom: "solid",
        borderWidth: 1.5,
        color: "black",
        borderColor: "grey",
      },
      tableColumns: [
        { title: "id", field: "id", hidden: true },
        {
          title: "Nombre",
          field: "name",
          cellStyle: {
            textAlign: "center",
          },
          editComponent: (props) => (
            <input
              type="text"
              required={true}
              style={
                !this.state.onFocusName
                  ? this.state.inputStyle
                  : this.state.inputFocusStyle
              }
              onFocus={() => this.onFocus("Name")}
              onBlur={() => this.onBlur("Name")}
              autoFocus
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        },
        {
          title: "Apellido",
          field: "surname",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "DNI",
          field: "dni",
          type: "numeric",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Celular",
          field: "phone",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Dirección",
          field: "address",
          cellStyle: { textAlign: "center" },
        },
      ],
    };
  }

  componentDidMount() {
    if (this.props.user.auth_token) {
      CrudClients.get(this.props.user.auth_token).then((result) => {
        if (result.success) {
          this.setState({
            clients: result.result,
          });
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              position: "bottom-left",
              effect: "genie",
            });
          });
        }
      });
    }
  }

  handleDeleteRow(client_id, indexTable) {
    CrudClients.delete(client_id, this.props.user.auth_token).then((result) => {
      if (result.success) {
        let data = this.state.clients;
        data.splice(indexTable, 1);
        this.setState({ data });
        Alert.success(result.result, {
          position: "bottom-left",
          effect: "genie",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom-left",
            effect: "genie",
          });
        });
      }
    });
  }

  handleEditRow(editedIndex, data, newData) {
    CrudClients.edit(newData, this.props.user.auth_token)
      .then((result) => {
        if (result.success) {
          data[editedIndex] = newData;
          this.setState({ data });
          Alert.success("Cliente editado correctamente", {
            position: "bottom-left",
            effect: "genie",
          });
        } else {
          result.result.forEach((element) => {
            Alert.error(element.message, {
              position: "bottom-left",
              effect: "genie",
            });
          });
        }
      })
      .catch((e) => {
        /* Do something with the error */
      });
  }

  onFocus = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: true });
  };

  onBlur = (field) => {
    var focusField = "onFocus" + field;
    this.setState({ [focusField]: false });
  };

  handleSubmitModalAdd(client) {
    CrudClients.add(client, this.props.user.auth_token).then((result) => {
      if (result.success) {
        let clients = this.state.clients;
        clients.push(result.result);
        this.setState({ clients: clients });
        Alert.success("Cliente agregado correctamente!", {
          position: "bottom-left",
          effect: "genie",
        });
      } else {
        result.result.forEach((element) => {
          Alert.error(element.message, {
            position: "bottom-left",
            effect: "genie",
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Row md={12}>
          <ModalAdd
            handleSubmitModalAdd={this.handleSubmitModalAdd.bind(this)}
          />
          <Col
            md={11}
            style={{
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Table
              user_role={this.props.user.role}
              handleEditRow={this.handleEditRow.bind(this)}
              tableName="Clientes"
              data={this.state.clients}
              columns={this.state.tableColumns}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Clientes;
