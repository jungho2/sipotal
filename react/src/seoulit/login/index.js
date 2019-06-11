import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import LoginForm from 'seoulit/login/form';


const confirm = Modal.confirm;

console.log(confirm);

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginModal: false,
            userInfo: {}
        };
    }

    loginForm = () => {
        this.setState({
            loginModal: true,
        });
    }

    showConfirm = (thisT) => {
        confirm({
            title: '로그아웃 하시겠습니까?',
            content: 'Are you sure you want to sign out?',
            onOk() {
                sessionStorage.clear();
                thisT.props.logoutUser();
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }



    handleCloseModal = (data) => {
        this.setState({
            loginModal: false,
        });
        if (data !== undefined) {
            this.props.loginUser(data);
        }
    }

    render() {
        return (
            <div>
                {sessionStorage.getItem("id") === null ?
                    <Button onClick={this.loginForm}>
                        로그인
                </Button>
                    :
                    <Button onClick={() => this.showConfirm(this)}>
                        로그아웃
            </Button>
                }
                {this.state.loginModal ?
                    <LoginForm
                        onClose={this.handleCloseModal}
                    >
                    </LoginForm>
                    : ''}

            </div>

        );
    }
}

export default Login;