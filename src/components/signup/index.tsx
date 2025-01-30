"use client"
import useSignUpForm from '@/src/hooks/form-hooks/useSignupForm';
import Button from '../common/button';
import Input from '../common/input';

import './styles.css';

const SignUpComponent = () => {
    const {
        errors,
        touchedFields,
        handleSubmit,
        register,
    } = useSignUpForm()
    const onSubmit = (data: any) => console.log(data)

    return <div className='sign_up_container'>
        <div className='banner_container'>Section 1</div>
        <div className='form_container'>
            <form onSubmit={handleSubmit(onSubmit)} className='sign_up_form'>
                <Input {...register("firstName")} error={errors?.firstName} label='First Name' />
                <Input {...register("lastName")} error={errors?.lastName} label='Last Name' />
                <Input {...register("userName")} error={errors?.userName} label='Username' />
                <Input {...register("email")} error={errors?.email} label='Email' />
                <Input {...register("password")} error={errors?.password} label='Password' />
                <Button title='Sign Up' />
                <div>
                    <h3>Already have an account? <span className='signin_span'>Sign in</span></h3>
                </div>
            </form>
        </div>
    </div>
}

export default SignUpComponent