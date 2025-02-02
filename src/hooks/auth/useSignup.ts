import { toast } from 'sonner'
import useUserSignup from "@/src/api/auth/useUserSignup";


const useSignup = () => {
    const { createUser, loading } = useUserSignup(
        (data) => {
            if (data?.createUser?.success) {
                toast.success(data?.createUser?.message)
            } else {
                toast.error(data?.createUser?.message)
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