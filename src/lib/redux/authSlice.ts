import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TAuthSliceInitialState = {
	isUserLoggedIn: boolean | 'loading';
	loggedInUserDetails?: TCommonResponseData;
};

const initialState: TAuthSliceInitialState = {
	isUserLoggedIn: 'loading',
	loggedInUserDetails: undefined,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetState() {},
		setIsUserLoggedIn(state, action: PayloadAction<boolean>) {
			state.isUserLoggedIn = action.payload;
		},
		setLoggedInUserDetails(
			state,
			action: PayloadAction<
				TCommonResponseData & {
					isUserLoggedIn?: boolean;
				}
			>
		) {
			state.loggedInUserDetails = action.payload;
			if (action.payload.isUserLoggedIn !== undefined) {
				state.isUserLoggedIn = action.payload.isUserLoggedIn;
			}
		},
	},
});

export default authSlice.reducer;
export const { setIsUserLoggedIn, resetState, setLoggedInUserDetails } =
	authSlice.actions;
