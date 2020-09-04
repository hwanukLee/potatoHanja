import React from 'react';
import { post } from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class HanjaAdd extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            hjdv:'', 
            hjno:'', 
            wdhj:'', 
            snd:'', 
            clscd:'', 
            dsc:'',
            file: null,
            fileName: '',
            open: false
        }
    }

    handleValueChange = (e) => {
        let nextState={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value 
        })
    }

    handleFormSubmit =(e) => {
        e.preventDefault()
        this.addHanja()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //비동기 방식으로 호출하므로 데이타 추가 후 Refresh되려면 여기 위치해야함.
            })
        this.setState({
            hjdv:'', 
            hjno:'', 
            wdhj:'', 
            snd:'', 
            clscd:'', 
            dsc:'',
            //hjimg:'',
            file: null,
            fileName: '',
            open: false
        })
        //window.location.reload();
        //this.props.stateRefresh();
    }

    addHanja = () => {
        const url='/api/hanjas';
        const formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('hjdv', this.state.hjdv);
        formData.append('hjno', this.state.hjno);
        formData.append('wdhj', this.state.wdhj);
        formData.append('snd', this.state.snd);
        formData.append('clscd', this.state.clscd);
        formData.append('dsc', this.state.dsc);

        // File 포함 되어 있는 경우 설정해야함. 이런 헤더를 붙여서 서버로 날려줘야함.
        const config ={
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        //axios에 포함되어 있는 post library에 url 포함시켜야함.
        return post(url,formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            hjdv:'', 
            hjno:'', 
            wdhj:'', 
            snd:'', 
            clscd:'', 
            dsc:'',
            file: null,
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    한자추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>한자추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/" id="raised-button-file" type='file' 
                               //name="file" 
                               file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
                        <label htmlFor="raised-button-file" >
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "한자이미지선택" : this.state.fileName}
                            </Button>
                        </label> <br/>
                        {/* 한자구문: 한자번호: 한자: 한자음: 급수코드: 한자설명: */}
                        <TextField label="한자구문" type="text" name="hjdv" value={this.state.hjdv} onChange={this.handleValueChange} /> <br/>
                        <TextField label="한자번호" type="text" name="hjno" value={this.state.hjno} onChange={this.handleValueChange} /> <br/>
                        <TextField label="한자" type="text" name="wdhj" value={this.state.wdhj} onChange={this.handleValueChange} /> <br/>
                        <TextField label="한자음" type="text" name="snd" value={this.state.snd} onChange={this.handleValueChange} /> <br/>
                        <TextField label="급수코드" type="text" name="clscd" value={this.state.clscd} onChange={this.handleValueChange} /> <br/>
                        <TextField label="한자설명" type="text" name="dsc" value={this.state.dsc} onChange={this.handleValueChange} /> <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>

            /* 
            <form onSubmit = {this.handleFormSubmit}>
                <h1>한자추가</h1>
                한자이미지: <input type='file' name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br />
                한자구문: <input type="text" name="hjdv" value={this.state.hjdv} onChange={this.handleValueChange} /> <br/>
                한자번호: <input type="text" name="hjno" value={this.state.hjno} onChange={this.handleValueChange} /> <br/>
                한자: <input type="text" name="wdhj" value={this.state.wdhj} onChange={this.handleValueChange} /> <br/>
                한자음: <input type="text" name="snd" value={this.state.snd} onChange={this.handleValueChange} /> <br/>
                급수코드: <input type="text" name="clscd" value={this.state.clscd} onChange={this.handleValueChange} /> <br/>
                한자설명: <input type="text" name="dsc" value={this.state.dsc} onChange={this.handleValueChange} /> <br/>
                <button type="submit">추가하기</button>
            </form>
             */
        )
    }
};

export default withStyles(styles)(HanjaAdd);