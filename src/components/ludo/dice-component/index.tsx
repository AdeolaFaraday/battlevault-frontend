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
        <div className="flex items-center justify-center gap-6">
            <div className="transform rotate-[-10deg] hover:rotate-0 transition-transform duration-300">
                {renderDice(currentValues[0], 0)}
            </div>

            <button
                onClick={handleRollClick}
                className="px-8 py-4 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-lg tracking-wider rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.5)] border-t border-white/20 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isRolling}
            >
                {isRolling ? '...' : 'ROLL'}
            </button>

            <div className="transform rotate-[10deg] hover:rotate-0 transition-transform duration-300">
                {renderDice(currentValues[1], 1)}
            </div>
        </div>
    );
};

export default DiceComponent; 