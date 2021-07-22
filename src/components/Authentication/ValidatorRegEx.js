
//Email Validation RegEx
const emailValidator = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

//Password Strength Validation RegEx
const passwordValidator = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,32}$/);


export {emailValidator, passwordValidator};