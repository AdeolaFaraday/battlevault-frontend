import './styles.css';

const AuthWrapperComponent = ({ children }: { children: React.ReactNode }) => {

    return <div className='sign-up__container'>
        <div className='banner-container'>Section 1</div>
        {children}
    </div>
}

export default AuthWrapperComponent;