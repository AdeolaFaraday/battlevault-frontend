"use client"

interface DiceComponentProps {
    onRollComplete?: (results: number[]) => void;
    diceValues?: number[];
    showRollButton?: boolean;
    isRolling?: boolean;
}

const DiceComponent = ({ onRollComplete, diceValues, showRollButton = true, isRolling = false }: DiceComponentProps) => {
    const displayValues = (diceValues && diceValues.length > 0)
        ? [diceValues[0], diceValues[1] || 0] as [number, number]
        : [0, 0] as [number, number];

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
        // Start rolling animation and notify parent to trigger backend roll
        onRollComplete?.([]);
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
                {renderDice(displayValues[0], 0)}
            </div>

            {showRollButton && (
                <button
                    onClick={handleRollClick}
                    className="px-8 py-4 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-lg tracking-wider rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.5)] border-t border-white/20 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isRolling}
                >
                    {isRolling ? '...' : 'ROLL'}
                </button>
            )}

            <div className="transform rotate-[10deg] hover:rotate-0 transition-transform duration-300">
                {renderDice(displayValues[1], 1)}
            </div>
        </div>
    );
};

export default DiceComponent;
