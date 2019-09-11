import React, { Component } from 'react';
import { connect } from 'react-redux';


class AdminProfile extends Component {

    handleCompanies = () => {
        this.props.history.replace('/studenttimeline')
    }
    
    handleStudents = () => {
        this.props.history.replace('/companytimeline')
    }
    
    handleBlocks = () => {
        this.props.history.replace('/blockedprofiles')
    }

    render() {

        return (
            <div className="container row text-center">
                <div className="col-12">
                <br></br> <br></br>
                    <h3 className="display-4">Admin Panel</h3>
                </div>
                <div className='col-12'>
                    <button className="btn btn-primary adminButton" onClick={this.handleCompanies}>Companies</button>
                </div>
                <div className='col-12'>
                    <button className="btn btn-primary adminButton" onClick={this.handleStudents}>Students</button>
                </div>
                <div className='col-12'>
                    <button className="btn btn-primary adminButton2" onClick={this.handleBlocks}>Blocked Profiles</button>
                </div>
            </div>
        )
    }
}
export default AdminProfile;