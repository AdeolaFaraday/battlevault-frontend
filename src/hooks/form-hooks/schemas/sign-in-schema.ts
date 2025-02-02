import * as yup from "yup"
const signInSchema = yup
    .object({
        userName: yup.string().max(10).required("Username is required"),
        password: yup.string().max(32).required("Password is required"),
    })
    .required()

export default signInSchema