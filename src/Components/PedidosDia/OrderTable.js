import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

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
import VisibilityIcon from '@material-ui/icons/Visibility';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Show: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
    Print: forwardRef((props, ref) => <LocalPrintshopIcon {...props} ref={ref} />)
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

      options={{
        exportButton: true,
        actionsColumnIndex: -1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20 , 50, 100],
        selection: true,
        headerStyle:{
            backgroundColor: '#F2F2F2',
            textAlign: 'center'
        },
        rowStyle: rowData => ({
          backgroundColor: (rowData.loaded === 1) ? 'transparent' : 'transparent',
        })
      }}  

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

      actions={[
          {
            tooltip: 'Imprimir Pedidos',
            icon: props => <Button className='print_all_btn' color="primary">Imprimir pedido/s seleccionado/s</Button>,
            onClick: (evt, data) => this.props.printAll(data)
          }, 
          {
              tooltip: 'Ver Detalles',
              icon: tableIcons.Show,
              position: 'row',
              onClick: (event, rowData) => this.props.show_details(rowData)
          }, 
          {
              tooltip: 'Imprimir',
              icon: tableIcons.Print,
              position: 'row',
              onClick: (event, rowData) => this.props.print(rowData)
          }, 
      ]}

      editable={(this.props.is_day_closed === 0) ? {
          
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
                  let order_id = oldData.id;
                  let data = this.props.data;
                  let index = data.indexOf(oldData);
                  this.props.handleDeleteRow(order_id,index);
                  
              }
              resolve()
              }, 1000)
              
          }),

      }: {}}

    />
  );
}

componentWillUnmount= ()=>{
 clearTimeout(timeOut);
}


}

export default Table;