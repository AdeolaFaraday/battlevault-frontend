"use client"
import LudoBoard from './ludo-board';
import './styles.css';

const LudoComponent = ({ id }: { id: string }) => {
    return <div className='ludo-container'>
        <LudoBoard id={id} />
    </div>
}

export default LudoComponent;