import React from "react";
import Image from "next/image";
import { Wallet } from "lucide-react";

import './styles.css';

type NavbarProps = {
    profilePicture: string; // URL or path to the profile picture
    walletBalance: number;  // User's wallet balance
}

const Navbar = ({ profilePicture, walletBalance }: NavbarProps) => {
    return (
        <nav className="navbar">
            <div className="profile">
                <Image
                    src={profilePicture}
                    alt="Profile"
                    className="profile-img"
                    width={60}
                    height={60}
                />
                {/* <span className="profile-text">Welcome, User</span> */}
            </div>

            <div className="wallet">
                <Wallet size={20} className="wallet-icon" />
                <span className="wallet-balance">₦{walletBalance.toLocaleString()}</span>
            </div>
        </nav>
    );
};

export default Navbar;
