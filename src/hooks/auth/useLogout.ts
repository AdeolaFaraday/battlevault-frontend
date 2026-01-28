import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../graphql/auth/mutation';
import { useAppDispatch } from '../../lib/redux/hooks';
import { resetState } from '../../lib/redux/authSlice';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
    const [logoutMutation, { loading, error }] = useMutation(LOGOUT_MUTATION, {
        onCompleted: () => {
            // Clear Redux state
            dispatch(resetState());
            // Redirect to signin
            router.push('/signin');
        }
    });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const logout = async () => {
        try {
            await logoutMutation();
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return { logout, loading, error };
};
