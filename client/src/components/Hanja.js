import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import HanjaDel from './HanjaDel';

class Hanja extends React.Component {
    render(){
        return (
            <TableRow>
                {/* <TableCell> {this.props.no} </TableCell>
                <TableCell> <img src={this.props.image} alt="" /> </TableCell> */}
                {/* <TableCell> {this.props.hjdv} </TableCell>
                <TableCell> {this.props.hjno} </TableCell> */}
                <TableCell> <h2>{this.props.wdhj}</h2> </TableCell>
                <TableCell> {this.props.snd} </TableCell>
                <TableCell> {this.props.msnd2} </TableCell>
                {/* <TableCell> {this.props.clscd} </TableCell> */}
                <TableCell> {this.props.totclsnm2} </TableCell>
                {/* <TableCell> {this.props.clsnm2} </TableCell> */}
                <TableCell> {this.props.rdc} </TableCell>
                <TableCell> {this.props.hjcnt} </TableCell>
                <TableCell> {this.props.tothjcnt} </TableCell>
                <TableCell> <HanjaDel stateRefresh={this.props.stateRefresh} hjno={this.props.hjno} /> </TableCell>
            </TableRow>

            
        )
    }
}

export default Hanja;