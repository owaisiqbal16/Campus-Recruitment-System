import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { getUser, updateProfile, changeInput } from '../../store/actions/studentActions';
import Spinner from '../Spinner/Spinner';

import authValidations from '../auth/Validation';

const styles = theme => {
    return {
        textFields: {
            width: "100%",
            marginBottom: "10px"
        }
    }
}

class StudentProfile extends Component {
    state = {
        editMode: false,
        info: {
            name: "",
            institute: "",
            degree: "",
            age: "",
            cgpa: "",
            skills: "",
            aboutMe: ""
        }
    }


    componentDidMount() {
        const { getUser, auth } = this.props
        getUser(auth.uid)

        authValidations();

        // const info= {...this.props.info}
        // this.setState({info})

    }

    handleEdit = () => {
        const { student } = this.props;
        this.setState({ editMode: true, info: student })
    }
    handleCancel = () => {
        this.setState({ editMode: false })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        // this.props.onInputChange({ key: name, value })
        const info = { ...this.state.info }
        info[name] = value;
        this.setState({ info })
        console.log(info)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { auth, updateProfile, student } = this.props;
        const { info } = this.state
        const { uid } = auth

        const today = new Date()
        const myage = new Date(this.state.info.age)
        let diff = today.getFullYear() - myage.getFullYear()
        console.log(diff)
        if (diff < 18) {
            alert("you cant be in uni with this age")
        }
        else {
            const updatedStudent = { ...student, ...info }
            updateProfile(uid, updatedStudent)
            this.setState({ editMode: false })
        }
    }


    render() {
        const {classes} = this.props
        console.log(this.state)

        if (this.props.student.blocked) {
            return (
                <div>
                    <div className="card text-center card-profile">
                        <div className="card-body">
                            <h5 className="card-title">You are blocked</h5>
                            <p className="card-text">Sorry</p>
                        </div>
                    </div>
                </div >
            )
        }
        else {
            if (!this.state.editMode) {
                const { name, institute, degree, age, cgpa, skills, aboutMe, loading } = this.props.student;

                if (loading) {
                    return (
                        <div className="container text-center" style={{ marginTop: "200px" }}>
                            <Spinner />
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <div className="card text-center card-profile">
                                <div className="card-body">
                                    <h5 className="card-title">Name : {name}</h5>
                                    <p className="card-text">Institute : {institute}</p>
                                    <p className="card-text">Degree : {degree}</p>
                                    <p className="card-text">CGPA : {cgpa}</p>
                                    <p className="card-text">Date of Birth : {age}</p>
                                    <p className="card-text">Expertise : {skills}</p>
                                    <p className="card-text">About Me : {aboutMe}</p>
                                    <a href="#" className="btn btn-primary" onClick={this.handleEdit}>Edit</a>
                                </div>
                            </div>
                        </div >
                    )
                }
            }
            else {
                const { name, institute, degree, age, cgpa, skills, aboutMe } = this.state.info;
                return (
                    <div className="card card-container">
                        <div className="card-body">

                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit}
                                onError={errors => console.log(errors)}
                            >
                                <TextValidator
                                    className={classes.textFields}
                                    label="Name"
                                    onChange={this.handleChange}
                                    name="name"
                                    value={name}
                                    validators={['required', 'isNameLongEnough','LimitName']}
                                    errorMessages={['this field is required', 'Name is too short','Too Long']}
                                />
                                <TextValidator
                                    className={classes.textFields}
                                    label="Institute"
                                    onChange={this.handleChange}
                                    name="institute"
                                    value={institute}
                                    validators={['required', 'isNameLongEnough','LimitName']}
                                    errorMessages={['this field is required', 'Institute Name is too short','Too Long']}
                                />
                                <TextValidator
                                    className={classes.textFields}
                                    label="Degree"
                                    onChange={this.handleChange}
                                    name="degree"
                                    value={degree}
                                    validators={['required','LimitName']}
                                    errorMessages={['this field is required','Too Long']}
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
                                    errorMessages={['this field is required', "You can't be in University with this age"]}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextValidator
                                    className={classes.textFields}
                                    label="About Me"
                                    onChange={this.handleChange}
                                    name="aboutMe"
                                    value={aboutMe}
                                />
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                            </ValidatorForm>
                        </div>
                    </div >
                )
            }

        }

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: uid => dispatch(getUser(uid)),
        updateProfile: (uid, payload) => dispatch(updateProfile(uid, payload)),
        onInputChange: payload => dispatch(changeInput(payload))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        student: state.student
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentProfile));