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
		setGuestUser(state, action: PayloadAction<{ name: string; gameId: string }>) {
			// Generate a temp ID or let backend handle it, but store name locally
			// For guest, we just need the name to pass to joinGame
			// We can mimic the User structure or just store name
			// Let's use a temporary structure compatible with TCommonResponseData if possible, 
			// or just update state to hold guest info separately? 
			// The prompt says "stored in redux to mic current user with user id"
			// Let's reuse loggedInUserDetails but keep isUserLoggedIn false

			// We need a temporary ID for the frontend state to work with "You" logic
			// The actual join will return a real player ID from backend
			const tempId = `${action.payload.name}-${action.payload.gameId}`;
			state.loggedInUserDetails = {
				_id: tempId,
				firstName: action.payload.name.split(' ')[0],
				lastName: action.payload.name.split(' ').slice(1).join(' ') || '',
				email: '',
				role: 'guest',
				// Add other required fields with dummy data if TCommonResponseData enforces them
			} as TCommonResponseData;
			// Explicitly NOT setting isUserLoggedIn to true
		}
	},
});

export default authSlice.reducer;
export const { setIsUserLoggedIn, resetState, setLoggedInUserDetails, setGuestUser } = authSlice.actions;
