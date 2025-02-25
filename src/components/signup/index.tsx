"use client"
import Link from 'next/link';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import Button from '../common/button';
import Input from '../common/input';
import AuthWrapperComponent from '../common/wrapper/auth-wrapper';

import useSignup from '@/src/hooks/auth/useSignup';
import signUpSchema from '@/src/hooks/form-hooks/schemas/sign-up-schema';

import './styles.css';

const SignUpComponent = () => {
    const {
        errors,
        touchedFields,
        handleSubmit,
        register,
    } = useHookForm<TCreateUserArgs>({
        schema: signUpSchema
    })

    const { loading, handleUserSignup } = useSignup()

    return <AuthWrapperComponent>
        <div className='form_container'>
            <form onSubmit={handleSubmit(handleUserSignup)} className='sign_up_form'>
                <Input {...register("firstName")} error={errors?.firstName} label='First Name' />
                <Input {...register("lastName")} error={errors?.lastName} label='Last Name' />
                <Input {...register("userName")} error={errors?.userName} label='Username' />
                <Input {...register("email")} error={errors?.email} label='Email' />
                <Input {...register("password")} error={errors?.password} type='password' label='Password' />
                <Button loading={loading} title='Sign Up' />
                <div>
                    <h3>Already have an account? <Link href="/signin" className='signin_span'>Sign in</Link></h3>
                </div>
            </form>
        </div>
    </AuthWrapperComponent>
}

export default SignUpComponent