import React, { Component } from 'react';
import Grid from './grid'
import { Input } from 'antd'


class Member extends Component {



    componentDidMount() {
        console.log("componentDidMount");
    }


    render() {
        return (
            <div>
                aaa
                <div>
                    <Grid />
                </div>
            </div>
        );
    }
}

export default Member;