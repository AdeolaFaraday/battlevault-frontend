"use client";

import React from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import clsx from 'clsx';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import Button from '../common/button';
import Input from '../common/input';
import CountrySelect from '../common/input/CountrySelect';
import useSignup from '@/src/hooks/auth/useSignup';
import signUpSchema from '@/src/hooks/form-hooks/schemas/sign-up-schema';
import LogoIcon from '../common/icons/Logo';
import ModernAuthWrapper from '../common/wrapper/ModernAuthWrapper';

const SignUpComponent = () => {
    const {
        errors,
        isValid,
        handleSubmit,
        register,
        control,
    } = useHookForm<TCreateUserArgs>({
        schema: signUpSchema
    });

    const { loading, handleUserSignup } = useSignup();

    return (
        <ModernAuthWrapper>
            <div className="flex flex-col items-center">
                {/* Header section */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 flex flex-col items-center text-center"
                >
                    <div className="w-16 h-16 mb-4 bg-white/5 rounded-[1.2rem] flex items-center justify-center border border-white/10 shadow-inner">
                        <LogoIcon width={32} height={32} color="white" />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Create Account</h1>
                    <p className="text-white/40 text-xs font-medium">Join the BattleVault community today</p>
                </motion.div>

                {/* Registration Form */}
                <form
                    onSubmit={handleSubmit(handleUserSignup)}
                    className="w-full space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Input
                                {...register("firstName")}
                                error={errors?.firstName}
                                placeholder='John'
                                label='First Name'
                            />
                        </motion.div>
                        <motion.div
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Input
                                {...register("lastName")}
                                error={errors?.lastName}
                                placeholder='Doe'
                                label='Last Name'
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Input
                            {...register("userName")}
                            error={errors?.userName}
                            placeholder='johndoe123'
                            label='Username'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Input
                            {...register("email")}
                            error={errors?.email}
                            placeholder='john@example.com'
                            label='Email Address'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <CountrySelect
                                    label="Country"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors?.country?.message}
                                />
                            )}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Input
                            {...register("password")}
                            error={errors?.password}
                            type='password'
                            placeholder='••••••••'
                            label='Password'
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="pt-4"
                    >
                        <Button
                            loading={loading}
                            disabled={(loading || !isValid)}
                            variant="primary"
                            title='Complete Registration'
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
                        transition={{ delay: 1.0 }}
                        className="text-center text-white/40 text-xs mt-6"
                    >
                        Already have an account?{' '}
                        <Link href="/signin" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                            Sign In
                        </Link>
                    </motion.p>
                </form>
            </div>
        </ModernAuthWrapper>
    );
};

export default SignUpComponent;