type TCreateUserResponse = TAPIResponse<TCommonResponseData, 'createUser'>;
type TLoginUserResponse = TAPIResponse<TCommonResponseData, 'login'>;

type TCommonResponseData = {
    _id: string;
}

type TCreateUserArgs = {
    userName: string
    firstName: string
    lastName: string
    email: string
    password: string
}

type TSignInSchema = {
    email: string
    password: string
}
