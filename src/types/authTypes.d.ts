type TCreateUserResponse = TAPIResponse<TCommonResponseData, 'createUser'>;

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
    userName: string
    password: string
}
