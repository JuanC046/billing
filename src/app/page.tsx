"use client";
import { auth } from "@/services/auth";
import { useEffect } from "react";
export default function Home() {
    useEffect(() => {
        const getTokens = async () => {
            try {
                const data = await auth();
                console.log(data);
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            } catch (error) {
                console.error(error);
            }
        };
        getTokens();
    }, []);
    return <></>;
}
