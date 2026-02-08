"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import signInSchema from '@/src/hooks/form-hooks/schemas/sign-in-schema';
import Button from '../common/button';
import Input from '../common/input';
import useSignIn from '@/src/hooks/auth/useSignIn';
import GoogleIcon from '../common/icons/GoogleIcon';
import LogoIcon from '../common/icons/Logo';
import ModernAuthWrapper from '../common/wrapper/ModernAuthWrapper';
import Loader from '../common/icons/Loader';

const SignInComponent = () => {
    const {
        errors,
        isValid,
        handleSubmit,
        register,
    } = useHookForm({
        schema: signInSchema
    });

    const {
        loading,
        isGoogleLoading,
        handGoogleSignInRedirect,
        handleUserSignIn
    } = useSignIn();

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
                    <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Welcome Back</h1>
                    <p className="text-white/40 text-xs font-medium">Log in to your BattleVault account</p>
                </motion.div>

                {/* Google Sign In */}
                <motion.div
                    variants={itemVariants}
                    className="w-full mb-6"
                >
                    <button
                        type="button"
                        disabled={isGoogleLoading}
                        onClick={handGoogleSignInRedirect}
                        className={clsx(
                            "w-full flex items-center justify-center gap-4 bg-white hover:bg-white/90 text-black py-4 px-6 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-white/5 group",
                            isGoogleLoading && "opacity-70 cursor-not-allowed"
                        )}
                    >
                        {isGoogleLoading ? (
                            <div className="flex items-center justify-center">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                <GoogleIcon />
                                <span className="text-sm">Continue with Google</span>
                            </>
                        )}
                    </button>
                </motion.div>

                {/* Separator */}
                <motion.div
                    variants={itemVariants}
                    className="w-full flex items-center gap-4 mb-6"
                >
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">OR</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </motion.div>

                {/* Credentials Form */}
                <form
                    onSubmit={handleSubmit(handleUserSignIn)}
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
                        className="space-y-2"
                    >
                        <Input
                            {...register("password")}
                            error={errors?.password}
                            type='password'
                            placeholder='••••••••'
                            label='Password'
                        />
                        <div className="flex justify-end pr-1">
                            <Link href="/forgot-password" className="text-[10px] font-bold text-indigo-400/60 hover:text-indigo-400 uppercase tracking-wider transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="pt-4"
                    >
                        <Button
                            loading={loading}
                            disabled={(loading || !isValid)}
                            variant="primary"
                            title='Sign In to BattleVault'
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
                        Don&apos;t have account yet?{' '}
                        <Link href="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                            Create Account
                        </Link>
                    </motion.p>
                </form>
            </motion.div>
        </ModernAuthWrapper>
    );
};

export default SignInComponent;