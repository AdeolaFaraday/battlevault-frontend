"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface DiceSelectorProps {
    availableDice: number[];
    onSelect: (value: number[]) => void;
    activeDiceConfig: number[] | null;
    disabled?: boolean;
}

const DiceSelector = ({ availableDice, onSelect, activeDiceConfig, disabled }: DiceSelectorProps) => {
    if (availableDice.length === 0) return null;

    // Opponent's turn - show loading state
    if (disabled) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="dice-selector__wrapper dice-selector__loading"
                >
                    <div className="loading-state">
                        <div className="loading-text">
                            <span className="loading-label">Opponent is thinking</span>
                            <div className="loading-shimmer-bar">
                                <motion.div
                                    className="loading-shimmer"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </div>

                        {/* Show opponent's dice values */}
                        <div className="loading-dice-display">
                            {availableDice.map((value, index) => (
                                <motion.div
                                    key={`loading-dice-${index}-${value}`}
                                    className="loading-dice-value"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [0.95, 1, 0.95]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <span className="loading-dice-number">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    // User's turn - show pulsing dice options
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="dice-selector__wrapper"
            >
                <motion.div
                    className="dice-selector__label"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Select Move:
                </motion.div>
                <div className="dice-selector__options">
                    {/* Individual Dice */}
                    {availableDice.map((value, index) => {
                        const isSelected = activeDiceConfig?.length === 1 && activeDiceConfig[0] === value;
                        return (
                            <motion.button
                                key={`dice-${index}-${value}`}
                                onClick={() => onSelect([value])}
                                className={clsx(
                                    "dice-option",
                                    isSelected && "active"
                                )}
                                animate={!isSelected ? {
                                    scale: [1, 1.08, 1],
                                    boxShadow: [
                                        '0 0 0 0 rgba(79, 70, 229, 0)',
                                        '0 0 0 8px rgba(79, 70, 229, 0.2)',
                                        '0 0 0 0 rgba(79, 70, 229, 0)'
                                    ]
                                } : {}}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="dice-value">{value}</span>
                            </motion.button>
                        );
                    })}

                    {/* Combined Option (if 2 dice) */}
                    {availableDice.length === 2 && (
                        <motion.button
                            onClick={() => onSelect(availableDice)}
                            className={clsx(
                                "dice-option combine",
                                activeDiceConfig?.length === 2 && "active"
                            )}
                            animate={activeDiceConfig?.length !== 2 ? {
                                scale: [1, 1.08, 1],
                                boxShadow: [
                                    '0 0 0 0 rgba(79, 70, 229, 0)',
                                    '0 0 0 8px rgba(79, 70, 229, 0.2)',
                                    '0 0 0 0 rgba(79, 70, 229, 0)'
                                ]
                            } : {}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: availableDice.length * 0.2,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="dice-sum-wrapper">
                                <span className="dice-value">
                                    {availableDice[0] + availableDice[1]}
                                </span>
                                <div className="dice-sum-tag">
                                    <span className="dice-sum-values">{availableDice[0]}+{availableDice[1]}</span>
                                </div>
                            </div>
                            <span className="dice-sublabel">Combine Move</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiceSelector;
