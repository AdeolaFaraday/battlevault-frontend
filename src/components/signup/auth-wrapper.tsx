import './styles.css';

const AuthWrapperComponent = ({ children }: { children: React.ReactNode }) => {

    return <div className='sign_up_container'>
        <div className='banner_container'>Section 1</div>
        {children}
    </div>
}

export default AuthWrapperComponent;