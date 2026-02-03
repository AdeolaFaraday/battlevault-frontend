import { useAlert } from '../common/useAlert';
import useUserSignup from "@/src/api/auth/useUserSignup";
import { useRouter } from 'next/navigation';


const useSignup = () => {
    const { success, error } = useAlert();
    const router = useRouter();
    const { createUser, loading } = useUserSignup(
        (data) => {
            if (data?.createUser?.success) {
                success("Registration Successful", data?.createUser?.message)
                router.push("/signin")
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