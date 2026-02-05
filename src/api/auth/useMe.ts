import { ApolloError, useLazyQuery } from '@apollo/client';
import { GET_ME_QUERY } from '@/src/graphql/auth/queries';

const useMe = (
    onCompleted: (data: TMeResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = () => {
        // Handle error if needed
    };

    const [getMe, states] = useLazyQuery<TMeResponse>(GET_ME_QUERY, {
        onCompleted,
        onError: error => {
            if (_onError === undefined) {
                onError();
            } else {
                _onError(error);
            }
        },
        fetchPolicy: 'network-only', // Ensure we get fresh data
    });

    return { getMe, ...states };
};

export default useMe;
