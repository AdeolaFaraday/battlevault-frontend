"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Token } from '@/src/types/ludo';

interface GameTourGuideProps {
    isCurrentTurn: boolean;
    status: string;
    diceValue: number[];
    tokens: Record<string, Token[]>;
    userColors: string[];
}

const TOUR_COMPLETED_KEY = 'ludo_tour_completed_v1';

const LudoTourGuide = ({ isCurrentTurn, status, diceValue, tokens, userColors }: GameTourGuideProps) => {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'roll' | 'move' | null>(null);
    const [targetPos, setTargetPos] = useState({ top: 0, left: 0 });
    const [isCompleted, setIsCompleted] = useState(true);

    useEffect(() => {
        setMounted(true);
        const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
        setIsCompleted(!!completed);
    }, []);

    useEffect(() => {
        if (isCompleted || !isCurrentTurn) {
            setStep(null);
            return;
        }

        // Logic for steps
        if (status === 'playingDice') {
            setStep('roll');
        } else if (status === 'playingToken') {
            // Find if any token is playable
            const canMoveOut = diceValue.includes(6);
            if (canMoveOut) {
                setStep('move');
            } else {
                // If they rolled something else, they might still be able to move an active token.
                // But the user specifically asked for "move one of their tokens out".
                // We'll point to an inactive token if they have a 6.
                setStep('move');
            }
        } else {
            setStep(null);
        }
    }, [isCurrentTurn, status, diceValue, isCompleted]);

    // Update target position based on step
    useEffect(() => {
        if (!step) return;

        const updatePosition = () => {
            let element: HTMLElement | null = null;

            if (step === 'roll') {
                element = document.getElementById('dice-roll-button');
            } else if (step === 'move') {
                // Find a token that can move out (inactive color tokens if 6 is rolled)
                const color = userColors[0]; // Just pick the first color they have
                if (color) {
                    const inactiveToken = tokens[color]?.find(t => !t.active);
                    if (inactiveToken) {
                        element = document.getElementById(`token-${color}-${inactiveToken.sn}`);
                    }
                }
            }

            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetPos({
                    top: rect.top + (step === 'roll' ? -60 : -40),
                    left: rect.left + rect.width / 2
                });
            }
        };

        updatePosition();
        const interval = setInterval(updatePosition, 100); // Poll for position changes (animations)
        return () => clearInterval(interval);
    }, [step, tokens, userColors]);

    const handleDismiss = () => {
        localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
        setIsCompleted(true);
        setStep(null);
    };

    if (!mounted || !step || isCompleted) return null;

    const content = (
        <AnimatePresence>
            <motion.div
                key="tour-finger"
                className="tour-guide__finger"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    top: targetPos.top,
                    left: targetPos.left
                }}
                exit={{ opacity: 0, scale: 0.5 }}
            >
                <div className="tour-guide__finger-inner">👆</div>
            </motion.div>

            <motion.div
                key="tour-hint"
                className="tour-guide__hint"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    top: targetPos.top + 80,
                    left: targetPos.left,
                    transform: 'translateX(-50%)'
                }}
                exit={{ opacity: 0, y: 10 }}
            >
                <div className="flex flex-col items-center gap-1">
                    <span>{step === 'roll' ? 'Tap to Roll Dice!' : 'Tap to move your token!'}</span>
                    <button
                        onClick={handleDismiss}
                        className="text-[10px] underline opacity-70 hover:opacity-100"
                    >
                        Got it, skip guide
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );

    return createPortal(content, document.body);
};

export default LudoTourGuide;
