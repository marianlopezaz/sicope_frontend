import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddBox from '@material-ui/icons/AddBox';
import './ModalAddDays.scss'
import { DatePicker } from '@material-ui/pickers';
import { Row, Col } from 'react-bootstrap';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ModalAddDays(props) {
    let today = new Date();

    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [day, setDay] = React.useState(today);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDay(today);
    };

    const handleDateChange = (date) => {
        setDay(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let daySelected = day;
        daySelected = `${daySelected.getDate()}/${(daySelected.getMonth() + 1)}/${daySelected.getFullYear()}`;
        props.handleSubmitModalAddDay(daySelected)
        handleClose();
    }

    return (
        <div>
            <Dialog fullScreen={fullScreen} maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" className='center'>Nuevo Día</DialogTitle>
                <form id="add_day_form" action="" onSubmit={handleSubmit} method="post">
                    <DialogContent>
                        <Row>
                            <Col>
                            <DatePicker id="date_label"
                                variant="inline"
                                className='date_picker' 
                                value={day}
                                onChange={(date) => handleDateChange(date)}
                                format="dd/MM/yyyy"
                                disablePast
                                invalidDateMessage=""
                                required
                                label='Día'
                                PopoverProps={{
                                    anchorOrigin: { horizontal: "center", vertical: "center" },
                                    transformOrigin: { horizontal: "center", vertical: "center" }
                                  }}
                            />
                            </Col>
                        </Row>
                            
                    </DialogContent>
                    <DialogActions className='responsive_actions'>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button type='submit' color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            {
                (!open) ? 
                    <Fab icon={<AddBox />} mainButtonStyles={{
                        position: 'relative',
                        backgroundColor: 'var(--main_color)',
                        top: 0
                    }}
                        onClick={handleClickOpen}>
                        <Action id="modal_add_days_button_action" style={{
                            width: 130,
                            height: 30,
                            borderRadius: 0,
                            borderBottomLeftRadius: 30,
                            borderTopLeftRadius: 30,
                            position: 'relative',
                            top: 72,
                            backgroundColor: 'var(--main_color)',
                            right: 60
                        }}
                        >
                            <span>Agregar Día</span>
                        </Action>
                    </Fab>
                :
                    null
            }
        </div>
    );
}