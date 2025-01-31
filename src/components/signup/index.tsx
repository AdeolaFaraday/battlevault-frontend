"use client"
import useSignUpForm from '@/src/hooks/form-hooks/useSignupForm';
import Button from '../common/button';
import Input from '../common/input';

import './styles.css';
import useSignup from '@/src/hooks/auth/useSignup';

const SignUpComponent = () => {
    const {
        errors,
        touchedFields,
        handleSubmit,
        register,
    } = useSignUpForm()

    const { loading, handleUserSignup } = useSignup()

    return <div className='sign_up_container'>
        <div className='banner_container'>Section 1</div>
        <div className='form_container'>
            <form onSubmit={handleSubmit(handleUserSignup)} className='sign_up_form'>
                <Input {...register("firstName")} error={errors?.firstName} label='First Name' />
                <Input {...register("lastName")} error={errors?.lastName} label='Last Name' />
                <Input {...register("userName")} error={errors?.userName} label='Username' />
                <Input {...register("email")} error={errors?.email} label='Email' />
                <Input {...register("password")} error={errors?.password} type='password' label='Password' />
                <Button loading={loading} title='Sign Up' />
                <div>
                    <h3>Already have an account? <span className='signin_span'>Sign in</span></h3>
                </div>
            </form>
        </div>
    </div>
}

export default SignUpComponent