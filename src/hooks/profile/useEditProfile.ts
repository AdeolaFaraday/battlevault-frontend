import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { useAlert } from '../common/useAlert';
import useUpdateProfileApi from '@/src/api/profile/useUpdateProfile';
import useUploadFile from '@/src/api/common/useUploadFile';
import useMe from '@/src/api/auth/useMe';
import { mapAuthPayloadToCommon } from '@/src/utils/auth-utils';
import { compressImage } from '@/src/utils/image-compression';

export type EditProfileFormState = {
	firstName: string;
	lastName: string;
	userName: string;
	bio: string;
	avatar: string;
};

const deriveInitialState = (user?: TCommonResponseData): EditProfileFormState => {
	return {
		firstName: user?.firstName ?? '',
		lastName: user?.lastName ?? '',
		userName: user?.userName ?? '',
		bio: user?.bio ?? '',
		avatar: user?.avatar ?? '',
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

	// Local file states
	const [localFile, setLocalFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleChange = (field: keyof EditProfileFormState, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	// Clean up preview URL
	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const { getMe } = useMe((data) => {
		if (data.me.success && data.me.data) {
			const commonData = mapAuthPayloadToCommon(data.me.data);
			dispatch(
				setLoggedInUserDetails({
					...(loggedInUserDetails ?? {}),
					...commonData,
					isUserLoggedIn: true,
				})
			);
		}
	});

	// 2. Hook for updating profile
	const { updateProfile, loading: updateLoading } = useUpdateProfileApi((response) => {
		const { success: ok, message } = response.updateUserProfile;

		if (!ok) {
			error('Profile Update Failed', message ?? 'Something went wrong updating your profile.');
			return;
		}

		// Success!
		success('Profile Updated', message ?? 'Your profile has been updated.');

		// 3. Re-fetch user data to sync store (as requested)
		getMe();

		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
			router.back();
		}, 2000);
	});

	// 4. Hook for uploading file
	const { uploadFile, loading: uploadLoading } = useUploadFile(
		(data) => {
			const url = data.data?.url;
			if (url) {
				// Once uploaded, perform the actual profile update
				performUpdate(url);
			}
		},
		(err) => {
			error('Upload Failed', err.message || 'Could not upload image.');
		}
	);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				// Compress image to max 1MB
				const compressedFile = await compressImage(file, 1);

				setLocalFile(compressedFile);
				const url = URL.createObjectURL(compressedFile);
				setPreviewUrl(url);
			} catch (err) {
				console.error("Image compression failed, using original file", err);
				setLocalFile(file);
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
			}
		}
	};

	const performUpdate = (avatarUrl?: string) => {
		if (!loggedInUserDetails) return;

		updateProfile({
			firstName: form.firstName || loggedInUserDetails.firstName,
			lastName: form.lastName || loggedInUserDetails.lastName,
			userName: form.userName || loggedInUserDetails.userName || '',
			bio: form.bio,
			avatar: avatarUrl || form.avatar,
		});
	};

	const handleSubmit = () => {
		if (!loggedInUserDetails) {
			error('Profile Update Failed', 'You need to be logged in to update your profile.');
			return;
		}

		// If there's a local file, upload it first
		if (localFile) {
			uploadFile({ file: localFile, folder: 'avatars' });
		} else {
			// Otherwise just update the profile
			performUpdate();
		}
	};

	return {
		form,
		previewUrl, // Return the preview URL for the UI
		loading: updateLoading || uploadLoading,
		showSuccess,
		handleChange,
		handleSubmit,
		handleFileChange,
		goBack: () => router.back(),
	};
};

export default useEditProfile;
