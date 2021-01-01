import React, { Component } from 'react';

// Import Componentes
import '../Usuarios/Usuarios.scss';
import './Productos.scss';
import CrudProductos from '../../Utils/CrudProductos';
import RenderProductos from './RenderProductos';
import ModalAddProducto from './ModalesProductos/ModalAddProducto';
import ProductosSkeleton from './Skeleton/SkeletonProductos';
import ProductosSkeletonResponsive from './Skeleton/SkeletonProductosResponsive';
import { GithubPicker } from 'react-color';

// Import dependencias
import Alert from 'react-s-alert';
import { Row, Col } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';

class Productos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {
                is_loading: true
            },
            is_delete_modal_open: false,
            product_delete_id: 0,
            loading_delete: false,
            is_edit_modal_open: false,
            editable_product_id: 0,
            editable_product_name: '',
            editable_product_price: 0,
            searched_products: [],
            colorMarker: '#272727'
        }
        this.handleSubmitModalAdd = this.handleSubmitModalAdd.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
    }

    componentDidMount() {
        if (this.props.user.auth_token) {
            CrudProductos.getAll(this.props.user.auth_token).then(result => {
                if (result.success) {
                    this.setState({ products: result.result })
                } else {
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

    handleSubmitModalAdd(newProduct) {
        console.log(newProduct);
        CrudProductos.add(newProduct, this.props.user.auth_token).then(result => {
            if (result.success) {
                if (!(this.state.products.find(product => { return product.id === result.result.id }))) {
                    let products = this.state.products;
                    products.push({
                        id: result.result.id,
                        name: result.result.name,
                        price: result.result.price, 
                        color: result.result.color
                    });
                    this.setState({ products: products })
                }
                Alert.success(`Producto ${result.result.name} creado correctamente.`, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            } else {
                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        })
    }

    handleDelete() {
        this.setState({ loading_delete: true })
        CrudProductos.delete(this.state.product_delete_id, this.props.user.auth_token).then(result => {
            if (result.success) {
                if (this.state.products.find(product => { return product.id === this.state.product_delete_id })) {
                    let products = this.state.products;
                    let removeProduct = products.map(product => {
                        return product.id
                    }).indexOf(this.state.product_delete_id);
                    products.splice(removeProduct, 1);
                    if (this.state.searched_products.find(product => { return product.id === this.state.product_delete_id })) {
                        let searched_products = this.state.searched_products;
                        let removeSearchedProduct = searched_products.map(product => {
                            return product.id
                        }).indexOf(this.state.product_delete_id);
                        searched_products.splice(removeSearchedProduct, 1);
                        this.setState({ loading_delete: false, is_delete_modal_open: false, products: products, searched_products: searched_products })
                    }
                    this.setState({ loading_delete: false, is_delete_modal_open: false, products: products })
                }
                Alert.success(result.result, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            } else {
                this.setState({ loading_delete: false, is_delete_modal_open: false })
                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        })
    }

    handleDeleteClick(product_delete_id) {
        this.setState({
            is_delete_modal_open: true,
            product_delete_id: product_delete_id
        })
    }

    handleEditClick(product_edit_id) {
        let editable_product = this.state.products.find(product => { return product.id === product_edit_id })
        this.setState({
            is_edit_modal_open: true,
            editable_product_id: editable_product.id,
            editable_product_name: editable_product.name,
            editable_product_price: editable_product.price,
        })
    }

    handleCloseDelete() {
        this.setState({ is_delete_modal_open: false })
    }

    handleCloseEdit() {
        this.setState({
            is_edit_modal_open: false,
            editable_product_id: 0,
            editable_product_name: '',
            editable_product_price: 0,
        })
    }

    handleChangeEdit(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleColorChange = (color) =>{
        this.setState({colorMarker:color.hex,})
    }


    handleSubmitEdit() {
        this.setState({ loading_delete: true })
        let editable_product = {
            id: this.state.editable_product_id,
            name: this.state.editable_product_name,
            price: this.state.editable_product_price,
            color: this.state.colorMarker
        }
        console.log(editable_product);
        CrudProductos.edit(editable_product, this.props.user.auth_token).then(result => {
            if (result.success) {
                if (this.state.products.find(product => { return product.id === result.result.id })) {
                    let products = this.state.products.map(product => {
                        if(product.id === result.result.id){
                            product.name = result.result.name;
                            product.price = result.result.price; 
                            product.color = result.result.color;
                        }
                        return product;
                    })
                    if (this.state.searched_products.find(product => { return product.id === result.result.id })) {
                        let searched_products = this.state.searched_products.map(product => {
                            if(product.id === result.result.id){
                                product.name = result.result.name;
                                product.price = result.result.price; 
                                product.color = result.result.color;
                            }
                            return product
                        })
                        this.setState({ loading_delete: false, is_delete_modal_open: false, products: products, searched_products: searched_products })
                    }
                    this.setState({ loading_delete: false, is_edit_modal_open: false, products: products })
                }
                Alert.success(`Producto ${result.result.name} editado correctamente.`, {
                    position: 'bottom-left',
                    effect: 'genie',
                })
            } else {
                this.setState({ loading_delete: false, is_edit_modal_open: false })
                result.result.forEach(element => {
                    Alert.error(element.message, {
                        position: 'bottom-left',
                        effect: 'genie',
                    })
                });
            }
        })
    }

    handleChangeSearch(e) {
        let value = e.target.value;
        let searched_products = [];
        this.state.products.map(product => {
            if (product.name.toLowerCase().includes(value.toLowerCase())) {
                searched_products.push(product);
            }
            return true;
        })
        if (searched_products.length > 0) {
            this.setState({
                searched_products: searched_products
            })
        } else {
            this.setState({
                searched_products: 'No se encontro el producto ingresado'
            })
        }

    }

    render() {
        return (
            <div>
                {/* Modale Delete */}
                <Dialog open={this.state.is_delete_modal_open} onClose={this.handleCloseDelete}>
                    <DialogTitle id="alert-dialog-slide-title center">¿Seguro que deseas eliminar este Producto?</DialogTitle>
                    {
                        !this.state.loading_delete ?
                            <DialogActions>
                                <Button onClick={this.handleCloseDelete} color="primary">Cancelar</Button>
                                <Button onClick={this.handleDelete} color="primary">Eliminar</Button>
                            </DialogActions>
                            :
                            <ClipLoader
                                css={[
                                    { display: 'flex' },
                                    { margin: '0 auto' },
                                    { marginBottom: 25 },
                                    { borderColor: 'var(--main_color)' }
                                ]}
                                size={35}
                                loading={this.state.loading_delete}
                            />
                    }
                </Dialog>
                {/* Modal Edit */}
                <Dialog open={this.state.is_edit_modal_open} onClose={this.handleCloseEdit}>
                    <DialogTitle id="alert-dialog-slide-title center">Editar Producto</DialogTitle>
                    {
                        !this.state.loading_delete ?
                            <form id="edit_product_form" action="" onSubmit={this.handleSubmitEdit} method="post">
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="product_name_input"
                                        name="editable_product_name"
                                        label="Nombre"
                                        type="text"
                                        fullWidth
                                        value={this.state.editable_product_name}
                                        onChange={this.handleChangeEdit}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="product_price_input"
                                        name="editable_product_price"
                                        label="Precio"
                                        type="numeric"
                                        fullWidth
                                        value={this.state.editable_product_price}
                                        onChange={this.handleChangeEdit}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="add_product_input_color"
                                        name="color"
                                        label="Color"
                                        fullWidth
                                        value={this.state.colorMarker}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <GithubPicker
                                        width='33%'
                                        onChangeComplete={(color) => this.handleColorChange(color)}
                                        colors={['#272727', '#FCCB00', '#008B02', '#1273DE', '#5300EB', '#CE3DC1', '#31E5CF']}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseEdit} color="primary">Cancelar</Button>
                                    <Button onClick={this.handleSubmitEdit} color="primary">Guardar</Button>
                                </DialogActions>
                            </form>
                            :
                            <ClipLoader
                                css={[
                                    { display: 'flex' },
                                    { margin: '0 auto' },
                                    { marginBottom: 25 },
                                    { borderColor: 'var(--main_color)' }
                                ]}
                                size={35}
                                loading={this.state.loading_delete}
                            />
                    }
                </Dialog>
                {/* Vista */}
                {
                    (this.state.products.is_loading === true) ?
                        (window.screen.width <= '600') ?
                            <ProductosSkeletonResponsive />
                            :
                            <ProductosSkeleton />
                        :
                        <Row md={12} className='center'>
                            <Col style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px' }} md={12} sm={12} xs={12}>
                                <input id="search_input" name="" placeholder="Buscar Producto por Nombre" type='text' onChange={this.handleChangeSearch} />
                            </Col>
                            <Col md={12} sm={12} xs={12}>
                                {
                                    (this.state.searched_products.length > 0 && typeof this.state.searched_products === 'string') ?
                                        <Row md={12} style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                            <Col md={12}>
                                                <p className='default_text'>No se encontro el producto ingresado!</p>
                                            </Col>
                                        </Row>
                                        : (this.state.searched_products.length > 0 && typeof this.state.searched_products === 'object') ?
                                            <RenderProductos products={this.state.searched_products} user_role={this.props.user.role} handleEditClick={this.handleEditClick.bind(this)} handleDeleteClick={this.handleDeleteClick.bind(this)} />
                                            : (this.state.products.length > 0) ?
                                                <RenderProductos products={this.state.products} user_role={this.props.user.role} handleEditClick={this.handleEditClick.bind(this)} handleDeleteClick={this.handleDeleteClick.bind(this)} />
                                                :
                                                <Row md={12} style={{ color: 'grey', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
                                                    <Col md={12}>
                                                        <p className='default_text'>No se encontraron productos creados!</p>
                                                    </Col>
                                                </Row>
                                }
                                {
                                    (this.props.user.role === 'admin') ?
                                        <ModalAddProducto handleSubmitModalAdd={this.handleSubmitModalAdd} />
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}

export default Productos;
