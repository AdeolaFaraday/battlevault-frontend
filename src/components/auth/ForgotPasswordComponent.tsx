"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import forgotPasswordSchema from '@/src/hooks/form-hooks/schemas/forgot-password-schema';
import Button from '../common/button';
import Input from '../common/input';
import LogoIcon from '../common/icons/Logo';
import ModernAuthWrapper from '../common/wrapper/ModernAuthWrapper';
import useRequestPasswordReset from '@/src/api/auth/useRequestPasswordReset';
import { useAlert } from '@/src/hooks/common/useAlert';
import { useState } from 'react';

const ForgotPasswordComponent = () => {
    const {
        errors,
        isValid,
        handleSubmit,
        register,
    } = useHookForm({
        schema: forgotPasswordSchema
    });
    const { success, error } = useAlert();
    const [requestSent, setRequestSent] = useState(false);

    const { requestReset, loading } = useRequestPasswordReset(
        (data) => {
            if (data.requestPasswordReset.success) {
                success('Email Sent', data.requestPasswordReset.message || 'Check your email for reset instructions.');
                setRequestSent(true);
            } else {
                error('Request Failed', data.requestPasswordReset.message || 'Could not send reset email.');
            }
        },
        (err) => {
            error('Error', err.message);
        }
    );

    const onSubmit = (data: { email: string }) => {
        requestReset(data.email);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <ModernAuthWrapper>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center w-full"
            >
                {/* Header section */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8 flex flex-col items-center text-center"
                >
                    <div className="w-16 h-16 mb-4 bg-white/5 rounded-[1.2rem] flex items-center justify-center border border-white/10 shadow-inner">
                        <LogoIcon width={32} height={32} color="white" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Forgot Password</h1>
                    <p className="text-white/40 text-xs font-medium">Enter your email to receive reset instructions</p>
                </motion.div>

                {requestSent ? (
                    <motion.div variants={itemVariants} className="w-full text-center space-y-6">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                            <p className="text-emerald-400 font-bold text-sm">
                                Check your email for instructions to reset your password.
                            </p>
                        </div>
                        <Link href="/signin" className="block text-indigo-400 font-black text-sm uppercase tracking-widest hover:text-indigo-300 transition-colors">
                            Back to Sign In
                        </Link>
                    </motion.div>
                ) : (
                    /* Credentials Form */
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full space-y-5"
                    >
                        <motion.div variants={itemVariants}>
                            <Input
                                {...register("email")}
                                error={errors?.email}
                                placeholder='name@example.com'
                                label='Email Address'
                            />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="pt-4"
                        >
                            <Button
                                loading={loading}
                                disabled={(loading || !isValid)}
                                variant="primary"
                                title='Send Reset Link'
                                customClassName={clsx(
                                    "w-full py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest",
                                    (loading || !isValid)
                                        ? "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                                        : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                                )}
                            />
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-center text-white/40 text-xs mt-6"
                        >
                            Remember your password?{' '}
                            <Link href="/signin" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                                Sign In
                            </Link>
                        </motion.p>
                    </form>
                )}
            </motion.div>
        </ModernAuthWrapper>
    );
};

export default ForgotPasswordComponent;
