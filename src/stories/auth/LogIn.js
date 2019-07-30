import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
// import { validate } from '@babel/types';

class LogIn extends Component{
    state = {
        username: "",
        password: "",
        error: {
            cognito: null,
            blankfield: false
        }    
    };

    clearErrorState = () =>{
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    };

    handleSubmit = async event =>{
        event.preventDefault();

        this.clearErrorState();
        const error = Validate(event, this.state);
        if(error){
            this.setState({
                errors: {
                    ...this.state.errors, ...error
                }
            });
        }
        //AWS integration
    };

    onInputChange = event =>{
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    };

    render(){
        return(
            <section className = "section auth">
                <div className = "container">
                    <h1>Log in</h1>
                    <FormErrors formererrors = {this.state.errors} />
                    <form onSubmit = {this.handleSubmit}>
                        <div className = "field">
                            <p className = "control">
                                <input
                                    className = "input"
                                    type = "text"
                                    id = "username"
                                    aria-describedby = "usernameHelp"
                                    placeholder = "Enter username or email"
                                    value = { this.state.username }
                                    onChange = { this.onInputChange } 
                                />
                            </p>
                        </div>
                        <div className = "field">
                            <p className = "control has-icon-left">
                                <input
                                    className = "input"
                                    type = "password"
                                    id = "password"
                                    placeholder = "password"
                                    value = {this.state.password}
                                    onChange = {this.onInputChange}
                                />
                                <span className = "icon is-small is-left">
                                    <i className = "fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className = "field">
                            <p className = "control">
                                <a href = "/forgotpassword">Forgot password</a>
                            </p>
                        </div>
                        <div className = "field">
                            <p className = "control">
                                <button className = "button is-success">
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default LogIn;