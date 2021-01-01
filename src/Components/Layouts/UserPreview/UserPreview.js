import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from 'react-avatar';
import './UserPreview.scss';
import {Row,Col} from 'react-bootstrap';
import DeleteModal from '../ConfirmationModals/DeleteModal'
import { NavLink } from 'react-router-dom';

class UserPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          buttonStyle:{
            backgroundColor:this.props.client.main_color, 
            color:'#fff',
            fontWeight:'bold',
            width:'100%'
                }
          }
        }
    
      

    render() {

      const userData = this.props.userData;


        return (
         
         
             <div className="card_container" style={{borderColor:this.props.client.main_color}}>
    
              <Row>
                <Col className="header_card">
                <Avatar className='user_avatar' name={`${userData.name} ${userData.surname}`} size="50" round={true} color='#C5C5C5'/> 
                </Col>
              </Row>

              <Row>
                <Col className="title_card">
                  {userData.name + ' ' + userData.surname}
                </Col>
              </Row>

              <Row>

               <Col  className="actions_container">

                  <Row>

                    <Col className="button_col">
                   
                      <NavLink to={`${this.props.url}/${userData.id}/${this.props.renderView.userinfo}`} title='Ver' 
                                style={{color:'white', 
                                        textDecoration:'none', 
                                        width:'100%',
                                        height:'100%',
                                        }}>
                                    <Button 
                                      style={this.state.buttonStyle}
                                      onClick={()=>{sessionStorage.setItem('patientData',JSON.stringify(userData))}}>
                                        Ver
                                    </Button>
                      </NavLink>       
    
                    </Col>

                  </Row>

                  <Row>

                    <Col className="button_col">
                   
                    <NavLink to={`${this.props.url}/${userData.id}/${this.props.renderView.insurance}`} title='Ver' 
                              style={{color:'white', 
                                      textDecoration:'none', 
                                      width:'100%',
                                      height:'100%',
                                      }}>
                                    <Button 
                                    style={this.state.buttonStyle}
                                    onClick={()=>{sessionStorage.setItem('patientData',JSON.stringify(userData))}}>
                                      Obra Social
                                    </Button>
                    </NavLink>       

                    </Col>
                  </Row>
                  <Row>
                    <Col className="button_col">
                   
                      <NavLink to={`${this.props.url}/${userData.id}/${this.props.renderView.treatments}`} title='Ver' 
                                style={{color:'white', 
                                        textDecoration:'none', 
                                        width:'100%',
                                        height:'100%',
                                        }}>
                                    <Button 
                                    style={this.state.buttonStyle}
                                    onClick={()=>{sessionStorage.setItem('patientData',JSON.stringify(userData))}}>
                                      Tratamientos
                                    </Button>
                      </NavLink>       
 
                    </Col>

                  </Row>
                </Col>

              </Row>

              <Row>
                <Col>
                  <DeleteModal 
                        deleteFunction={this.props.handleDeleteRow} 
                        userId = {this.props.userData.id} 
                        clientColor={this.props.client.main_color}
                        index = {this.props.userData.tableData.id} //posición en la tabla
                  />
                </Col>
              </Row>

         </div>
          
    
        );
    }


}

export default UserPreview;