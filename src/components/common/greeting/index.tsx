"use client"
import { useAppSelector } from "@/src/lib/redux/hooks";

const Greeting = () => {
    const { loggedInUserDetails } = useAppSelector((state) => state.auth)
    const userName = loggedInUserDetails?.firstName || "Player";
    return <h3>Hi, <span>{userName}</span>{" "}👋</h3>
}

export default Greeting;