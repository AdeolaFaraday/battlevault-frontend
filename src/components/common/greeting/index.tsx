"use client"
import { useAppSelector } from "@/src/lib/redux/hooks";

const Greeting = () => {
    const { loggedInUserDetails } = useAppSelector(state => state.auth)
    return <h3>Hi, <span>{loggedInUserDetails?.firstName}</span>{" "}👋</h3>
}

export default Greeting;