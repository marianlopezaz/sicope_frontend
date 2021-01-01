import React, { Component } from 'react';
import MaterialTable from 'material-table';

/* Import icons */
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Row, Col } from 'react-bootstrap';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

var timeOut = null;

class Table extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null,
    }
  }

render(){

  return (
    <MaterialTable
     
      title={this.props.tableName}
      icons={tableIcons}
      columns={this.props.columns}
      data={this.props.data}
      onRowClick={(event, selectedRow)=>{this.setState({selectedRow:selectedRow});if(this.props.userOptions){this.props.userOptions(selectedRow)} }}
      options={(this.props.user_role === 'admin') ? {
      exportButton: true,
      pageSize: 5,
      pageSizeOptions: [],
      actionsColumnIndex: -1,
      headerStyle:{
        backgroundColor: '#F2F2F2',
        textAlign: 'center'
      },
      
      rowStyle: rowData => ({
        backgroundColor: (this.state.selectedRow && this.state.selectedRow.id === rowData.id) ? '#EEE' : '#FFF',
      })

      } : 
      {
        exportButton: false,
        pageSize: 5,
        pageSizeOptions: [],
        actionsColumnIndex: -1,
        headerStyle:{
          backgroundColor: '#F2F2F2',
          textAlign: 'center'
        },
        
        rowStyle: rowData => ({
          backgroundColor: (this.state.selectedRow && this.state.selectedRow.id === rowData.id) ? '#EEE' : '#FFF',
        })
  
      }
    }

  localization={{
    pagination: {
      labelRowsSelect: 'filas',
    },
    toolbar: {
        searchPlaceholder: 'Buscar',
        showColumnsAriaLabel: 'filas'
    },
    header: {
        actions: 'Acciones'
    },
    body: {
        emptyDataSourceMessage: 'No se encontraron resultados',
        editRow: { deleteText: '¿Seguro que deseas eliminar esta fila?' } 
    }
  }}

  detailPanel={(this.props.is_view) ? rowData => {
              return (
                <div style={{textAlign:'left', marginTop: 5, marginBottom: 15, marginLeft: 20}}>
                  {
                    rowData.order_products.map(order_product => {
                      return(
                        <Row className='client_search_card stats_details_cards' key={order_product.order_id}>
                          <Col md={12} sm={12} xs={12}>
                              <Col md={12} sm={12} xs={12}>
                                  <p className='name' style={{color: '#a9a9aa'}}>{order_product.product_name}</p>
                              </Col>
                              <Col md={12} sm={12} xs={12}>
                                  <p style={{color: 'var(--main_color)'}}>{order_product.product_quantity} unidad/es</p>
                              </Col>
                          </Col>
                        </Row>
                      )
                    })
                  }
                </div>
              )
            }
      :
        null
  }

  editable={(this.props.handleEditRow && this.props.handleDeleteRow) ? {
    
    onRowUpdate: (newData, oldData) =>
    
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            const data = this.props.data;
            const index = data.indexOf(oldData);
            this.props.handleEditRow(index,data,newData)
          }
          resolve()
        }, 1000)
      }),

    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
       timeOut= setTimeout(() => {
          { 
            let user_id = oldData.id;
            let data = this.props.data;
            let index = data.indexOf(oldData);
            this.props.handleDeleteRow(user_id,index);
            
          }
          resolve()
        }, 1000)
        
      })
    
  }: (this.props.handleEditRow) ?
    {
      onRowUpdate: (newData, oldData) =>
    
      new Promise((resolve, reject) => {
        setTimeout(() => {
          {
            const data = this.props.data;
            const index = data.indexOf(oldData);
            this.props.handleEditRow(index,data,newData)
          }
          resolve()
        }, 1000)
      }),
    }
    : {}
  }

    />
  );
}

componentWillUnmount= ()=>{
 clearTimeout(timeOut);
}


}

export default Table;