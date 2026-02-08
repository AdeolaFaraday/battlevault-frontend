import ResetPasswordComponent from "@/src/components/auth/ResetPasswordComponent";
import { Suspense } from 'react';

// Next.js 15 page props type
type PageProps = {
    params: Promise<{ id: string }>
}

export default async function ResetPasswordPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <Suspense fallback={<div className="text-white text-center pt-20">Loading...</div>}>
            <ResetPasswordComponent token={id} />
        </Suspense>
    );
}
