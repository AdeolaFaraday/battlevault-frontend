import { useState } from 'react';

const useUploadFile = (
    onCompleted: (data: TUploadFileResponse) => void | undefined,
    onError?: (error: Error) => void | undefined
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async ({ file, folder }: TUploadFileVariables) => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (folder) {
                formData.append('folder', folder);
            }

            // Construct the upload URL
            // Assumes NEXT_PUBLIC_SERVER_URL is the GraphQL endpoint (e.g. .../graphql)
            // We want to replace /graphql with /upload
            let baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
            baseUrl = baseUrl.replace(/\/graphql\/?$/, '');
            baseUrl = baseUrl.replace(/\/$/, '');

            const uploadUrl = `${baseUrl}/api/upload`;
            // console.log('Uploading to:', uploadUrl);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Upload failed with status ${response.status}`);
            }

            const data: TUploadFileResponse = await response.json();
            onCompleted(data);
        } catch (err: unknown) {
            console.error("Upload error:", err);
            setError((err as Error).message || 'An error occurred during upload.');
            if (onError) {
                onError(err as Error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { uploadFile, loading, error };
};

export default useUploadFile;
