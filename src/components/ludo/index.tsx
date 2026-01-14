"use client"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import LudoBoard from './ludo-board';
import './styles.css';

const isTouchDevice = typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const LudoComponent = ({ id }: { id: string }) => {
    return <div className='ludo-container'>
        <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend} >
            <LudoBoard id={id} />
        </DndProvider>
    </div>
}

export default LudoComponent;