export const validatePhoneNumber = (phoneNumber) =>{
    if(!phoneNumber){
        return false
    }
    if (!/^\+[0-9]+$/.test(phoneNumber)) {
        return false
    }
    return true
}

export const validateName= (name)=>{

    if(!name){
        return false
    }
    if(!(/^[a-z]+$/.test(name.toLowerCase()))){
        return false
    }
    return true
}

export const validatePassword = (password)=>{
    if(!password){
        return false
    }
    if((/[a-z]/.test(password)) && (/[A-Z]/).test(password) && (/[0-9]/).test(password) && password.length >7){
        return true
    }
    return false
}

