import { authTokenStorage } from "@/src/lib/authToken";

export const mapAuthPayloadToCommon = (payload: unknown): TCommonResponseData => {
    if (!payload) {
        return {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    const { user, token } = payload as {
        user?: Partial<TCommonResponseData>;
        token?: string;
    };

    if (token) {
        authTokenStorage.set(token);
    }

    const result: TCommonResponseData = {
        _id: user?._id ?? '',
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        userName: user?.userName,
        bio: user?.bio,
        role: user?.role,
        avatar: user?.avatar,
    };

    return result;
};
