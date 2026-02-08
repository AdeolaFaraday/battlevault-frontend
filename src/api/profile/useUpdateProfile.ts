import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_PROFILE_MUTATION } from '@/src/graphql/auth/mutation';

type UpdateProfileInput = {
	firstName: string;
	lastName: string;
	userName: string;
	bio?: string;
	avatar?: string;
};

type UpdateProfileVariables = {
	input: UpdateProfileInput;
};

const useUpdateProfileApi = (
	onCompleted: (data: TAPIResponse<TCommonResponseData, 'updateUserProfile'>) => void | undefined,
	_onError?: (error: ApolloError) => void | undefined
) => {
	const onError = () => {
		// hook consumer can pass a handler; otherwise swallow here
	};

	const [_updateProfile, states] =
		useMutation<TAPIResponse<TCommonResponseData, 'updateUserProfile'>, UpdateProfileVariables>(
			UPDATE_PROFILE_MUTATION,
			{
				onCompleted,
				onError: error => {
					if (_onError === undefined) {
						onError();
					} else {
						_onError(error);
					}
				},
			}
		);

	const updateProfile = (input: UpdateProfileInput) => {
		_updateProfile({
			variables: { input },
		});
	};

	return { updateProfile, ...states };
};

export default useUpdateProfileApi;

