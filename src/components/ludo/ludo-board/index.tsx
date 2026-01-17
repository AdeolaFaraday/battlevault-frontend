"use client"
import { generatePathNumberArray } from "@/src/utils/ludo-board";
import LudoPath from "./ludo-path";
import LudoHomeColumn from "./ludo-home-column";
import useLudoAction from "@/src/hooks/ludo/useLudoAction";
import DiceComponent from "../dice-component";
import DiceSelector from "../dice-selector";

/* 
 Component built with flex box
 Ludo path is inserted in the middle of each flex box
 THe middle horizontal Ludo path span around the center so it contains two path space betweened each other
 */

import GameHeader, { GameStats } from "../GameHeader";
import PlayerCard from "../PlayerCard";

/* 
 Component built with flex box
 Ludo path is inserted in the middle of each flex box
 THe middle horizontal Ludo path span around the center so it contains two path space betweened each other
 */

const LudoBoard = ({ id }: { id: string }) => {
    console.log({ id });
    const {
        findActiveTokens,
        tokens,
        gameState,
        activeDiceConfig,
        isCurrentTurn,
        setActiveDiceConfig,
        usedDiceValues,
        handleTokenClick,
        handleDiceRoll
    } = useLudoAction({})

    const handleCustomDiceRoll = (results: number[]) => {
        if (handleDiceRoll) {
            handleDiceRoll(results);
        }
    };

    const availableDice = [...(gameState?.diceValue || [])];
    usedDiceValues.forEach(val => {
        const index = availableDice.indexOf(val);
        if (index !== -1) availableDice.splice(index, 1);
    });

    // const isCurrentPlayerTurnHasValidTokenMove = isCurrentTurn && 
    console.log({ findActiveTokens })

    const showDiceSelector = gameState.status === "playingToken" && availableDice.length > 0;

    // Helper to get player data safely
    const getPlayer = (color: string) => gameState.players?.find(p => p.tokens?.includes(color));
    const currentTurnId = gameState.currentTurn;

    return (
        <div className="flex flex-col h-screen w-full bg-[#1e293b] overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[100px]" />
            </div>

            <GameHeader />

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[500px] mx-auto pb-4">
                <GameStats />

                {/* Top Opponent Card (Green or Red) */}
                <div className="w-full flex justify-center mb-4 px-4">
                    <PlayerCard
                        player={getPlayer("green") || getPlayer("red")}
                        color={getPlayer("green") ? "green" : "red"}
                        isCurrentTurn={(getPlayer("green") || getPlayer("red"))?.id === currentTurnId}
                        position="top-right"
                    />
                </div>

                {/* The Board Itself */}
                <div className='ludo-board transform scale-90 sm:scale-100 shadow-2xl shadow-black/50 bg-white'>
                    <div>
                        <LudoHomeColumn
                            color="red"
                            customClassName="column-1"
                            token={tokens.red}
                            handleTokenClick={handleTokenClick}
                        />
                        {/* 
                    Path are dictated and reversed for some to match 
                    a continued sequence, in order to make it possible
                    to perfoem logic and ui update base on a predictive path number
                    */}
                        <LudoPath
                            startPathNumbers={generatePathNumberArray(7).reverse()}
                            middlePathNumbers={generatePathNumberArray(13)}
                            endPathNumbers={generatePathNumberArray(14)}
                            startPathNumber={15}
                            handleTokenDrop={handleTokenClick}
                            color="green"
                            findActiveTokens={findActiveTokens}
                        />
                        <LudoHomeColumn
                            color="green"
                            customClassName="column-2"
                            token={tokens.green}
                            handleTokenClick={handleTokenClick}
                        />
                    </div>
                    <span className="ludo-column__center">
                        <LudoPath
                            startPathNumbers={generatePathNumberArray(1)}
                            middlePathNumbers={generatePathNumberArray(52)}
                            endPathNumbers={generatePathNumberArray(46).reverse()}
                            handleTokenDrop={handleTokenClick}
                            startPathNumber={2}
                            color="red"
                            customClassName="ludo-cell__vertial"
                            customRowClassName="ludo-row"
                            findActiveTokens={findActiveTokens}
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
                            findActiveTokens={findActiveTokens}
                        />
                    </span>
                    <div>
                        <LudoHomeColumn
                            color="blue"
                            customClassName="column-3"
                            token={tokens.blue}
                            handleTokenClick={handleTokenClick}
                        />
                        <LudoPath
                            startPathNumbers={generatePathNumberArray(40).reverse()}
                            middlePathNumbers={generatePathNumberArray(39).reverse()}
                            endPathNumbers={generatePathNumberArray(33)}
                            handleTokenDrop={handleTokenClick}
                            startPathNumber={41}
                            color="blue"
                            findActiveTokens={findActiveTokens}
                        />
                        <LudoHomeColumn
                            handleTokenClick={handleTokenClick}
                            token={tokens.yellow}
                            color="yellow"
                            customClassName="column-4"
                        />
                    </div>
                </div>

                {/* Dice Controls (Moved Outside to Bottom) */}
                <div className="dice-wrapper w-full flex justify-center items-center mt-6 relative min-h-[100px]">
                    <DiceComponent
                        onRollComplete={handleCustomDiceRoll}
                        diceValues={gameState.diceValue}
                        showRollButton={isCurrentTurn && gameState.status === "playingDice"}
                    />

                    {isCurrentTurn && showDiceSelector && (
                        <DiceSelector
                            availableDice={availableDice}
                            activeDiceConfig={activeDiceConfig}
                            onSelect={setActiveDiceConfig}
                        />
                    )}
                </div>

                {/* Bottom User Card (Blue or Yellow) */}
                <div className="w-full flex justify-center mt-2 px-4">
                    <PlayerCard
                        player={getPlayer("blue") || getPlayer("yellow")}
                        color={getPlayer("blue") ? "blue" : "yellow"}
                        isCurrentTurn={(getPlayer("blue") || getPlayer("yellow"))?.id === currentTurnId}
                        position="bottom-left"
                    />
                </div>
            </div>
        </div>
    );
}

export default LudoBoard;
