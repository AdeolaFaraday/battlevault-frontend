import * as yup from "yup"

const resetPasswordSchema = yup
    .object({
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    })
    .required()

export default resetPasswordSchema
