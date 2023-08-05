import { GameInit } from "./games/SimonSays/simonSays.js"
import { NumbersGameInit } from "./games/numbers/numbers.js"
import { ShuffleNumbersGameInit } from "./games/shuffleNumbers/shuffleNumbers.js"


export const gameIndexes = {
    SIMON_SAYS(){GameInit()},
    NUMBERS(){NumbersGameInit()},
    SHUFFLE_NUMBERS(){ShuffleNumbersGameInit()}
}