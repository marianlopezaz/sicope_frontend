import React, { Component } from 'react';
import './Usuarios.scss'

// Import Componentes
import CrudUsers from '../../Utils/CrudUsers';
import ModalAdd from './Modals/ModalAdd';

// Import dependencias
import Alert from 'react-s-alert';
import Table from '../Layouts/Table/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Usuarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],

           inputFocusStyle:{
            outline: 'none', 
            border:'none', 
            borderBottom:'solid',
            borderWidth:2,
            color: 'black',
            borderColor:'var(--main_color)',
          },
          inputStyle: {

            outline: 'none', 
            border:'none', 
            borderBottom:'solid',
            borderWidth:1.5,
            color:'black',
            borderColor:'grey'
          
          },          
            tableColumns: [
                { title: 'id', field: 'id', hidden:true},
                { title: 'Nombre', field: 'name',
                  cellStyle:{
                  textAlign: 'center',
                  },
                  editComponent: props => (
                    <input
                    type="text"
                    required = {true}
                    style={!this.state.onFocusName ? this.state.inputStyle : this.state.inputFocusStyle }
                    onFocus = {()=>this.onFocus('Name')}
                    onBlur = {() =>this.onBlur('Name')}
                    autoFocus
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    />
                  )
                }, 
                // { title: 'Rol', field: 'role', cellStyle:{ textAlign: 'center'},
                //   editComponent: props => (
                //     <select
                //     className='form-control select_users'
                //     type="text"
                //     required = {true}
                //     style={!this.state.onFocusName ? this.state.inputStyle : this.state.inputFocusStyle }
                //     onFocus = {()=>this.onFocus('Role')}
                //     onBlur = {() =>this.onBlur('Role')}
                //     autoFocus
                //     value={props.value}
                //     onChange={e => props.onChange(e.target.value)}
                //     >
                //       <option value="admin">Administrador</option> 
                //       <option value="user" selected>Centro de Distribución</option>
                //     </select>
                //   ), render: rowData => (rowData.role === 'admin') ? 'Administrador': (rowData.role === 'user') ? 'Centro de Distribución': ''
                // }, 
                { title: 'Nombre de Usuario', field: 'user_name', cellStyle:{ textAlign: 'center'}}
            ]
        };
    }

    componentDidMount(){
      if(this.props.user.auth_token){
          CrudUsers.getUsers(this.props.user.auth_token).then(result => {
              if(result.success){
                  let users = [];
                  result.result.map(user => {
                    if(user.role === 'user'){
                      users.push(user)
                    }
                    return true
                  })
                  this.setState({
                      users: users
                  })
              }else{
                result.result.forEach(element => {
                    Alert.error(element.message, {
                    position: 'bottom-left',
                    effect: 'genie', 
                    })
                });
              }
          })
      } 
    }

    handleDeleteRow(user_id,indexTable){
        CrudUsers.delete(user_id, this.props.user.auth_token).then(result => {
            if(result.success){
                let data = this.state.users;
                data.splice(indexTable, 1);
                this.setState({data});
                Alert.success(result.result, {
                  position: 'bottom-left',
                  effect: 'genie', 
                })
            }else{
                result.result.forEach(element => {
                  Alert.error(element.message, {
                  position: 'bottom-left',
                  effect: 'genie', 
                  })
              });
            }
        })
    }


    handleEditRow(editedIndex, data, newData){
        delete newData.auth_token;
        delete newData.created_at;
        delete newData.updated_at;
        delete newData.deleted_at;
        CrudUsers.edit(newData, this.props.user.auth_token).then(result => {
          if(result.success){
              data[editedIndex] = newData;
              this.setState({data});
              Alert.success('Usuario editado correctamente', {
                position: 'bottom-left',
                effect: 'genie', 
              })
              
            }else{
              result.result.forEach(element => {
                  Alert.error(element.message, {
                  position: 'bottom-left',
                  effect: 'genie', 
                  })
              });
            }
          }).catch((e)=>{/* Do something with the error */})
    }

    onFocus = (field) =>{
      var focusField= 'onFocus'+ field;
      this.setState({[focusField]:true});    
    }
  
    onBlur = (field) =>{
      var focusField= 'onFocus'+ field;
      this.setState({[focusField]:false});  
    }

    handleSubmitModalAdd(user){
      delete user.showPassword;
      CrudUsers.add(user, this.props.user.auth_token).then(result => {
        if(result.success){
          let users = this.state.users;
          users.push(result.result)
          this.setState({users: users})
          Alert.success('Usuario agregado correctamente!', {
            position: 'bottom-left',
            effect: 'genie', 
          })
          
        }else{
          result.result.forEach(element => {
            Alert.error(element.message, {
            position: 'bottom-left',
            effect: 'genie', 
            })
          });
        }
      })
    }

    render() {
        return (
            <div>
                <Row md={12} >
                    <ModalAdd handleSubmitModalAdd={this.handleSubmitModalAdd.bind(this)}/>
                    <Col md={11} style={{marginTop: '20px', marginLeft: 'auto', marginRight: 'auto'}} >
                        <Table user_role={this.props.user.role} handleDeleteRow={this.handleDeleteRow.bind(this)} handleEditRow={this.handleEditRow.bind(this)} tableName='Centros de Distribución' data={this.state.users} columns={this.state.tableColumns}></Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Usuarios;