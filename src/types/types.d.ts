type TAPIResponse<T, U extends string> = {
    [Key in U]: {
        success: boolean;
        statusCode: number;
        message: string;
        data?: T;
    };
};