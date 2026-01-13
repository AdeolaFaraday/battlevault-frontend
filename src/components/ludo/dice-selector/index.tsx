"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface DiceSelectorProps {
    availableDice: number[];
    onSelect: (value: number[]) => void;
    activeDiceConfig: number[] | null;
}

const DiceSelector = ({ availableDice, onSelect, activeDiceConfig }: DiceSelectorProps) => {
    if (availableDice.length === 0) return null;

    // const isCombined = (dice: number[]) => dice.length > 1;
    // const sumSelected = activeDiceConfig?.reduce((a, b) => a + b, 0) || 0;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="dice-selector__wrapper"
            >
                <div className="dice-selector__label">Select Move:</div>
                <div className="dice-selector__options">
                    {/* Individual Dice */}
                    {availableDice.map((value, index) => {
                        const isSelected = activeDiceConfig?.length === 1 && activeDiceConfig[0] === value;
                        return (
                            <button
                                key={`dice-${index}-${value}`}
                                onClick={() => onSelect([value])}
                                className={clsx("dice-option", isSelected && "active")}
                            >
                                <span className="dice-value">{value}</span>
                            </button>
                        );
                    })}

                    {/* Combined Option (if 2 dice) */}
                    {availableDice.length === 2 && (
                        <button
                            onClick={() => onSelect(availableDice)}
                            className={clsx("dice-option combine", activeDiceConfig?.length === 2 && "active")}
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
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DiceSelector;
