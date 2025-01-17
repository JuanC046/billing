import qs from "qs";
export const auth = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/oauth/token`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify({
                grant_type: "password",
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
                username: process.env.NEXT_PUBLIC_EMAIL,
                password: process.env.NEXT_PUBLIC_PASSWORD,
            }),
        }
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw new Error("Failed to authenticate");
};
