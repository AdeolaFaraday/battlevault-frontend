import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface DiceComponentProps {
    onRollComplete?: (results: number[]) => void;
    diceValues?: number[];
    showRollButton?: boolean;
    isRolling?: boolean;
}

const DiceComponent = ({ onRollComplete, diceValues, showRollButton = true, isRolling = false }: DiceComponentProps) => {
    const [tempValues, setTempValues] = useState<[number, number]>([1, 1]);

    const displayValues = (diceValues && diceValues.length > 0)
        ? [diceValues[0], diceValues[1] || 0] as [number, number]
        : tempValues;

    // Simulate rapid value changes during rolling
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRolling) {
            interval = setInterval(() => {
                setTempValues([
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1
                ]);
            }, 80);
        }
        return () => clearInterval(interval);
    }, [isRolling]);

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
        onRollComplete?.([]);
    };

    const renderDice = (value: number, index: number) => {
        const dots = getDiceDots(value);

        return (
            <motion.div
                key={`${index}-${isRolling}`}
                initial={false}
                animate={isRolling ? {
                    rotateX: [0, 180, 360, 540, 720],
                    rotateY: [0, 90, 180, 270, 360],
                    rotateZ: [0, -45, 45, -90, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                    x: index === 0 ? [-5, 5, -3, 3, 0] : [5, -5, 3, -3, 0],
                } : {
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1,
                    x: 0
                }}
                transition={{
                    duration: 0.8,
                    repeat: isRolling ? Infinity : 0,
                    ease: "easeInOut"
                }}
                style={{ perspective: "1000px" }}
                className="dice"
            >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm pointer-events-none" />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.1 }}
                        className="w-full h-full"
                    >
                        {dots.map((position, dotIndex) => (
                            <div key={dotIndex} className={`dot ${position} shadow-sm shadow-black/20`} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <div className="flex items-center justify-center gap-8 py-2">
            <div className="transform rotate-[-12deg]">
                {renderDice(displayValues[0], 0)}
            </div>

            {showRollButton && (
                <button
                    onClick={handleRollClick}
                    className="relative group px-10 py-5 bg-gradient-to-br from-indigo-600 to-violet-800 text-white font-black text-xl tracking-widest rounded-3xl shadow-[0_15px_35px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_45px_rgba(79,70,229,0.6)] border-t border-white/30 hover:-translate-y-1.5 active:translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                    disabled={isRolling}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative drop-shadow-lg">
                        {isRolling ? (
                            <span className="flex gap-1">
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
                            </span>
                        ) : 'ROLL'}
                    </span>
                </button>
            )}

            <div className="transform rotate-[12deg]">
                {renderDice(displayValues[1], 1)}
            </div>
        </div>
    );
};

export default DiceComponent;
