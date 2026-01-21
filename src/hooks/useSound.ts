import { useCallback } from 'react';

// Using simple free sounds for now. These can be replaced with local assets later.
const SOUNDS = {
    roll: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Dice rattle/roll sound
    move: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Simple pop/click for move
};

export const useSound = () => {
    const playSound = useCallback((type: keyof typeof SOUNDS) => {
        try {
            const audio = new Audio(SOUNDS[type]);

            // Lower volume slightly for better UX
            audio.volume = type === 'roll' ? 0.4 : 0.3;

            audio.play().catch(err => {
                // Auto-play policies might block this if not triggered by user interaction
                console.warn('Audio play failed', err);
            });
        } catch (e) {
            console.warn('Audio initialization failed', e);
        }
    }, []);

    return {
        playRoll: () => playSound('roll'),
        playMove: () => playSound('move'),
    };
};
