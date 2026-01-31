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
		resetState(state) {
			state.isUserLoggedIn = false;
			state.loggedInUserDetails = undefined;
		},
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
		setGuestUser(state, action: PayloadAction<{ name: string; gameId: string; userId: string }>) {
			state.loggedInUserDetails = {
				_id: action.payload.userId,
				firstName: action.payload.name.split(' ')[0],
				lastName: action.payload.name.split(' ').slice(1).join(' ') || '',
				email: '',
				role: 'guest',
			} as TCommonResponseData;
		}
	},
});

export default authSlice.reducer;
export const { setIsUserLoggedIn, resetState, setLoggedInUserDetails, setGuestUser } = authSlice.actions;
