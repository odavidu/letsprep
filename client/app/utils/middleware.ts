const ENDPOINT = "http://localhost:8080";

export const post = async (url: string, body: object) => {
    try {
        const response = await fetch(`${ENDPOINT}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("POST error response:", errorResponse);
            throw new Error(errorResponse.error || "Failed to post data");
        }

        return response.json();
    } catch (error) {
        console.error("POST network error:", error);
        throw error;
    }
};

export const get = async (url: string, params?: Record<string, string>) => {
    try {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
        const response = await fetch(`${ENDPOINT}/${url}${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("GET error response:", errorResponse);
            throw new Error(errorResponse.error || "Failed to fetch data");
        }

        return response.json();
    } catch (error) {
        console.error("GET network error:", error);
        throw error;
    }
};

