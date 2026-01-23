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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
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
                    <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Create Account</h1>
                    <p className="text-white/40 text-xs font-medium">Join the BattleVault community today</p>
                </motion.div>

                {/* Registration Form */}
                <form
                    onSubmit={handleSubmit(handleUserSignup)}
                    className="w-full space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div variants={itemVariants}>
                            <Input
                                {...register("firstName")}
                                error={errors?.firstName}
                                placeholder='John'
                                label='First Name'
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Input
                                {...register("lastName")}
                                error={errors?.lastName}
                                placeholder='Doe'
                                label='Last Name'
                            />
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                        <Input
                            {...register("userName")}
                            error={errors?.userName}
                            placeholder='johndoe123'
                            label='Username'
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Input
                            {...register("email")}
                            error={errors?.email}
                            placeholder='john@example.com'
                            label='Email Address'
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
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

                    <motion.div variants={itemVariants}>
                        <Input
                            {...register("password")}
                            error={errors?.password}
                            type='password'
                            placeholder='••••••••'
                            label='Password'
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
                        variants={itemVariants}
                        className="text-center text-white/40 text-xs mt-6"
                    >
                        Already have an account?{' '}
                        <Link href="/signin" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-400/30">
                            Sign In
                        </Link>
                    </motion.p>
                </form>
            </motion.div>
        </ModernAuthWrapper>
    );
};

export default SignUpComponent;