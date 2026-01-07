import { ApolloError, useMutation } from '@apollo/client';
import { SOCIAL_LOGIN_USER_MUTATION } from '@/src/graphql/auth/mutation';

const useSocialAuth = (
    onCompleted: (data: TSocialLoginUserResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = () => {
        // Handle error if needed
    };

    const [_socialAuth, states] =
        useMutation<TSocialLoginUserResponse>(SOCIAL_LOGIN_USER_MUTATION, {
            onCompleted,
            onError: error => {
                if (_onError === undefined) {
                    onError();
                } else {
                    _onError(error);
                }
            },
        });
    const socialAuth = ({ token }: { token: string }) => {
        _socialAuth({
            variables: { token },
        });
    };
    return { socialAuth, ...states };
};

export default useSocialAuth;
