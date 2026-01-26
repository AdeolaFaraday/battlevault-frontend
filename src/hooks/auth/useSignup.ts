import { useAlert } from '../common/useAlert';
import useUserSignup from "@/src/api/auth/useUserSignup";


const useSignup = () => {
    const { success, error } = useAlert();
    const { createUser, loading } = useUserSignup(
        (data) => {
            if (data?.createUser?.success) {
                success("Registration Successful", data?.createUser?.message)
            } else {
                error("Registration Failed", data?.createUser?.message)
            }
        },
    )
    const handleUserSignup = (data: TCreateUserArgs) => {
        createUser(data)
    }
    return {
        loading,
        handleUserSignup
    }
}

export default useSignup;