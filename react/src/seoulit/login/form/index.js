import React, { Component } from 'react';
import { Button, Input, Icon } from 'antd';
import Axios from 'axios';
import '../../../App.css'

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            userPw: '',
        };

    }

    userId = e => {
        this.setState({
            userId: e.target.value,
        });
    }

    userPw = e => {
        this.setState({
            userPw: e.target.value,
        });
    }

    login = () => {

        const { onClose } = this.props;

        if (this.state.userId === '') {
            alert('아이디를 입력하세요');
        } else if (this.state.userPw === '') {
            alert('패스워드를 입력하세요');
        } else {
            const API_URL = 'http://localhost:8585/api/v1/empSearch';
            const param = {
                id: this.state.userId,
                pw: this.state.userPw
            };
            Axios.post(API_URL, param
            ).then(function (response) {
                if(response.data.result === "0"){
                    console.log('dddd',response.data);
                    alert('ID/PW 다시 확인해주세요');
                } else {
                    
                    window.sessionStorage.setItem('id', response.data.userInfo.EMP_NAME);
                    window.sessionStorage.setItem('pw', response.data.userInfo.EMP_CODE);

                    onClose(response.data);
                    
                }

                console.log(sessionStorage.getItem('id'));
            }).catch(function (error) {
                console.log(error);
            });
        }
    }


    render() {
        return (
            <div className="MyModal">
            <div className="content">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.userId}
              value={this.state.userId}
            />
            <br/><br/>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.userPw}
              value={this.state.userPw}
            />
            <br/><br/>
            <Button
            onClick = {this.login}
              >로그인</Button>
              <Button
              onClick = {() => this.props.onClose()}
              >닫기</Button>
            </div>
          </div>
        );
    }
}

export default LoginForm;