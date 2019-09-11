import * as actionTypes from '../Types';

const initState = {
    students : [],
    selectedProfile : {},
    name: "",
    institute: "",
    degree: "",
    age : "",
    cgpa : "",
    skills : "",
    aboutMe : "",
    blocked : false,
    loading : false

}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            const {key,value} = action.payload
            return{
                ...state,
                [key] : value
            }

        case actionTypes.START_LOADING : 
            return{
                ...state,
                loading : true
            }
        case actionTypes.SET_STUDENT:
            console.log(action.payload)
            return {
                ...state,
                loading : false,
                ...action.payload
            }

        case actionTypes.FETCH_STUDENT_SUCCESS: 
            return{
                ...state,
                loading : false,
                students : action.payload 
            }
        case actionTypes.SELECTED_PROFILE:
            return {
                ...state,
                selectedProfile : action.payload
            }
        default:
            return state;
    }
}

export default reducer;