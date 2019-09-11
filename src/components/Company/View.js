import React, { Component } from 'react';

import { connect } from 'react-redux';

class View extends Component {

    handleBack = () => {
        this.props.history.replace('/companytimeline')
    }

    render() {
        console.log(this.props.selectedProfile)
        const { name, institute, degree, cgpa, age, skills, aboutMe } = this.props.selectedProfile;

        return (
            <div>
                <div class="card text-center card-profile">
                    <div className="card-body">
                        <h5 className="card-title">Name : {name}</h5>
                        <p className="card-text">Institute : {institute}</p>
                        <p className="card-text">Degree : {degree}</p>
                        <p className="card-text">CGPA : {cgpa}</p>
                        <p className="card-text">Date of Birth : {age}</p>
                        <p className="card-text">Expertise : {skills}</p>
                        <p className="card-text">About Me : {aboutMe}</p>
                        <a href="#" class="btn btn-primary" onClick={this.handleBack}>Back</a>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedProfile: state.student.selectedProfile
    }
}

export default connect(mapStateToProps)(View);