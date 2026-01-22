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
        handGoogleSignIn,
        handleUserSignIn
    } = useSignIn();

    return (
        <ModernAuthWrapper>
            <div className="flex flex-col items-center">
                {/* Header section */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10 flex flex-col items-center text-center"
                >
                    <div className="w-20 h-20 mb-6 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-inner">
                        <LogoIcon color="white" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-white/40 text-sm font-medium">Log in to your BattleVault account</p>
                </motion.div>

                {/* Google Sign In */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full mb-8"
                >
                    <button
                        type="button"
                        onClick={handGoogleSignIn}
                        className="w-full flex items-center justify-center gap-4 bg-white hover:bg-white/90 text-black py-4 px-6 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5 group"
                    >
                        <GoogleIcon />
                        <span className="text-sm">Continue with Google</span>
                    </button>
                </motion.div>

                {/* Separator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full flex items-center gap-4 mb-8"
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
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Input
                            {...register("email")}
                            error={errors?.email}
                            placeholder='name@example.com'
                            label='Email Address'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
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
                            <Link href="#" className="text-[10px] font-bold text-indigo-400/60 hover:text-indigo-400 uppercase tracking-wider transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-center text-white/40 text-xs mt-6"
                    >
                        Don&apos;t have account yet?{' '}
                        <Link href="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                            Create Account
                        </Link>
                    </motion.p>
                </form>
            </div>
        </ModernAuthWrapper>
    );
};

export default SignInComponent;