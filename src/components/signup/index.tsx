import Button from '../common/button';
import Input from '../common/input';
import './styles.css';

const SignUpComponent = () => {
    return <div className='sign_up_container'>
        <div className='banner_container'>Section 1</div>
        <div className='form_container'>
            <form className='sign_up_form'>
                <Input label='First Name' />
                <Input label='Last Name' />
                <Input label='Username' />
                <Input label='Email' />
                <Input label='Password' />
                <Button title='Sign Up' />
                <div>
                    <h3>Already have an account? <span className='signin_span'>Sign in</span></h3>
                </div>
            </form>
        </div>
    </div>
}

export default SignUpComponent