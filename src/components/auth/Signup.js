import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Spinner from '../Spinner/Spinner';

import { signup } from '../../store/actions/authActions';
import { changeInput } from '../../store/actions/authActions';

import authValidations from './Validation';

const styles = theme => {
    return {
        textFields: {
            width: "100%",
            marginBottom: "10px"
        }
    }
}

class SignUp extends Component {

    componentDidMount() {
        authValidations();

        ValidatorForm.addValidationRule('doPasswordsMatch', value => {
            if (value !== this.props.auth.password) return false;
            return true;
        })
    }

    handleChange = event => {
        const { name, value } = event.target

        this.props.onInputChange({ key: name, value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { type, email, password, confPassword, name, institute, degree, age, cgpa, skills, cell, bType, address } = this.props.auth
        const { history } = this.props;
        console.log(type, email, password, confPassword, name, institute, degree, age, cgpa, skills, cell, bType, address)

        const today = new Date()
        const myage = new Date(this.props.auth.age)
        let diff = today.getFullYear() - myage.getFullYear()
        console.log(diff)
        if (diff < 18) {
            alert("you cant be in uni with this age")
        }
        else {
            this.props.onSignUp({ type, email, password, confPassword, name, institute, degree, age, cgpa, skills, cell, bType, address, history })
        }

    }

    render() {

        const { classes, auth } = this.props
        const { type, email, password, confPassword, name, institute, degree, age, cgpa, skills, cell, bType, address, error, loading } = auth;
        let errormessage = ""
        if (error) {
            errormessage = (
                <div className="" >
                    <p className="text-left" style={{ fontSize: "14px", color: "red" }}>{error}</p>
                </div>
            )
        }

        let Button = ""
        if (loading) {
            Button = (
                <Spinner />
            )
        }
        else {
            Button = (
                <button type="submit" className="btn btn-primary">Register</button>
            )
        }

        if (type === "student") {
            return (
                <div className="card card-container card-signin">
                    <div className="card-body">
                        <h4 className="card-title">REGISTER</h4>


                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Create Account As</label>
                                <select className="form-control" name="type" id="type" value={type} onChange={this.handleChange}>
                                    <option value="student">Student</option>
                                    <option value="company">Company</option>
                                </select>
                            </div>

                            <TextValidator
                                className={classes.textFields}
                                label="Name"
                                onChange={this.handleChange}
                                name="name"
                                value={name}
                                validators={['required','isNameLongEnough']}
                                errorMessages={['this field is required', 'Name is too short']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                            {errormessage}
                            <TextValidator
                                className={classes.textFields}
                                label="Institute"
                                onChange={this.handleChange}
                                name="institute"
                                value={institute}
                                validators={['required', 'isNameLongEnough']}
                                errorMessages={['this field is required', 'Institute Name is too short']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Degree"
                                onChange={this.handleChange}
                                name="degree"
                                value={degree}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Current CGPA"
                                onChange={this.handleChange}
                                name="cgpa"
                                value={cgpa}
                                validators={['required', 'isGpaValid']}
                                errorMessages={['this field is required', 'Invalid GPA']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Your Expertise"
                                onChange={this.handleChange}
                                name="skills"
                                value={skills}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                className={classes.textFields}
                                onChange={this.handleChange}
                                label="Date of Birth"
                                type="date"
                                name="age"
                                value={age}
                                validators={['required', 'isAgeValid']}
                                errorMessages={['this field is required', 'You cant be in University with this age']}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Password"
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required', 'isPasswordLongEnough']}
                                errorMessages={['this field is required', 'Password must be atleast 6 characters long']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Confirm Password"
                                onChange={this.handleChange}
                                name="confPassword"
                                type="password"
                                value={confPassword}
                                validators={['required', 'doPasswordsMatch']}
                                errorMessages={['this field is required', 'Passwords doesnt match']}
                            />
                            {Button}
                        </ValidatorForm>

                        <p>Don't have any account? <Link to="/signin">Sign In</Link></p>
                    </div>
                </div >
            )
        }
        else if (type === 'company') {
            return (
                <div className="card card-container card-signin">
                    <div className="card-body">
                        <h4 className="card-title">REGISTER</h4>


                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >

                            <div class="form-group">
                                <label htmlFor="exampleFormControlSelect1">Create Account As</label>
                                <select className="form-control" name="type" id="type" value={type} onChange={this.handleChange}>
                                    <option value="student">Student</option>
                                    <option value="company">Company</option>
                                </select>
                            </div>

                            <TextValidator
                                className={classes.textFields}
                                label="Name"
                                onChange={this.handleChange}
                                name="name"
                                value={name}
                                validators={['required', 'isNameLongEnough', 'LimitName']}
                                errorMessages={['this field is required', 'Name is too short', 'Too Long']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                            {errormessage}
                            <TextValidator
                                className={classes.textFields}
                                label="Business Type"
                                onChange={this.handleChange}
                                name="bType"
                                value={bType}
                                validators={['required', 'LimitName']}
                                errorMessages={['this field is required',]}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Address"
                                onChange={this.handleChange}
                                name="address"
                                value={address}
                                validators={['required', 'isAddressLongEnough']}
                                errorMessages={['this field is required', 'Address is too short']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Phone Number"
                                onChange={this.handleChange}
                                name="cell"
                                value={cell}
                                validators={['required', 'isPhoneNoLongEnough']}
                                errorMessages={['this field is required', 'Invalid Phone Number']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Password"
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                value={password}
                                validators={['required', 'isPasswordLongEnough']}
                                errorMessages={['this field is required', 'Password must be atleast 6 characters long']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Confirm Password"
                                onChange={this.handleChange}
                                name="confPassword"
                                type="password"
                                value={confPassword}
                                validators={['required', 'doPasswordsMatch']}
                                errorMessages={['this field is required', "Passwords doesn't match"]}
                            />

                            {Button}
                        </ValidatorForm>

                        <p>Don't have any account? <Link to="/signin">Sign In</Link></p>
                    </div>
                </div >
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: input => dispatch(changeInput(input)),
        onSignUp: payload => dispatch(signup(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));