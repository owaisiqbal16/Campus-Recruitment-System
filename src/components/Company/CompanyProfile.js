import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Spinner from '../Spinner/Spinner';

import { getUser, updateProfile, changeInput } from '../../store/actions/companyActions';

const styles = theme => {
    return {
        textFields: {
            width: "100%",
            marginBottom: "10px"
        }
    }
}

class CompanyProfile extends Component {
    state = {
        editMode: false,
        info: {
            name: "",
            address: "",
            cell: "",
            bType: "",
            aboutMe: "",
        }
    }


    componentDidMount() {
        const { getUser, auth } = this.props
        getUser(auth.uid)

        // const info= {...this.props.info}
        // this.setState({info})

    }

    handleEdit = () => {
        const { company } = this.props;
        this.setState({ editMode: true, info: company })
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
        const { auth, updateProfile, company } = this.props;
        const { info } = this.state
        const { uid } = auth
        const updatedCompany = { ...company, ...info }
        updateProfile(uid, updatedCompany)
        this.setState({ editMode: false })

    }


    render() {
        const {classes} = this.props
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
            if (!this.state.editMode) {
                const { name, address, cell, bType, aboutMe, loading } = this.props.company;
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
                                    <p className="card-text">Business Type : {bType}</p>
                                    <p className="card-text">Phone Number : {cell}</p>
                                    <p className="card-text">Address : {address}</p>
                                    <p className="card-text">About Us : {aboutMe}</p>
                                    <a href="#" className="btn btn-primary" onClick={this.handleEdit}>Edit</a>
                                </div>
                            </div>
                        </div >
                    )
                }
            }
            else {
                const { name, address, cell, bType, aboutMe } = this.state.info;
                return (
                    <div className="card card-container card-signin">
                        <div className="card-body">
                            <h4 className="card-title">REGISTER</h4>


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
                                    label="Business Type"
                                    onChange={this.handleChange}
                                    name="bType"
                                    value={bType}
                                    validators={['required','LimitName']}
                                    errorMessages={['this field is required','Too Long']}
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
                                    label="About Me"
                                    onChange={this.handleChange}
                                    name="aboutMe"
                                    value={aboutMe}
                                />
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button class="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
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
        company: state.company
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CompanyProfile));