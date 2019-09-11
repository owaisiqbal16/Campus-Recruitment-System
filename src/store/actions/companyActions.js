import { database } from 'firebase';
import * as actionTypes from '../Types';

export const changeInput = (text) => {
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
        .ref(`company/${uid}`)
        .on('value', snapshot => {
            const company = snapshot.val();
            console.log("here", company)
            dispatch({
                type: actionTypes.SET_COMPANY,
                payload: company
            })
        })
}

export const updateProfile = (uid, payload) => dispatch => {
    database()
        .ref(`company/${uid}`)
        .set(payload)
}

export const companyProfileFetch = type => dispatch => {
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
                type: actionTypes.FETCH_COMPANY_SUCCESS,
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
        .ref(`/company/${uid}`)
        .set(mypayload)

    console.log("this company is blocked")
}

export const postVacancy = payload => dispatch => {
    dispatch({
        type: actionTypes.START_LOADING
    })
    console.log(payload)

    const { uid, info } = payload
    database()
        .ref(`/vacancy/${uid}`)
        .set(info)
        .then(
            dispatch({
                type: actionTypes.STOP_LOADING
            }),
            console.log('vacancyposted', info)
        )


}