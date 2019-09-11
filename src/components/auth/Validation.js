import {ValidatorForm} from 'react-material-ui-form-validator';

const authValidations = () => {

    ValidatorForm.addValidationRule('isNameLongEnough' , value => {
        if(value.trim().length <3 ) return false;
        return true;
    })
    ValidatorForm.addValidationRule('LimitName', value => {
        if(value.trim().length >30) return false;
        return true;
    })

    ValidatorForm.addValidationRule("isAddressLongEnough" , value => {
        if(value.trim().length < 10) return false;
        return true;
    })


    ValidatorForm.addValidationRule("isPhoneNoLongEnough" , value => {
        const length = value.trim().length
        if(length !==0 && length !==11) return false;
        return true;
    })

    ValidatorForm.addValidationRule("isPasswordLongEnough" , value => {
        if(value.trim().length <6 ) return false;
        return true;
    })
    ValidatorForm.addValidationRule("isGpaValid" , value => {
        if(value.trim().length !==0 && (value < 1 || value > 4)) return false;
        return true;
    })
}

export default authValidations;