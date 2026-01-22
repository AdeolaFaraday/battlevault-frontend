import { useForm, Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface Props<T extends object> {
    schema: yup.ObjectSchema<T>;
}

const useHookForm = <T extends object>({ schema }: Props<T>) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, touchedFields, isValid },
    } = useForm<T>({
        resolver: yupResolver(schema) as unknown as Resolver<T>,
    })

    return {
        errors,
        touchedFields,
        isValid,
        register,
        handleSubmit,
        control,
    }
}

export default useHookForm;