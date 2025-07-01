"use client"
import { useState } from 'react';

interface DiceComponentProps {
    onRollComplete?: (results: number[]) => void;
}

const DiceComponent = ({ onRollComplete }: DiceComponentProps) => {
    const [currentValues, setCurrentValues] = useState<[number, number]>([6, 6]);
    const [isRolling, setIsRolling] = useState(false);

    // Generate dot pattern for each dice face
    const getDiceDots = (value: number) => {
        const dotPositions: { [key: number]: string[] } = {
            1: ['center'],
            2: ['top-left', 'bottom-right'],
            3: ['top-left', 'center', 'bottom-right'],
            4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
            6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
        };
        return dotPositions[value] || [];
    };

    const handleRollClick = () => {
        setIsRolling(true);

        // Simulate rolling animation
        setTimeout(() => {
            const firstDiceValue = Math.floor(Math.random() * 6) + 1;
            const secondDiceValue = Math.floor(Math.random() * 6) + 1;
            setCurrentValues([firstDiceValue, secondDiceValue]);
            setIsRolling(false);
            onRollComplete?.(Array.from([firstDiceValue, secondDiceValue]));
        }, 500);
    };

    const renderDice = (value: number, index: number) => {
        const dots = getDiceDots(value);

        return (
            <div
                key={index}
                className={`dice ${isRolling ? 'rolling' : ''}`}
            >
                {dots.map((position, dotIndex) => (
                    <div key={dotIndex} className={`dot ${position}`} />
                ))}
            </div>
        );
    };

    return (
        <div className="">
            <div className="dice-container">
                {currentValues.map((value, index) => renderDice(value, index))}
            </div>
            <button
                onClick={handleRollClick}
                className="roll-button"
                disabled={isRolling}
            >
                {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
        </div>
    );
};

export default DiceComponent; 