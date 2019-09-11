import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Spinner from '../Spinner/Spinner';

import { postVacancy } from '../../store/actions/companyActions';

const styles = theme => {
    return {
        textFields: {
            width: "100%",
            marginBottom: "10px"
        }
    }
}

class PostVacancy extends Component {
    state = {
        info: {
            type: "",
            experience: "",
            tools: "",
            salary: "",
            details: ""
        }
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
        const { auth, postVacancy } = this.props;
        const { info } = this.state
        const { uid } = auth
        postVacancy({uid, info})

    }


    render() {
        const { classes } = this.props
        console.log(this.state)

        if (this.props.company.blocked) {
            return (
                <div>
                    <div class="card text-center card-profile">
                        <div class="card-body">
                            <h5 class="card-title">You are blocked</h5>
                            <p class="card-text">Sorry</p>
                        </div>
                    </div>
                </div >
            )
        }
        else {
            const { type, experience, tools, salary, details } = this.state.info;
            return (
                <div className="card card-container card-signin">
                    <div className="card-body">
                        <h4 className="card-title">Enter Details</h4>


                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                className={classes.textFields}
                                label="Job Type"
                                onChange={this.handleChange}
                                name="type"
                                value={type}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Experience in Years"
                                onChange={this.handleChange}
                                name="experience"
                                value={experience}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Tools"
                                onChange={this.handleChange}
                                name="tools"
                                value={tools}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Salary in Rupees"
                                onChange={this.handleChange}
                                name="salary"
                                value={salary}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                className={classes.textFields}
                                label="Optional Details"
                                onChange={this.handleChange}
                                name="details"
                                value={details}
                            />
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </ValidatorForm>
                    </div>
                </div >
            )

        }

    }
}

const mapDispatchToProps = dispatch => {
    return {
        postVacancy: (payload) => dispatch(postVacancy(payload))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        company: state.company
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostVacancy));