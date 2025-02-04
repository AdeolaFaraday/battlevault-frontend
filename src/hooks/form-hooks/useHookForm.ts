import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface Props<T extends object> {
    schema: yup.ObjectSchema<T>;
}

const useHookForm = <T extends object>({ schema }: Props<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
    } = useForm({
        resolver: yupResolver(schema),
    })

    return {
        errors,
        touchedFields,
        isValid,
        register,
        handleSubmit,
    }
}

export default useHookForm;