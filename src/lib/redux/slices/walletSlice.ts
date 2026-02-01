import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TWalletState = {
    _id: string;
    withdrawable: number;
    pending: number;
    rewards: number;
    currency: string;
};

const initialState: TWalletState = {
    _id: '',
    withdrawable: 0,
    pending: 0,
    rewards: 0,
    currency: 'NGN',
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet(state, action: PayloadAction<Partial<TWalletState>>) {
            return { ...state, ...action.payload };
        },
        resetWallet() {
            return initialState;
        },
    },
});

export const { setWallet, resetWallet } = walletSlice.actions;
export default walletSlice.reducer;
