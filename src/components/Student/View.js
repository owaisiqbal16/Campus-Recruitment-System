import React, { Component } from 'react';
import { connect } from 'react-redux';

class View extends Component {
    
    handleBack = () => {
        this.props.history.replace('/studenttimeline')
    }

    render() {
        console.log(this.props.selectedProfile)
        const { name, address, cell, bType, aboutMe } = this.props.selectedProfile;

        return (
            <div>
                <div className="card text-center card-profile">
                    <div className="card-body">
                        <h5 className="card-title">Name : {name}</h5>
                        <p className="card-text">Business Type : {bType}</p>
                        <p className="card-text">Phone Number : {cell}</p>
                        <p className="card-text">Address : {address}</p>
                        <p className="card-text">About Us : {aboutMe}</p>
                        <a href="#" className="btn btn-primary" onClick={this.handleBack}>Back</a>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedProfile: state.company.selectedProfile
    }
}

export default connect(mapStateToProps)(View);