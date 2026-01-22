type TCreateUserResponse = TAPIResponse<TCommonResponseData, 'createUser'>;
type TLoginUserResponse = TAPIResponse<TCommonResponseData, 'login'>;
type TVerifyEmailResponse = TAPIResponse<TCommonResponseData, 'verifyEmail'>;
type TSocialLoginUserResponse = TAPIResponse<TCommonResponseData, 'socialAuth'>;

type TCommonResponseData = {
    _id: string
    firstName: string
    lastName: string
    email: string
}

type TCreateUserArgs = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
    country: string
}

type TSignInSchema = {
    email: string
    password: string
}
