import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {withRouter} from 'react-router-dom';

import { connect } from 'react-redux';

import {signOut} from '../../store/actions/authActions';


class Navbar extends Component {
    render() {
        const { status } = this.props;

        //not signed in
        if (!status) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Campus Recuitment</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Register <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Login <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }

        //admin
        else if (status === 1) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Campus Recuitment</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/studenttimeline">Companies <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/companytimeline">Students <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blockedprofiles">Blocked Profiles <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={()=>{this.props.signOut()}}>Logout <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }

        //student
        else if (status === 2) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Campus Recuitment</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/studenttimeline">Companies <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <a href="#"  className="nav-link" onClick={()=>{this.props.signOut()}}>Logout <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }

        //company
        else if (status === 3) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Campus Recuitment</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/postvacancy">Post Vacancy <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/companytimeline">Students <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <a href="#"  className="nav-link" onClick={()=>{this.props.signOut()}}>Logout <span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        status: state.auth.status
    }
}

export default connect(mapStateToProps , {signOut})(withRouter (Navbar));