import { useMutation, useApolloClient } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../graphql/auth/mutation';
import { useAppDispatch } from '../../lib/redux/hooks';
import { resetState } from '../../lib/redux/authSlice';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const client = useApolloClient();

    const handleCleanup = async () => {
        try {
            // Clear Redux state
            dispatch(resetState());
            // Clear Apollo store
            await client.clearStore();
            // Redirect to signin
            router.push('/signin');
        } catch (e) {
            console.error('Error during logout cleanup:', e);
            // Ensure redirect happens even if cleanup fails
            router.push('/signin');
        }
    };

    const { success: showSuccess, error: showError } = useAlert();
    const [logoutMutation, { loading, error }] = useMutation(LOGOUT_MUTATION);

    const logout = async () => {
        try {
            const { data } = await logoutMutation();
            if (data?.logout?.success) {
                showSuccess('Success', data.logout.message || 'Logged out successfully');
            }
            // If mutation succeeds, perform cleanup
            await handleCleanup();
        } catch (err: any) {
            console.error('Logout error:', err);
            showError('Logout Failed', err.message || 'An unexpected error occurred');
            // If mutation fails, still perform cleanup to prevent "stuck" state
            await handleCleanup();
        }
    };

    return { logout, loading, error };
};
