import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cellColors } from '@/src/constants';
import { LudoPlayer } from '@/src/types/ludo';

interface TokenFlyingAnimationProps {
    color: string;
    player: LudoPlayer;
    onComplete: () => void;
}

const TokenFlyingAnimation: React.FC<TokenFlyingAnimationProps> = ({ color, player, onComplete }) => {
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [fly, setFly] = useState(false);

    useEffect(() => {
        // Calculate positions
        // Start: Roughly center of screen (or board center if we had an ID)
        // For simplicity and guaranteed visibility, let's start from center of screen
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        setStartPos({ x: startX, y: startY });

        // End: Player card position
        const targetEl = document.getElementById(`player-card-${player.id}`);
        if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            // Aim for the avatar circle (left side of card usually)
            setTargetPos({
                x: rect.left + 30,
                y: rect.top + rect.height / 2
            });
        } else {
            console.warn(`Target player card not found for color: ${color}`);
            // Fallback to a corner
            setTargetPos({ x: 0, y: 0 });
        }

        // Trigger animation next frame
        requestAnimationFrame(() => setFly(true));
    }, [color]);

    const bgColor = cellColors.find(c => c.color === color)?.style || 'white';

    return createPortal(
        <AnimatePresence>
            {fly && (
                <motion.div
                    className="fixed z-[9999] pointer-events-none rounded-full shadow-2xl border-2 border-white"
                    initial={{
                        left: startPos.x,
                        top: startPos.y,
                        opacity: 0,
                        scale: 0.5,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                    animate={{
                        left: targetPos.x,
                        top: targetPos.y,
                        opacity: [0, 1, 1, 0], // Fade in then out at end
                        scale: [0.5, 1.2, 0.5], // Pulse up then shrink
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.8, 1] // Keyframes timing
                    }}
                    onAnimationComplete={onComplete}
                    style={{
                        width: '30px',
                        height: '30px',
                        background: bgColor,
                        boxShadow: `0 0 20px ${color === 'white' ? 'black' : color}`
                    }}
                >
                    {/* Inner detail for token look */}
                    <div className="absolute inset-1 rounded-full border border-black/10 bg-gradient-to-br from-white/40 to-transparent" />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default TokenFlyingAnimation;
