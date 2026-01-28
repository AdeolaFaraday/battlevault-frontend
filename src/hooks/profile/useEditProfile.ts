import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { useAlert } from '../common/useAlert';
import useUpdateProfileApi from '@/src/api/profile/useUpdateProfile';

export type EditProfileFormState = {
	displayName: string;
	userName: string;
	bio: string;
};

const deriveInitialState = (user?: TCommonResponseData): EditProfileFormState => {
	const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();

	return {
		displayName,
		userName: user?.userName ?? '',
		bio: user?.bio ?? '',
	};
};

const useEditProfile = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { success, error } = useAlert();
	const { loggedInUserDetails } = useAppSelector(state => state.auth);

	const [form, setForm] = useState<EditProfileFormState>(() =>
		deriveInitialState(loggedInUserDetails)
	);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleChange = (field: keyof EditProfileFormState, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	const onCompleted = (response: TAPIResponse<TCommonResponseData, 'updateUserProfile'>) => {
		const { success: ok, message, data } = response.updateUserProfile;

		if (!ok || !data) {
			error('Profile Update Failed', message ?? 'Something went wrong updating your profile.');
			return;
		}

		// Keep existing auth data (token etc.), update with latest user fields
		dispatch(
			setLoggedInUserDetails({
				...(loggedInUserDetails ?? {}),
				...data,
				isUserLoggedIn: true,
			})
		);

		success('Profile Updated', message ?? 'Your profile has been updated.');
		setShowSuccess(true);

		setTimeout(() => {
			setShowSuccess(false);
			router.back();
		}, 2000);
	};

	const { updateProfile, loading } = useUpdateProfileApi(onCompleted);

	const handleSubmit = () => {
		if (!loggedInUserDetails) {
			error('Profile Update Failed', 'You need to be logged in to update your profile.');
			return;
		}

		const [firstName, ...rest] = form.displayName.split(' ');
		const lastName = rest.join(' ');

		updateProfile({
			firstName: firstName || loggedInUserDetails.firstName,
			lastName: lastName || loggedInUserDetails.lastName,
			userName: form.userName || loggedInUserDetails.userName || '',
			bio: form.bio,
		});
	};

	return {
		form,
		loading,
		showSuccess,
		handleChange,
		handleSubmit,
		goBack: () => router.back(),
	};
};

export default useEditProfile;

