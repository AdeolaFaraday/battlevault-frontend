import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const useSignUpForm = () => {
    const schema = yup
        .object({
            firstName: yup.string().max(10).required(),
            lastName: yup.string().max(10).required(),
            userName: yup.string().max(10).required(),
            email: yup.string().email().max(32).required(),
            password: yup.string().max(32).required(),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm({
        resolver: yupResolver(schema),
    })

    return {
        errors,
        touchedFields,
        register,
        handleSubmit,
    }
}

export default useSignUpForm;