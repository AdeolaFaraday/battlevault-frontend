import { generatePathNumberArray } from "@/src/utils/ludo-board";
import LudoPath from "../ludo-path";
import LudoHomeColumn from "./ludo-home-column";

const LudoBoard = () => {
    return <div className='ludo-board'>
        <div>
            <LudoHomeColumn customClassName="column-1" />
            <LudoPath
                startPathNumbers={generatePathNumberArray(7).reverse()}
                middlePathNumbers={generatePathNumberArray(13)}
                endPathNumbers={generatePathNumberArray(14)}
                startPathNumber={15}
                color="green"
            />
            <LudoHomeColumn customClassName="column-2" />
        </div>
        <span className="ludo-column__center">
            <LudoPath
                startPathNumbers={generatePathNumberArray(1)}
                middlePathNumbers={generatePathNumberArray(52)}
                endPathNumbers={generatePathNumberArray(46).reverse()}
                startPathNumber={2}
                color="red"
                customClassName="ludo-cell__vertial"
                customRowClassName="ludo-row"
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
                color="yellow"
                customClassName="ludo-cell__vertial"
                customRowClassName="ludo-row"
            />
        </span>
        <div>
            <LudoHomeColumn customClassName="column-3" />
            <LudoPath
                startPathNumbers={generatePathNumberArray(40).reverse()}
                middlePathNumbers={generatePathNumberArray(39).reverse()}
                endPathNumbers={generatePathNumberArray(33)}
                startPathNumber={41}
                color="blue"
            />
            <LudoHomeColumn customClassName="column-4" />
        </div>
    </div>
}

export default LudoBoard;