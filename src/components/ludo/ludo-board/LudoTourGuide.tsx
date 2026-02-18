"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Token } from '@/src/types/ludo';

interface GameTourGuideProps {
    currentUserId?: string;
    isCurrentTurn: boolean;
    status: string;
    diceValue: number[];
    tokens: Record<string, Token[]>;
    userColors: string[];
}

const TOUR_COMPLETED_KEY = 'ludo_tour_completed_v1';
const TOUR_ROLLS_KEY = 'ludo_tour_rolls_v1';
const TOUR_MOVES_KEY = 'ludo_tour_moves_v1';

const LudoTourGuide = ({ currentUserId, isCurrentTurn, status, diceValue, tokens, userColors }: GameTourGuideProps) => {
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<'roll' | 'move' | null>(null);
    const [targetPos, setTargetPos] = useState({ top: 0, left: 0 });
    const [isCompleted, setIsCompleted] = useState(true);
    const [rollsCount, setRollsCount] = useState(0);
    const [movesCount, setMovesCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        const completed = localStorage.getItem(TOUR_COMPLETED_KEY);
        const rolls = parseInt(localStorage.getItem(TOUR_ROLLS_KEY) || '0');
        const moves = parseInt(localStorage.getItem(TOUR_MOVES_KEY) || '0');

        setRollsCount(rolls);
        setMovesCount(moves);

        if (completed || (rolls >= 2 && moves >= 2)) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, []);

    // Track rolls
    useEffect(() => {
        if (status === 'playingDice' || (status === 'playingToken' && diceValue.length > 0)) {
            if (isCurrentTurn && rollsCount < 2) {
                const newCount = rollsCount + 1;
                // Only increment if we just transitioned to rolled state
                if (status === 'playingToken') {
                    setRollsCount(newCount);
                    localStorage.setItem(TOUR_ROLLS_KEY, newCount.toString());
                    if (newCount >= 2 && movesCount >= 2) {
                        handleDismiss();
                    }
                }
            }
        }
    }, [status, diceValue, isCurrentTurn]);

    // Track moves
    useEffect(() => {
        // If status was playingToken and now it's something else (turn ended or waiting for dice), it means a move happened
        // This is a bit simplified but works for the tour guide context
        const prevStatus = localStorage.getItem('ludo_prev_status');
        if (prevStatus === 'playingToken' && status !== 'playingToken' && isCurrentTurn) {
            if (movesCount < 2) {
                const newCount = movesCount + 1;
                setMovesCount(newCount);
                localStorage.setItem(TOUR_MOVES_KEY, newCount.toString());
                if (rollsCount >= 2 && newCount >= 2) {
                    handleDismiss();
                }
            }
        }
        localStorage.setItem('ludo_prev_status', status);
    }, [status, isCurrentTurn]);

    useEffect(() => {
        if (isCompleted || !isCurrentTurn) {
            setStep(null);
            return;
        }

        // Logic for steps
        if (status === 'playingDice' && rollsCount < 2) {
            setStep('roll');
        } else if (status === 'playingToken' && movesCount < 2) {
            // Find if any token is playable
            const canMoveOut = diceValue.includes(6);
            if (canMoveOut) {
                setStep('move');
            } else {
                setStep('move');
            }
        } else {
            setStep(null);
        }
    }, [isCurrentTurn, status, diceValue, isCompleted, rollsCount, movesCount]);

    // Update target position based on step
    useEffect(() => {
        if (!step) return;

        const updatePosition = () => {
            let element: HTMLElement | null = null;

            if (step === 'roll') {
                if (currentUserId) {
                    element = document.getElementById(`player-card-${currentUserId}`);
                }
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
                    top: rect.top + (step === 'roll' ? -10 : -30),
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
                    top: targetPos.top + 45,
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
