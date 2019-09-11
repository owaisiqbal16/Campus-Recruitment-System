import React, { Component } from 'react';
import { connect } from 'react-redux';

import { studentProfileFetch, blockProfile as studentBlockProfile } from '../../store/actions/studentActions';
import { companyProfileFetch, blockProfile as companyBlockProfile } from '../../store/actions/companyActions';



class BlockedProfile extends Component {

    componentDidMount() {
        const { studentProfileFetch, companyProfileFetch } = this.props
        studentProfileFetch('student')
        companyProfileFetch('company')

    }

    handleCompanyUnblock = (company) => {
        const { unblockCompanyProfile } = this.props
        console.log(company)
        unblockCompanyProfile(company)
    }

    handleStudentUnblock = (student) => {
        const { unblockStudentProfile } = this.props
        console.log(student)
        unblockStudentProfile(student)
    }

    render() {

        const { companies, students } = this.props

        console.log(students)
        let displayCompanyProfiles = '';
        if (companies.length >= 0) {
            displayCompanyProfiles = companies.map((company, index) => {
                console.log(company)
                if (company.blocked) {
                    return (
                        <div className="col-12">
                            <div className="card card-timeline">
                                <div className="card-body">
                                    <h5 className="card-title">{company.name}</h5>
                                    <p className="card-text">{company.bType}</p>
                                    <p className="card-text">{company.aboutMe}</p>
                                    <button className="btn btn-secondary" onClick={() => { this.handleCompanyUnblock(company) }}>Unblock</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            })
        }

        let displayStudentProfiles = '';
        if (students.length >= 0) {
            displayStudentProfiles = students.map((student, index) => {
                console.log(student)
                if (student.blocked) {
                    return (
                        <div className="col-12">
                            <div className="card card-timeline">
                                <div className="card-body">
                                    <h5 className="card-title">{student.name}</h5>
                                    <p className="card-text">{student.skills}</p>
                                    <p className="card-text">{student.aboutMe}</p>
                                    <button className="btn btn-secondary" onClick={() => { this.handleStudentUnblock(student) }}>Unblock</button>
                                </div>
                            </div>
                        </div>
                    )
                }

            })
        }
        return (
            <div className="container text-center">
                <div>
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Blocked Students</h5>
                            {displayStudentProfiles}
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Blocked Companies</h5>
                            {displayCompanyProfiles}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        studentProfileFetch: type => dispatch(studentProfileFetch(type)),
        unblockStudentProfile: profile => dispatch(studentBlockProfile(profile)),
        companyProfileFetch: type => dispatch(companyProfileFetch(type)),
        unblockCompanyProfile: profile => dispatch(companyBlockProfile(profile)),
    }
}

const mapStateToProps = state => {
    return {
        students: state.student.students,
        companies: state.company.companies,
        loader1:state.student.loading,
        loader2: state.company.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockedProfile);