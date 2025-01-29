const ENDPOINT = "http://localhost:8080";

export const fetcher = async (url: string, options: RequestInit) => {
    try {
        const response = await fetch(`${ENDPOINT}/${url}`, options);
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Fetcher error response:", errorResponse);
            throw new Error(errorResponse.error || "Failed to fetch");
        }
        return response.json();
    } catch (error) {
        console.error("Fetcher network error:", error);
        throw error;
    }
};
