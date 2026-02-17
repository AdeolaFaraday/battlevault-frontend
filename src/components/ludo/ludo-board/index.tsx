import React, { useMemo } from "react";
import { generatePathNumberArray } from "@/src/utils/ludo-board";
import LudoPath from "./ludo-path";
import LudoHomeColumn from "./ludo-home-column";
import useLudoAction, { usePresenceTracking } from "@/src/hooks/ludo";
import DiceComponent from "../dice-component";
import DiceSelector from "../dice-selector";
import { useRouter } from "next/navigation";
import GameCelebration from "../celebration/GameCelebration";
import { LudoPlayer, Token } from "@/src/types/ludo";

/* 
 Component built with flex box
 Ludo path is inserted in the middle of each flex box
 THe middle horizontal Ludo path span around the center so it contains two path space betweened each other
 */

import GameStats from "../GameHeader";
import PlayerCard from "../PlayerCard";
import TokenFlyingAnimation from "./TokenFlyingAnimation";
import { motion } from "framer-motion";

const LudoBoard = ({ id }: { id: string }) => {
    const router = useRouter();
    usePresenceTracking(id);
    const {
        findActiveTokens,
        tokens,
        gameState,
        activeDiceConfig,
        isCurrentTurn,
        isRolling,
        setActiveDiceConfig,
        usedDiceValues,
        handleTokenClick,
        handleDiceRoll,
        currentUserId,
        recentlyFinishedToken,
        userColors,
        movingToken,
        turnStartedAt,
        turnDuration,
        handleValidateTurn,
        handleRenewTurnTime,
        rewardPoints
    } = useLudoAction({})

    const rotationAngle = useMemo(() => {
        if (!userColors || userColors.length === 0) return 0;
        // The current layout has:
        // Top: Green/Red (TL/TR)
        // Bottom: Blue/Yellow (BL/BR)
        // If user has Red or Green, we want to rotate 180 to bring them to the bottom.
        if (userColors.includes("red") || userColors.includes("green")) return 180;
        return 0;
    }, [userColors]);

    const handleCustomDiceRoll = () => {
        if (handleDiceRoll) {
            handleDiceRoll();
        }
    };

    const canMoveTokens = isCurrentTurn && gameState.status === "playingToken";

    const availableDice = [...(gameState?.diceValue || [])];
    usedDiceValues.forEach(val => {
        const index = availableDice.indexOf(val);
        if (index !== -1) availableDice.splice(index, 1);
    });

    // Pre-calculate tokens by cell for performance
    const tokensByCell = useMemo(() => {
        const map: Record<string, Token[]> = {};
        findActiveTokens.forEach(token => {
            const key = token.isSafePath ? `safe-${token.position}` : `${token.position}`;
            if (!map[key]) map[key] = [];
            map[key].push(token);
        });
        return map;
    }, [findActiveTokens]);

    const showDiceSelector = gameState.status === "playingToken" && availableDice.length > 0;

    // Helper to get player data safely
    const getPlayer = (color: string) => gameState.players?.find(p => p.tokens?.includes(color));
    const currentTurnId = gameState.currentTurn;
    const winner = gameState.players?.find(p => p.id === gameState.winner);

    console.log("Game State", { gameState, currentTurnId, currentUserId });

    return (
        <div className="flex flex-col h-screen w-full bg-[#1e293b] overflow-hidden relative">
            <GameCelebration
                isOpen={gameState.status === "finished"}
                winner={winner}
                onClose={() => router.push("/")}
                onRestart={() => window.location.reload()}
            />

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[100px]" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-start mt-5 relative z-10 w-full max-w-[500px] mx-auto pb-4">
                <GameStats />

                {/* Dynamic Player Cards Positioning */}
                <div className="w-full flex justify-center mb-4 px-4">
                    <PlayerCard
                        player={rotationAngle === 180
                            ? (getPlayer("blue") || getPlayer("yellow"))
                            : (getPlayer("green") || getPlayer("red"))}
                        color={rotationAngle === 180
                            ? (getPlayer("blue") ? "blue" : "yellow")
                            : (getPlayer("green") ? "green" : "red")}
                        isCurrentTurn={(rotationAngle === 180
                            ? (getPlayer("blue") || getPlayer("yellow"))
                            : (getPlayer("green") || getPlayer("red")))?.id === currentTurnId}
                        isCurrentUser={(rotationAngle === 180
                            ? (getPlayer("blue") || getPlayer("yellow"))
                            : (getPlayer("green") || getPlayer("red")))?.id === currentUserId}
                        position="top-right"
                        tokenData={gameState.tokens}
                        turnStartedAt={turnStartedAt}
                        turnDuration={turnDuration}
                        onTimeUp={handleValidateTurn}
                        rewardPoints={rewardPoints}
                        onRenewTime={handleRenewTurnTime}
                    />
                </div>

                {/* The Board Itself */}
                <motion.div
                    className='ludo-board transform scale-90 sm:scale-100 shadow-2xl shadow-black/50 bg-white'
                    animate={{ rotate: rotationAngle }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                        transform: `scale(var(--tw-scale-x))`,
                        '--token-rotation': `${-rotationAngle}deg`
                    } as unknown as object}
                >
                    <div className="flex flex-col h-full w-full">
                        <div className="flex w-full">
                            <LudoHomeColumn
                                color="red"
                                customClassName="column-1"
                                token={tokens.red}
                                handleTokenClick={handleTokenClick}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                            <LudoPath
                                startPathNumbers={generatePathNumberArray(7).reverse()}
                                middlePathNumbers={generatePathNumberArray(13)}
                                endPathNumbers={generatePathNumberArray(14)}
                                startPathNumber={15}
                                handleTokenDrop={handleTokenClick}
                                color="green"
                                tokensByCell={tokensByCell}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                selectorPosition="below"
                                movingToken={movingToken}
                            />
                            <LudoHomeColumn
                                color="green"
                                customClassName="column-2"
                                token={tokens.green}
                                handleTokenClick={handleTokenClick}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                        </div>
                        <span className="ludo-column__center shrink-0">
                            <LudoPath
                                startPathNumbers={generatePathNumberArray(1)}
                                middlePathNumbers={generatePathNumberArray(52)}
                                endPathNumbers={generatePathNumberArray(46).reverse()}
                                handleTokenDrop={handleTokenClick}
                                startPathNumber={2}
                                color="red"
                                customClassName="ludo-cell__vertial"
                                customRowClassName="ludo-row"
                                tokensByCell={tokensByCell}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                            <div className="ludo-center">
                                <div className="clip-triangle-tl" />
                                <div className="clip-triangle-tr" />
                                <div className="clip-triangle-bl" />
                                <div className="clip-triangle-br" />
                            </div>
                            <LudoPath
                                startPathNumbers={generatePathNumberArray(20)}
                                middlePathNumbers={generatePathNumberArray(26).reverse()}
                                endPathNumbers={generatePathNumberArray(27).reverse()}
                                startPathNumber={28}
                                handleTokenDrop={handleTokenClick}
                                color="yellow"
                                customClassName="ludo-cell__vertial"
                                customRowClassName="ludo-row"
                                tokensByCell={tokensByCell}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                        </span>
                        <div className="flex w-full overflow-hidden">
                            <LudoHomeColumn
                                color="blue"
                                customClassName="column-3"
                                token={tokens.blue}
                                handleTokenClick={handleTokenClick}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                            <LudoPath
                                startPathNumbers={generatePathNumberArray(40).reverse()}
                                middlePathNumbers={generatePathNumberArray(39).reverse()}
                                endPathNumbers={generatePathNumberArray(33)}
                                handleTokenDrop={handleTokenClick}
                                startPathNumber={41}
                                color="blue"
                                tokensByCell={tokensByCell}
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                            <LudoHomeColumn
                                handleTokenClick={handleTokenClick}
                                token={tokens.yellow}
                                color="yellow"
                                customClassName="column-4"
                                canMoveTokens={canMoveTokens}
                                userColors={userColors}
                                movingToken={movingToken}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Dice Controls */}
                <div className="dice-wrapper w-full flex justify-center items-center relative min-h-[80px]">
                    <DiceComponent
                        onRollComplete={handleCustomDiceRoll}
                        diceValues={gameState.diceValue}
                        showRollButton={isCurrentTurn && gameState.status === "playingDice"}
                        isRolling={isRolling}
                    />
                </div>

                {/* Bottom User Card */}
                <div className="w-full flex justify-center px-4">
                    <PlayerCard
                        player={rotationAngle === 180
                            ? (getPlayer("green") || getPlayer("red"))
                            : (getPlayer("blue") || getPlayer("yellow"))}
                        color={rotationAngle === 180
                            ? (getPlayer("green") ? "green" : "red")
                            : (getPlayer("blue") ? "blue" : "yellow")}
                        isCurrentTurn={(rotationAngle === 180
                            ? (getPlayer("green") || getPlayer("red"))
                            : (getPlayer("blue") || getPlayer("yellow")))?.id === currentTurnId}
                        isCurrentUser={(rotationAngle === 180
                            ? (getPlayer("green") || getPlayer("red"))
                            : (getPlayer("blue") || getPlayer("yellow")))?.id === currentUserId}
                        position="bottom-left"
                        tokenData={gameState.tokens}
                        turnStartedAt={turnStartedAt}
                        turnDuration={turnDuration}
                        onTimeUp={handleValidateTurn}
                        rewardPoints={rewardPoints}
                        onRenewTime={handleRenewTurnTime}
                    />
                </div>
            </div>

            {/* Portals and Overlays */}
            {recentlyFinishedToken && (
                <TokenFlyingAnimation
                    color={recentlyFinishedToken}
                    player={getPlayer(recentlyFinishedToken) as LudoPlayer}
                    onComplete={() => { }}
                />
            )}

            {showDiceSelector && (
                <DiceSelector
                    availableDice={availableDice}
                    activeDiceConfig={activeDiceConfig}
                    onSelect={setActiveDiceConfig}
                    disabled={!isCurrentTurn}
                />
            )}
        </div>
    );
};

export default LudoBoard;
