type TCreateUserResponse = TAPIResponse<TCommonResponseData, 'createUser'>;
type TLoginUserResponse = TAPIResponse<TCommonResponseData, 'login'>;
type TVerifyEmailResponse = TAPIResponse<TCommonResponseData, 'verifyEmail'>;
type TSocialLoginUserResponse = TAPIResponse<TCommonResponseData, 'socialAuth'>;
type TMeResponse = TAPIResponse<TMeData, 'me'>;

type TMeData = {
    user: TCommonResponseData
}

type TCommonResponseData = {
    /**
     * JWT token returned from auth endpoints (login, socialAuth, etc.)
     * This is optional so that non-auth flows can keep using the same type.
     */
    token?: string;
    _id: string;
    userName?: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    avatar?: string;
    role?: string;
}

type TCreateUserArgs = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
    country: {
        countryName: string
        countryCode: string
    }
}

type TSignInSchema = {
    email: string
    password: string
}

type TRequestPasswordResetResponse = {
    requestPasswordReset: {
        statusCode: number;
        success: boolean;
        message: string;
    }
}

type TResetPasswordResponse = {
    resetPassword: {
        statusCode: number;
        success: boolean;
        message: string;
    }
}
