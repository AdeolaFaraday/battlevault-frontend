"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import resetPasswordSchema from '@/src/hooks/form-hooks/schemas/reset-password-schema';
import Button from '../common/button';
import Input from '../common/input';
import LogoIcon from '../common/icons/Logo';
import ModernAuthWrapper from '../common/wrapper/ModernAuthWrapper';
import useResetPassword from '@/src/api/auth/useResetPassword';
import { useAlert } from '@/src/hooks/common/useAlert';

type ResetPasswordComponentProps = {
    token: string;
};

const ResetPasswordComponent = ({ token }: ResetPasswordComponentProps) => {
    const router = useRouter();
    const {
        errors,
        isValid,
        handleSubmit,
        register,
    } = useHookForm({
        schema: resetPasswordSchema
    });
    const { success, error } = useAlert();

    const { resetPassword, loading } = useResetPassword(
        (data) => {
            if (data.resetPassword.success) {
                success('Success', data.resetPassword.message || 'Password updated successfully.');
                router.push('/signin');
            } else {
                error('Reset Failed', data.resetPassword.message || 'Could not reset password.');
            }
        },
        (err) => {
            error('Error', err.message);
        }
    );

    const onSubmit = (data: { password: string; confirmPassword: string }) => {
        resetPassword(token, data.password);
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

    if (!token) {
        return (
            <ModernAuthWrapper>
                <div className="text-center text-white">
                    <h2 className="text-xl font-bold mb-4">Invalid Link</h2>
                    <p className="mb-4 text-white/60">Missing password reset token.</p>
                    <Link href="/signin" className="text-indigo-400 font-bold hover:text-indigo-300">
                        Go to Sign In
                    </Link>
                </div>
            </ModernAuthWrapper>
        );
    }

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
                    <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Set New Password</h1>
                    <p className="text-white/40 text-xs font-medium">Create a strong new password</p>
                </motion.div>

                {/* Credentials Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-5"
                >
                    <motion.div variants={itemVariants}>
                        <Input
                            {...register("password")}
                            error={errors?.password}
                            type='password'
                            placeholder='••••••••'
                            label='New Password'
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Input
                            {...register("confirmPassword")}
                            error={errors?.confirmPassword}
                            type='password'
                            placeholder='••••••••'
                            label='Confirm Password'
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
                            title='Update Password'
                            customClassName={clsx(
                                "w-full py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest",
                                (loading || !isValid)
                                    ? "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98]" // Changed color for visual distinction
                            )}
                        />
                    </motion.div>
                </form>
            </motion.div>
        </ModernAuthWrapper>
    );
};

export default ResetPasswordComponent;
