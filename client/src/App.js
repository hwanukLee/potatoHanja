import React, { Component } from 'react';
import './App.css';
import Hanja from './components/Hanja';
import HanjaAdd from './components/HanjaAdd';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class App extends Component {

  /* state ={
    hanjas: '',
    completed: 0,
    searchKeyword: ''
  } */

   constructor(props) {
    super(props);
    this.state = {
      hanjas: '',
      completed: 0,
      searchKeyword: ''
    }
  }


  stateRefresh = () => {
    this.setState({
      hanjas: '',
      completed: 0,
      searchKeyword: ''
    });
    //한자 데이타 호출
    this.callApi()
      .then(res => this.setState({hanjas: res}))
      .catch(err => console.log(err)); 
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


  handleValueChange = (e) => {
    let nextState ={};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.snd.indexOf(this.state.searchKeyword) > -1;
      });

      return data.map((c) => {
        return <Hanja 
                stateRefresh={this.stateRefresh}
                key={c.hjno}
                //hjdv={c.hjdv} hjno={c.hjno}                 
                wdhj={c.wdhj} snd={c.snd} msnd2={c.msnd2} 
                //clscd={c.clscd} 
                totclsnm2={c.totclsnm2} 
                //clsnm2={c.clsnm2} 
                rdc={c.rdc} 
                hjcnt={c.hjcnt} 
                tothjcnt={c.tothjcnt} 
                /> 
      });
    }

    //const cellList =["구분","번호","한자","음","훈음2","급수코드","급수명1","급수명2","부수","획수","총획수","설정"];
    //const cellList =["한자","음","훈음2","급수코드","급수명1","급수명2","부수","획수","총획수","설정"];
    const cellList =["한자","음","훈음",
    //"급수코드",
    "급수",
    //"급수명2",
    "부수","획수","총획수","설정"];
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            포테이토 한자
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="음으로 검색"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name = "searchKeyword"
              value = {this.state.searchKeyword}
              onChange={this.handleValueChange}

              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.menu}>
        {/* 한자추가 props 형태로 */}
        <HanjaAdd stateRefresh={this.stateRefresh} />
      </div>

        <Paper className={classes.paper} >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}> {c} </TableCell>
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.hanjas ? 
              filteredComponents(this.state.hanjas)
              /* this.state.hanjas.map(c => {
              return ( <Hanja 
                        // key={c.no} 
                        //id={c.no} 
                        //image={c.image} 
                        dv={c.dv} no={c.no} wdhj={c.wdhj} snd={c.snd} msnd2={c.msnd2} 
                        clscd={c.clscd} totclsnm2={c.totclsnm2} clsnm2={c.clsnm2} rdc={c.rdc} hjcnt={c.hjcnt} 
                        tothjcnt={c.tothjcnt} /> ); })  */
            : 
            <TableRow>
              <TableCell colSpan="9" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);
