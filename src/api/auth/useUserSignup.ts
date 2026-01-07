import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '@/src/graphql/auth/mutation';

const useUserSignup = (
    onCompleted: (data: TCreateUserResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = () => {
        // Handle error if needed
    };

    const [_createUser, states] =
        useMutation<TCreateUserResponse>(CREATE_USER_MUTATION, {
            onCompleted,
            onError: error => {
                if (_onError === undefined) {
                    onError();
                } else {
                    _onError(error);
                }
            },
        });
    const createUser = (args: TCreateUserArgs) => {
        _createUser({
            variables: {
                args,
            },
        });
    };
    return { createUser, ...states };
};

export default useUserSignup;
