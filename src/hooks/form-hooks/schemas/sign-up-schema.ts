import * as yup from "yup"

const signUpSchema = yup
    .object({
        firstName: yup.string().max(10).required(),
        lastName: yup.string().max(10).required(),
        userName: yup.string().max(10).required(),
        email: yup.string().email().max(32).required(),
        password: yup.string().max(32).required(),
    })
    .required()


export default signUpSchema