import { useCallback, useRef, useEffect } from 'react';

export const useSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize AudioContext on mount (or first interaction)
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
            audioContextRef.current = new AudioContext();
        }
        return () => {
            audioContextRef.current?.close();
        };
    }, []);

    const playRoll = useCallback(() => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        // Create a buffer for noise (rattle sound)
        const bufferSize = ctx.sampleRate * 0.6; // 600ms duration
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            // White noise with some envelope to sound like shaking
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1));
        }

        // Multiple short bursts to simulate shaking multiple dice
        [0, 0.1, 0.2, 0.3, 0.4].forEach((time) => {
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const gain = ctx.createGain();
            // Vary volume slightly
            gain.gain.setValueAtTime(0.1 + Math.random() * 0.1, ctx.currentTime + time);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.1);

            // Simple lowpass filter to make it sound less harsh (more like plastic)
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000 + Math.random() * 500, ctx.currentTime + time);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            noise.start(ctx.currentTime + time);
            // Vary playback rate for pitch variation
            noise.playbackRate.value = 0.8 + Math.random() * 0.4;
        });

    }, []);

    const playMove = useCallback(() => {
        try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
            // Lower volume slightly for better UX
            audio.volume = 0.3;
            audio.play().catch(err => {
                // Auto-play policies might block this if not triggered by user interaction
                console.warn('Audio play failed', err);
            });
        } catch (e) {
            console.warn('Audio initialization failed', e);
        }
    }, []);

    return {
        playRoll,
        playMove,
    };
};
