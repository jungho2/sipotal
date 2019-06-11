import React, { Component } from 'react';
import { Input } from 'antd';

class Professor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aa: '',
        };

    }

    test = e => {

        this.setState({
            aa: e.target.value,
        });
    }

    render() {
        return (
            <div>
                <Input
                onChange={this.test}
                value={this.state.aa}
                />
            </div>
        );
    }
}

export default Professor;