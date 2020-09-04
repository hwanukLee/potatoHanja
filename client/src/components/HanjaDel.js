import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class HanjaDel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteHanja(hjno) {
        const url = '/api/hanjas/'+ hjno;
        fetch(url, { method: 'DELETE' });
        this.props.stateRefresh();
    }

    render () {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}> 삭제 </Button>
                <Dialog open={this.state.open} close={this.handleClose}>
                    <DialogTitle onClose={this.handleClose} >
                        삭제경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 한자정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=> {this.deleteHanja(this.props.hjno)} }>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>삭제</Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}

export default HanjaDel;