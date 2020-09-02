import React, { Component } from 'react';
import './App.css';
import Hanja from './components/Hanja';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})



class App extends Component {

  state = {
    hanjas: "",
    completed: 0
  }
  
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({hanjas: res}))
      .catch(err => console.log(err)); 
  }
  
  callApi = async () => {
    const response = await fetch('/api/hanjas');
    const body = await response.json();
    return body;
  
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed+1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell> ID </TableCell>
              <TableCell> 이미지 </TableCell> */}

              <TableCell> 구분 </TableCell>
              <TableCell> 번호 </TableCell>
              <TableCell> 한자 </TableCell>
              <TableCell> 음 </TableCell>
              <TableCell> 훈음2 </TableCell>

              <TableCell> 급수코드 </TableCell>
              <TableCell> 급수명1 </TableCell>
              <TableCell> 급수명2 </TableCell>
              <TableCell> 부수 </TableCell>
              <TableCell> 획수 </TableCell>
              <TableCell> 총획수 </TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
                    
          {this.state.hanjas ? this.state.hanjas.map(c => {
            return ( <Hanja 
                      // key={c.no} 
                       //id={c.no} 
                       //image={c.image} 
                       dv={c.dv} no={c.no} wdhj={c.wdhj} snd={c.snd} msnd2={c.msnd2} 
                       clscd={c.clscd} totclsnm2={c.totclsnm2} clsnm2={c.clsnm2} rdc={c.rdc} hjcnt={c.hjcnt} 
                       tothjcnt={c.tothjcnt} /> ); }) 
          : 
          <TableRow>
            <TableCell colSpan="13" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
            </TableCell>
          </TableRow>
          }
          </TableBody>
        </Table>
      
      </Paper>
    )
  };
}

export default withStyles(styles)(App);
