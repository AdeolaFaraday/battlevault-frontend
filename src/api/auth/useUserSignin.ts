import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '@/src/graphql/auth/mutation';

const useUserSignIn = (
    onCompleted: (data: TLoginUserResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = () => {
        // Handle error if needed
    };

    const [_login, states] =
        useMutation<TLoginUserResponse>(LOGIN_USER_MUTATION, {
            onCompleted,
            onError: error => {
                if (_onError === undefined) {
                    onError();
                } else {
                    _onError(error);
                }
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
