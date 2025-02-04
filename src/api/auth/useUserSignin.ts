import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '@/src/graphql/auth/mutation';

const useUserSignIn = (
    onCompleted: (data: TLoginUserResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = (error: ApolloError) => {
        if (error) {
        }
    };

    const [_login, states] =
        useMutation<TLoginUserResponse>(LOGIN_USER_MUTATION, {
            onCompleted,
            onError: error => {
                _onError === undefined ? onError(error) : _onError(error);
            },
        });
    const login = ({ email, password }: TSignInSchema) => {
        _login({
            variables: { email, password },
        });
    };
    return { login, ...states };
};

export default useUserSignIn;
