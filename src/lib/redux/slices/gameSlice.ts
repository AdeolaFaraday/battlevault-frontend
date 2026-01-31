import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    sessionId: string | null;
    activeGameId: string | null;
}

const initialState: GameState = {
    sessionId: null,
    activeGameId: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload;
        },
        setActiveGameId: (state, action: PayloadAction<string>) => {
            state.activeGameId = action.payload;
        },
        clearGameSession: (state) => {
            state.sessionId = null;
            state.activeGameId = null;
        }
    }
});

export const { setSessionId, setActiveGameId, clearGameSession } = gameSlice.actions;
export default gameSlice.reducer;
