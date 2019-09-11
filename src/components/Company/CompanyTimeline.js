import React, { Component } from 'react';
import { connect } from 'react-redux';
import { studentProfileFetch, selectedProfile, blockProfile } from '../../store/actions/studentActions';

import Spinner from '../Spinner/Spinner';

class CompanyTimeline extends Component {

    componentDidMount() {
        this.props.studentProfileFetch('student')
    }

    handleView = (student) => {
        console.log(student)
        const { selectedProfile } = this.props
        selectedProfile(student)
        this.props.history.replace('/viewstudent')
    }

    handleBlock = (student) => {
        const { blockProfile } = this.props
        console.log(student)
        blockProfile(student)
        this.props.history.replace('/blockedprofiles')
    }

    render() {
        let loading = this.props.loading
        if (loading) {
            return (
                <div className="container text-center" style={{ marginTop: "200px" }}>
                    <Spinner />
                </div>
            )
        }
        else {
            if (this.props.company.blocked && this.props.auth.status !== 1) {
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
                const { auth, students } = this.props
                let displayProfiles = '';
                if (students.length >= 1) {
                    displayProfiles = students.map((student, index) => {
                        console.log(student)
                        if (!student.blocked) {
                            return (
                                <div className="col-md-6" key={student.uid}>
                                    <div className="card card-timeline">
                                        <div className="card-body">
                                            <h5 className="card-title">{student.name}</h5>
                                            <p className="card-text">{student.skills}</p>
                                            <p className="card-text">{student.aboutMe}</p>
                                            <button href="#" class="btn btn-primary" onClick={() => { this.handleView(student) }}>View</button>
                                            {(auth.status == 1) ? (<button className="btn btn-secondary" onClick={() => { this.handleBlock(student) }}>Block</button>) : ""}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                else if (students.length === 0) {
                    displayProfiles = (
                        <div className="col-12" >
                            <div class="card card-timeline">
                                <div class="card-body">
                                    <h5 class="card-title">No Students to show</h5>
                                </div>
                            </div>
                        </div>

                    )
                }
                return (
                    <div className="container">
                        <div className="row">
                            {displayProfiles}
                        </div>
                    </div>
                )
            }
        }

    }
}

const mapDispatchToProps = dispatch => {
    return {
        studentProfileFetch: type => dispatch(studentProfileFetch(type)),
        selectedProfile: profile => dispatch(selectedProfile(profile)),
        blockProfile: profile => dispatch(blockProfile(profile))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        students: state.student.students,
        loading : state.student.loading,
        company: state.company
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTimeline);