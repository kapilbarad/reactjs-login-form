import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false // indicates submit status of login form 
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let formData = this.state.formData;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    getValidationState = (field) => {

        let state = null;

        if (this.state.formSubmitted) {

            if (this.state.errors[field]) {
                state = 'error';
            } else {
                state = 'success';
            }

        }

        return state;
    }

    login = (e) => {
        e.preventDefault();

        let errors = {};

        if (isEmpty(this.state.formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(this.state.formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(this.state.formData.password)) {
            errors.password = "Password can't be blank";
        }  else if (isContainWhiteSpace(this.state.formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(this.state.formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }
        
        if (!isEmpty(errors)) {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        } else {
            alert("You are successfully signed in...");
            window.location.reload()
        }
    }

    render() {
        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={this.getValidationState('email')}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { this.state.errors.email && 
                            <HelpBlock>{this.state.errors.email}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={this.getValidationState('password')}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { this.state.errors.password && 
                            <HelpBlock>{this.state.errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;