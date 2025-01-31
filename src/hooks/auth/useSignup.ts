import useUserSignup from "@/src/api/auth/useUserSignup";


const useSignup = () => {
    const { createUser, loading } = useUserSignup(
        (data) => {
            console.log({ data });
        },
    )
    const handleUserSignup = (data: TCreateUserArgs) => {
        console.log({ data });
        createUser(data)
    }
    return {
        loading,
        handleUserSignup
    }
}

export default useSignup;