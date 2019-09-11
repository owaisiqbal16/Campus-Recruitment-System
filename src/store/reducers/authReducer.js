import * as actionTypes from "../Types";

const initState = {
    uid : "",
    type : "student",
    status : "",
    name : "",
    institute : "",
    degree  : "",
    age : "",
    cgpa: "" ,
    skills : "",
    cell : "",
    bType : "",
    address : "",
    email: "",
    password: "",
    confPassword : "",
    loading: false,
    error : "",
    isSignedIn : false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT:
            const { key , value } = action.payload
            console.log({key,value})
            return {
                ...state,
                [key]: value
            };
        
        case actionTypes.SIGNIN_SUCCESSFUL :
            const {uid , name , status } = action.payload;
            console.log("Successfully Signed in" , uid , name)
            return {
                ...state,
                uid,
                status,
                name,
                loading : false,
                error : "",
                isSignedn : true
            };

        case actionTypes.USER_LOADING : 
            return {
                ...state,
                loading : true
            }

        case actionTypes.SIGNIN_FAILED : 
            return {
                ...state,
                error: action.payload,
                loading : false
            };
        
        case actionTypes.SIGNUP_FAILED :
        return{
            ...state,
            error : action.payload,
            loading : false
        }
        
        
        case actionTypes.SIGN_OUT :
            return{
                ...state,
                ...initState
            }
    
            

        default:
            return state;
    }

}

export default reducer;