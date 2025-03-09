"use client"
import { useEffect, useRef } from 'react';
import DiceBox from '@3d-dice/dice-box';

interface DiceComponentProps {
    onRollComplete?: (results: DiceValue[]) => void;
}

const DiceComponent = ({ onRollComplete }: DiceComponentProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const diceBoxRef = useRef<DiceBox | null>(null);

    useEffect(() => {
        if (!containerRef.current || diceBoxRef.current) return;

        const initDice = async () => {
            const diceBox = new DiceBox("#dice-box", {
                theme: 'smooth-pip',
                assetPath: '/assets/dice-box/',
                dimensions: {
                    w: 400,
                    h: 400
                },
                scale: 10,
                lightIntensity: 1.2,
                themeColor: '#ffffff',
                throwForce: 10,
                spinForce: 5,
            });

            await diceBox.init();
            diceBoxRef.current = diceBox;
        };

        initDice();

        return () => {
            if (diceBoxRef.current) {
                // Cleanup if needed
                diceBoxRef.current = null;
            }
        };
    }, []);

    const handleRollClick = async () => {
        if (!diceBoxRef.current) return;

        try {
            const results = await diceBoxRef.current.roll('2dpip') as unknown as DiceValue[];
            onRollComplete?.(results);
        } catch (error) {
            console.error('Error rolling dice:', error);
        }
    };

    return (
        <div className="dice-component">
            <div id="dice-box" ref={containerRef} className="dice-container"></div>
            <button
                onClick={handleRollClick}
                className="roll-button"
            >
                Roll Dice
            </button>
        </div>
    );
};

export default DiceComponent; 