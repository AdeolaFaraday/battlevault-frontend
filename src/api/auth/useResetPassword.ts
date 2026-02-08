import { ApolloError, useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '@/src/graphql/auth/mutation';

const useResetPassword = (
    onCompleted: (data: TResetPasswordResponse) => void,
    _onError?: (error: ApolloError) => void
) => {
    const onError = (error: ApolloError) => {
        console.error(error);
    };

    const [reset, states] = useMutation<TResetPasswordResponse>(
        RESET_PASSWORD_MUTATION,
        {
            onCompleted,
            onError: _onError || onError,
        }
    );

    const performReset = (token: string, newPassword: string) => {
        reset({ variables: { token, newPassword } });
    };

    return { resetPassword: performReset, ...states };
};

export default useResetPassword;
