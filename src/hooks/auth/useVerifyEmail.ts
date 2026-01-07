import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useVerifyEmailApi from '@/src/api/auth/useVerifyEmail';

const useVerifyEmail = ({ token }: { token: string }) => {
    const router = useRouter();
    const hasRun = useRef(false);

    const onCompleted = (data: TCommonResponseData, success: boolean, message: string) => {
        if (success) {
            toast.success(message)
            router.push("/")
        } else {
            toast.error(message)
        }
    }

    const { verfiyEmail, loading, data } = useVerifyEmailApi(
        (data) => onCompleted(data?.verifyEmail?.data as TCommonResponseData, data?.verifyEmail?.success, data?.verifyEmail?.message),
    )
    const handleVerifyEmail = (token: string) => {
        verfiyEmail({ token })
    }

    useEffect(() => {
        if (!hasRun.current) {
            handleVerifyEmail(token)
            hasRun.current = true;
        }
    }, [])

    return {
        loading,
        data
    }
}

export default useVerifyEmail;