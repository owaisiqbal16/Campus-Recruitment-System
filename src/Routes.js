import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//auth containers
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';

//Admin containers
import AdminProfile from './components/Admin/AdminProfile';
import BlockedProfiles from './components/Admin/BlockedProfiles';

//Student containers
import StudentProfile from './components/Student/StudentProfile';
import StudentTimeline from './components/Student/StudentTimeline';
import ViewCompany from './components/Student/View';

//Company Containers
import CompanyProfile from './components/Company/CompanyProfile';
import CompanyTimeline from './components/Company/CompanyTimeline';
import PostVacancy from './components/Company/PostVacancy';
import ViewStudent from './components/Company/View';

const MyRoutes = (status) => {

    let routes = (
        <Switch>
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Redirect to="signin" />
        </Switch>
    );

    //For admin
    if (status === 1) {
        routes = (<Switch>
            <Route path="/profile" exact component={AdminProfile} />
            <Route path="/blockedprofiles" exact component={BlockedProfiles} />
            <Route path="/studenttimeline" exact component={StudentTimeline} />
            <Route path="/companytimeline" exact component={CompanyTimeline} />
            <Route path="/viewstudent" exact component={ViewStudent} />
            <Route path="/viewcompany" exact component={ViewCompany} />
            <Redirect to="/profile" />
        </Switch >
        )
    }

    //For Student
    if (status === 2) {
        routes = (
            <Switch>
                <Route path="/studenttimeline" exact component={StudentTimeline} />
                <Route path="/profile" exact component={StudentProfile} />
                <Route path="/viewcompany" exact component={ViewCompany} />
                <Redirect to="/profile" />
            </Switch >
        )
    }

    //For Company
    if (status === 3) {
        routes = (
            <Switch>
                <Route path="/companytimeline" exact component={CompanyTimeline} />
                <Route path="/profile" exact component={CompanyProfile} />
                <Route path="/viewstudent" exact component={ViewStudent} />
                <Route path="/postvacancy" exact component={PostVacancy} />
                <Redirect to="/profile" />
            </Switch >
        )
    }
    return routes;
}

export default MyRoutes;