"use client"
import { generatePathNumberArray } from "@/src/utils/ludo-board";
import LudoPath from "./ludo-path";
import LudoHomeColumn from "./ludo-home-column";
import useLudoAction from "@/src/hooks/ludo/useLudoAction";
import DiceComponent from "../dice-component";

const LudoBoard = () => {
    const {
        findActiveTokens,
        redTokens,
        blueTokens,
        greenTokens,
        yellowTokens,
        handleTokenClick
    } = useLudoAction({})
    console.log({ findActiveTokens });

    const handleDiceRoll = (results: number[]) => {
        // You can use these results to update game state
        console.log('Dice roll results:', results);
    };

    /* 
    Component built with flex box
    Ludo path is inserted in the middle of each flex box
    THe middle horizontal Ludo path span around the center so it contains two path space betweened each other
    */
    return (
        <>
            <div className='ludo-board'>
                <div>
                    <LudoHomeColumn
                        color="red"
                        customClassName="column-1"
                        token={redTokens}
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
                        token={greenTokens}
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
                        token={blueTokens}
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
                        token={yellowTokens}
                        color="yellow"
                        customClassName="column-4"
                    />
                </div>
                <div className="dice-wrapper">
                    <DiceComponent onRollComplete={handleDiceRoll} />
                </div>
            </div>
        </>
    );
}

export default LudoBoard;