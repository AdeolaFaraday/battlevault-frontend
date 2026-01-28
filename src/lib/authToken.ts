const TOKEN_STORAGE_KEY = 'bv_auth_token';

export const authTokenStorage = {
	get(): string | null {
		if (typeof window === 'undefined') return null;
		try {
			return window.localStorage.getItem(TOKEN_STORAGE_KEY);
		} catch {
			return null;
		}
	},
	set(token: string) {
		if (typeof window === 'undefined') return;
		try {
			window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
		} catch {
			// Best-effort only; ignore storage failures
		}
	},
	clear() {
		if (typeof window === 'undefined') return;
		try {
			window.localStorage.removeItem(TOKEN_STORAGE_KEY);
		} catch {
			// ignore
		}
	},
};

