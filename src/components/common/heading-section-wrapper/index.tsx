import './styles.css';

type Props = {
    title: string;
    children: React.ReactNode

}

const HeadingSectionWrapper = ({
    title,
    children
}: Props) => {
    return <div className='heading-section__wrapper'>
        <h2>{title}</h2>
        {children}
    </div>
}

export default HeadingSectionWrapper;