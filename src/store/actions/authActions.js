import * as actionTypes from '../Types';
import { auth, database } from 'firebase';

export const changeInput = text => {
    return {
        type: actionTypes.CHANGE_INPUT,
        payload: text
    }
}

export const checkLoggedIn = (user, history) => dispatch => {
    const { uid, type, status } = user;
    loginUserSuccess(dispatch, uid, '', status, type);
    // history.replace("/profile")
    console.log("user signed in " + user)
}

export const signup = (payload) => {
    return (dispatch) => {
        const { type, email, password, name, institute, degree, age, cgpa, skills, cell, bType, address, history } = payload
        console.log(history);
        let newUser = {}
        if (type === "student") {
            newUser = { name, email, institute, degree, age, cgpa, skills }
        }
        else if (type === "company") {
            newUser = { name, email, cell, address, bType }
        }
        dispatch({
            type: actionTypes.USER_LOADING
        })
        auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const uid = res.user.uid;
                newUser = { ...newUser, uid, blocked: false }
                database()
                    .ref(`${type}/${uid}`)
                    .set(newUser)
                    .then(res => {
                        const status = (type === "student") ? 2 : 3;
                        loginUserSuccess(dispatch, uid, name, status, type);
                        history.replace("/profile")
                    })

            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: actionTypes.SIGNUP_FAILED,
                    payload: err.message
                })
            })
    }
}

export const signin = (payload) => (dispatch) => {
    const { email, password, history } = payload
    dispatch({
        type: actionTypes.USER_LOADING
    });
    auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const uid = res.user.uid;

            if (uid === 'zO8R9llVMDNjSpdFqfzm4oyvTk42') {
                database()
                let status = 1;
                let type = 1;
                loginUserSuccess(dispatch, uid, '', status, type)
                history.replace('/profile')
            }
            else {
                database()
                    .ref(`student/${uid}`)
                    .once('value')
                    .then(res => {
                        if (res.val()) {
                            console.log(res.val())
                            let status = 2;
                            let type = 2;
                            loginUserSuccess(dispatch, uid, res.val().name, status, type)
                            history.replace("/profile")
                        }
                        else {
                            database()
                                .ref(`company/${uid}`)
                                .once('value')
                                .then(res => {
                                    if (res.val()) {
                                        let status = 3;
                                        let type = 3;
                                        loginUserSuccess(dispatch, uid, res.val().name, status, type)
                                        history.replace("/profile")
                                    }
                                })
                                .catch(err => {
                                    dispatch({
                                        type: actionTypes.SIGNIN_FAILED,
                                        payload: err.message
                                    })
                                })
                        }
                    })
                    .catch(err => {
                        dispatch({
                            type: actionTypes.SIGNIN_FAILED,
                            payload: err.message
                        })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type : actionTypes.SIGNIN_FAILED,
                payload : err.message
            })
        })
}

export const signOut = () => dispatch => {
    auth().signOut()
    dispatch({
        type: actionTypes.SIGN_OUT
    })
    localStorage.removeItem('user');
}

const loginUserSuccess = (dispatch, uid, name, status, type) => {
    const user = { uid, name, status, type }
    dispatch({
        type: actionTypes.SIGNIN_SUCCESSFUL,
        payload: user
    })
    localStorage.setItem('user', JSON.stringify(user))
}