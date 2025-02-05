"use client"
import Link from 'next/link';
import useHookForm from '@/src/hooks/form-hooks/useHookForm';
import signInSchema from '@/src/hooks/form-hooks/schemas/sign-in-schema';
import AuthWrapperComponent from '../signup/auth-wrapper';
import Button from '../common/button';
import SocialButton from '../common/button/social-btn';
import Input from '../common/input';
import useSignIn from '@/src/hooks/auth/useSignIn';
import GoogleIcon from '../common/icons/GoogleIcon';
import FacebookIcon from '../common/icons/FacebookIcon';

import '../signup/styles.css';
import LogoIcon from '../common/icons/Logo';

const SignInComponent = () => {
    const {
        errors,
        touchedFields,
        isValid,
        handleSubmit,
        register,
    } = useHookForm({
        schema: signInSchema
    })

    const {
        loading,
        handGoogleSignIn,
        handleUserSignIn
    } = useSignIn()

    return <AuthWrapperComponent>
        <div className='form_container'>
            <div className='logo_container'>
                <LogoIcon />
            </div>
            <form onSubmit={handleSubmit(handleUserSignIn)} className='sign_up_form'>
                <div className='social_btns'>
                    <SocialButton type='button' onClick={handGoogleSignIn} Icon={<GoogleIcon />} title='Google' />
                    <SocialButton type='button' onClick={handGoogleSignIn} Icon={<FacebookIcon />} title='Facebook' />
                </div>
                <h3 className='or_separator'>OR</h3>
                <Input {...register("email")} error={errors?.email} label='Username' />
                <Input {...register("password")} error={errors?.password} type='password' label='Password' />
                <Button loading={loading} disabled={(loading || !isValid)} variant={(loading || !isValid) ? "disabled" : "primary"} title='Sign In' />
                <div>
                    <h3>Don't have account yet? <Link href="/signup" className='signin_span'>Sign up</Link></h3>
                </div>
            </form>
        </div>
    </AuthWrapperComponent>
}

export default SignInComponent