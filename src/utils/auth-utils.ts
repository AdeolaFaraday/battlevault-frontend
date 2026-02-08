// import { authTokenStorage } from "@/src/lib/authToken";

export const mapAuthPayloadToCommon = (payload: unknown): TCommonResponseData => {
    if (!payload) {
        // Fallback empty structure; runtime calls should guard against this
        return {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    const { user } = payload as {
        user?: Partial<TCommonResponseData>;
    };

    const result: TCommonResponseData = {
        _id: user?._id ?? '',
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        userName: user?.userName,
        bio: user?.bio,
        role: user?.role,
        avatar: user?.avatar,
        // token,
    };

    // Persist token if present
    // if (token) {
    //     authTokenStorage.set(token);
    // }

    return result;
};
