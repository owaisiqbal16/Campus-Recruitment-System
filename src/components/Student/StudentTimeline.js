import React, { Component } from 'react';
import { connect } from 'react-redux';
import { companyProfileFetch, selectedProfile, blockProfile } from '../../store/actions/companyActions';

import Spinner from '../Spinner/Spinner';


class StudentTimeline extends Component {

    componentDidMount() {
        this.props.companyProfileFetch('company')
    }

    handleView = (company) => {
        console.log(company)
        const { selectedProfile } = this.props
        selectedProfile(company)
        this.props.history.replace('/viewcompany')
    }

    handleBlock = (company) => {
        const { blockProfile } = this.props
        console.log(company)
        blockProfile(company)
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
            if (this.props.student.blocked && this.props.auth.status !== 1) {
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
                const { auth, companies } = this.props
                let displayProfiles = '';
                if (companies.length >= 1) {
                    displayProfiles = companies.map((company, index) => {
                        console.log(company)
                        if (!company.blocked) {
                            return (
                                <div className="col-md-6" key={company.uid}>
                                    <div class="card card-timeline">
                                        <div class="card-body">
                                            <h5 class="card-title">{company.name}</h5>
                                            <p class="card-text">{company.bType}</p>
                                            <p class="card-text">{company.aboutMe}</p>
                                            <button className="btn btn-primary" onClick={() => { this.handleView(company) }}>View</button>
                                            {(auth.status == 1) ? (<button className="btn btn-secondary" onClick={() => { this.handleBlock(company) }}>Block</button>) : ""}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                else if (companies.length === 0) {
                    displayProfiles = (
                        <div className="col-12" >
                            <div class="card card-timeline">
                                <div class="card-body">
                                    <h5 class="card-title">No Companies to show</h5>
                                </div>
                            </div>
                        </div>

                    )
                }
                return (
                    <div className="container text-center">
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
        companyProfileFetch: type => dispatch(companyProfileFetch(type)),
        selectedProfile: profile => dispatch(selectedProfile(profile)),
        blockProfile: profile => dispatch(blockProfile(profile))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        companies: state.company.companies,
        loading: state.company.loading,
        student: state.student
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentTimeline);