import * as yup from "yup"
const signInSchema = yup
    .object({
        email: yup.string().max(32).required("Email is required"),
        password: yup.string().max(32).required("Password is required"),
    })
    .required()

export default signInSchema