import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class HanjaStatic extends React.Component {
    render(){
        return (
            <TableRow>
                <TableCell> {this.props.exmdtno} </TableCell>
                <TableCell> {this.props.mngid} </TableCell>
                <TableCell> {this.props.stuid} </TableCell>
                <TableCell> {this.props.totclsnm2} </TableCell>
                <TableCell> {this.props.hjdv} </TableCell>

                <TableCell> {this.props.totexmcnt} </TableCell>
                <TableCell> {this.props.snderrcnt} </TableCell>
                <TableCell> {this.props.hjerrcnt} </TableCell>
                <TableCell> {this.props.crrsndcnt} </TableCell>
                <TableCell> {this.props.crrhjcnt} </TableCell>
                <TableCell> {this.props.crrsndrto} </TableCell>

                <TableCell> {this.props.crrhjrto} </TableCell>
                <TableCell> {this.props.errsndrto} </TableCell>
                <TableCell> {this.props.errhjrto} </TableCell>
            </TableRow>

            
        )
    }
}

export default HanjaStatic;