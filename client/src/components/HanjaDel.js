import React from 'react';

class HanjaDel extends React.Component {

    deleteHanja(hjno) {
        const url = '/api/hanjas/'+ hjno;
        fetch(url, { method: 'DELETE' });
        this.props.stateRefresh();
    }

    render () {
        return (
            <div>
                <button onClick={(e) => {this.deleteHanja(this.props.hjno)} }>삭제</button>
            </div>
        )
    }
}

export default HanjaDel;