import * as actionTypes from '../Types';

const initState = {
    companies: [],
    selectedProfile: {},
    name: "",
    bType: "",
    cell: "",
    address: "",
    aboutMe: "",
    blocked: false,
    loading: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            const { key, value } = action.payload
            return {
                ...state,
                [key]: value
            }
        case actionTypes.START_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_COMPANY:
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        case actionTypes.FETCH_COMPANY_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                companies: action.payload
            }

        case actionTypes.SELECTED_PROFILE:
            console.log(action.payload)
            return {
                ...state,
                selectedProfile: action.payload
            }
        
        case actionTypes.STOP_LOADING:
            return{
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}

export default reducer;