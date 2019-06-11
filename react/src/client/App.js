import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { home, member, login, professor, selectex, rating, grades, ratingView } from '../seoulit';
import Axios from 'axios';
import MenuBar from 'components/MenuBar';
import Login from 'seoulit/login';


import '../App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
            userAuth: [],
        };
        console.log("constructor", this);
    }

    componentWillMount() {

        console.log(this.state.userAuth.length);

        if (sessionStorage.getItem("id") !== null && this.state.userAuth.length === 0) {

            const API_URL = 'http://localhost:8585/api/v1/empSearch';
            const param = {
                id: sessionStorage.getItem('id'),
                pw: sessionStorage.getItem('pw'),
            };
            Axios.post(API_URL, param
            ).then(response => {
                this.setState({
                    userInfo: response.data.userInfo,
                    userAuth: response.data.auth,
                });


            }).catch(error => {
                console.log(error);
            });

        }


    }

    loginUser = (user) => {


        this.setState({
            userInfo: user.userInfo,
            userAuth: user.auth,
        });
    }

    logoutUser = () => {

        this.setState({
            userInfo: {},
            userAuth: [],
        });

        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <div className='div1'>
                    <div className='left'>
                        <MenuBar
                            userAuth={this.state.userAuth}
                            history={this.props.history}
                        >
                        </MenuBar>
                    </div>
                    <div className='right'>
                        <Login
                            loginUser={this.loginUser}
                            logoutUser={this.logoutUser}
                        >
                        </Login>
                    </div>

                </div>
                <div style={{position: "absolute",top:'50px' } }>
                    <Route exact path="/" component={home} />
                    <Route path="/login" component={login} />
                    <Route path="/member" component={sessionStorage.getItem("id") === null ? home : member} />
                    <Route path="/professor" component={sessionStorage.getItem("id") === null ? home : professor} />
                    <Route exact path="/selectex" component={sessionStorage.getItem("id") === null ? home : selectex} />
                    <Route path="/selectex/rating" component={sessionStorage.getItem("id") === null ? home : rating} />
                    <Route exact path="/grades" component={sessionStorage.getItem("id") === null ? home : grades} />
                    <Route path="/grades/ratingView" component={sessionStorage.getItem("id") === null ? home : ratingView} />
                </div>
            </div>
        );
    }
}

export default App;