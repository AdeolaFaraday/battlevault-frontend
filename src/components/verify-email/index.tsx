"use client";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

import SuccessAnimation from '../common/lottie/success.json';
import FailSadAnimation from '../common/lottie/fail-sad.json';
import './styles.css';
import useVerifyEmail from "@/src/hooks/auth/useVerifyEmail";

const VerifyEmailComponent = () => {
    const { token } = useParams();
    const { loading, data } = useVerifyEmail({ token })

    return (
        <div className="success-container">
            <div className="success-card">
                <Lottie
                    loop
                    animationData={data?.verifyEmail?.success ? SuccessAnimation : FailSadAnimation}
                    play
                />
                <h1 className="success-title">{data?.verifyEmail?.message}!</h1>
            </div>
        </div>
    );
}

export default VerifyEmailComponent;