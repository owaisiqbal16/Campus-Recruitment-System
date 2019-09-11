import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../Spinner/Spinner';

import { changeInput } from '../../store/actions/authActions';
import { signin } from '../../store/actions/authActions';


class SignIn extends Component {

    handleChange = event => {
        const { name, value } = event.target
        this.props.onInputChange({ key: name, value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.props.auth;
        const { history } = this.props
        console.log(email, password)
        this.props.onSignIn({ email, password, history })
    }

    render() {
        const { auth } = this.props
        const { email, password, error, loading } = auth;
        // console.log(email, password)

        let errorMessage = ""
        if (error) {
            errorMessage = (
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
                <button type="submit" className="btn btn-primary">Login</button>
            )
        }

        return (
            <div className="card card-container card-signin">
                <div className="card-body">
                    <h4 className="card-title">SIGN IN</h4>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {/* <label>Email address</label> */}
                            <input type="email" name="email" className="form-control" onChange={this.handleChange} placeholder="Enter email" value={email} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" onChange={this.handleChange} placeholder="Password" value={password} />
                        </div>
                        {errorMessage}
                        {Button}
                        <p>Do you have any account? </p> <Link to="/signup">SignUp</Link>
                    </form>
                </div>
            </div>
        )
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
        onSignIn: (payload) => dispatch(signin(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);