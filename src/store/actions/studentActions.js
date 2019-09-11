import { database } from 'firebase';
import * as actionTypes from '../Types';


export const changeInput = text => {
    return {
        type: actionTypes.CHANGE_INPUT,
        payload: text
    }
}

export const getUser = uid => dispatch => {
    dispatch({
        type: actionTypes.START_LOADING
    })
    database()
        .ref(`student/${uid}`)
        .on('value', snapshot => {
            const student = snapshot.val();
            console.log("here", student)
            dispatch({
                type: actionTypes.SET_STUDENT,
                payload: student
            })
        });
}

export const updateProfile = (uid, payload) => dispatch => {
    database()
        .ref(`/student/${uid}`)
        .set(payload)
}

export const studentProfileFetch = type => dispatch => {
    dispatch({
        type: actionTypes.START_LOADING
    })
    database()
        .ref(`/${type}`)
        .on('value', snapshot => {
            const obj = snapshot.val();
            let profiles = [];
            for (let profile in obj) {
                profiles.push({ ...obj[profile] })
            }
            dispatch({
                type: actionTypes.FETCH_STUDENT_SUCCESS,
                payload: profiles
            })
        })
}

export const selectedProfile = payload => dispatch => {
    dispatch({
        type: actionTypes.SELECTED_PROFILE,
        payload: payload
    })
}

export const blockProfile = payload => dispatch => {
    const { uid, blocked } = payload
    const mypayload = { ...payload, blocked: !blocked }
    database()
        .ref(`/student/${uid}`)
        .set(mypayload)

    console.log("this student is blocked")
}