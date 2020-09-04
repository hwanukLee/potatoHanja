import React from 'react';
import { post } from 'axios';
//import { colors } from '@material-ui/core';
//import { response } from 'express';

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
            //hjimg:'',
            file: null,
            fileName: ''
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
            fileName: ''
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

    render() {
        return (
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
        )
    }
};

export default HanjaAdd;