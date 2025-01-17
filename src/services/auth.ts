import qs from "qs";
export const auth = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL_API}/oauth/token`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
            grant_type: "password",
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            username: process.env.NEXT_PUBLIC_EMAIL,
            password: process.env.NEXT_PUBLIC_PASSWORD,
        }),
    })
        .then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        });
};
